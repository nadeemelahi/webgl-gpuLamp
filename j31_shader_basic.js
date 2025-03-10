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
// .pointSize:"25.0"
// .vs
// .fs
// .compile()
// .load_program()
// .load_pointSize()
// .load_vf()

ngl.shader_basic = {

	aout : null

	, pointSize : "25.0" // default size

	, vs : document.getElementById( "vs_basic" ).textContent
	, fs : document.getElementById( "fs_basic" ).textContent

	, compile : function (){

		this.aout = ngl.compile( this.vs , this.fs );
	}

	, use_program : function (){

		ngl.gl.useProgram( this.aout );
		// load a default pointSize
		this.load_pointSize(this.pointSize);

	}

	, load_pointSize : function ( pointSize ) {
		// must be named "pointSize"

		ngl.load_fl( 
			this.aout
			, "pointSize"
			, pointSize
		);
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
};

