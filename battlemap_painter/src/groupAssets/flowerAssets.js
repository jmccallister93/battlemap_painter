const flowerAssets = (r => {
    return r.keys().map(key => r(key));
  })(require.context('../assets/flowerAssets/', false, /\.png$/));
  
  export default flowerAssets;
