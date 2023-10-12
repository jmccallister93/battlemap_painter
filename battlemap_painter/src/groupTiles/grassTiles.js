const grassTiles = (r => {
  return r.keys().map(key => r(key));
})(require.context('../assets/grassTiles/', false, /\.jpg$/));

export default grassTiles;
