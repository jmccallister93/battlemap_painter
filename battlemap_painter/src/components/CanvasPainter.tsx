import React, { useRef, useEffect, useState } from "react";
import p5 from "p5";
import "../style/CanvasPainter.css";

import dirt01 from "../assets/dirt01.png";
import dirt02 from "../assets/dirt02.png";
import dirt03 from "../assets/dirt03.png";
import dirt04 from "../assets/dirt04.png";
import dirt05 from "../assets/dirt05.jpg";
import dirt06 from "../assets/dirt06.jpg";

import grass01 from "../assets/grass01.jpg";
import grass02 from "../assets/grass02.jpg";
import grass03 from "../assets/grass03.jpg";
import grass04 from "../assets/grass04.jpg";
import grass05 from "../assets/grass05.jpg"
import grass06 from "../assets/grass06.jpg"
import grass07 from "../assets/grass07.jpeg"
import grass08 from "../assets/grass08.png"
import grass09 from "../assets/grass09.jpg"
import grass11 from "../assets/grass11.jpg"

import sand01 from "../assets/sand.png"

import tree01 from "../assets/tree01.png";
import tree02 from "../assets/tree02.png";
import tree03 from "../assets/tree03.png";

import dirtPath01 from "../assets/dirtPath01.png";
import tilePath01 from "../assets/tilePath01.jpg";
import tilePath02 from "../assets/tilePath02.jpg";

interface Props {
  width: number;
  height: number;
}

