function test01()
{
    console.log( 'test01() called' );
}

/**
 * desc1
 */
const a1 = 123 ;
/**
 * desc2
 */
const a2 = 345 ;

// module.exports = {
//     a1,
//     a2,
//     test01
// }

//import path from 'path' ; // ES5 형태는 import 에러 발생함.
const path = require( 'path' );

class utils
{

    /**
     * 클래스 메서드
     */
    static test01()
    {
        console.log( 'test01() called' );
    }
    
}

export default utils ;
