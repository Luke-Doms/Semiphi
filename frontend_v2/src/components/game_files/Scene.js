import {CreateModel} from './lib/utils/CreateModel.js';
import { GetShaderText , CreateShaderProgram } from './lib/utils/CreateProgram.js';
import * as glMatrix from 'https://cdn.jsdelivr.net/npm/gl-matrix@3.4.3/esm/index.js';
import { ObjParser } from './lib/utils/ObjParser.js';
import { CreatePuzzleModel } from './lib/utils/CreatePuzzleModel.js';
import { Camera } from './lib/utils/Camera.js';
import { CheckIntersection } from './lib/utils/CheckIntersection.js';
import { GetRotationAxis } from './lib/utils/GetRotationAxis.js';
import { GetCubiesToRotate, ApplyRotation } from './lib/utils/ApplyRotation.js';
import { GenerateRandomTwist } from './lib/utils/RandomTwist.js';
const VShader = require("./lib/shaders/VertexShader.glsl");
const FShader = require("./lib/shaders/FragmentShader.glsl");
const BaseCube = require("./lib/models/BaseCube.obj")

export class Scene {
  gl;
  x;
  y;
  z;

  constructor (gl, x, y, z, name, PuzzleStorage) {
    this.gl = gl;
    this.x = x;
    this.y = y;
    this.z = z;
    this.name = name;
    this.PuzzleStorage = PuzzleStorage;
    this.OnMouseMove = this.OnMouseMove.bind(this);
    this.OnMouseDown = this.OnMouseDown.bind(this);
    this.OnMouseUp = this.OnMouseUp.bind(this);
  }

  async Load() {
    const puzzleParams = this.PuzzleStorage.get(this.name);
    if (puzzleParams?.camera) {
      const savePos = new Float32Array(puzzleParams.camera.pos);
      const saveUp = new Float32Array(puzzleParams.camera.up);
      this.eye = new Camera(savePos, saveUp);
    } else {
      this.eye = new Camera([5 * this.x, 5 * this.y, 5 * this.z], [0, 0, 1]);
    }
    this.faceSelected = false;
    this.moveQueue = [];
    this.ANIMATION_RUNNING = false;

    const modelText = await GetShaderText(BaseCube);

    const cubieModel = new Float32Array(ObjParser(modelText));

    this.puzzleModel = CreatePuzzleModel(this.gl, cubieModel, this.x, this.y, this.z);
    if (puzzleParams?.position) {
      for (let i in this.puzzleModel) {
        const savedArray = puzzleParams.position[i]; // This is a plain array of 16 numbers
        const restoredMatrix = glMatrix.mat4.clone(new Float32Array(savedArray));
        this.puzzleModel[i].worldMatrix = restoredMatrix;
      }
    }

    const vertexShaderText = await GetShaderText(VShader);
    const fragmentShaderText = await GetShaderText(FShader);

    this.program = CreateShaderProgram(this.gl, vertexShaderText, fragmentShaderText);

    this.program.uniforms = {
      u_Proj: this.gl.getUniformLocation(this.program, 'u_Proj'),
      u_View: this.gl.getUniformLocation(this.program, 'u_View'),
      u_World: this.gl.getUniformLocation(this.program, 'u_World'),
    };

    this.program.attribs = {
      a_Position: this.gl.getAttribLocation(this.program, 'a_Position'),
      a_Color: this.gl.getAttribLocation(this.program, 'a_Color'),
    };

    this.viewMatrix = glMatrix.mat4.create();
    this.projMatrix = glMatrix.mat4.create();
    this.worldMatrix = glMatrix.mat4.create();

    if (puzzleParams?.view) {
      const array = new Float32Array(puzzleParams.view);
      glMatrix.mat4.copy(this.viewMatrix, array);
    } else {
      glMatrix.mat4.lookAt(this.viewMatrix, this.eye.pos, [0, 0, 0], this.eye.up);
    }
    glMatrix.mat4.perspective(
      this.projMatrix,
      glMatrix.glMatrix.toRadian(45),
      this.gl.canvas.clientWidth/this.gl.canvas.clientHeight,
      2,
      1000.0
    );
  }

  Unload() {
    window.removeEventListener("mousedown", this.OnMouseDown);
    window.removeEventListener("mouseup", this.OnMouseUp);
    for (var cubie in this.puzzleModel) {
      const buffer = this.puzzleModel[cubie].buffer_id;
      this.gl.deleteBuffer(buffer);
    }

    this.gl.deleteProgram(this.program);
    this.stopRenderLoop = true;
  }

  OnMouseMove(event) {
    if (!this.faceSelected) {
      this.eye.Move(this.gl, event, this.viewMatrix, this.projMatrix);
    }
  }
  
  OnMouseDown(event) {
    this.faceSelected = CheckIntersection(this.gl, event, this.puzzleModel, this.eye.pos, this.projMatrix, this.viewMatrix); //boolean value
    this.eye.initialMouseEvent = event;
    window.addEventListener("mousemove", this.OnMouseMove);
  }

