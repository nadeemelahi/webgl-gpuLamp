
new function(){

	ngl.init( "fsCanvas" ) ;


	ngl.shader_basic.compile();
	ngl.shader_basic.load_program();


	var verts, frags, vertices, fragments;

	function allocateFloats(){

		vertices = dataUtil.allocateFloats( verts );
		fragments = dataUtil.allocateFloats( frags );
	}

	function loadData(){

		ngl.shader_basic.load_vertices( vertices );
		ngl.shader_basic.load_fragments( fragments );
	}

	verts = [ 

		-1.0  ,  -1.0  ,  0.0  ,  1.0
		, 1.0  , -1.0  ,  0.0  ,  1.0
		, 1.0  ,  1.0  ,  0.0  ,  1.0
	];

	frags = [

		1.0 , 0.0 , 0.0 , 1.0
		, 0.0 , 1.0 , 0.0 , 1.0
		, 0.0 , 0.0 , 1.0 , 1.0

	];


	// triangles
	var sc = 0.2;

	dataUtil.scale_xyz( verts , sc , sc , sc );
	
	allocateFloats();
	loadData();

	ngl.shader_basic.draw_triangles();
	

	// points
	verts = [  // left , top
		-1.0  ,  1.0  ,  0.0  ,  1.0
	];

	frags = [
		1.0 , 0.0 , 1.0 , 1.0
	];

	allocateFloats();
	loadData();
	
	ngl.shader_basic.load_pointSize("100.0");
	ngl.shader_basic.draw_points();
	

	// lines
	verts = [  // left , top
		-1.0  ,  1.0  ,  0.0  ,  1.0
		// right bottom
		 , 1.0  ,  -1.0  ,  0.0  ,  1.0
	];

	frags = [
		0.0 , 1.0 , 1.0 , 1.0
		, 1.0 , 1.0 , 0.0 , 1.0
	];

	allocateFloats();
	loadData();

	ngl.gl.lineWidth("10.0"); // max 10
	
	ngl.shader_basic.draw_lines();

}
