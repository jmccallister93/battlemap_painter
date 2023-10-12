const dirtPathsAssets = (r => {
    return r.keys().map(key => r(key));
  })(require.context('../assets/dirtPathAssets/', false, /\.png$/));
  
  export default dirtPathsAssets;
  