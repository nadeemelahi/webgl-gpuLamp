
/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Jan 2025
 */

"use strict";

// nadeem's graphic library
var equilateralPyramid = new function(){
	function d2r(degrees) { return degrees * (3.14156/180); }
	// verts by indices
	var dim = 4,
		indexA = [ 1 , -1 , 0 ]
		, indexB = [ Math.cos(d2r(120)) , -1 , Math.sin(d2r(120)) ]
		, indexC = [ Math.cos(d2r(240)) , -1 , Math.sin(d2r(240)) ]
		, indexD = [ 0 , 1 , 0 ]
	;

	this.get_vertices = function (){
		return [
			// base: acb
			indexA[0] , indexA[1] , indexA[2] , 1
			, indexC[0] , indexC[1] , indexC[2] , 1
			, indexB[0] , indexB[1] , indexB[2] , 1

			// 1: abd
			, indexA[0] , indexA[1] , indexA[2] , 1
			, indexB[0] , indexB[1] , indexB[2] , 1
			, indexD[0] , indexD[1] , indexD[2] , 1

			// 2: b,c,d
			, indexB[0] , indexB[1] , indexB[2] , 1
			, indexC[0] , indexC[1] , indexC[2] , 1
			, indexD[0] , indexD[1] , indexD[2] , 1

			// 3: c,a,d
			, indexC[0] , indexC[1] , indexC[2] , 1
			, indexA[0] , indexA[1] , indexA[2] , 1
			, indexD[0] , indexD[1] , indexD[2] , 1
		];
	};

	this.get_fragments = function (){
		return [
			// base a,b,c -- dark gray
			0.1   ,   0.1   ,   0.1  , 1.0      
			, 0.1   ,   0.1   ,   0.1  , 1.0     
			, 0.1   ,   0.1   ,   0.1  , 1.0      


			// 1: abd
			,  1.0   ,   0.0   ,   0.0  , 1.0     // red   
			,  1.0   ,   0.0   ,   0.0  , 1.0      // red  
			,  1.0   ,   0.0   ,   0.0  , 1.0     // red 

			// 2: b,c,d
			,  0.0   ,   1.0   ,   0.0  , 1.0      // green
			,  0.0   ,   1.0   ,   0.0  , 1.0      // green
			,  0.0   ,   1.0   ,   0.0  , 1.0      // green

			// 3: c,a,d
			,  0.0   ,   0.0   ,   1.0  , 1.0      // blue
			,  0.0   ,   0.0   ,   1.0  , 1.0      // blue
			,  0.0   ,   0.0   ,   1.0  , 1.0      // blue
		];
	};
};

