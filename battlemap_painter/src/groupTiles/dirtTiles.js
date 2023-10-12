const dirtTiles = (r => {
  return r.keys().map(key => r(key));
})(require.context('../assets/dirtTiles/', false, /\.jpg$/));

export default dirtTiles;
