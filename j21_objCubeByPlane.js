
/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Jan 2025
 */

"use strict";

// nadeem's graphic library
var cubeByOnePlane = new function(){
	// REQUIRES dataUtil{}

	// 2 x 6( front , back , top , bottom , right , left )

	// 8 corners - 4 front + 4 back
	
	var corners = [ 

		   [ -1.0 , -1.0 ,  0.0  , 1.0 ]

		,  [  1.0 , -1.0 ,  0.0  , 1.0 ]

		,  [  1.0 ,  1.0 ,  0.0  , 1.0 ]

		,  [ -1.0 ,  1.0 ,  0.0  , 1.0 ]
	];

	var indicesFront = [

		[ 0 , 1 , 2 ]

		, [ 0 , 2 , 3 ]
	];

	function mkFaceArray( vertices , indices ) {
		// ex indices = [ 0 1 2 ]
		// vertices[0].concat( vertices[1] ).concat( vertices[2] );
		return ( 
			( 
				vertices[ indices[0] ]
			).concat(
				vertices[ indices[1] ]
			).concat(
				vertices[ indices[2] ]
			)
		);
	}

	//var cube012 = corners[0].concat( corners[1] ).concat( corners[2] );
	//var cube023 = corners[0].concat( corners[2] ).concat( corners[3] );
	var cube012 = mkFaceArray( corners , [ 0 , 1 , 2 ] );
	var cube023 = mkFaceArray( corners , [ 0 , 2 , 3 ] );

	var cube_front = cube012.concat( cube023 )

		, cube_back = []
		, cube_right = []
		, cube_left = []
		, cube_top = []
		, cube_bottom = []
	;

	dataUtil.arrayCpy_src_dst( cube_front , cube_back );
	dataUtil.arrayCpy_src_dst( cube_front , cube_right );
	dataUtil.arrayCpy_src_dst( cube_front , cube_left );
	dataUtil.arrayCpy_src_dst( cube_front , cube_top );
	dataUtil.arrayCpy_src_dst( cube_front , cube_bottom );

	// seems to not matter, might in the future
	//dataUtil.flip_winding( cube_back ) ;

	//dataUtil.set_z( cube_front , -1.0 ) ;

	var translate_x
		, translate_y
		, translate_z
		, rotate_x
		, rotate_y
		, rotate_z
	;

	// front: move to near to z = -1
	translate_z = mat4x4.genTranslation( 0 , 0 ,-1 );
	mat4x4.multiply_1x4_by_4x4( cube_front, translate_z );

	// back: move to far to z = 1 
	translate_z = mat4x4.genTranslation( 0 , 0 , 1 );
	mat4x4.multiply_1x4_by_4x4( cube_back, translate_z );

	// right side
	// rotate -90 so outside faces right by the left hand rule
	rotate_y = mat4x4.genRotateAboutY( -90 );
	mat4x4.multiply_1x4_by_4x4( cube_right, rotate_y );
	// move to the right
	translate_x = mat4x4.genTranslation( 1 , 0 , 0 );
	mat4x4.multiply_1x4_by_4x4( cube_right, translate_x );

	// left side
	// move to the left 
	rotate_y = mat4x4.genRotateAboutY( 90 );
	mat4x4.multiply_1x4_by_4x4( cube_left , rotate_y );
	translate_x = mat4x4.genTranslation( -1 , 0 , 0 );
	mat4x4.multiply_1x4_by_4x4( cube_left , translate_x );

	// top
	rotate_y = mat4x4.genRotateAboutY( 90 );
	mat4x4.multiply_1x4_by_4x4( cube_top, rotate_y );
	// it is facing left now
	
	rotate_z = mat4x4.genRotateAboutZ( -90 );
	mat4x4.multiply_1x4_by_4x4( cube_top, rotate_z );
	// it is face up now

	translate_y = mat4x4.genTranslation( 0 , 1 , 0 );
	mat4x4.multiply_1x4_by_4x4( cube_top , translate_y );

	// bottom
	rotate_y = mat4x4.genRotateAboutY( 90 );
	mat4x4.multiply_1x4_by_4x4( cube_bottom , rotate_y );
	// it is facing left now
	
	rotate_z = mat4x4.genRotateAboutZ( 90 );
	mat4x4.multiply_1x4_by_4x4( cube_bottom , rotate_z );
	// it is face down now

	translate_y = mat4x4.genTranslation( 0 , -1 , 0 );
	mat4x4.multiply_1x4_by_4x4( cube_bottom , translate_y );


	var cube = cube_front
		.concat( cube_back )
		.concat( cube_right ) 
		.concat( cube_left ) 
		.concat( cube_top ) 
		.concat( cube_bottom ) 
	;

	var palette = [
		[ 0.1 , 0.1 , 0.8 , 1.0  ]
		, [ 0.1 , 0.1 , 0.5 , 1.0  ]
		, [ 0.1 , 0.9 , 0.1 , 1.0  ]
		, [ 0.4 , 0.9 , 0.4 , 1.0  ]
		, [ 0.8 , 0.1 , 0.1 , 1.0  ]
		, [ 0.5 , 0.1 , 0.1 , 1.0  ]

	];

	var vertices = cube ;
	var fragments = dataUtil.mk_coloursBy_repeat( 6 , palette ) ;

	this.get_vertices = function (){ return vertices; };
	this.get_fragments = function (){ return fragments; };
};

