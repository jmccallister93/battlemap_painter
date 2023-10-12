const snowTiles = (r => {
  return r.keys().map(key => r(key));
})(require.context('../assets/snowTiles/', false, /\.jpg$/));

export default snowTiles;
