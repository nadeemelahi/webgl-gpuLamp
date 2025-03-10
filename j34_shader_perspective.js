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
// .vs
// .fs
// .nm["pointSize", ...]
// .compile()
// .use_program()
// 
// .load
// 	.pointSize ( pointSize ) 
// 	.uniform ( name , data ) // called internally 
// 	.vertices ( vertices ) 
// 	.fragment ( fragments ) 
// 	.angle_xyz
// 	.loc_xyz
// .draw
// 	.draw_type ( type ) // called internally
// 	.triangles ()
// 	.lines ()
// 	.points ()
//
// .writeShaders()
//   -- called from .compile()
ngl.shader_perspective = {

	aout : null

	, vs : null
	, fs : null

	, nm : [
		"pointSize"				// 0
		, "vertex" , "fragment" , "v_fragment"   // 1 2 3

		, "x_angle" , "y_angle" , "z_angle" 	// 4 5 6 
		, "x_loc"   , "y_loc"   , "z_loc"	// 7 8 9 

	]
	, compile : function (){
		
		this.writeShaders();

		this.aout = ngl.compile( this.vs , this.fs );

		// inheritance pass on to .load{} child obj:
		this.load.nm = this.nm ;
		this.load.aout = this.aout ;
	}

	, use_program : function (){

ngl.gl.useProgram( this.aout );

		// load a defaults 
		this.load.pointSize( "25.0" ) ;
		this.load.angle_xyz( 0.0 , 0.0 , 0.0 ) ;
		this.load.loc_xyz( 0.0 , 0.0 , 0.0 ) ;

	}

	, load : {

		// inherited
		nm : null , aout : null

		,  uniform : function 

		( name , data ) {

			ngl.load_fl( this.aout , name , data ) ;
		}

		, pointSize : function 

		( pointSize ) {
			// must be named nm[0] "pointSize"
			this.uniform ( this.nm[0] , pointSize ) ;
		}

		, vertices : function 

		( vertices) {

			ngl.load_vf.load_vertices(
				this.aout
				, vertices
			)
		}

		, fragments : function 

		( fragments ) {

			ngl.load_vf.load_fragments(
				this.aout
				, fragments 
			)
		}

		, angle_xyz : function 

		( x_angle , y_angle , z_angle ) {

			this.uniform ( this.nm[4] , x_angle ) ;
			this.uniform ( this.nm[5] , y_angle ) ;
			this.uniform ( this.nm[6] , z_angle ) ;
		}

		, loc_xyz : function 

		( x_loc , y_loc , z_loc ) {

			this.uniform ( this.nm[7] , x_loc ) ;
			this.uniform ( this.nm[8] , y_loc ) ;
			this.uniform ( this.nm[9] , z_loc ) ;

		}
	}

	
	, draw : {

		draw_type : function 

		( type ) {

			ngl.gl.drawArrays(
				type
				, 0
				, ngl.load_vf.cnt
			);
		}
		, triangles : function () {

			this.draw_type( ngl.gl.TRIANGLES ) ;
		
		}

		, lines : function () {

			this.draw_type( ngl.gl.LINES) ;
		}

		, points : function () {

			this.draw_type( ngl.gl.POINTS) ;
		}

	}

	, writeShaders : function 

	() {

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

			+ "; float perspective " 
			+ "; varying float v_alpha" 

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


		// [ near , far ]
		// [ -1 , 0 , 1 ] -> [ 1 , 0.5 , 0 ]
			+ "; 	perspective = ( 1.0 - position.z ) / 2.0 " 

			+ ";	position.w = 1.0 / perspective "  

			+ ";	gl_PointSize = " + nm[0]

			+ ";	gl_Position = position " 

			+ "; 	" + nm[3] + " = " + nm[2]  // varying vfragment
			+ "; 	v_alpha = perspective " // [ 1 , 0.5 , 0 ]

			+ ";" 
			+ "}" 
		;


		this.fs =  "precision mediump float"

			+ ";varying vec4 " + nm[3] 
			+ ";varying float v_alpha"

			+ "; void main(void){ "

			+ " 	float red = " + nm[3] + ".r" 
			+ "; 	float green = " + nm[3] + ".g" 
			+ "; 	float blue = " + nm[3] + ".b" 

			+ "; 	float alpha = v_alpha / 2.0 " // RANGE [near,far] = [0,1] to [1,0] 
		// so that nearest closes is brighted

			+ ";	gl_FragColor = vec4( red , green , blue , alpha ) "
		//+ "	gl_FragColor = " + nm[3]
			+ ";" 
			+ "} "
		;
	}
};

