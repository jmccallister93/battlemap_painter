import React, { useRef, useEffect, useState } from "react";
import p5 from "p5";
import "../style/CanvasPainter.css";

import dirt01 from "../assets/dirtTiles/dirt01.jpg";
import dirt02 from "../assets/dirtTiles/dirt02.jpg";
import dirt03 from "../assets/dirtTiles/dirt03.jpg";
import dirt04 from "../assets/dirtTiles/dirt04.jpg";
import dirt05 from "../assets/dirtTiles/dirt05.jpg";
import dirt06 from "../assets/dirtTiles/dirt06.jpg";
import dirt07 from "../assets/dirtTiles/dirt07.jpg";
import dirt08 from "../assets/dirtTiles/dirt08.jpg";
import dirt09 from "../assets/dirtTiles/dirt09.jpg";

import grass01 from "../assets/grassTiles/grass09.jpg";
import grass02 from "../assets/grassTiles/grass02.jpg";
import grass03 from "../assets/grassTiles/grass03.jpg";
import grass04 from "../assets/grassTiles/grass04.jpg";
import grass05 from "../assets/grassTiles/grass05.jpg";
import grass06 from "../assets/grassTiles/grass06.jpg";
import grass07 from "../assets/grassTiles/grass07.jpg";
import grass08 from "../assets/grassTiles/grass08.jpg";
import grass09 from "../assets/grassTiles/grass09.jpg";

import rock01 from "../assets/rockTiles/rock01.jpg";
import rock02 from "../assets/rockTiles/rock02.jpg";
import rock03 from "../assets/rockTiles/rock03.jpg";
import rock04 from "../assets/rockTiles/rock04.jpg";
import rock05 from "../assets/rockTiles/rock05.jpg";
import rock06 from "../assets/rockTiles/rock06.jpg";
import rock07 from "../assets/rockTiles/rock07.jpg";
import rock08 from "../assets/rockTiles/rock08.jpg";
import rock09 from "../assets/rockTiles/rock09.jpg";
import rock10 from "../assets/rockTiles/rock10.jpg";
import rock11 from "../assets/rockTiles/rock11.jpg";
import rock12 from "../assets/rockTiles/rock12.jpg";
import rock13 from "../assets/rockTiles/rock13.jpg";

import sand01 from "../assets/sandTiles/sand01.jpg";
import sand02 from "../assets/sandTiles/sand02.jpg";
import sand03 from "../assets/sandTiles/sand03.jpg";
import sand04 from "../assets/sandTiles/sand04.jpg";
import sand05 from "../assets/sandTiles/sand05.jpg";
import sand06 from "../assets/sandTiles/sand06.jpg";
import sand07 from "../assets/sandTiles/sand07.jpg";
import sand08 from "../assets/sandTiles/sand08.jpg";
import sand09 from "../assets/sandTiles/sand09.jpg";

import snow01 from "../assets/snowTiles/snow01.jpg";
import snow02 from "../assets/snowTiles/snow02.jpg";
import snow03 from "../assets/snowTiles/snow03.jpg";
import snow04 from "../assets/snowTiles/snow04.jpg";
import snow05 from "../assets/snowTiles/snow05.jpg";
import snow06 from "../assets/snowTiles/snow06.jpg";
import snow07 from "../assets/snowTiles/snow07.jpg";
import snow08 from "../assets/snowTiles/snow08.jpg";
import snow09 from "../assets/snowTiles/snow09.jpg";

import assets from "./CentralIndex";

