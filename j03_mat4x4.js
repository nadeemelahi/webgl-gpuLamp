
/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Jan 2025
 */

"use strict";
// matrix generator - data
// matrix operations - multiplication
// COLUMN MAJOR MATRIX LAYOUT CONVENTION REQUIRED
var mat4x4 = new function(){

	function cos_d2r(degrees){ return Math.cos(degrees*3.1416/180); }
	function sin_d2r(degrees){ return Math.sin(degrees*3.1416/180); }

	this.print4x1 = function ( vec ) {
		// 4 rows 1 column , column vector , { xyzw }

		var idx  
			, dim = 4 
			, lim = vec.length 
		;

		for ( idx = 0 ; idx < lim ; idx += dim ) {

			console.log ( 
				( vec [ idx ] ).toFixed(2) 
				+ "  " 
				+ ( vec [ idx + 1 ] ).toFixed(2) 
				+ "  " 
				+ ( vec [ idx + 2 ] ).toFixed(2) 
				+ "  " 
				+ ( vec [ idx + 3 ] ).toFixed(2) 
				+ "  " 
			);
		}
	};

	this.print4x4 = function ( mat ) {
		var idx , inc = 4 , lim = 16 ;

		for ( idx = 0 ; idx < lim ; idx += inc ) {

			console.log(
				( mat[idx] ).toFixed(2) + "  " +
				( mat[idx + 1] ).toFixed(2) + "  " +
				( mat[idx + 2] ).toFixed(2) + "  " +
				( mat[idx + 3] ).toFixed(2) + "  " 
			);

		}
	};

	this.genTranslation = function(tx,ty,tz){
		return [
			1.0 , 0.0 , 0.0 , 0.0 ,
			0.0 , 1.0 , 0.0 , 0.0 ,
			0.0 , 0.0 , 1.0 , 0.0 ,
			tx  , ty  , tz  , 1.0
		];
	};

	this.genRotateAboutX = function(degrees){
		var cos = cos_d2r(degrees);
		var sin = sin_d2r(degrees);

		return [
			1.0  ,  0.0  ,  0.0  ,  0.0  ,
			0.0  ,  cos  ,  sin  ,  0.0  ,
			0.0  , -sin  ,  cos  ,  0.0  ,
			0.0  ,  0.0  ,  0.0  ,  1.0
		];
	};

	this.genRotateAboutY = function(degrees){
		var cos = cos_d2r(degrees);
		var sin = sin_d2r(degrees);

		return [
			cos  ,  0.0  , -sin  ,  0.0  ,
			0.0  ,  1.0  ,  0.0  ,  0.0  ,
			sin  ,  0.0  ,  cos  ,  0.0  ,
			0.0  ,  0.0  ,  0.0  ,  1.0
		];
	};

	this.genRotateAboutZ = function(degrees){
		var cos = cos_d2r(degrees);
		var sin = sin_d2r(degrees);

		return [
			cos  ,  sin  ,  0.0  ,  0.0  ,
			-sin  ,  cos  ,  0.0  ,  0.0  ,
			0.0  ,  0.0  ,  1.0  ,  0.0  ,
			0.0  ,  0.0  ,  0.0  ,  1.0
		];
	};


	// row major 4x4 by 1x4
	// column major 1x4 by 4x4
	this.multiply_1x4_by_4x4 = function ( one , four ) {
		

		// row major 4x4_by_1x4 multiplication four x one
		// | 1  0  0  tx | | x | = x + tx
		// | 0  1  0  ty | | y | = y + ty
		// | 0  0  1  tz | | z | = z + tz
		// | 0  0  0  1  | | 1 | = 1

		// column major multiplication one x one
		//         x  y  z  1
		//  ------------------
		// | x | | 1  0  0  0 | = x*1 + y*0 + z*0 + tx = x + tx
		// | y | | 0  1  0  0 | = y*0 + y*1 + z*0 + ty = y + ty
		// | z | | 0  0  1  0 | = x*0 + y*0 + z*1 + tz = z + tz
		// | 1 | | tx ty tz 1 | = 1
		
		// column major tmp x four | t(1x4) x f(4x4)
		//         0   1   2   3
		//        ---------------
		// | t0 | f0  f1  f2  f3  | = t0*f0 + t1*f4 + t2*f8  + t3*f12  = one[0]
		// | t1 | f4  f5  f6  f7  | = t0*f1 + t1*f5 + t2*f9  + t3*f13  = one[1]
		// | t2 | f8  f9  f10 f11 | = t0*f2 + t1*f6 + t2*f10 + t3*f14  = one[2]
		// | t3 | f12 f13 f14 f15 | = t0*f3 + t1*f7 + t2*f11 + t3*f15  = one[3]
		// ...						   		...	
		// | t4 | f0  f1  f2  f3  | = t4*f0 + t5*f4 + t6*f8  + t7*f12  = one[4]
		// | t5 | f4  f5  f6  f7  | = t4*f1 + t5*f5 + t6*f9  + t7*f13  = one[5]
		// | t6 | f8  f9  f10 f11 | = t4*f2 + t5*f6 + t6*f10 + t7*f14  = one[6]
		// | t7 | f12 f13 f14 f15 | = t4*f3 + t5*f7 + t6*f11 + t7*f15  = one[7] 
		// ...								...
		// ...  t8 t9 t10 t11 ... t12 t13 t14 t15 ... t17 t18 t19 t20 ....
		// 
		// idx + jdx = 0: 0 1 2 3 , 4: 4 5 6 7 , 8: 8 9 10 11 
		// one[]          0 0 0 0 ,    1 1 1 1      2 2  2  2
		//
		// 
		//

		var idx , jdx , kdx 
			, dim = 4
			, len = one.length
			, tmp = []
		;

		for ( idx = 0 ; idx < len ; idx ++ ) {
			tmp[idx] = one[idx];
		}

		for ( idx = 0 ; idx < len ; idx += dim ) {
			// idx: 0 , 4 , 8 , 12 , 16 , 20 , 24...

			for ( jdx = 0 ; jdx < dim ; jdx ++ ) {
				// 
				//       idx = 0 0 0 0   4 4 4 4   8 8 8 8   12 12 12 12
				//       jdx = 0 1 2 3 , 0 1 2 3 , 0 1 2 3 , 0  1  2  3
				// idx + jdx = 0 1 2 3 , 4 5 6 7 , 8 ....
				// 

				//console.log("one[" + ( idx + jdx ) + "] = 0");
				one[ ( idx + jdx ) ] = 0
				//console.log("---");

				for ( kdx = 0 ; kdx < dim ; kdx ++ ) {

					//       jdx = 0 0 0 0  ,  1 1 1 1  ,  2 2 2 2  ,  3 3 3 3
					//   	 kdx = 0 1 2 3  ,  0 1 2 3  ,  0 1 2 3  ,  0 1 2 3
					// jdx * dim = 0 0 0 0  ,  4 4 4 4  ,  8 8 8 8 ... 12 12 12 12
					//     + kdx = 0 1 2 3     4 5 6 7 ... 15
					// kdx * dim = 0 4 8 12 x4
					
					//console.log( "one[" + (idx + jdx) + "]" );
					//console.log( "tmp[" + (idx + kdx) + "]");
					//console.log( "four[" + ( ( kdx * dim ) + jdx) + "]");
					
					one[ ( idx + jdx ) ] += tmp[ ( idx + kdx ) ] * four[ ( (kdx * dim) + jdx ) ] ;
					
					//console.log( "one[" + (idx + jdx) + "] = " + one[ ( idx + jdx ) ] );

					//console.log("---");

				}
				//console.log("-------------");
			}
			//console.log("-------------------------------------");

		}
	};
};
