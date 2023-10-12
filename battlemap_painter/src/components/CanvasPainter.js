import React, { useRef, useEffect, useState } from "react";
import p5 from "p5";
import "../style/CanvasPainter.css";

import concreate01 from "../assets/concreateTiles/concreate01.jpg";
import concreate02 from "../assets/concreateTiles/concreate02.jpg";
import concreate03 from "../assets/concreateTiles/concreate03.jpg";
import concreate04 from "../assets/concreateTiles/concreate04.jpg";
import concreate05 from "../assets/concreateTiles/concreate05.jpg";
import concreate06 from "../assets/concreateTiles/concreate06.jpg";
import concreate07 from "../assets/concreateTiles/concreate07.jpg";

import dirt01 from "../assets/dirtTiles/dirt01.jpg";
import dirt02 from "../assets/dirtTiles/dirt02.jpg";
import dirt03 from "../assets/dirtTiles/dirt03.jpg";
import dirt04 from "../assets/dirtTiles/dirt04.jpg";
import dirt05 from "../assets/dirtTiles/dirt05.jpg";
import dirt06 from "../assets/dirtTiles/dirt06.jpg";
import dirt07 from "../assets/dirtTiles/dirt07.jpg";
import dirt08 from "../assets/dirtTiles/dirt08.jpg";

import grass01 from "../assets/grassTiles/grass09.jpg";
import grass02 from "../assets/grassTiles/grass02.jpg";
import grass03 from "../assets/grassTiles/grass03.jpg";
import grass04 from "../assets/grassTiles/grass04.jpg";
import grass05 from "../assets/grassTiles/grass05.jpg";
import grass06 from "../assets/grassTiles/grass06.jpg";
import grass07 from "../assets/grassTiles/grass07.jpg";
import grass08 from "../assets/grassTiles/grass08.jpg";

import gravel01 from "../assets/gravelTiles/gravel01.jpg";
import gravel02 from "../assets/gravelTiles/gravel02.jpg";
import gravel03 from "../assets/gravelTiles/gravel03.jpg";
import gravel04 from "../assets/gravelTiles/gravel04.jpg";
import gravel05 from "../assets/gravelTiles/gravel05.jpg";
import gravel06 from "../assets/gravelTiles/gravel06.jpg";

import marble01 from "../assets/marbleTiles/marble01.jpg";
import marble02 from "../assets/marbleTiles/marble02.jpg";
import marble03 from "../assets/marbleTiles/marble03.jpg";
import marble04 from "../assets/marbleTiles/marble04.jpg";
import marble05 from "../assets/marbleTiles/marble05.jpg";
import marble06 from "../assets/marbleTiles/marble06.jpg";
import marble07 from "../assets/marbleTiles/marble07.jpg";
import marble08 from "../assets/marbleTiles/marble08.jpg";

import metal01 from "../assets/metalTiles/metal01.jpg";
import metal02 from "../assets/metalTiles/metal02.jpg";
import metal03 from "../assets/metalTiles/metal03.jpg";
import metal04 from "../assets/metalTiles/metal04.jpg";
import metal05 from "../assets/metalTiles/metal05.jpg";

import moss01 from "../assets/mossTiles/moss01.jpg";
import moss02 from "../assets/mossTiles/moss02.jpg";
import moss03 from "../assets/mossTiles/moss03.jpg";
import moss04 from "../assets/mossTiles/moss04.jpg";
import moss05 from "../assets/mossTiles/moss05.jpg";
import moss06 from "../assets/mossTiles/moss06.jpg";
import moss07 from "../assets/mossTiles/moss07.jpg";

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

import snow01 from "../assets/snowTiles/snow01.jpg";
import snow02 from "../assets/snowTiles/snow02.jpg";
import snow03 from "../assets/snowTiles/snow03.jpg";
import snow04 from "../assets/snowTiles/snow04.jpg";
import snow05 from "../assets/snowTiles/snow05.jpg";
import snow06 from "../assets/snowTiles/snow06.jpg";
import snow07 from "../assets/snowTiles/snow07.jpg";

import boulder01 from "../assets/boulderAssets/cliff.png";
import boulder02 from "../assets/boulderAssets/boulder02.png";
import boulder03 from "../assets/boulderAssets/boulder03.png";
import boulder04 from "../assets/boulderAssets/boulder04.png";
import boulder05 from "../assets/boulderAssets/boulder05.png";

