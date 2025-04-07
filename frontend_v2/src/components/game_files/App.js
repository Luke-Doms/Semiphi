import { Scene } from './Scene.js';

export function initApp (x, y, z, name, PuzzleStorage) {
  var canvas = document.getElementById("game-surface");
  
  var gl = canvas.getContext("webgl");

  if (!gl) {
    alert("your browser does not support webgl.");
  }

  var puzzle = new Scene(gl, x, y, z, name, PuzzleStorage);
  puzzle.Load().then(() => puzzle.Begin());

  return puzzle;
}


