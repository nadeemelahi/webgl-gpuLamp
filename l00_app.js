
"use strict;"
new function(){

	ngl.init( "fsCanvas" ) ;

	//console.log( ngl.gl.getParameter( ngl.gl.MAX_VERTEX_ATTRIBS ) ); // 16

	var shader = ngl.shader_lamp;
	shader.compile();
	shader.use_program();


	// verts , scale ,  vertices - floats
	var verts = equilateralPyramid.get_vertices()
		, sc = 0.5 // scale
	;
	dataUtil.scale_xyz ( verts , sc , sc , sc ) ;

	var shufle120 = [] , shufle201 = [] ;
	dataUtil.mk_shuffle_120_201( verts , shufle120 , shufle201 )
	vertex012 = dataUtil.allocateFloats( verts );
	shufle120 = dataUtil.allocateFloats( shufle120 );
	shufle201 = dataUtil.allocateFloats( shufle201 );


	// frags , fragments - floats 
	var frags = equilateralPyramid.get_fragments();
	fragments = dataUtil.allocateFloats( frags );

	var rot = 0 
		, step = 5 
		, lim = 355 
	;

	function draw () {

		shader.load.vertices_3 ( vertex012 , shufle120 , shufle201 ) ;


		shader.load.fragments ( fragments ) ;

		shader.load.angle_xyz( 0 , rot , 0 ) ;

		shader.draw.triangles();


		rot += step;
		if ( rot > lim ) rot = 0;

		setTimeout ( draw , 100 )

	}

	draw();
}
