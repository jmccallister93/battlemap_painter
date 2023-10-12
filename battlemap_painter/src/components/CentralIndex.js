import rocksAssets from "../groupAssets/rockAssets";
import bushAssets from "../groupAssets/bushAssets";
import boulderAssets from "../groupAssets/boulderAssets";
import treeAssets from "../groupAssets/treeAssets";
import dirtTiles from "../groupTiles/dirtTiles";
import grassTiles from "../groupTiles/grassTiles";
import rockTiles from "../groupTiles/rockTiles";
import sandTiles from "../groupTiles/sandTiles";
import snowTiles from "../groupTiles/snowtiles";
import flowerAssets from "../groupAssets/flowerAssets";
import stumpAssets from "../groupAssets/stumpAssets";
import branchAssets from "../groupAssets/branchAssets";

const assets = {
    // Tiles
    dirtTiles: dirtTiles,
    grassTiles: grassTiles,
    rockTiles: rockTiles,
    sandTiles: sandTiles,
    snowTiles: snowTiles,

    // Assets
    rocks: rocksAssets,
    flower: flowerAssets,
    bush: bushAssets,
    boulder: boulderAssets,
    stump: stumpAssets,
    tree: treeAssets,
    branch: branchAssets,
}

export default assets