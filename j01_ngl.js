
/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Feb 2025
 */

"use strict";
//
//ngl.cnv
//ngl.gl
//ngl.windowResizeHandler() 
//ngl.init(canvas_id)
//ngl.compile(vs,fs)
//ngl.load_program(aout)
//.load_data(aout,name,data,dim)
//.load_f1(aout,name,fl)
//.load_mat(aout,name,mat4)
//.load_image(image)

// nadeem's graphic library
var ngl = {

	cnv : null

	, gl : null

	, windowResizeHandler: function(){

		ngl.cnv.width = window.innerWidth;
		ngl.cnv.height = window.innerHeight;

		ngl.gl.viewport( 0 , 0 , window.innerWidth , window.innerHeight );
	}

	, init : function ( canvas_id ) {

		this.cnv = document.getElementById( canvas_id );

		if ( !this.cnv ) {
			console.log("ERROR: Canvas node by id: " + canvas_node + " not found" );

		} else {

			this.gl = this.cnv.getContext('webgl');

			if ( !this.gl) { 

				console.log("ERROR: Your browser does not support webgl");
			} else { 

				window.addEventListener("resize" , ngl.windowResizeHandler, false);
				this.windowResizeHandler();
			}
		} 

		// IMPORTANT 
		this.gl.enable(this.gl.DEPTH_TEST); 
	}

	, compile : function( vs , fs ) {

		var gl = this.gl
			, vs_src , fs_src 
			, aout
		;

		vs_src = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource( vs_src , vs );
		gl.compileShader( vs_src );

		fs_src = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource( fs_src , fs );
		gl.compileShader( fs_src );

		aout = gl.createProgram();

		gl.attachShader(aout, vs_src);
		gl.attachShader(aout, fs_src);

		// TODO possibly move to .load_program
		gl.linkProgram( aout );

		return aout;
	}

	// TODO possibly delete
	// because moved to shaders 
	, use_program : function( aout ){
		//this.gl.linkProgram( aout );
		this.gl.useProgram( aout );
	}
	

	, load_data : function ( aout , name , data , dim ) {
		var gl = this.gl;
		
		// transfer data to gpu
		gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer() );
		gl.bufferData(gl.ARRAY_BUFFER , data , gl.STATIC_DRAW);

		// ---------point attribute location
		var ptr = gl.getAttribLocation( aout , name ) ;

		gl.vertexAttribPointer(ptr
			, dim 
			, gl.FLOAT,false,0,0
		)
		gl.enableVertexAttribArray(ptr);

		// unbind
		gl.bindBuffer(gl.ARRAY_BUFFER,null);

	}

	, load_fl : function( aout , name , fl ){
		var ptr = this.gl.getUniformLocation( aout , name );
		this.gl.uniform1f( ptr , fl );
	}

	, load_mat : function( aout , name , mat4 ){
		var ptr = this.gl.getUniformLocation ( aout , name );
		this.gl.uniformMatrix4fv( ptr, false, mat4 );
	}

	, load_image : function( image ){

		var gl = this.gl;
		// Create a texture.
		gl.bindTexture(gl.TEXTURE_2D, gl.createTexture() );

		// Set the parameters so we can render any size image.
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

		// Upload the image into the texture.
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

		//gl.bindTexture(gl.TEXTURE_2D, null);// DO NOT UNBIND 
	}

	
	
	//gl.clear( gl.COLOR_BUFFER_BIT ); // does not really do anything // css sets the background colour
	//, configureDraw : function( ){
		//gl.clearColor( red , green , blue , opacity );
		//gl.enable(gl.DEPTH_TEST); 
		//gl.viewport( 0 , 0   , window.innerWidth   , window.innerHeight );
	//};
	
	// set lineWidth
	//this.gl.lineWidth( width );
};
