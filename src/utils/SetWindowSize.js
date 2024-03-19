import { memo, useState, useEffect } from 'react';

const SetWindowSize = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);

    useEffect(() => {
        const updateWindowDimensions = () => {
            const newWindowWidth = window.innerWidth;
            const newWindowHeight = window.innerHeight;
            setWindowWidth(newWindowWidth);
            setWindowHeight(newWindowHeight);
        };

        // Call the function to update dimensions on mount
        updateWindowDimensions();

        // Event listener to update dimensions on resize
        window.addEventListener('resize', updateWindowDimensions);

        // Cleanup
        return () => window.removeEventListener('resize', updateWindowDimensions);
    }, []);

    return [windowWidth, windowHeight];
};

export default SetWindowSize;
