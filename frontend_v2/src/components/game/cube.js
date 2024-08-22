import { model } from './Models.js';
var glMatrix = require('gl-matrix');
//var math = require('mathjs');

export class rubiksCube {
  constructor(positionTensor) {
    //0 -> [0, 0, 0], 1 -> [0, 0, 1], 2 -> [0, 1, 0], 3 -> [0, 1, 1], 4 -> [1, 0, 0], 5 -> [1, 0, 1], 6 -> [1, 1, 0], 7 -> [1, 1, 1],
    this.cubies = [];
    this.totalTime = 0;
    this.final = [];
    this.buffer = glMatrix.mat4.create();
    this.checkpoint = new Array(8);
    var color = new Float32Array(6);
    for (var i = 0; i < 2; i++) {
      for (var k = 0; k < 2; k++) {
        for (var j = 0; j < 2; j++) { //make sure the colors actually line up here, prob a way to simplify this
          const color = [[0, 0, 0, (1-j), (1-j), 0],
            [0, 0, 0, j, j, j],
            [0, 0, 0, 0, i, 0],
            [0, 0, 0, 0, 0, (1-i)],
            [0, 0, 0, (1-k), 0, 0],
            [0, 0, 0, k, k * .647, 0]]; //this is short but not very readable, if it doesnt give an algroithm that allows one to set size of cube its probably better to do a more longwinded but clear approach
          this.cubies.push(new SubCube(positionTensor, [i * 1.1, k * 1.1, j * 1.1, 0, 0, 0], color));
        }
      }
    }

    this.sides = {
      "Front": {
        "Cubies": [0, 1, 3, 2],
        "Axis": [1, 0, 0]
      },
      "Left": {
        "Cubies": [7, 3, 1, 5],
        "Axis": [0, 0, -1]
      },
      "Top": {
        "Cubies": [7, 6, 2, 3],
        "Axis": [0, -1, 0]
      },
      "Back": {
        "Cubies": [4, 6, 7, 5],
        "Axis": [-1, 0, 0]
      },
      "Right": {
        "Cubies": [6, 4, 0, 2],
        "Axis": [0, 0, 1]
      },
      "Bottom": {
        "Cubies": [5, 1, 0, 4],
        "Axis": [0, 1, 0]
      },
    }
  }

  setRotate (v, rotationAxis, p) {
    this.totalTime = 0;
    this.parity = p;
    this.final = []
    this.rotateAxis = rotationAxis;
    this.toRotate = [this.cubies[v[0]],
                     this.cubies[v[1]],
                     this.cubies[v[2]],
                     this.cubies[v[3]]];
    for (var i = 0; i < 4; i++) {
      this.final.push(glMatrix.mat4.clone(this.toRotate[i].world));
      glMatrix.mat4.rotate(this.buffer, this.buffer, this.parity * Math.PI / 2, this.rotateAxis);
      glMatrix.mat4.multiply(this.final[i], this.buffer, this.final[i]);
      glMatrix.mat4.identity(this.buffer);
    }
    if (this.parity == 1) {
      [this.cubies[v[0]], this.cubies[v[1]], this.cubies[v[2]], this.cubies[v[3]]]
      =
      [this.cubies[v[1]], this.cubies[v[2]], this.cubies[v[3]], this.cubies[v[0]]];
    } else {
      [this.cubies[v[0]], this.cubies[v[1]], this.cubies[v[2]], this.cubies[v[3]]]
      =
      [this.cubies[v[3]], this.cubies[v[0]], this.cubies[v[1]], this.cubies[v[2]]];
    }

  }

  rotate (dt) {
    this.totalTime  = this.totalTime + dt;
    if (this.totalTime > 500) {
      for (var i = 0; i < this.final.length; i++){
        glMatrix.mat4.copy(this.toRotate[i].world, this.final[i]);
      }
      this.toRotate = [];
      glMatrix.mat4.identity(this.buffer);
      return true;
    }
    for (var i = 0; i < 4; i++) {
      glMatrix.vec3.normalize(this.rotateAxis, this.rotateAxis);
      glMatrix.mat4.rotate(this.buffer, this.buffer, this.parity * (dt / 500) * (Math.PI / 2), this.rotateAxis);
      glMatrix.mat4.multiply(this.toRotate[i].world, this.buffer, this.toRotate[i].world);
      glMatrix.mat4.identity(this.buffer);
    }
    return false
  }

  shuffle () {
    var out = [];
    const keys = Object.keys(this.sides);
    const l = keys.length;
    for (var i = 0; i < 15; i++) {
      const rand = Math.random() * l;
      out.push([keys[Math.floor(rand)], 2 * Math.round(rand % 1) - 1]);
    }
    return out;
  }

  createCheckpoint (gl) {
    //heres where I could talk with an api to save multiple, but for now lets save just one. also might be good to keep camera angle also
    for (var i = 0; i < this.cubies.length; i++) {
      this.checkpoint[i] = new model(gl, this.cubies[i].verts);
      glMatrix.mat4.copy(this.checkpoint[i].world, this.cubies[i].world);
    }
  }

  loadCheckpoint (gl) {
    for (var i = 0; i < this.cubies.length; i++) {
      this.cubies[i] = new model(gl, this.checkpoint[i].verts);
      glMatrix.mat4.copy(this.cubies[i].world, this.checkpoint[i].world);
    }
  }
}

export class SubCube {
  constructor(coordinates, offset, color) {
    //set world matrix to be translated in load function is a better way to do this.
    this.positionVertices = new Float32Array(216);
    this.diff = new Float32Array(216);
    for (var i = 0; i < coordinates.length; i++) {
      for (var j = 0; j < 6; j++) {
        this.positionVertices[i*6 + j] = coordinates[i][j] + offset[j];
        this.diff[i*6 + j] = coordinates[i][j] - this.positionVertices[i*6 + j];
      }
    }
    //convert to proper form without brackets here for web gl
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 36; j++) {
        this.positionVertices[36*i + j] = this.positionVertices[36*i + j] + color[i][j % 6];
        this.diff[i*36 + j] = coordinates[i][j] - this.positionVertices[i*6 + j];
      }
    }
    this.worldMatrix = glMatrix.mat4.create();
  }
}
