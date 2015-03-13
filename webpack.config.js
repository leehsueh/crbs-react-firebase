module.exports = {
  entry: "./app/App.js",
  output: {
    filename: "bundle.js",
    publicPath: "/",
    path: "./public"
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'}
    ]
  }
};