const CanvasPainter: React.FC<Props> = ({ width, height }) => {
  const canvasRef = useRef<any>(null);
  const [seed, setSeed] = useState(Math.random() * 1000); // Add this line
  const [showTrees, setShowTrees] = useState(true); // New state for tree visibility
  const [showPath, setShowPath] = useState(true);
  const [theme, setTheme] = useState("forest");

  const rerender = () => {
    setSeed(Math.random() * 1000); // Update the seed to trigger a re-render with new noise
  };

  useEffect(() => {
    const sketch = (p: p5) => {
      let dirtImg01: p5.Image;
      let dirtImg03: p5.Image;
      let dirtImg04: p5.Image;
      let dirtImg05: p5.Image;
      let dirtImg06: p5.Image;

      let sandImg01: p5.Image;

      let grassImg01: p5.Image;
      let grassImg02: p5.Image;
      let grassImg03: p5.Image;
      let grassImg04: p5.Image;
      let grassImg05: p5.Image;
      let grassImg06: p5.Image;
      let grassImg07: p5.Image;
      let grassImg08: p5.Image;
      let grassImg09: p5.Image;
      let grassImg11: p5.Image;

      let treeImg01: p5.Image;
      let treeImg02: p5.Image;
      let treeImg03: p5.Image;

      let tilePathImg01: p5.Image;
      let tilePathImg02: p5.Image;
      let dirtPathImg: p5.Image;

      //   Preload images
      p.preload = () => {
        dirtImg01 = p.loadImage(dirt01);
        dirtImg03 = p.loadImage(dirt03);
        dirtImg04 = p.loadImage(dirt04);
        dirtImg05 = p.loadImage(dirt05);
        dirtImg06 = p.loadImage(dirt06);

        sandImg01 = p.loadImage(sand01);

        grassImg01 = p.loadImage(grass01);
        grassImg02 = p.loadImage(grass02);
        grassImg03 = p.loadImage(grass03);
        grassImg04 = p.loadImage(grass04);
        grassImg05 = p.loadImage(grass05);
        grassImg06 = p.loadImage(grass06);
        grassImg07 = p.loadImage(grass07);
        grassImg08 = p.loadImage(grass08);
        grassImg09 = p.loadImage(grass09);
        grassImg11 = p.loadImage(grass11);

        treeImg01 = p.loadImage(tree01);
        treeImg02 = p.loadImage(tree02);
        treeImg03 = p.loadImage(tree03);

        tilePathImg01 = p.loadImage(tilePath01);
        tilePathImg02 = p.loadImage(tilePath02);
        dirtPathImg = p.loadImage(dirtPath01);
      };
      //   Setup canvas
      p.setup = () => {
        p.createCanvas(width, height);
        p.noLoop();
        p.noiseSeed(seed); // Add this line to seed the noise function
      };

      //   Map size
      const tileSize = 60;
      //   Tile size
      const imgSize = tileSize * 4;
      //   Is the path horizonal or vertical
      let isHorizontalPath = Math.random() > 0.5;
      let pathPos = isHorizontalPath
        ? Math.floor(p.random(0, height / tileSize)) * tileSize
        : Math.floor(p.random(0, width / tileSize)) * tileSize;

      // Draw everything
      p.draw = () => {
        p.background(255);
        // Draw tiles
        for (let y = 0; y < p.height; y += imgSize) {
          for (let x = 0; x < p.width; x += imgSize) {
            const noiseValue = p.noise(x * 0.05, y * 0.05);
            const rotation = Math.floor(Math.random() * 4) * 90;

            p.push();
            p.translate(x + imgSize / 2, y + imgSize / 2);
            // p.rotate(p.radians(rotation));

            if (theme === "forest") {
                p.image(grassImg11, -imgSize / 2, -imgSize / 2, imgSize, imgSize);
              } else if (theme === "desert") {
                p.image(sandImg01, -imgSize / 2, -imgSize / 2, imgSize, imgSize);
              }

            p.pop();
          }
        }
        const pathSize = tileSize * 0.5; // Adjust as needed to make the path smaller
        const treeSize = tileSize * 0.5; // Adjust as needed to make the trees smaller
        // Draw path tiles over the base tiles
        if (showPath) {
          if (isHorizontalPath) {
            for (let x = 0; x < p.width; x += tileSize) {
              p.push(); // Add this line to isolate the rotation transformation
              p.translate(x + tileSize / 2, pathPos + tileSize / 2); // Adjust the origin for rotation
              p.rotate(p.radians(90)); // Rotate the coordinate system by 90 degrees
              p.image(
                tilePathImg02,
                -tileSize / 2,
                -tileSize / 2,
                tileSize,
                tileSize
              ); // Draw the image at the new origin
              p.pop(); // Add this line to restore the original coordinate system
            }
          } else {
            for (let y = 0; y < p.height; y += tileSize) {
              p.image(tilePathImg02, pathPos, y, tileSize, tileSize);
            }
          }
        }

        const trees = [treeImg01, treeImg02, treeImg03];
        // Draw all trees
        if (showTrees) {
          for (let y = 0; y < p.height; y += tileSize) {
            for (let x = 0; x < p.width; x += tileSize) {
              if (Math.random() < 0.03) {
                // This condition checks if the tree is on the path
                if (
                  (isHorizontalPath && y === pathPos) ||
                  (!isHorizontalPath && x === pathPos)
                ) {
                  continue; // Skip this iteration to avoid drawing tree on the path
                }

                const treeImg = p.random(trees);
                const treeScale = 0.5 + Math.random() * 1.5;
                const treeRotation = Math.floor(Math.random() * 4) * 90;

                p.push();
                p.translate(x + tileSize / 2, y + tileSize / 2);
                p.scale(treeScale);
                p.rotate(p.radians(treeRotation));
                p.image(treeImg, -treeImg.width / 2, -treeImg.height / 2);
                p.pop();
              }
            }
          }
        }
      };
    };

    const myp5 = new p5(sketch, canvasRef.current);
    return () => myp5.remove();
  }, [width, height, seed]); // Add seed as a dependency

  return (
    <div className="canvasWrapper">
      <div className="optionsContainer">
        <button onClick={rerender}>Rerender Sketch</button>{" "}
        {/* New dropdown for theme selection */}
        <label>
          Theme: 
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="forest">Forest</option>
            <option value="desert">Desert</option>
            {/* Add more options as needed */}
          </select>
        </label>
        <label>
          <input
            type="checkbox"
            checked={showTrees}
            onChange={(e) => setShowTrees(e.target.checked)}
          />{" "}
          Show Trees
        </label>
        <label>
          <input
            type="checkbox"
            checked={showPath}
            onChange={(e) => setShowPath(e.target.checked)}
          />{" "}
          Show Path
        </label>
      </div>

      <div className="canvasContianer">
        <div ref={canvasRef}></div>
      </div>
    </div>
  );
};

export default CanvasPainter;
