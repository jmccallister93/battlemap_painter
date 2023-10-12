import React, { useRef, useEffect, useState } from "react";
import p5 from "p5";
import "../style/CanvasPainter.css";

import assets from "./CentralIndex";

const CanvasPainter = () => {
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
  const [tileOptions, setTileOptions] = useState([]);
  const [width, setWidth] = useState(1080);
  const [height, setHeight] = useState(1080);

  // Utility function outside of sketch to load in images
  const preloadImages = (p, assets) => {
    return assets.map((asset) => p.loadImage(asset));
  };

  // Set ReRender
  const rerender = () => {
    setSeed(Math.random() * 1000);
  };

  useEffect(() => {
    const sketch = (p) => {
      // Create tiles array
      const tilesMap = {
        dirt: assets.dirtTiles,
        grass: assets.grassTiles,
        rock: assets.rockTiles,
        sand: assets.sandTiles,
        snow: assets.snowTiles,
      };
      let tilesImages = [];

      // Create asset arrays
      let rocksImgs = assets.rocks;
      let bushImgs = assets.bush;
      let boulderImgs = assets.boulder;
      let treeImgs = assets.tree;

      // Function for population mapping
      function mapRange(value, inMin, inMax, outMin, outMax) {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
      }

      // Dynamic Function to draw ojects
      const drawObjects = (
        show,
        imageArray,
        minScale,
        maxScale,
        scale,
        positionsArray,
        probability
      ) => {
        if (show) {
          for (let y = 0; y < p.height; y += tileSize) {
            for (let x = 0; x < p.width; x += tileSize) {
              const scaledProbability = mapRange(scale, 0, 10, 0, probability);
              if (Math.random() < scaledProbability) {
                const img = p.random(imageArray);
                const objectScale =
                  minScale + Math.random() * (maxScale - minScale);
                const objectRotation = Math.random() * 360;

                p.push();
                p.translate(x + tileSize / 2, y + tileSize / 2);
                p.scale(objectScale);
                p.rotate(p.radians(objectRotation));
                // Adding shadow
                p.drawingContext.shadowOffsetX = 2;
                p.drawingContext.shadowOffsetY = 2;
                p.drawingContext.shadowBlur = 5;
                p.drawingContext.shadowColor = "black";
                p.image(img, -img.width / 2, -img.height / 2);

                positionsArray.push({ x, y });

                p.pop();
              }
            }
          }
        }
      };

      //   Preload images
      p.preload = () => {
        // If the theme is valid, load the associated tiles
        if (tilesMap[theme]) {
          tilesImages = tilesMap[theme].map((tile) => p.loadImage(tile));
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

        // Map through tiles
        let tile;
        if (tilesMap[theme]) {
          if (selectedTileIndex !== null) {
            tile = tilesImages[selectedTileIndex];
          } else {
            tile = p.random(tilesImages);
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

        // Get Tile options
        const getTileOptions = () => {
          if (tilesMap[theme]) {
            return tilesMap[theme].map((tile, index) => ({
              label: `Tile ${index + 1}`,
              value: index,
            }));
          }
          return [];
        };
        setTileOptions(getTileOptions());

        // Draw Rocks
        const rocksPositions = [];
        drawObjects(
          showRocks,
          rocksImgs,
          0.5,
          1.1,
          rocksScale,
          rocksPositions,
          0.1
        );

        // Draw Bushes
        const bushPositions = [];
        drawObjects(
          showBushes,
          bushImgs,
          0.05,
          0.4,
          bushScale,
          bushPositions,
          0.1
        );

        //Draw Boulders
        const boulderPositions = [];
        drawObjects(
          showBoulders,
          boulderImgs,
          0.3,
          0.8,
          boulderScale,
          boulderPositions,
          0.04
        );

        //Determine where Boulders are
        function isPositionOccupied(x, y) {
          return boulderPositions.some((pos) => pos.x === x && pos.y === y);
        }
        // Draw all trees
        const treePositions = [];
        drawObjects(
          showTrees,
          treeImgs,
          0.1,
          0.4,
          treeScale,
          treePositions,
          0.04
        );
      };
    };

    const myp5 = new p5(sketch, canvasRef.current);
    return () => {
      myp5.remove(); // Ensure the p5 sketch is removed upon component unmount or re-render
    };
  }, [
    width,
    height,
    seed,
    showTrees,
    showBushes,
    showRocks,
    showBoulders,
    theme,
    selectedTileIndex,
  ]);

  return (
    <div className="canvasWrapper">
      <div className="optionsContainer">
        {/* Rerender */}
        <button onClick={rerender}>Rerender Sketch</button>
        {/* Height and Width */}
        <label>
          Canvas Width:
          <select value={width} onChange={(e) => setWidth(e.target.value)}>
            <option value="1920">1920px</option>
            <option value="1440">1440px</option>
            <option value="1280">1280px</option>
            <option value="1080">1080px</option>
            <option value="720">720px</option>
          </select>
        </label>
        <label>
          Canvas Height:
          <select value={height} onChange={(e) => setHeight(e.target.value)}>
            <option value="1920">1920px</option>
            <option value="1440">1440px</option>
            <option value="1280">1280px</option>
            <option value="1080">1080px</option>
            <option value="720">720px</option>
          </select>
        </label>
        {/* Tiles */}
        <label>
          Tile Theme:
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="dirt">Dirt</option>
            <option value="grass">Grass</option>
            <option value="rock">Rock</option>
            <option value="sand">Sand</option>
            <option value="snow">Snow</option>
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
