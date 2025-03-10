/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Feb 2025 
 */

"use strict";
// REQUIRES
// ngl.load_vf
//
// ngl.shader_basic
// .aout
// .nm["pointSize", ...]
// .pointSize:"25.0"
// .vs
// .fs
// .compile()
// .load_program()
// .load_pointSize()
// .load_vf()
// .writeShaders()

ngl.shader_orthographic = {

	aout : null

	, pointSize : "25.0" // default size

	, vs : null
	, fs : null

	, nm : [
		"pointSize"		
		// 0
		, "vertex" , "fragment" , "v_fragment"   // 1 2 3

		, "x_angle" , "y_angle" , "z_angle" 	// 4 5 6 
		, "x_loc"   , "y_loc"   , "z_loc"	// 7 8 9 

	]
	, compile : function (){
		
		this.writeShaders();

		this.aout = ngl.compile( this.vs , this.fs );
	}

	, use_program : function (){

		ngl.gl.useProgram( this.aout );

		// load a defaults 
		this.load_pointSize(this.pointSize) ;
		this.load_angle_xyz( 0.0 , 0.0 , 0.0 ) ;
		this.load_loc_xyz( 0.0 , 0.0 , 0.0 ) ;

	}

	, load_uniform : function ( name , data ) {

		ngl.load_fl( this.aout , name , data ) ;
	}

	, load_pointSize : function ( pointSize ) {
		// must be named nm[0] "pointSize"
		this.load_uniform ( this.nm[0] , pointSize ) ;
	}

	, load_vertices : function ( vertices) {

		ngl.load_vf.load_vertices(
			this.aout
			, vertices
		)
	}

	, load_fragments : function ( fragments ) {

		ngl.load_vf.load_fragments(
			this.aout
			, fragments 
		)
	}

	, load_angle_xyz : function ( x_angle , y_angle , z_angle ) {

		this.load_uniform ( this.nm[4] , x_angle ) ;
		this.load_uniform ( this.nm[5] , y_angle ) ;
		this.load_uniform ( this.nm[6] , z_angle ) ;
	}

	, load_loc_xyz : function ( x_loc , y_loc , z_loc ) {

		this.load_uniform ( this.nm[7] , x_loc ) ;
		this.load_uniform ( this.nm[8] , y_loc ) ;
		this.load_uniform ( this.nm[9] , z_loc ) ;

	}

	, draw : function ( type ){
		// PRIVATE - DO NOT CALL EXTERNALLY

		ngl.gl.drawArrays(
			type
			, 0
			, ngl.load_vf.cnt
		);
	}

	, draw_triangles : function (){

		this.draw( ngl.gl.TRIANGLES ) ;
	}

	, draw_lines : function (){

		this.draw( ngl.gl.LINES ) ;
	}

	, draw_points : function (){

		this.draw( ngl.gl.POINTS ) ;
	}

	, writeShaders : function () {

		var nm = this.nm ;

		this.vs =  "uniform float " + nm[0]

			+ "; attribute vec4 " + nm[1] 
			+ "; attribute vec4 " + nm[2] 
			+ "; varying vec4 " + nm[3] 
		// angle 
			+ "; uniform float " + nm[4] 
			+ "; uniform float " + nm[5] 
			+ "; uniform float " + nm[6] 
		// translation
			+ "; uniform float " + nm[7] 
			+ "; uniform float " + nm[8] 
			+ "; uniform float " + nm[9] 

			+ "; void main(void){ "

			+ "  	float xAngleRadians = radians(" + nm[4] + ") "
			+ "; 	float cx = cos(xAngleRadians) "
			+ "; 	float sx = sin(xAngleRadians) "

			+ "; 	mat4 rotateX = mat4( "
			+ "		   1.0 , 0.0 , 0.0 , 0.0 "
			+ "		,  0.0 ,  cx ,  sx , 0.0 "
			+ "		,  0.0 , -sx ,  cx , 0.0 "
			+ "		,  0.0 , 0.0 , 0.0 , 1.0 "
			+ "	) "

			+ ";  	float yAngleRadians = radians(" + nm[5] + ") "
			+ "; 	float cy = cos(yAngleRadians) "
			+ "; 	float sy = sin(yAngleRadians) "

			+ "; 	mat4 rotateY = mat4( "
			+ "		   cy  , 0.0 , -sy  , 0.0 "
			+ "		,  0.0 , 1.0 ,  0.0 , 0.0 "
			+ "		,  sy  , 0.0 ,  cy  , 0.0 "
			+ "		,  0.0 , 0.0 ,  0.0 , 1.0 "
			+ "	) "

			+ ";  	float zAngleRadians = radians(" + nm[6] + ") "
			+ "; 	float cz = cos(zAngleRadians) "
			+ "; 	float sz = sin(zAngleRadians) "

			+ "; 	mat4 rotateZ = mat4( "
			+ "		   cz  ,  sz , 0.0 , 0.0 "
			+ "		, -sz  ,  cz , 0.0 , 0.0 "
			+ "		,  0.0 , 0.0 , 1.0 , 0.0 "
			+ "		,  0.0 , 0.0 , 0.0 , 1.0 "
			+ "	) "


			+ "; 	mat4 translation = mat4( " 
			+ "		      1.0      ,	0.0	,	 0.0 	 ,	0.0  "
			+ "		,     0.0      , 	1.0	,	 0.0 	 , 	0.0  "
			+ "		,     0.0      , 	0.0	,	 1.0 	 , 	0.0  "
			+ "		, " + nm[7] + ", "  + nm[8] + " , "  + nm[9] + " , 	1.0  "
			+ "	)  "

			+ "; 	mat4 rotation = rotateX * rotateY * rotateZ "
			+ "; 	mat4 rt = translation * rotation"

			+ ";	vec4 position = rt * " + nm[1] 

			+ ";	gl_PointSize = " + nm[0]

			+ ";	gl_Position = position " 

			+ "; 	" + nm[3] + " = " + nm[2]  // varying vfragment

			+ ";" 
			+ "}" 
		;


		this.fs =  "precision mediump float"

			+ ";varying vec4 " + nm[3] 

			+ "; void main(void){ "

			+ ";	gl_FragColor = " + nm[3]
			+ ";" 
			+ "} "
		;
	}
};