import rocks01 from "../assets/rockPilesAssets/RockPile01.png"
import rocks02 from "../assets/rockPilesAssets/RockPile02.png"
import rocks03 from "../assets/rockPilesAssets/RockPile03.png"

import tree01 from "../assets/tree01.png";
import tree02 from "../assets/tree02.png";
import tree03 from "../assets/tree03.png";

import dirtPath01 from "../assets/dirtPath01.png";
import tilePath01 from "../assets/tilePath01.jpg";
import tilePath02 from "../assets/tilePath02.jpg";

// interface Props {
//   width: number;
//   height: number;
// }

const CanvasPainter = ({ width, height }) => {
  const canvasRef = useRef(null);
  const [seed, setSeed] = useState(Math.random() * 1000); // Add this line
  const [showTrees, setShowTrees] = useState(true); // New state for tree visibility
  const [treeScale, setTreeScale] =useState(5)
  const [showBoulders, setShowBoulders] = useState(true); // New state for tree visibility
  const [showPath, setShowPath] = useState(true);
  const [theme, setTheme] = useState("concreate");
  const [selectedTileIndex, setSelectedTileIndex] = useState(
    null
  );

  const [images, setImages] = useState({});

  useEffect(() => {
    const imgUrls = [
      concreate01,
      concreate02,
      concreate03,
      concreate04,
      concreate05,
      concreate06,
      concreate07,
      dirt01,
      dirt02,
      dirt03,
      dirt04,
      dirt05,
      dirt06,
      dirt07,
      dirt08,
      grass01,
      grass02,
      grass03,
      grass04,
      grass05,
      grass06,
      grass07,
      grass08,
      moss01,
      moss02,
      moss03,
      moss04,
      moss05,
      moss06,
      moss07,
      sand01,
      tree01,
      tree02,
      tree03,
      dirtPath01,
      tilePath01,
      tilePath02,
    ];

    const imgs = {};
    imgUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        imgs[url] = img;
        setImages({ ...images, ...imgs });
      };
    });
  }, []); // This useEffect runs once when the component mounts

  const rerender = () => {
    setSeed(Math.random() * 1000); // Update the seed to trigger a re-render with new noise
  };

  const concreateTilesImages = [];
  const dirtTilesImages = [];
  const grassTilesImages = [];
  const gravelTilesImages = [];
  const marbleTilesImages = [];
  const metalTilesImages = [];
  const mossTilesImages = [];
  const rockTilesImages = [];
  const sandTilesImages = [];
  const snowTilesImages = [];

  useEffect(() => {
    const sketch = (p: p5) => {
      let treeImg01: p5.Image;
      let treeImg02: p5.Image;
      let treeImg03: p5.Image;

      let boulderImg01: p5.Image;
      let boulderImg02: p5.Image;
      let boulderImg03: p5.Image;
      let boulderImg04: p5.Image;
      let boulderImg05: p5.Image;

      let rocksImg01: p5.Image;
      let rocksImg02: p5.Image;
      let rocksImg03: p5.Image;

      let tilePathImg01: p5.Image;
      let tilePathImg02: p5.Image;
      let dirtPathImg: p5.Image;

      console.log("ran");

      //   Preload images
      p.preload = () => {
        if (theme === "concreate") {
          // Populate the concreate mapping object
          concreateTilesImages[0] = p.loadImage(concreate01);
          concreateTilesImages[1] = p.loadImage(concreate02);
          concreateTilesImages[2] = p.loadImage(concreate03);
          concreateTilesImages[3] = p.loadImage(concreate04);
          concreateTilesImages[4] = p.loadImage(concreate05);
          concreateTilesImages[5] = p.loadImage(concreate06);
          concreateTilesImages[6] = p.loadImage(concreate07);
        } else if (theme === "dirt") {
          // Populate the dirt mapping object
          dirtTilesImages[0] = p.loadImage(dirt01);
          dirtTilesImages[1] = p.loadImage(dirt02);
          dirtTilesImages[2] = p.loadImage(dirt03);
          dirtTilesImages[3] = p.loadImage(dirt04);
          dirtTilesImages[4] = p.loadImage(dirt05);
          dirtTilesImages[5] = p.loadImage(dirt06);
          dirtTilesImages[6] = p.loadImage(dirt07);
          dirtTilesImages[7] = p.loadImage(dirt08);
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
        } else if (theme === "gravel") {
          // Populate the grass mapping object
          gravelTilesImages[0] = p.loadImage(gravel01);
          gravelTilesImages[1] = p.loadImage(gravel02);
          gravelTilesImages[2] = p.loadImage(gravel03);
          gravelTilesImages[3] = p.loadImage(gravel04);
          gravelTilesImages[4] = p.loadImage(gravel05);
          gravelTilesImages[5] = p.loadImage(gravel06);
        } else if (theme === "marble") {
          // Populate the marble mapping object
          marbleTilesImages[0] = p.loadImage(marble01);
          marbleTilesImages[1] = p.loadImage(marble02);
          marbleTilesImages[2] = p.loadImage(marble03);
          marbleTilesImages[3] = p.loadImage(marble04);
          marbleTilesImages[4] = p.loadImage(marble05);
          marbleTilesImages[5] = p.loadImage(marble06);
          marbleTilesImages[6] = p.loadImage(marble07);
          marbleTilesImages[7] = p.loadImage(marble08);
        } else if (theme === "metal") {
          // Populate the metal mapping object
          metalTilesImages[0] = p.loadImage(metal01);
          metalTilesImages[1] = p.loadImage(metal02);
          metalTilesImages[2] = p.loadImage(metal03);
          metalTilesImages[3] = p.loadImage(metal04);
          metalTilesImages[4] = p.loadImage(metal05);
        } else if (theme === "moss") {
          // Populate the moss mapping object
          mossTilesImages[0] = p.loadImage(moss01);
          mossTilesImages[1] = p.loadImage(moss02);
          mossTilesImages[2] = p.loadImage(moss03);
          mossTilesImages[3] = p.loadImage(moss04);
          mossTilesImages[4] = p.loadImage(moss05);
          mossTilesImages[5] = p.loadImage(moss06);
          mossTilesImages[6] = p.loadImage(moss07);
        } else if (theme === "rock") {
          // Populate the rock mapping object
          rockTilesImages[0] = p.loadImage(rock01);
          rockTilesImages[1] = p.loadImage(rock02);
          rockTilesImages[2] = p.loadImage(rock03);
          rockTilesImages[3] = p.loadImage(rock04);
          rockTilesImages[4] = p.loadImage(rock05);
          rockTilesImages[5] = p.loadImage(rock06);
          rockTilesImages[6] = p.loadImage(rock07);
          rockTilesImages[7] = p.loadImage(rock02);
          rockTilesImages[8] = p.loadImage(rock03);
          rockTilesImages[9] = p.loadImage(rock04);
          rockTilesImages[10] = p.loadImage(rock05);
          rockTilesImages[11] = p.loadImage(rock06);
          rockTilesImages[12] = p.loadImage(rock07);
        } else if (theme === "sand") {
          // Populate the metal mapping object
          sandTilesImages[0] = p.loadImage(sand01);
          sandTilesImages[1] = p.loadImage(sand02);
          sandTilesImages[2] = p.loadImage(sand03);
          sandTilesImages[3] = p.loadImage(sand04);
          sandTilesImages[4] = p.loadImage(sand05);
          sandTilesImages[5] = p.loadImage(sand06);
          sandTilesImages[6] = p.loadImage(sand07);
        } else if (theme === "snow") {
          // Populate the metal mapping object
          snowTilesImages[0] = p.loadImage(snow01);
          snowTilesImages[1] = p.loadImage(snow02);
          snowTilesImages[2] = p.loadImage(snow03);
          snowTilesImages[3] = p.loadImage(snow04);
          snowTilesImages[4] = p.loadImage(snow05);
          snowTilesImages[5] = p.loadImage(snow06);
          snowTilesImages[6] = p.loadImage(snow07);
        }

        treeImg01 = p.loadImage(tree01);
        treeImg02 = p.loadImage(tree02);
        treeImg03 = p.loadImage(tree03);

        boulderImg01 = p.loadImage(boulder01);
        boulderImg02 = p.loadImage(boulder02);
        boulderImg03 = p.loadImage(boulder03);
        boulderImg04 = p.loadImage(boulder04);
        boulderImg05 = p.loadImage(boulder05);

        rocksImg01 = p.loadImage(rocks01);
        rocksImg02 = p.loadImage(rocks02);
        rocksImg03 = p.loadImage(rocks03);

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
      const imgSize = tileSize * 8;
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
        if (theme === "concreate") {
          if (selectedTileIndex !== null) {
            tile = concreateTilesImages[selectedTileIndex]; // Use the index to get the tile
          } else {
            tile = p.random(concreateTilesImages);
          }
        } else if (theme === "dirt") {
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
        } else if (theme === "gravel") {
          if (selectedTileIndex !== null) {
            tile = gravelTilesImages[selectedTileIndex]; // Use the index to get the tile
          } else {
            tile = p.random(gravelTilesImages);
          }
        } else if (theme === "marble") {
          if (selectedTileIndex !== null) {
            tile = marbleTilesImages[selectedTileIndex]; // Use the index to get the tile
          } else {
            tile = p.random(marbleTilesImages);
          }
        } else if (theme === "metal") {
          if (selectedTileIndex !== null) {
            tile = metalTilesImages[selectedTileIndex]; // Use the index to get the tile
          } else {
            tile = p.random(metalTilesImages);
          }
        } else if (theme === "moss") {
          if (selectedTileIndex !== null) {
            tile = mossTilesImages[selectedTileIndex]; // Use the index to get the tile
          } else {
            tile = p.random(mossTilesImages);
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

        // Draw all boulders
        const boulders = [
          boulderImg01,
          // boulderImg02,
          // boulderImg03,
          // boulderImg04,
          // boulderImg05,
          // rocksImg01,
          // rocksImg02,
          // rocksImg03,
        ];
        if (showBoulders) {
          for (let y = 0; y < p.height; y += tileSize) {
            for (let x = 0; x < p.width; x += tileSize) {
              if (Math.random() < 0.01) {
                if (
                  (isHorizontalPath && y === pathPos) ||
                  (!isHorizontalPath && x === pathPos)
                ) {
                  continue;
                }

                const boulderImg = p.random(boulders);
                const minBoulderScale = 0.01;
                const maxBoulderScale = 0.25;
                const boulderScale =
                  minBoulderScale +
                  Math.random() * (maxBoulderScale - minBoulderScale);
                const boulderRotation = Math.random() * 360;

                p.push();
                p.translate(x + tileSize / 2, y + tileSize / 2);
                // p.scale(boulderScale);
                p.rotate(p.radians(boulderRotation));
                p.image(
                  boulderImg,
                  -boulderImg.width / 2,
                  -boulderImg.height / 2
                );
                p.pop();
              }
            }
          }
        }

        
        function mapRange(value, inMin, inMax, outMin, outMax) {
          return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
        }
        const trees = [treeImg01, treeImg02, treeImg03];
        // Draw all trees
        if (showTrees) {
          for (let y = 0; y < p.height; y += tileSize) {
            for (let x = 0; x < p.width; x += tileSize) {
              const scaledTreeProbability = mapRange(treeScale, 0, 10, 0, 0.1);
              if (Math.random() < scaledTreeProbability) {
                // This condition checks if the tree is on the path
                if (
                  (isHorizontalPath && y === pathPos) ||
                  (!isHorizontalPath && x === pathPos)
                ) {
                  continue; // Skip this iteration to avoid drawing tree on the path
                }

                const treeImg = p.random(trees);
                const minTreeScale = 0.4;
                const maxTreeScale = 0.7;
                const treeScale =
                minTreeScale +
                  Math.random() * (maxTreeScale - minTreeScale);
                  const treeRotation = Math.random() * 360;

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
      myp5.remove(); // Ensure the p5 sketch is removed upon component unmount or re-render
    };
  }, [width, height, seed, showTrees, showPath, theme, selectedTileIndex]);

  const concreateTiles = [
    { label: "Concreate 01", value: concreate01 },
    { label: "Concreate 02", value: concreate02 },
    { label: "Concreate 03", value: concreate03 },
    { label: "Concreate 04", value: concreate04 },
    { label: "Concreate 05", value: concreate05 },
    { label: "Concreate 06", value: concreate06 },
    { label: "Concreate 07", value: concreate07 },
  ];

  const dirtTiles = [
    { label: "Dirt 01", value: dirt01 },
    { label: "Dirt 02", value: dirt02 },
    { label: "Dirt 03", value: dirt03 },
    { label: "Dirt 04", value: dirt04 },
    { label: "Dirt 05", value: dirt05 },
    { label: "Dirt 06", value: dirt06 },
    { label: "Dirt 07", value: dirt07 },
    { label: "Dirt 08", value: dirt08 },
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
  ];

  const gravelTiles = [
    { label: "Gravel 01", value: gravel01 },
    { label: "Gravel 02", value: gravel02 },
    { label: "Gravel 03", value: gravel03 },
    { label: "Gravel 04", value: gravel04 },
    { label: "Gravel 05", value: gravel05 },
    { label: "Gravel 06", value: gravel06 },
  ];
  const marbleTiles = [
    { label: "Marble 01", value: marble01 },
    { label: "Marble 02", value: marble02 },
    { label: "Marble 03", value: marble03 },
    { label: "Marble 04", value: marble04 },
    { label: "Marble 05", value: marble05 },
    { label: "Marble 06", value: marble06 },
    { label: "Marble 07", value: marble07 },
    { label: "Marble 08", value: marble08 },
  ];

  const metalTiles = [
    { label: "Metal 01", value: metal01 },
    { label: "Metal 02", value: metal02 },
    { label: "Metal 03", value: metal03 },
    { label: "Metal 04", value: metal04 },
    { label: "Metal 05", value: metal05 },
  ];

  const mossTiles = [
    { label: "Moss 01", value: moss01 },
    { label: "Moss 02", value: moss02 },
    { label: "Moss 03", value: moss03 },
    { label: "Moss 04", value: moss04 },
    { label: "Moss 05", value: moss05 },
    { label: "Moss 06", value: moss06 },
    { label: "Moss 07", value: moss07 },
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
  ];

  const snowTiles = [
    { label: "Snow 01", value: snow01 },
    { label: "Snow 02", value: snow02 },
    { label: "Snow 03", value: snow03 },
    { label: "Snow 04", value: snow04 },
    { label: "Snow 05", value: snow05 },
    { label: "Snow 06", value: snow06 },
    { label: "Snow 07", value: snow07 },
  ];

  const getTileOptions = () => {
    if (theme === "concreate") {
      return concreateTiles;
    } else if (theme === "dirt") {
      return dirtTiles;
    } else if (theme === "grass") {
      return grassTiles;
    } else if (theme === "gravel") {
      return gravelTiles;
    } else if (theme === "marble") {
      return marbleTiles;
    } else if (theme === "metal") {
      return metalTiles;
    } else if (theme === "moss") {
      return mossTiles;
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
        <button onClick={rerender}>Rerender Sketch</button>{" "}
        {/* New dropdown for theme selection */}
        <label>
          Tile Theme:
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="concreate">Concreate</option>
            <option value="dirt">Dirt</option>
            <option value="gravel">Gravel</option>
            <option value="grass">Grass</option>
            <option value="marble">Marble</option>
            <option value="metal">Metal</option>
            <option value="moss">Moss</option>
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
        <label>
          <input
            type="checkbox"
            checked={showTrees}
            onChange={(e) => setShowTrees(e.target.checked)}
          />{" "}
          Show Trees
        </label>
        {showTrees && ( // Only show the slider when the checkbox is checked
        <div>
          <label>
            Tree Volume: {treeScale} 
            <input
              type="range"
              min="0"
              max="10"
              value={treeScale}
              onChange={(e) => setTreeScale(e.target.value)}
            />
          </label>
        </div>
      )}
        <label>
          <input
            type="checkbox"
            checked={showPath}
            onChange={(e) => setShowPath(e.target.checked)}
          />{" "}
          Show Path
        </label>
        <label>
          <input
            type="checkbox"
            checked={showBoulders}
            onChange={(e) => setShowBoulders(e.target.checked)}
          />{" "}
          Show Boulders
        </label>
      </div>

      <div className="canvasContianer">
        <div ref={canvasRef}></div>
      </div>
    </div>
  );
};

export default CanvasPainter;
