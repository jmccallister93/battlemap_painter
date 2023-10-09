import React, { useRef, useEffect, useState } from "react";
import p5 from "p5";
import "../style/CanvasPainter.css";

import dirt01 from "../assets/dirt01.png";
import dirt02 from "../assets/dirt02.png";
import dirt03 from "../assets/dirt03.png";
import dirt04 from "../assets/dirt04.png";
import dirt05 from "../assets/dirt05.jpg";
import dirt06 from "../assets/dirt06.jpg";

import grass01 from "../assets/grassTiles/grass01.jpg";
import grass02 from "../assets/grassTiles/grass02.jpg";
import grass03 from "../assets/grassTiles/grass03.jpg";
import grass04 from "../assets/grassTiles/grass04.jpg";
import grass05 from "../assets/grassTiles/grass05.jpg";
import grass06 from "../assets/grassTiles/grass06.jpg";
import grass07 from "../assets/grassTiles/grass07.jpg";
import grass08 from "../assets/grassTiles/grass08.jpg";

import jungle01 from "../assets/jungleTiles/jungle01.jpg";
import jungle02 from "../assets/jungleTiles/jungle02.jpg";
import jungle03 from "../assets/jungleTiles/jungle03.jpg";
import jungle04 from "../assets/jungleTiles/jungle04.jpg";
import jungle05 from "../assets/jungleTiles/jungle05.jpg";
import jungle06 from "../assets/jungleTiles/jungle06.jpg";
import jungle07 from "../assets/jungleTiles/jungle07.jpg";

import sand01 from "../assets/sand.png";

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
  const [selectedTileIndex, setSelectedTileIndex] = useState<number | null>(
    null
  ); // Store the index instead of value

  const rerender = () => {
    setSeed(Math.random() * 1000); // Update the seed to trigger a re-render with new noise
  };

  const grassTilesImages: p5.Image[] = [];

  useEffect(() => {
    const sketch = (p: p5) => {
      let sandImg01: p5.Image;

      let grassImg01: p5.Image;
      let grassImg02: p5.Image;
      let grassImg03: p5.Image;
      let grassImg04: p5.Image;
      let grassImg05: p5.Image;
      let grassImg06: p5.Image;
      let grassImg07: p5.Image;
      let grassImg08: p5.Image;

      let treeImg01: p5.Image;
      let treeImg02: p5.Image;
      let treeImg03: p5.Image;

      let tilePathImg01: p5.Image;
      let tilePathImg02: p5.Image;
      let dirtPathImg: p5.Image;

      //   Preload images
      p.preload = () => {
        sandImg01 = p.loadImage(sand01);

        // Populate the mapping object
        grassTilesImages[0] = p.loadImage(grass01);
        grassTilesImages[1] = p.loadImage(grass02);
        grassTilesImages[2] = p.loadImage(grass03);
        grassTilesImages[3] = p.loadImage(grass04);
        grassTilesImages[4] = p.loadImage(grass05);
        grassTilesImages[5] = p.loadImage(grass06);
        grassTilesImages[6] = p.loadImage(grass07);
        grassTilesImages[7] = p.loadImage(grass08);

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

        // Determine the tile to use for this render
        let tile;
        const grassTiles = [
          grassImg01,
          grassImg02,
          grassImg03,
          grassImg04,
          grassImg05,
          grassImg06,
          grassImg07,
          grassImg08,
        ];

        if (theme === "forest") {
            if (selectedTileIndex !== null) {
                tile = grassTilesImages[selectedTileIndex]; // Use the index to get the tile
            } else {
                tile = p.random(grassTilesImages);
            }
        }
        // else if (theme === "desert") {
        //   tile = sandImg01;
        // }
        if (!tile) {
          console.error("Tile is undefined");
          return; // If tile is still undefined for some reason, log an error and return to avoid further errors
        }

        for (let y = 0; y < p.height; y += imgSize) {
          for (let x = 0; x < p.width; x += imgSize) {
            p.push();
            p.translate(x + imgSize / 2, y + imgSize / 2);
            p.image(tile, -imgSize / 2, -imgSize / 2, imgSize, imgSize);
            p.pop();
          }
        }

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
    return () => {
        console.log('Removing p5 sketch');
        myp5.remove(); // Ensure the p5 sketch is removed upon component unmount or re-render
      };
  }, [width, height, seed, showTrees, showPath, theme, selectedTileIndex, grassTilesImages]); // Add seed as a dependency

  const grassTiles = [
    { label: "Grass 01", value: grass01 },
    { label: "Grass 02", value: grass02 },
    { label: "Grass 03", value: grass03 },
    { label: "Grass 04", value: grass04 },
    { label: "Grass 05", value: grass05 },
    { label: "Grass 06", value: grass06 },
    { label: "Grass 07", value: grass07 },
    { label: "Grass 08", value: grass08 },
  ];

  const getTileOptions = () => {
    if (theme === "forest") {
      return grassTiles;
    }
    // Add more conditions for other themes with their respective tiles
    return [];
  };

  const tileOptions = getTileOptions();

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
        {tileOptions.length > 0 && (
          <>
            <label>
              Tile:
              <select
                value={selectedTileIndex !== null ? selectedTileIndex : ""}
                onChange={(e) =>
                  setSelectedTileIndex(
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
              >
                <option value="">Random</option>
                {grassTiles.map((option, index) => (
                  <option key={option.value} value={index}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            {/* Display selected tile image */}
            {/* {selectedTileIndex && (
              <img
                src={selectedTileIndex}
                alt="Selected tile"
                style={{ width: "50px", height: "auto" }}
              />
            )} */}
          </>
        )}
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
