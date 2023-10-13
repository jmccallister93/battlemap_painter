import React, { useRef, useEffect, useState } from "react";
import p5 from "p5";
import "../style/CanvasPainter.css";

import assets from "./CentralIndex";
import fogOverlay from "../assets/fogTile/fog.png";

const CanvasPainter = () => {
  const canvasRef = useRef(null);
  const [seed, setSeed] = useState(Math.random() * 1000);
  const [theme, setTheme] = useState("grass");
  const [selectedTileIndex, setSelectedTileIndex] = useState(null);
  const [tileOptions, setTileOptions] = useState([]);
  const [width, setWidth] = useState(1080);
  const [height, setHeight] = useState(1080);
  const [lighting, setLighting] = useState("day");
  const [effects, setEffects] = useState("none");

  const [showDirtPaths, setShowDirtPaths] = useState(true);
  const [dirtPathScale, setDirtPathScale] = useState(1);

  const [showCliffs, setShowCliffs] = useState(true);
  const [cliffScale, setCliffScale] = useState(1);

  const [showRocks, setShowRocks] = useState(true);
  const [rocksScale, setRocksScale] = useState(3);

  const [showFlowers, setShowFlowers] = useState(true);
  const [flowerScale, setFlowerScale] = useState(3);

  const [showBushes, setShowBushes] = useState(true);
  const [bushScale, setBushScale] = useState(3);

  const [showBoulders, setShowBoulders] = useState(true);
  const [boulderScale, setBoulderScale] = useState(3);

  const [stumpScale, setStumpScale] = useState(1);
  const [branchScale, setBranchScale] = useState(3);

  const [showTrees, setShowTrees] = useState(true);
  const [treeScale, setTreeScale] = useState(3);

  // Utility function outside of sketch to load in images
  const preloadImages = (p, assets) => {
    return assets.map((asset) => p.loadImage(asset));
  };

  // Set ReRender
  const rerender = () => {
    setSeed(Math.random() * 1000);
  };

  // Main UseEffect
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
      let dirtPathImgs = assets.dirtPaths;
      let cliffImgs = assets.cliff;
      let rocksImgs = assets.rocks;
      let flowerImgs = assets.flower;
      let bushImgs = assets.bush;
      let boulderImgs = assets.boulder;
      let stumpImgs = assets.stump;
      let branchImgs = assets.branch;
      let treeImgs = assets.tree;

      // Lighting
      let fogImg = fogOverlay;

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
        probability,
        shadow
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
                if (shadow) {
                  p.drawingContext.shadowOffsetX = 2;
                  p.drawingContext.shadowOffsetY = 2;
                  p.drawingContext.shadowBlur = 5;
                  p.drawingContext.shadowColor = "black";
                }

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

        // Preload the assets into Arrays for drwaing
        dirtPathImgs = preloadImages(p, assets.dirtPaths);
        cliffImgs = preloadImages(p, assets.cliff);
        rocksImgs = preloadImages(p, assets.rocks);
        flowerImgs = preloadImages(p, assets.flower);
        bushImgs = preloadImages(p, assets.bush);
        boulderImgs = preloadImages(p, assets.boulder);
        branchImgs = preloadImages(p, assets.branch);
        stumpImgs = preloadImages(p, assets.stump);
        treeImgs = preloadImages(p, assets.tree);

        // Lighting Effects
        fogImg = p.loadImage(fogOverlay);
      };

      //Setup canvas
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

        // Place Tiles
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

        // Draw Path
        const dirtPathPositions = [];
        if (showDirtPaths) {
          for (let i = 0; i < dirtPathScale; i++) {
            const dirtPathMinScale = 1;
            const dirtPathMaxScale = 1;
            const img = p.random(dirtPathImgs);
            const objectScale =
              dirtPathMinScale +
              Math.random() * (dirtPathMaxScale - dirtPathMinScale);
            const objectRotation = Math.random() * 360;
            const objectWidth = width * 1.5;

            const centerX = p.width / 2;
            const centerY = p.height / 2;

            p.push();
            p.translate(centerX, centerY);
            p.scale(objectScale);
            p.rotate(p.radians(objectRotation));
            // p.drawingContext.shadowOffsetX = 2;
            // p.drawingContext.shadowOffsetY = 2;
            // p.drawingContext.shadowBlur = 5;
            // p.drawingContext.shadowColor = "black";
            p.image(
              img,
              -objectWidth / 2,
              -img.height / 2,
              objectWidth,
              img.height
            );

            dirtPathPositions.push({ x: centerX, y: centerY });

            p.pop();
          }
        }
        // Draw Cliffs
        const cliffPositions = [];
        drawObjects(
          showCliffs,
          cliffImgs,
          0.5,
          1.1,
          cliffScale,
          cliffPositions,
          0.04,
          false
        );

        // Draw Rocks
        const rocksPositions = [];
        drawObjects(
          showRocks,
          rocksImgs,
          0.5,
          1.1,
          rocksScale,
          rocksPositions,
          0.1,
          true
        );
        // Draw all branches
        const branchPositions = [];
        drawObjects(
          showTrees,
          branchImgs,
          0.05,
          0.1,
          branchScale,
          branchPositions,
          0.04,
          true
        );
        // Draw all stumps
        const stumpPositions = [];
        drawObjects(
          showTrees,
          stumpImgs,
          0.05,
          0.1,
          stumpScale,
          stumpPositions,
          0.04,
          true
        );
        // Draw Flowers
        const flowerPositions = [];
        drawObjects(
          showFlowers,
          flowerImgs,
          0.1,
          0.5,
          flowerScale,
          flowerPositions,
          0.1,
          true
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
          0.1,
          true
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
          0.04,
          true
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
          0.15,
          true
        );

        // Lighting hue
        switch (lighting) {
          case "night":
            p.fill(0, 0, 128, 50); // semi-transparent blue
            p.rect(0, 0, p.width, p.height);
            break;
          case "dawn":
            p.fill(255, 69, 0, 30); // semi-transparent red-orange
            p.rect(0, 0, p.width, p.height);
            break;
          case "overcast":
            p.fill(75, 75, 75, 60); // semi-transparent grey
            p.rect(0, 0, p.width, p.height);
            break;
          default:
            p.fill(255, 255, 255, 0); // transparent white (no effect)
            p.rect(0, 0, p.width, p.height);
            break;
        }

        switch (effects) {
          case "fog":
            p.image(fogImg, 0, 0, p.width, p.height); // draw the fog overlay image over the entire canvas
            break;
          default:
            break;
        }
      };
    };

    const myp5 = new p5(sketch, canvasRef.current);
    return () => {
      myp5.remove(); // Ensure the p5 sketch is removed upon component unmount or re-render
    };
  }, [seed]);

  // Create toggles for UI render
  const ShowElementControl = ({
    label,
    isChecked,
    onCheckedChanged,
    volumeLabel,
    volumeValue,
    onVolumeChanged,
  }) => {
    return (
      <div className="optionWrapper">
        <label className="optionLabel">
          <input 
            type="checkbox"
            checked={isChecked}
            cursor="pointer"
            onChange={(e) => onCheckedChanged(e.target.checked)}
          />{" "}
          {label}
        </label>
        {isChecked && (
          <div>
            <label>
              {volumeLabel}: {volumeValue}
              <input
                type="range"
                min="0"
                max="9"
                value={volumeValue}
                onChange={(e) => onVolumeChanged(e.target.value)}
              />
            </label>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="canvasWrapper">
      <div className="optionsContainer">
        {/* Rerender */}
        <button className="generateButton" onClick={rerender}>Generate</button>
        {/* Height and Width */}
        <div className="optionWrapper">
          <label className="optionLabel">
            Canvas Width:
            <select value={width} onChange={(e) => setWidth(e.target.value)}>
              <option value="1920">1920px</option>
              <option value="1440">1440px</option>
              <option value="1280">1280px</option>
              <option value="1080">1080px</option>
              <option value="720">720px</option>
            </select>
          </label>
        </div>
        <div className="optionWrapper">
          <label className="optionLabel">
            Canvas Height:
            <select value={height} onChange={(e) => setHeight(e.target.value)}>
              <option value="1920">1920px</option>
              <option value="1440">1440px</option>
              <option value="1280">1280px</option>
              <option value="1080">1080px</option>
              <option value="720">720px</option>
            </select>
          </label>
        </div>
        {/* Lighting */}
        <div className="optionWrapper">
          <label className="optionLabel">
            Lighting:
            <select
              value={lighting}
              onChange={(e) => setLighting(e.target.value)}
            >
              <option value="day">Day</option>
              <option value="night">Night</option>
              <option value="dawn">Dawn/Dusk</option>
              <option value="overcast">Overcast</option>
            </select>
          </label>
        </div>
        {/* Effects */}
        <div className="optionWrapper">
          <label className="optionLabel">
            Effects:
            <select
              value={effects}
              onChange={(e) => setEffects(e.target.value)}
            >
              <option value="none">None</option>
              <option value="fog">Fog</option>
              <option value="rain">Rain</option>
            </select>
          </label>
        </div>
        {/* Tiles */}
        <div className="optionWrapper">
          <label className="optionLabel">
            Tile Theme:
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="dirt">Dirt</option>
              <option value="grass">Grass</option>
              <option value="rock">Rock</option>
              <option value="sand">Sand</option>
              <option value="snow">Snow</option>
            </select>
          </label>
          </div>
          {tileOptions.length > 0 && (
            <div className="optionWrapper">
              <label className="optionLabel">
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
            </div>
          )}
        
        {/* Dirt Paths */}
        <div className="optionWrapper">
          <label className="optionLabel">
            <input
              type="checkbox"
              checked={showDirtPaths}
              onChange={(e) => setShowDirtPaths(e.target.checked)}
            />
            Show Paths
          </label>
          {showDirtPaths && (
            <div>
              <label>
                Path Count: {dirtPathScale}
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={dirtPathScale}
                  onChange={(e) => setDirtPathScale(e.target.value)}
                />
              </label>
            </div>
          )}
        </div>
        {/* Trees */}
        <ShowElementControl
          label="Show Trees"
          isChecked={showTrees}
          onCheckedChanged={setShowTrees}
          volumeLabel="Tree Volume"
          volumeValue={treeScale}
          onVolumeChanged={setTreeScale}
        />
        {/* Bushes */}
        <ShowElementControl
          label="Show Bushes"
          isChecked={showBushes}
          onCheckedChanged={setShowBushes}
          volumeLabel="Bush Volume"
          volumeValue={bushScale}
          onVolumeChanged={setBushScale}
        />
        {/* Flowers */}
        <ShowElementControl
          label="Show Flowers"
          isChecked={showFlowers}
          onCheckedChanged={setShowFlowers}
          volumeLabel="Flower Volume"
          volumeValue={flowerScale}
          onVolumeChanged={setFlowerScale}
        />
        {/* Cliffs */}
        <ShowElementControl
          label="Show Cliffs"
          isChecked={showCliffs}
          onCheckedChanged={setShowCliffs}
          volumeLabel="Cliff Volume"
          volumeValue={cliffScale}
          onVolumeChanged={setCliffScale}
        />
        {/* Boulders */}
        <ShowElementControl
          label="Show Boulders"
          isChecked={showBoulders}
          onCheckedChanged={setShowBoulders}
          volumeLabel="Boulder Volume"
          volumeValue={boulderScale}
          onVolumeChanged={setBoulderScale}
        />
        {/* Rocks */}
        <ShowElementControl
          label="Show Rocks"
          isChecked={showRocks}
          onCheckedChanged={setShowRocks}
          volumeLabel="Rocks Volume"
          volumeValue={rocksScale}
          onVolumeChanged={setRocksScale}
        />
      </div>

      <div className="canvasContianer">
        <div ref={canvasRef}></div>
      </div>
    </div>
  );
};

export default CanvasPainter;
