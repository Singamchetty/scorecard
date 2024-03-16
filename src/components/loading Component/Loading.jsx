import React, { memo } from 'react';
import Loader1 from './Loade1.gif'
import Spin from './Spin1.png'


const Loading = memo(() => {
    return (
        <div className='w-100'>
            <p className='text-blue-500 flex justify-center items-center h-full mt-28'>
                <img src={Spin} alt="Loading" width={100} height={100} />
                
                {/* loading */}
            </p>
        </div>
    );
});

export default Loading;