
/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Jan 2025
 */

"use strict";

// nadeem's graphic library
var cube = new function(){
	// REQUIRES dataUtil{}

	// 2 x 6( front , back , top , bottom , right , left )

	// 8 corners - 4 front + 4 back
	var cubeCornerVertices = [
		// front
		  [ -1 , -1 , -1 ] // 0
		, [  1 , -1 , -1 ]
		, [  1 ,  1 , -1 ]
		, [ -1 ,  1 , -1 ]

		// back
		, [ -1 , -1 ,  1 ] // 4
		, [  1 , -1 ,  1 ]
		, [  1 ,  1 ,  1 ]
		, [ -1 ,  1 ,  1 ] // 7
	]
	;

	var indices = [
		// front
		[ 0 , 1 , 2 ]
		, [ 0 , 2 , 3 ]

		// back
		, [ 4 , 6 , 5 ]
		, [ 4 , 7 , 6 ]

		// top
		, [ 3 , 2 , 6 ]
		, [ 3 , 6 , 7 ]

		// bottom
		, [ 0 , 5 , 1 ]
		, [ 0 , 4 , 5 ]

		// right
		, [ 1 , 5 , 6 ]
		, [ 1 , 6 , 2 ]


		// left  
		, [ 0 , 7 , 4 ]
		, [ 0 , 3 , 7 ]
	];

	var idx , jdx , kdx 
		, facesCnt = 12
		, vertices = [] 
		, v_abc = 3 // 3 verts of a face
		, xyz = 3
	;

	for ( idx = 0 ; idx < facesCnt ; idx ++ ){
		// loop each face in indices[]

		for ( jdx = 0 ; jdx < v_abc ; jdx ++ ) {
			// loop each index in indices[idx]
			// console.log( indices[idx][jdx] );
			//console.log( cubeCornerVertices[ indices[idx][jdx] ] );

			for ( kdx = 0 ; kdx < v_abc ; kdx ++ ) {
				// loop each cubeCornerVertices[idx]

				// indices[idx][jdx] -> each xyz vertex
				vertices.push(

					cubeCornerVertices[

						indices[idx][jdx]

					][kdx]
				);
				//console.log( cubeCornerVertices[ indices[idx][jdx] ][kdx] );
				//console.log("---");
			}
			// push w // xyzw , w =  1
			vertices.push( 1 );
		}
	}

	// total vertices = 12 faces x 3 verts/face x 4 dims/vert
	/*
	var verts_size = 12 * 3 * 4 ;
	for ( idx = 0 ; idx < verts_size ; idx += 4 ) {
		console.log( " idx: " + idx , vertices[idx + 0 ] 
			, vertices[idx + 1 ] 
			, vertices[idx + 2 ] 
			, vertices[idx + 3 ] 
		);
	}*/


	// 12 cube faces of quads(squares)
	// 2 x 6( front , back , top , bottom , right , left )
	// each quad has two opengl faces 
	// so we need 2 x 12 x 3verts colours
	// 72
	var pallete = [
		[ 0.1 , 0.1 , 0.8 , 1.0 ] // front

		, [ 0.6 , 0.0 , 0.6 , 1.0 ] // back

		, [ 0.6 , 0.0 , 0.0 , 1.0 ] // top

		, [ 0.1 , 0.1 , 0.1 , 1.0 ] // bottom

		, [ 0.1 , 0.9 , 0.9 , 1.0 ] // right

		, [ 0.1 , 0.6 , 0.1 , 1.0 ] // left
	];

	var fragments = dataUtil.mk_coloursBy_repeat( 6 , pallete );

	this.get_vertices = function (){ return vertices; };
	this.get_fragments = function (){ return fragments; };
};

