const rockTiles = (r => {
  return r.keys().map(key => r(key));
})(require.context('../assets/rockTiles/', false, /\.jpg$/));

export default rockTiles;
