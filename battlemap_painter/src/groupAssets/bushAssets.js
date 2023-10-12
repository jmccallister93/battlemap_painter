const bushAssets = (r => {
  return r.keys().map(key => r(key));
})(require.context('../assets/bushAssets/', false, /\.png$/));

export default bushAssets;
