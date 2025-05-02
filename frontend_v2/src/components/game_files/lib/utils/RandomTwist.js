import * as glMatrix from 'https://cdn.jsdelivr.net/npm/gl-matrix@3.4.3/esm/index.js';

export function GenerateRandomTwist(gl, x, y, z) {
	console.log('test');
	//pick an axis and then pick a number corresponding to a slice
	const index = Math.floor(Math.random() * 3);
	const axisParity = Math.floor(Math.random() * 2);
	var rotationAxis = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		if (i == index) {
			rotationAxis[i] = (-1) ** axisParity;
		}
	}
	
	var cubieFace = [0, 0, 0];
	const dimensions = [x, y, z];
	for (var i = 0; i < 3; i++) {
		cubieFace[i] = (-(2.2*dimensions[i])/2 + .1) + Math.floor(Math.random() * dimensions[1]) * 2.2 + 1;
	}
	
	const side = Math.abs(Math.floor(Math.random() * 2)); //get random index that isnt index
	const sideParity = Math.floor(Math.random() *2)
	const faceIndex = (index + (-1) ** side) % 3;
	cubieFace[faceIndex] = (-(2.2 * dimensions[faceIndex])/2 + .1 + 1) + sideParity * dimensions[faceIndex] * 2.2;
	return [
		glMatrix.vec3.fromValues(rotationAxis[0], rotationAxis[1], rotationAxis[2]), 
		{
			normal: null,
			point: glMatrix.vec3.fromValues(cubieFace[0], cubieFace[1], cubieFace[2]), 
			t: null
		}
	];
}