  OnMouseUp(event) {
    window.removeEventListener("mousemove", this.OnMouseMove);
    if (this.faceSelected) {
      const rotationAxis = GetRotationAxis(this.gl, this.faceSelected, event, this.eye.pos, this.projMatrix, this.viewMatrix);
      this.moveQueue.push([rotationAxis, this.faceSelected]);
    } else {
      const cameraSave = {pos: Array.from(this.eye.pos), up: Array.from(this.eye.up)}
      this.PuzzleStorage.setCamera(this.name, Array.from(this.viewMatrix), cameraSave);
    }
    this.faceSelected = false;
  }
  
  
  Begin() {
    window.addEventListener("mousedown", this.OnMouseDown);
    window.addEventListener("mouseup", this.OnMouseUp);

    this.stopRenderLoop = false;
    this.startTime = 0;
    var previousFrameTime = performance.now();
    var dt;
    const loop = (currentFrameTime) => {
      if (this.stopRenderLoop) {
        return;
      }
      dt = currentFrameTime - previousFrameTime;
      previousFrameTime = currentFrameTime;

      this.Update(dt);
      this.Render();

      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  Update(dt) {
    if (this.eye.update) {
      glMatrix.mat4.lookAt(this.viewMatrix, this.eye.pos, [0, 0, 0], this.eye.up);
    }
    if (!this.ANIMATION_RUNNING && this.moveQueue.length > 0) {
      this.rotationDuration = 0;
      const currentMove = this.moveQueue.shift();
      console.log(currentMove);
      this.rotationParams = GetCubiesToRotate(this.gl, currentMove[0], currentMove[1], this.puzzleModel, [this.x, this.y, this.z]);
      this.ANIMATION_RUNNING = true;
    }
    if (this.ANIMATION_RUNNING) {
      this.rotationDuration += dt;
      this.ANIMATION_RUNNING = ApplyRotation(
        this.gl, 
        this.rotationParams, 
        this.rotationDuration, 
        this.puzzleModel, 
        this.PuzzleStorage, 
        this.name);
    }
  }

  SavePosition() {
    const matrices = [];

    for (const cubie of this.puzzleModel) {
      if (cubie && cubie.worldMatrix) {
        matrices.push(Array.from(cubie.worldMatrix));
      }
    }
    this.PuzzleStorage.setSavePosition(this.name, matrices);

    const cameraSave = {pos: Array.from(this.eye.pos), up: Array.from(this.eye.up)}
    this.PuzzleStorage.setSaveCamera(this.name, Array.from(this.viewMatrix), cameraSave);
  }

  Shuffle() {
    for (var i = 0; i < 26; i++) {
      this.moveQueue.push(GenerateRandomTwist(this.gl, this.x, this.y, this.z));
      console.log(this.moveQueue);
    }
  }

  LoadPosition() {
    const puzzleParams = this.PuzzleStorage.get(this.name);
    if (puzzleParams?.saveCamera) {
      const savePos = new Float32Array(puzzleParams.saveCamera.pos);
      const saveUp = new Float32Array(puzzleParams.saveCamera.up);
      this.eye.pos = savePos;
      this.eye.up = saveUp;
    }
    if (puzzleParams?.savePosition) {
      for (let i in this.puzzleModel) {
        const savedArray = puzzleParams.savePosition[i]; // This is a plain array of 16 numbers
        const restoredMatrix = glMatrix.mat4.clone(new Float32Array(savedArray));
        this.puzzleModel[i].worldMatrix = restoredMatrix;
      }
    }
    if (puzzleParams?.saveView) {
      const array = new Float32Array(puzzleParams.saveView);
      glMatrix.mat4.copy(this.viewMatrix, array);
    }
  }

  Render() {
    var gl = this.gl;
    
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0/255, 0/255, 0/255, 0);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(this.program);

    gl.uniformMatrix4fv(this.program.uniforms.u_View, gl.false, this.viewMatrix);
    gl.uniformMatrix4fv(this.program.uniforms.u_Proj, gl.false, this.projMatrix);

    for (var i in this.puzzleModel) {
      gl.uniformMatrix4fv(this.program.uniforms.u_World, gl.false, this.puzzleModel[i].worldMatrix);
      const cubieBuffer = this.puzzleModel[i].buffer_id;
      gl.bindBuffer(gl.ARRAY_BUFFER, cubieBuffer);
      gl.enableVertexAttribArray(this.program.attribs.a_Position);
      gl.vertexAttribPointer(this.program.attribs.a_Position, 3, gl.FLOAT, false, 11 * Float32Array.BYTES_PER_ELEMENT, 0);
      gl.enableVertexAttribArray(this.program.attribs.a_Color);
      gl.vertexAttribPointer(this.program.attribs.a_Color, 3, gl.FLOAT, false, 11 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
      gl.drawArrays(gl.TRIANGLES, 0, 36);
    }
  }
}
