const stumpAssets = (r => {
    return r.keys().map(key => r(key));
  })(require.context('../assets/stumpAssets/', false, /\.png$/));
  
  export default stumpAssets;
  