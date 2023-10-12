const treeAssets = (r => {
  return r.keys().map(key => r(key));
})(require.context('../assets/treeAssets/', false, /\.png$/));

export default treeAssets;
