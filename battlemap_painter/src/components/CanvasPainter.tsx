import React, { useRef, useEffect, useState } from "react";
import p5 from "p5";
import "../style/CanvasPainter.css";
import dirt01 from "../assets/dirt01.png";
import dirt02 from '../assets/dirt02.png'

import grass01 from "../assets/grass01.png";

import tree01 from "../assets/tree01.png";
import tree02 from "../assets/tree02.png";
import tree03 from "../assets/tree03.png";

import dirtPath01 from "../assets/dirtPath01.png";

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
      let treeImg01: p5.Image;
      let treeImg02: p5.Image;
      let treeImg03: p5.Image;
      let dirtPathImg: p5.Image;

      p.preload = () => {
        dirtImg = p.loadImage(dirt02);
        grassImg = p.loadImage(grass01);
        treeImg01 = p.loadImage(tree01);
        treeImg02 = p.loadImage(tree02);
        treeImg03 = p.loadImage(tree03);
        dirtPathImg = p.loadImage(dirtPath01);
      };

      p.setup = () => {
        p.createCanvas(width, height);
        p.noLoop();
        p.noiseSeed(seed); // Add this line to seed the noise function
      };

      const tileSize = 60;
      let isHorizontalPath = Math.random() > 0.5;
      let pathPos = isHorizontalPath
        ? Math.floor(p.random(0, height / tileSize)) * tileSize
        : Math.floor(p.random(0, width / tileSize)) * tileSize;

      p.draw = () => {
        p.background(255);
        for (let y = 0; y < p.height; y += tileSize) {
          for (let x = 0; x < p.width; x += tileSize) {
            const noiseValue = p.noise(x * 0.05, y * 0.05);
            const rotation = Math.floor(Math.random() * 4) * 90;

            p.push();
            p.translate(x + tileSize / 2, y + tileSize / 2);
            p.rotate(p.radians(rotation));
            if (noiseValue > 0.5) {
              p.image(
                dirtImg,
                -tileSize / 2,
                -tileSize / 2,
                tileSize,
                tileSize
              );
            } else {
              p.image(
                dirtImg,
                -tileSize / 2,
                -tileSize / 2,
                tileSize,
                tileSize
              );
            }
            p.pop();
          }
        }

        // Draw path tiles over the base tiles
        if (isHorizontalPath) {
          for (let x = 0; x < p.width; x += tileSize) {
            p.push(); // Add this line to isolate the rotation transformation
            p.translate(x + tileSize / 2, pathPos + tileSize / 2); // Adjust the origin for rotation
            p.rotate(p.radians(90)); // Rotate the coordinate system by 90 degrees
            p.image(
              dirtPathImg,
              -tileSize / 2,
              -tileSize / 2,
              tileSize,
              tileSize
            ); // Draw the image at the new origin
            p.pop(); // Add this line to restore the original coordinate system
          }
        } else {
          for (let y = 0; y < p.height; y += tileSize) {
            p.image(dirtPathImg, pathPos, y, tileSize, tileSize);
          }
        }

        const trees = [treeImg01, treeImg02, treeImg03];
        // Draw all trees
        for (let y = 0; y < p.height; y += tileSize) {
            for (let x = 0; x < p.width; x += tileSize) {
              if (Math.random() < 0.1) {  // Adjusted to 10% for more trees, change as needed
                const treeImg = p.random(trees);  // Choose a random tree image from the array
                const treeScale = 0.5 + Math.random() * 1.5;  // Random scale between 0.5 and 2
                const treeRotation = Math.floor(Math.random() * 4) * 90;  // Random rotation
  
                p.push();
                p.translate(x + tileSize / 2, y + tileSize / 2);
                p.scale(treeScale);
                p.rotate(p.radians(treeRotation));
                p.image(treeImg, -treeImg.width / 2, -treeImg.height / 2);  // Changed to use the random tree image
                p.pop();
              }
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
