
"use strict;"
// type: vec{ x,y,z }
// vec mk()
// null array2vec ( vec , verts , idx )
// vec dotProduct ( vca , vcb ) 
// null crossProduct ( vca , vcb , vcp )
// null lineVector ( vca , vcb , vln )
// mag magnitude ( vec ) 
// null normalize ( vec ) 
// null triangleNormal ( tra , trb , trc , normal )
//

var vecUtil = {

	mk : function 

	( ) { 
		return { x: 0 , y: 0 , z: 0 } 
	}

	, array2vec : function

	( vec , verts , idx ) {

		vec.x = verts[ idx ]
		vec.y = verts[ idx + 1 ]
		vec.z = verts[ idx + 2 ]
	}
	
	, dotProduct : function

	( vca , vcb ) {

		return ( vca.x * vcb.x )
		+ ( vca.y * vcb.y )
		+ ( vca.z * vcb.z )

	}

	, crossProduct : function

	( vca , vcb , vcp ) {

		//   +     -      +
		// ____x ____y  ____z
		// vca.x vca.y  vca.z
		// vcb.x vcb.y  vcb.z

		// x : y , z
		vcp.x = 
			( vca.y * vcb.z ) 
			- ( vcb.y * vca.z)
		;

		// y : z , x -reverse direction
		vcp.y = 
			( vcb.x * vca.z )
			- ( vca.x * vcb.z )
		;

		// z : x , y
		vcp.z = 
			( vca.x * vcb.y )
			- ( vcb.x * vca.y )
		;
	}


	, lineVector : function

	( vca , vcb , vln ) {

		vln.x = vcb.x - vca.x;
		vln.y = vcb.y - vca.y;
		vln.z = vcb.z - vca.z;
	}



	, magnitude : function	

	( vec ) {

		return Math.sqrt(

			( vec.x * vec.x )

			+ ( vec.y * vec.y )

			+ ( vec.z * vec.z )
		);

	}

	, normalize : function 

	( vec ) {

		// denominator
		var den = this.magnitude ( vec ) ; 

		if ( den == 0 ) { 
			console.log(' zero vector - should never happen' );
			return;
		}

		vec.x /= den ;
		vec.y /= den ;
		vec.z /= den ;
	}



	, triangleNormal : function 

	( tra , trb , trc , normal ) {

		var lnab = mk_vec()
			, lnac = mk_vec()
		; 

		this.lineVector ( tra , trb , lnab ) ;
		this.lineVector ( tra , trc , lnac ) ; 

		this.crossProduct ( lnab , lnac , normal ) ;

		this.normalize ( normal) ;
	}
};