const CanvasPainter = ({ width, height }) => {
  const canvasRef = useRef(null);
  const [seed, setSeed] = useState(Math.random() * 1000); // Add this line
  const [showTrees, setShowTrees] = useState(true); // New state for tree visibility
  const [treeScale, setTreeScale] = useState(3);
  const [showBoulders, setShowBoulders] = useState(true); // New state for tree visibility
  const [boulderScale, setBoulderScale] = useState(3);
  const [showRocks, setShowRocks] = useState(true); // New state for tree visibility
  const [rocksScale, setRocksScale] = useState(3);
  const [showBushes, setShowBushes] = useState(true); // New state for tree visibility
  const [bushScale, setBushScale] = useState(3);
  const [theme, setTheme] = useState("grass");
  const [selectedTileIndex, setSelectedTileIndex] = useState(null);


  // Utility function outside of sketch
  const preloadImages = (p, assets) => {
    return assets.map((asset) => p.loadImage(asset));
  };

  const rerender = () => {
    setSeed(Math.random() * 1000); // Update the seed to trigger a re-render with new noise
  };

  const dirtTilesImages = [];
  const grassTilesImages = [];
  const rockTilesImages = [];
  const sandTilesImages = [];
  const snowTilesImages = [];

  useEffect(() => {
    const sketch = (p) => {
      let rocksImgs = assets.rocks;
      let bushImgs = assets.bush;
      let boulderImgs = assets.boulder;
      let treeImgs = assets.tree;

      //   Preload images
      p.preload = () => {
        if (theme === "dirt") {
          // Populate the dirt mapping object
          dirtTilesImages[0] = p.loadImage(dirt01);
          dirtTilesImages[1] = p.loadImage(dirt02);
          dirtTilesImages[2] = p.loadImage(dirt03);
          dirtTilesImages[3] = p.loadImage(dirt04);
          dirtTilesImages[4] = p.loadImage(dirt05);
          dirtTilesImages[5] = p.loadImage(dirt06);
          dirtTilesImages[6] = p.loadImage(dirt07);
          dirtTilesImages[7] = p.loadImage(dirt08);
          dirtTilesImages[8] = p.loadImage(dirt09);
        } else if (theme === "grass") {
          // Populate the grass mapping object
          grassTilesImages[0] = p.loadImage(grass01);
          grassTilesImages[1] = p.loadImage(grass02);
          grassTilesImages[2] = p.loadImage(grass03);
          grassTilesImages[3] = p.loadImage(grass04);
          grassTilesImages[4] = p.loadImage(grass05);
          grassTilesImages[5] = p.loadImage(grass06);
          grassTilesImages[6] = p.loadImage(grass07);
          grassTilesImages[7] = p.loadImage(grass08);
          grassTilesImages[8] = p.loadImage(grass09);
        } else if (theme === "rock") {
          // Populate the rock mapping object
          rockTilesImages[0] = p.loadImage(rock01);
          rockTilesImages[1] = p.loadImage(rock02);
          rockTilesImages[2] = p.loadImage(rock03);
          rockTilesImages[3] = p.loadImage(rock04);
          rockTilesImages[4] = p.loadImage(rock05);
          rockTilesImages[5] = p.loadImage(rock06);
          rockTilesImages[6] = p.loadImage(rock07);
          rockTilesImages[7] = p.loadImage(rock08);
          rockTilesImages[8] = p.loadImage(rock09);
          // rockTilesImages[9] = p.loadImage(rock04);
          // rockTilesImages[10] = p.loadImage(rock05);
          // rockTilesImages[11] = p.loadImage(rock06);
          // rockTilesImages[12] = p.loadImage(rock07);
        } else if (theme === "sand") {
          // Populate the metal mapping object
          sandTilesImages[0] = p.loadImage(sand01);
          sandTilesImages[1] = p.loadImage(sand02);
          sandTilesImages[2] = p.loadImage(sand03);
          sandTilesImages[3] = p.loadImage(sand04);
          sandTilesImages[4] = p.loadImage(sand05);
          sandTilesImages[5] = p.loadImage(sand06);
          sandTilesImages[6] = p.loadImage(sand07);
          sandTilesImages[7] = p.loadImage(sand08);
          sandTilesImages[8] = p.loadImage(sand09);
        } else if (theme === "snow") {
          // Populate the metal mapping object
          snowTilesImages[0] = p.loadImage(snow01);
          snowTilesImages[1] = p.loadImage(snow02);
          snowTilesImages[2] = p.loadImage(snow03);
          snowTilesImages[3] = p.loadImage(snow04);
          snowTilesImages[4] = p.loadImage(snow05);
          snowTilesImages[5] = p.loadImage(snow06);
          snowTilesImages[6] = p.loadImage(snow07);
          snowTilesImages[7] = p.loadImage(snow08);
          snowTilesImages[8] = p.loadImage(snow09);
        }

        rocksImgs = preloadImages(p, assets.rocks);
        bushImgs = preloadImages(p, assets.bush);
        boulderImgs = preloadImages(p, assets.boulder);
        treeImgs = preloadImages(p, assets.tree);
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
      const imgSize = tileSize * 8;

      // Draw everything
      p.draw = () => {
        p.background(255);

        let tile;
        if (theme === "dirt") {
          if (selectedTileIndex !== null) {
            tile = dirtTilesImages[selectedTileIndex]; // Use the index to get the tile
          } else {
            tile = p.random(dirtTilesImages);
          }
        } else if (theme === "grass") {
          if (selectedTileIndex !== null) {
            tile = grassTilesImages[selectedTileIndex]; // Use the index to get the tile
          } else {
            tile = p.random(grassTilesImages);
          }
        } else if (theme === "rock") {
          if (selectedTileIndex !== null) {
            tile = rockTilesImages[selectedTileIndex]; // Use the index to get the tile
          } else {
            tile = p.random(rockTilesImages);
          }
        } else if (theme === "sand") {
          if (selectedTileIndex !== null) {
            tile = sandTilesImages[selectedTileIndex]; // Use the index to get the tile
          } else {
            tile = p.random(sandTilesImages);
          }
        } else if (theme === "snow") {
          if (selectedTileIndex !== null) {
            tile = snowTilesImages[selectedTileIndex]; // Use the index to get the tile
          } else {
            tile = p.random(snowTilesImages);
          }
        }

        if (!tile) {
          console.error("Tile is undefined");
          return;
        }

        // Palce Tiles
        for (let y = 0; y < p.height; y += imgSize) {
          for (let x = 0; x < p.width; x += imgSize) {
            p.push();
            p.translate(x + imgSize / 2, y + imgSize / 2);
            p.image(tile, -imgSize / 2, -imgSize / 2, imgSize, imgSize);
            p.pop();
          }
        }

        // Function for population mapping
        function mapRange(value, inMin, inMax, outMin, outMax) {
          return (
            ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
          );
        }

        // Draw all rocks
        const rocksPositions = [];
        if (showRocks) {
          for (let y = 0; y < p.height; y += tileSize) {
            for (let x = 0; x < p.width; x += tileSize) {
              const scaledRocksProbability = mapRange(
                rocksScale,
                0,
                10,
                0,
                0.1
              );
              if (Math.random() < scaledRocksProbability) {
                const rocksImg = p.random(rocksImgs);
                const minRocksScale = 0.5;
                const maxRocksScale = 1.1;
                const rocksScale =
                  minRocksScale +
                  Math.random() * (maxRocksScale - minRocksScale);
                const rocksRotation = Math.random() * 360;

                p.push();
                p.translate(x + tileSize / 2, y + tileSize / 2);
                p.scale(rocksScale);
                p.rotate(p.radians(rocksRotation));
                // Adding shadow
                p.drawingContext.shadowOffsetX = 2;
                p.drawingContext.shadowOffsetY = 2;
                p.drawingContext.shadowBlur = 5;
                p.drawingContext.shadowColor = "black";
                p.image(rocksImg, -rocksImg.width / 2, -rocksImg.height / 2);

                rocksPositions.push({ x, y });

                p.pop();
              }
            }
          }
        }

        // Draw all bushes
        const bushPositions = [];
        if (showBushes) {
          for (let y = 0; y < p.height; y += tileSize) {
            for (let x = 0; x < p.width; x += tileSize) {
              const scaledBushProbability = mapRange(bushScale, 0, 10, 0, 0.1);
              if (Math.random() < scaledBushProbability) {
                const bushImg = p.random(bushImgs);
                const minBushScale = 0.05;
                const maxBushScale = 0.4;
                const bushScale =
                  minBushScale + Math.random() * (maxBushScale - minBushScale);
                const bushRotation = Math.random() * 360;

                p.push();
                p.translate(x + tileSize / 2, y + tileSize / 2);
                p.scale(bushScale);
                p.rotate(p.radians(bushRotation));
                // Adding shadow
                p.drawingContext.shadowOffsetX = 2;
                p.drawingContext.shadowOffsetY = 2;
                p.drawingContext.shadowBlur = 5;
                p.drawingContext.shadowColor = "black";
                p.image(bushImg, -bushImg.width / 2, -bushImg.height / 2);

                bushPositions.push({ x, y });

                p.pop();
              }
            }
          }
        }

        // Draw all boulders
        const boulderPositions = [];
        if (showBoulders) {
          for (let y = 0; y < p.height; y += tileSize) {
            for (let x = 0; x < p.width; x += tileSize) {
              const scaledBoulderProbability = mapRange(
                boulderScale,
                0,
                10,
                0,
                0.04
              );
              if (Math.random() < scaledBoulderProbability) {
                const boulderImg = p.random(boulderImgs); // Changed boulders to boulderImgs
                const minBoulderScale = 0.3;
                const maxBoulderScale = 0.8;
                const boulderScale =
                  minBoulderScale +
                  Math.random() * (maxBoulderScale - minBoulderScale);
                const boulderRotation = Math.random() * 360;

                p.push();
                p.translate(x + tileSize / 2, y + tileSize / 2);
                p.scale(boulderScale);
                p.rotate(p.radians(boulderRotation));
                // Adding shadow
                p.drawingContext.shadowOffsetX = 8;
                p.drawingContext.shadowOffsetY = 8;
                p.drawingContext.shadowBlur = 5;
                p.drawingContext.shadowColor = "black";
                p.image(
                  boulderImg,
                  -boulderImg.width / 2,
                  -boulderImg.height / 2
                );

                boulderPositions.push({ x, y });

                p.pop();
              }
            }
          }
        }

        //Determine where Boulders are
        function isPositionOccupied(x, y) {
          return boulderPositions.some((pos) => pos.x === x && pos.y === y);
        }
        // Draw all trees
        if (showTrees) {
          for (let y = 0; y < p.height; y += tileSize) {
            for (let x = 0; x < p.width; x += tileSize) {
              if (isPositionOccupied(x, y)) {
                continue; // Skip this iteration if a boulder is already at this position
              }
              const scaledTreeProbability = mapRange(treeScale, 0, 10, 0, 0.1);
              if (Math.random() < scaledTreeProbability) {
                const treeImg = p.random(treeImgs);
                const minTreeScale = 0.1;
                const maxTreeScale = 0.4;
                const treeScale =
                  minTreeScale + Math.random() * (maxTreeScale - minTreeScale);
                const treeRotation = Math.random() * 360;

                p.push();
                p.translate(x + tileSize / 2, y + tileSize / 2);
                p.scale(treeScale);
                p.rotate(p.radians(treeRotation));
                // Adding shadow
                p.drawingContext.shadowOffsetX = 8;
                p.drawingContext.shadowOffsetY = 8;
                p.drawingContext.shadowBlur = 10;
                p.drawingContext.shadowColor = "black";
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
      myp5.remove(); // Ensure the p5 sketch is removed upon component unmount or re-render
    };
  }, [width, height, seed, showTrees, theme, selectedTileIndex]);

  const dirtTiles = [
    { label: "Dirt 01", value: dirt01 },
    { label: "Dirt 02", value: dirt02 },
    { label: "Dirt 03", value: dirt03 },
    { label: "Dirt 04", value: dirt04 },
    { label: "Dirt 05", value: dirt05 },
    { label: "Dirt 06", value: dirt06 },
    { label: "Dirt 07", value: dirt07 },
    { label: "Dirt 08", value: dirt08 },
    { label: "Dirt 09", value: dirt09 },
  ];

  const grassTiles = [
    { label: "Grass 01", value: grass01 },
    { label: "Grass 02", value: grass02 },
    { label: "Grass 03", value: grass03 },
    { label: "Grass 04", value: grass04 },
    { label: "Grass 05", value: grass05 },
    { label: "Grass 06", value: grass06 },
    { label: "Grass 07", value: grass07 },
    { label: "Grass 08", value: grass08 },
    { label: "Grass 09", value: grass09 },
  ];

  const rockTiles = [
    { label: "Rock 01", value: rock01 },
    { label: "Rock 02", value: rock02 },
    { label: "Rock 03", value: rock03 },
    { label: "Rock 04", value: rock04 },
    { label: "Rock 05", value: rock05 },
    { label: "Rock 06", value: rock06 },
    { label: "Rock 07", value: rock07 },
    { label: "Rock 08", value: rock08 },
    { label: "Rock 09", value: rock09 },
    { label: "Rock 10", value: rock10 },
    { label: "Rock 11", value: rock11 },
    { label: "Rock 12", value: rock12 },
    { label: "Rock 13", value: rock13 },
  ];

  const sandTiles = [
    { label: "Sand 01", value: sand01 },
    { label: "Sand 02", value: sand02 },
    { label: "Sand 03", value: sand03 },
    { label: "Sand 04", value: sand04 },
    { label: "Sand 05", value: sand05 },
    { label: "Sand 06", value: sand06 },
    { label: "Sand 07", value: sand07 },
    { label: "Sand 08", value: sand08 },
    { label: "Sand 09", value: sand09 },
  ];

  const snowTiles = [
    { label: "Snow 01", value: snow01 },
    { label: "Snow 02", value: snow02 },
    { label: "Snow 03", value: snow03 },
    { label: "Snow 04", value: snow04 },
    { label: "Snow 05", value: snow05 },
    { label: "Snow 06", value: snow06 },
    { label: "Snow 07", value: snow07 },
    { label: "Snow 08", value: snow08 },
    { label: "Snow 09", value: snow09 },
  ];

  const getTileOptions = () => {
    if (theme === "dirt") {
      return dirtTiles;
    } else if (theme === "grass") {
      return grassTiles;
    } else if (theme === "rock") {
      return rockTiles;
    } else if (theme === "sand") {
      return sandTiles;
    } else if (theme === "snow") {
      return snowTiles;
    }
    return [];
  };

  const tileOptions = getTileOptions();

  useEffect(() => {
    // Reset the selected tile index when theme changes
    setSelectedTileIndex(null);
  }, [theme]);

  return (
    <div className="canvasWrapper">
      <div className="optionsContainer">
        <button onClick={rerender}>Rerender Sketch</button> {/* Tiles */}
        <label>
          Tile Theme:
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            {/* <option value="concreate">Concreate</option> */}
            <option value="dirt">Dirt</option>
            {/* <option value="gravel">Gravel</option> */}
            <option value="grass">Grass</option>
            {/* <option value="marble">Marble</option>
            <option value="metal">Metal</option>
            <option value="moss">Moss</option> */}
            <option value="rock">Rock</option>
            <option value="sand">Sand</option>
            <option value="snow">Snow</option>
            {/* Add more options as needed */}
          </select>
        </label>
        {tileOptions.length > 0 && (
          <>
            <label>
              Tile Type:
              <select
                value={selectedTileIndex !== null ? selectedTileIndex : ""}
                onChange={(e) =>
                  setSelectedTileIndex(
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
              >
                <option value="">Random</option>
                {tileOptions.map(
                  (
                    option,
                    index // Updated to use tileOptions state
                  ) => (
                    <option key={option.value} value={index}>
                      {option.label}
                    </option>
                  )
                )}
              </select>
            </label>
          </>
        )}
        {/* Trees */}
        <label>
          <input
            type="checkbox"
            checked={showTrees}
            onChange={(e) => setShowTrees(e.target.checked)}
          />{" "}
          Show Trees
        </label>
        {showTrees && (
          <div>
            <label>
              Tree Volume: {treeScale}
              <input
                type="range"
                min="0"
                max="9"
                value={treeScale}
                onChange={(e) => setTreeScale(e.target.value)}
              />
            </label>
          </div>
        )}
        {/* Bushes */}
        <label>
          <input
            type="checkbox"
            checked={showBushes}
            onChange={(e) => setShowBushes(e.target.checked)}
          />{" "}
          Show Bushes
        </label>
        {showBushes && (
          <div>
            <label>
              Tree Volume: {bushScale}
              <input
                type="range"
                min="0"
                max="9"
                value={bushScale}
                onChange={(e) => setBushScale(e.target.value)}
              />
            </label>
          </div>
        )}
        {/* Boulders */}
        <label>
          <input
            type="checkbox"
            checked={showBoulders}
            onChange={(e) => setShowBoulders(e.target.checked)}
          />{" "}
          Show Boulders
        </label>
        {showBoulders && (
          <div>
            <label>
              Boulder Volume: {boulderScale}
              <input
                type="range"
                min="0"
                max="9"
                value={boulderScale}
                onChange={(e) => setBoulderScale(e.target.value)}
              />
            </label>
          </div>
        )}
        {/* Rocks */}
        <label>
          <input
            type="checkbox"
            checked={showRocks}
            onChange={(e) => setShowRocks(e.target.checked)}
          />{" "}
          Show Rocks
        </label>
        {showRocks && (
          <div>
            <label>
              Rocks Volume: {rocksScale}
              <input
                type="range"
                min="0"
                max="9"
                value={rocksScale}
                onChange={(e) => setRocksScale(e.target.value)}
              />
            </label>
          </div>
        )}
      </div>

      <div className="canvasContianer">
        <div ref={canvasRef}></div>
      </div>
    </div>
  );
};

export default CanvasPainter;
