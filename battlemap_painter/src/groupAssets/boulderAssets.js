const boulderAssets = (r => {
  return r.keys().map(key => r(key));
})(require.context('../assets/boulderAssets/', false, /\.png$/));

export default boulderAssets;
