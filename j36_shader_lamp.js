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
// ngl.shader_lamp
// .aout
// .vs
// .fs
// .compile()
// .use_program()
// 
// .load
// 	.aout // inheritied
// 	.dim : 4
// 	.uniform ( name , data ) // called internally 
// 	.attribute ( name , data ) // called internally
// 	.pointSize ( pointSize ) 
// 	.vertices_3 ( vertices ) 
// 	.fragments ( fragments ) 
// 	.angle_xyz
// 	.loc_xyz
// .draw
// 	.cnt
// 	.draw_type ( type ) // called internally
// 	.triangles ()
// 	.lines ()
// 	.points ()
//
// .writeShaders()
//   -- called from .compile()
ngl.shader_lamp = {

	aout : null

	, vs : document.getElementById("vs_lamp").textContent  
	, fs : document.getElementById("fs_lamp").textContent

	, compile : function (){
		
		this.aout = ngl.compile( this.vs , this.fs );

		// inheritance pass on to .load{} child obj:
		this.load.aout = this.aout ;

		// reference draw{} from load{} 
		// so it can write draw.cnt
		this.load.draw = this.draw ;
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
		aout : null

		, dim : 4

		// internal
		,  uniform : function ( name , data ) {

			ngl.load_fl( 
				this.aout , 
				name , 
				data 
			) ;
		}

		// internal
		, attribute : function ( name , data ) {

			this.draw.cnt = data.length / this.dim;

			ngl.load_data(
				this.aout , 
				name , 
				data , 
				this.dim
			);
		}

		, pointSize : function ( size  ) {

			this.uniform ( "pointSize" , size ) ;
		}

		, vertices_3: function 

		( v012 , v120 , v201 ) {

			this.attribute ( "vertex012" , v012 ) ;
			this.attribute ( "shufle120" , v120 ) ;
			this.attribute ( "shufle201" , v201 ) ;


		}

		, fragments : function 

		( frag ) {

			this.attribute ( "fragment" , frag ) ;
			
		}

		, angle_xyz : function 

		( x_angle , y_angle , z_angle ) {

			this.uniform ( "x_angle" , x_angle ) ;
			this.uniform ( "y_angle" , y_angle ) ;
			this.uniform ( "z_angle" , z_angle ) ;
		}

		, loc_xyz : function 

		( x_loc , y_loc , z_loc ) {

			this.uniform ( "x_loc" , x_loc ) ;
			this.uniform ( "y_loc" , y_loc ) ;
			this.uniform ( "z_loc" , z_loc ) ;

		}
	}

	
	, draw : {

		cnt : null

		, draw_type : function 

		( type ) {

			ngl.gl.drawArrays(
				type
				, 0
				, this.cnt
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

};

