import React, { memo } from 'react';

const PageNotFound = memo(() => {
    return (
        <div className="w-full h-full">
            <p className="text-center align-middle mt-14 mb-14 text-red-500">Page Not Found</p>
        </div>
    );
});

export default PageNotFound;