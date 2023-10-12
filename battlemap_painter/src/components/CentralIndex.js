import rocksAssets from "../groupAssets/rockAssets";
import bushAssets from "../groupAssets/bushAssets";
import boulderAssets from "../groupAssets/boulderAssets";
import treeAssets from "../groupAssets/treeAssets";
import dirtTiles from "../groupTiles/dirtTiles";
import grassTiles from "../groupTiles/grassTiles";
import rockTiles from "../groupTiles/rockTiles";
import sandTiles from "../groupTiles/sandTiles";
import snowTiles from "../groupTiles/snowtiles";

const assets = {
    // Tiles
    dirtTiles: dirtTiles,
    grassTiles: grassTiles,
    rocktiles: rockTiles,
    sandTiles: sandTiles,
    snowTiles: snowTiles,

    // Assets
    rocks: rocksAssets,
    bush: bushAssets,
    boulder: boulderAssets,
    tree: treeAssets,
}

export default assets