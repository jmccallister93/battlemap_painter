const cliffAssets = (r => {
    return r.keys().map(key => r(key));
  })(require.context('../assets/cliffAssets/', false, /\.png$/));
  
  export default cliffAssets;
  