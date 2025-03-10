
"use strict;"
// type: vec{ x,y,z }
// inherits from vecUtil
// vc_lamp { x,y,z } - vec3
// appl ( verts , frags )
var cpuLamp = {

	// inherited from vecUtil
	mk : vecUtil.mk 
	, array2vec : vecUtil.array2vec 
	, dotProduct : vecUtil.dotProduct
	, crossProduct : vecUtil.crossProduct
	, lineVector : vecUtil.lineVector
	, magnitude : vecUtil.magnitude
	, normalize : vecUtil.normalize
	, triangleNormal : vecUtil.triangleNormal

	, vc_lamp  : { x: 0 , y : 0 , z : 1 }

	, apply : function

	( verts , frags ) {

		var idx 
			, len = verts.length
			, step = 12 // 3 verts x 4 d(xyzw) = 12
			, vca = this.mk()
			, vcb = this.mk()
			, vcc = this.mk()
			, lnab = this.mk()
			, lnac = this.mk()
			, norm = null
			, all_norms = []
		;

		for ( idx = 0 ; idx < len ; idx += step ) {

			this.array2vec ( vca , verts , idx + 0 ) ;
			this.array2vec ( vcb , verts , idx + 4 ) ;
			this.array2vec ( vcc , verts , idx + 8 ) ;

			this.lineVector ( vca , vcb , lnab ) ;

			this.lineVector ( vca , vcc , lnac ) ;

			// I guess because +z is far instead of near
			// we must flip the normal so they match
			// the counter clock wise winding for front/outside faces
			// flip normal direction 
			// ( lnab , lnac , norm ) -> ( lnac , lnab , norm )
			norm = this.mk() ;
			this.crossProduct ( lnac , lnab , norm ) ;

			this.normalize ( norm ) ;

			all_norms.push ( norm ) ;

		}



		// there is 1 norm setting for 3 verts(1 face)
		var len = all_norms.length
			, cosLightNorm
			, cosLimit = 0.2
		;
			
		for ( idx = 0 ; idx < len ; idx ++ ) {

			// a . b = |a||b| cos 
			// cos = ( a . b ) / ( |a| |b| )
			// both this.vc_lamp and all_norms[idx] 
			// are normalized so
			// cos = ( a . b ) 
			
			cosLightNorm = this.dotProduct ( this.vc_lamp , all_norms[idx] ) ;
			if ( cosLightNorm < 0 ) {

				// console.log("lightDOTnorm is negative");
				cosLightNorm *= -1 ;

			} else {
				// console.log("lightDOTnorm is positive");
			}

			if ( cosLightNorm < cosLimit ) {
				// console.log(" cosLightNorm is below limit --to dark, limit it cause always be some bouncing light ");
				cosLightNorm = cosLimit;
			}

			// idx * step = 0 , 12 , 24 , ...
			frags[ idx * step + 0 ] *= cosLightNorm ;
			frags[ idx * step + 1 ] *= cosLightNorm ;
			frags[ idx * step + 2 ] *= cosLightNorm ;
			// skips 3 - alpha - opacity
				
			frags[ idx * step + 4 ] *= cosLightNorm ;
			frags[ idx * step + 5 ] *= cosLightNorm ;
			frags[ idx * step + 6 ] *= cosLightNorm ;
			// skips 7 - alpha - opacity

			frags[ idx * step + 8 ] *= cosLightNorm ;
			frags[ idx * step + 9 ] *= cosLightNorm ;
			frags[ idx * step + 10 ] *= cosLightNorm ;
			// skips 11 - alpha - opacity
		}

	}


	, test : function

	() {

		var vci = { x: 1 , y: 0 , z: 0 }
			, vcj = { x: 0 , y: 1 , z: 0 }
			, vck = { x: 0 , y: 0 , z: 1 }

			, vc_ixi_0 = this.mk()
			, vc_jxj_0 = this.mk()
			, vc_kxk_0 = this.mk()

			, vc_ixj_k = this.mk()
			, vc_jxk_i = this.mk()
			, vc_kxi_j = this.mk()

		this.crossProduct ( vci , vci , vc_ixi_0 ) ;
		this.crossProduct ( vcj , vcj , vc_jxj_0 ) ;
		this.crossProduct ( vck , vck , vc_kxk_0 ) ;
		console.log ( vc_ixi_0 ,  vc_jxj_0 , vc_kxk_0 ); // check

		this.crossProduct ( vci , vcj , vc_ixj_k ) ;
		this.crossProduct ( vcj , vck , vc_jxk_i ) ;
		this.crossProduct ( vck , vci , vc_kxi_j ) ;
		console.log ( vc_ixj_k ,  vc_jxk_i , vc_kxi_j ); // check
	}

};
