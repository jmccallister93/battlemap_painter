const sandTiles = (r => {
  return r.keys().map(key => r(key));
})(require.context('../assets/sandTiles/', false, /\.jpg$/));

export default sandTiles;
