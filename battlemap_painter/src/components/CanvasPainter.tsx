import React, { useRef, useEffect } from 'react';

interface Props {
    // Add any props you need, like width, height, color, etc.
    width: number;
    height: number;
}

const CanvasPainter: React.FC<Props> = ({ width, height }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (context) {
            // Add your drawing logic here
        }
    }, []);

    return <canvas ref={canvasRef} width={width} height={height}></canvas>;
}

export default CanvasPainter;
