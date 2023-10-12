const branchAssets = (r => {
    return r.keys().map(key => r(key));
  })(require.context('../assets/branchAssets/', false, /\.png$/));
  
  export default branchAssets;
  