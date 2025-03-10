
/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Jan 2025
 */

"use strict";
var dataUtil = {

	vertsByIndices : function

	( vout , vin , indices ) {
		// see j23_pointedCube for sample usage

		var idx , jdx , kdx
			, dim_v = 4 // verts xyzw
			, dim_i = 3 // indices - 3 vert faces
			, len_v = vin.length 
			, len_i = indices.length 
			, vdx
		;

		for ( idx = 0 ; idx < len_i ; idx ++ ) {
			// loop over indices[idx][ ]

			for ( jdx = 0 ; jdx < dim_i; jdx ++ ) {
				// loop over indices[idx][jdx]

				for ( kdx = 0 ; kdx < dim_v; kdx ++ ) {
					// loop over each verts and copy xyzw

					vdx = indices[idx][jdx]

					vout.push( vin[ vdx ][ kdx ] );


				}
			}
		}

	} 


	, scale_xyz : function 

	( verts , sx , sy , sz ) {

		var idx , len = verts.length ;

		for ( idx = 0 ; idx < len ; idx += 4 ) {

			verts[idx    ] *= sx ;
			verts[idx + 1] *= sy ;
			verts[idx + 2] *= sz ;
		}
	} 

	, set_z : function 

	( verts , z_update ) {

		var idx , len = verts.length ;

		for ( idx = 0 ; idx < len ; idx += 4 ) {

			verts[ idx + 2 ] = z_update ;

		}
	} 

	, arrayCpy_src_dst : function 

	( src , dst ) {

		var idx , len = src.length;

		for ( idx = 0 ; idx < len ; idx ++ ) {

			dst[idx] = src[idx]

		}
	}

	, allocateFloats : function

	( data ) {

		var idx , len = data.length
			, dataFloat = new Float32Array( len ) ;

		for ( idx = 0 ; idx < len ; idx ++ ) {

			dataFloat[ idx ] = data [idx] ;
		}
		return dataFloat ;
	} 

	, mk_coloursBy_repeat : function

	( repeat , pallete ){

		var idx , jdx , kdx 
			, cnt = pallete.length
			, dim = 4 // 4 : red green blue opacity
			, total = cnt * repeat * dim 
			, fdx = 0
		;

		var data = []; // size total

		for ( idx = 0 ; idx < cnt; idx ++ ) {
			// each colour
			for ( jdx = 0 ; jdx < repeat ; jdx ++ ) {
				// 3 verts per face
				for ( kdx = 0 ; kdx < dim; kdx ++ ) {
					// red , green , blue , opacity
					data[ fdx ] = pallete[idx][kdx];
					fdx ++;
				}

			}
		}

		return data;
	}


	, mk_shuffle_120_201 : function 

	( verts , shfl_a , shfl_b ) {

		var idx 
			, step = 4*3
			, len = verts.length 
		;

		for ( idx = 0 ; idx < len ; idx += step ) {
			// 012 -> 120 
			// 012 -> 201 
			//
			// 012
			// ---
			// 0: 0 1 2 3
			// 1: 4 5 6 7
			// 2: 8 9 10 11
			//
			// shuffle 120
			// ---
			// 0: 1: 4 5 6 7
			// 1: 2: 8 9 10 11
			// 2: 0: 0 1 2 3
			//
			// shuffle 201
			// ---
			// 0: 2: 8 9 10 11
			// 1: 0: 0 1 2 3
			// 2: 1: 4 5 6 7

			// shuffle 120
			// 0: 4 5 6 7
			shfl_a[ idx + 0 ] = verts[ idx + 4] ;
			shfl_a[ idx + 1 ] = verts[ idx + 5 ] ;
			shfl_a[ idx + 2 ] = verts[ idx + 6 ] ;
			shfl_a[ idx + 3 ] = 1.0 ;

			// shuffle 120
			// 1: 8 9 10 11
			shfl_a[ idx + 4 ] = verts[ idx + 8 ] ;
			shfl_a[ idx + 5 ] = verts[ idx + 9 ] ;
			shfl_a[ idx + 6 ] = verts[ idx + 10 ] ;
			shfl_a[ idx + 7 ] = 1.0 ;
			
			// shuffle 120
			// 2: 0 1 2 3
			shfl_a[ idx + 8 ] = verts[ idx + 0 ] ;
			shfl_a[ idx + 9 ] = verts[ idx + 1 ] ;
			shfl_a[ idx + 10 ] = verts[ idx + 2 ] ;
			shfl_a[ idx + 11 ] = 1.0 ;

			///////////////////////////////////

			// shuffle 201
			// 0: 8 9 10 11
			shfl_b[ idx + 0 ] = verts[ idx + 8 ] ;
			shfl_b[ idx + 1 ] = verts[ idx + 9 ] ;
			shfl_b[ idx + 2 ] = verts[ idx + 10 ] ;
			shfl_b[ idx + 3 ] = 1.0 ;

			// shuffle 201
			// 1: 0 1 2 3
			shfl_b[ idx + 4 ] = verts[ idx + 0 ] ;
			shfl_b[ idx + 5 ] = verts[ idx + 1 ] ;
			shfl_b[ idx + 6 ] = verts[ idx + 2 ] ;
			shfl_b[ idx + 7 ] = 1.0 ;
			
			// shuffle 201
			// 2: 4 5 6 7
			shfl_b[ idx + 8 ] = verts[ idx + 4 ] ;
			shfl_b[ idx + 9 ] = verts[ idx + 5 ] ;
			shfl_b[ idx + 10 ] = verts[ idx + 6 ] ;
			shfl_b[ idx + 11 ] = 1.0 ;

		}

	}

	, flip_winding : function 

	( verts ) {

		var idx 
			, step = 4*3
			, len = verts.length 
			, tmp = [] 
		;

		for ( idx = 0 ; idx < len ; idx += step ) {
			// 012 -> 021
			// 0: 0 1 2 3
			// 1: 4 5 6 7
			// 2: 8 9 10 11
			// FLIPPED
			// 0: 0 1 2 3
			// 1: 8 9 10 11
			// 2: 4 5 6 7

			tmp[0] = verts[ idx + 4 ];
			tmp[1] = verts[ idx + 5 ];
			tmp[2] = verts[ idx + 6 ];
			tmp[3] = verts[ idx + 7 ];

			verts[ idx + 4 ] = verts[ idx + 8 ];
			verts[ idx + 5 ] = verts[ idx + 9 ];
			verts[ idx + 6 ] = verts[ idx + 10 ];
			verts[ idx + 7 ] = verts[ idx + 11 ];

			verts[ idx + 8 ] = tmp[0];
			verts[ idx + 9 ] = tmp[1];
			verts[ idx + 10 ] = tmp[2];
			verts[ idx + 11 ] = tmp[3];

		}

	}





	, print_by_4 : function

	( data ){

		var idx 
			, dim = 4 
			, size = data.length;

		for ( idx = 0 ; idx < size ; idx += dim ) {
			console.log( "idx: " + idx
				, data[idx ] 
				, data[idx + 1 ] 
				, data[idx + 2 ] 
				, data[idx + 3 ] 
			);
		}
	}
};




