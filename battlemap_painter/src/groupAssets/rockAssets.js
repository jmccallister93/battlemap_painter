const rocksAssets = (r => {
    return r.keys().map(key => r(key));
})(require.context('../assets/rockPilesAssets/', false, /\.png$/));

export default rocksAssets;
