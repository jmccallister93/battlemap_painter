import React, { useRef, useEffect, useState } from "react";
import p5 from "p5";
import "../style/CanvasPainter.css";
import dirt01 from "../assets/dirt01.png";
import grass01 from "../assets/grass01.png";

interface Props {
  width: number;
  height: number;
}

const CanvasPainter: React.FC<Props> = ({ width, height }) => {
  const canvasRef = useRef<any>(null);
  const [seed, setSeed] = useState(Math.random() * 1000); // Add this line

  const rerender = () => {
    setSeed(Math.random() * 1000); // Update the seed to trigger a re-render with new noise
  };

  useEffect(() => {
    const sketch = (p: p5) => {
      let dirtImg: p5.Image;
      let grassImg: p5.Image;

      p.preload = () => {
        dirtImg = p.loadImage(dirt01);
        grassImg = p.loadImage(grass01);
      };

      p.setup = () => {
        p.createCanvas(width, height);
        p.noLoop();
        p.noiseSeed(seed); // Add this line to seed the noise function
      };

      const tileSize = 60;

      p.draw = () => {
        p.background(255);
        for (let y = 0; y < p.height; y += tileSize) {
          for (let x = 0; x < p.width; x += tileSize) {
            const noiseValue = p.noise(x * 0.05, y * 0.05);
            const rotation = Math.floor(Math.random() * 4) * 90;

            // Calculate random offsets to "zoom" into a section of the image
            const offsetX = Math.floor(
              Math.random() * (dirtImg.width - tileSize)
            );
            const offsetY = Math.floor(
              Math.random() * (dirtImg.height - tileSize)
            );

            p.push();
            p.translate(x + tileSize / 2, y + tileSize / 2);
            p.rotate(p.radians(rotation));
            if (noiseValue > 0.5) {
              p.image(
                grassImg,
                -tileSize / 2,
                -tileSize / 2,
                tileSize,
                tileSize,
                // offsetX,
                // offsetY,
              
              );
            } else {
              p.image(
                grassImg,
                -tileSize / 2,
                -tileSize / 2,
                tileSize,
                tileSize,
                // offsetX,
                // offsetY,
            
              );
            }
            p.pop();
          }
        }
      };
    };

    const myp5 = new p5(sketch, canvasRef.current);
    return () => myp5.remove();
  }, [width, height, seed]); // Add seed as a dependency

  return (
    <>
      <div className="canvasContianer">
        <div ref={canvasRef}></div>
        <button onClick={rerender}>Rerender Sketch</button>{" "}
        {/* Add this button */}
      </div>
    </>
  );
};

export default CanvasPainter;
