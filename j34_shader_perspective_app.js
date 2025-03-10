
new function(){

	ngl.init( "fsCanvas" ) ;

	var shader = ngl.shader_perspective;


	shader.compile();
	shader.load_program();


	var verts, frags, vertices, fragments;

	function allocateFloats(){

		vertices = dataUtil.allocateFloats( verts );
		fragments = dataUtil.allocateFloats( frags );
	}

	function loadData(){

		shader.load_vertices( vertices );
		shader.load_fragments( fragments );
	}
	

	// 
	//
	//
	// points
	verts = [  // left , top
		-1.0  ,  1.0  ,  -1.0  ,  1.0
	];

	frags = [
		1.0 , 0.0 , 1.0 , 1.0
	];

	allocateFloats();
	loadData();
	
	shader.load_pointSize("100.0");
	shader.draw_points();
	

	// 
	//
	//
	// lines
	verts = [  // left , top
		-1.0  ,  -1.0  ,  -1.0  ,  1.0
		// right bottom
		 , 1.0  ,  -1.0  , -1.0  ,  1.0
	];

	frags = [
		0.0 , 1.0 , 1.0 , 1.0
		, 1.0 , 1.0 , 0.0 , 1.0
	];

	allocateFloats();
	loadData();

	ngl.gl.lineWidth("10.0"); // max 10
	
	shader.draw_lines();


	// 
	//
	//
	// triangles

	var sc = 0.2;

	var cubeVerts = cube.get_vertices()
		, cubeFrags = cube.get_fragments()
	;
	dataUtil.scale_xyz( cubeVerts , sc , sc , sc );
	var cubeVertices = dataUtil.allocateFloats( cubeVerts )
		, cubeFragments = dataUtil.allocateFloats( cubeFrags )
	;
	//
	//
	var pyramidVerts = equilateralPyramid.get_vertices()
		, pyramidFrags = equilateralPyramid.get_fragments()
	;
	dataUtil.scale_xyz( pyramidVerts , sc , sc , sc );
	var pyramidVertices = dataUtil.allocateFloats( pyramidVerts )
		, pyramidFragments = dataUtil.allocateFloats( pyramidFrags )
	;
	//
	//
	var pointedVerts = pointedCube.get_vertices()
		, pointedFrags = pointedCube.get_fragments()
	;
	dataUtil.scale_xyz( pointedVerts, sc , sc , sc );
	var pointedVertices = dataUtil.allocateFloats( pointedVerts )
		, pointedFragments = dataUtil.allocateFloats( pointedFrags )
	;

	
	var yAngle = 80, step = 5, lim = 355;

	function animate(){


		shader.load_vertices( cubeVertices );
		shader.load_fragments( cubeFragments );

		shader.load_loc_xyz( -0.9 , -0.9 , 0.0);
		shader.load_angle_xyz( 0.0 , yAngle , 0.0);
		shader.draw_triangles();

		shader.load_loc_xyz( -0.9 ,  0.9 , 0.0);
		shader.load_angle_xyz( 0.0 , yAngle , 0.0);
		shader.draw_triangles();

		//
		//
	
		shader.load_vertices( pyramidVertices );
		shader.load_fragments( pyramidFragments );

		shader.load_loc_xyz( 0.9 , -0.9 , 0.0);
		shader.load_angle_xyz( 0.0 , yAngle , 0.0);
		shader.draw_triangles();
		
		shader.load_loc_xyz( 0.9 , 0.9 , 0.0);
		shader.load_angle_xyz( 0.0 , yAngle , 0.0);
		shader.draw_triangles();
	
	
		shader.load_vertices( pointedVertices );
		shader.load_fragments( pointedFragments );

		shader.load_loc_xyz( 0.2 , -0.9 , 0.0);
		shader.load_angle_xyz( 0.0 , yAngle , 0.0);
		shader.draw_triangles();
		
		shader.load_loc_xyz( 0.2 , 0.9 , 0.0);
		shader.load_angle_xyz( 0.0 , yAngle , 0.0);
		shader.draw_triangles();
	


		yAngle += step;
		if ( yAngle > lim ) yAngle = 0;

		setTimeout( animate , 100 );
	}

	animate();


};
