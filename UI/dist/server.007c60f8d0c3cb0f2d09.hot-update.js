exports.id = "server";
exports.modules = {

/***/ "./server/render.jsx":
false,

/***/ "./server/template.js":
false,

/***/ "./server/uiserver.js":
/*!****************************!*\
  !*** ./server/uiserver.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* eslint linebreak-style: ["error", "windows"] */
const express = __webpack_require__(/*! express */ "express");

__webpack_require__(/*! dotenv */ "dotenv").config();

const path = __webpack_require__(/*! path */ "path");

const port = process.env.UI_SERVER_PORT || 8000; // const proxy = require('http-proxy-middleware');
// const apiProxyTarget = process.env.API_PROXY_TARGET;
// if (apiProxyTarget){
//     app.use('/graphql',proxy({target : apiProxyTarget}));
// }

const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT || 'http://localhost:3000/graphql';
const env = {
  UI_API_ENDPOINT
};
const app = express();
const enableHMR = (process.env.ENABLE_HMR || 'true') === 'true';

if (enableHMR && "development" !== 'production') {
  console.log('Adding dev middleware, enabling HMR');
  /* eslint "global-require": "off" */

  /* eslint "import/no-extraneous-dependencies": "off" */

  const webpack = __webpack_require__(/*! webpack */ "webpack");

  const devMiddleware = __webpack_require__(/*! webpack-dev-middleware */ "webpack-dev-middleware");

  const hotMiddleware = __webpack_require__(/*! webpack-hot-middleware */ "webpack-hot-middleware");

  const config = __webpack_require__(/*! ../webpack.config.js */ "./webpack.config.js");

  config.entry.app.push('webpack-hot-middleware/client');
  config.plugins = config.plugins || [];
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  const compiler = webpack(config);
  app.use(devMiddleware(compiler));
  app.use(hotMiddleware(compiler));
}

app.get('/env.js', (req, res) => {
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});
const middleware = express.static('public');
app.use('/', middleware);
app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});
app.listen(8000, () => {
  console.log(`UI started on port ${port}`);
});

/***/ }),

/***/ "./src/About.jsx":
false,

/***/ "./src/Contents.jsx":
false,

/***/ "./src/IssueAddNavItem.jsx":
false,

/***/ "./src/IssueDetail.jsx":
false,

/***/ "./src/IssueEdit.jsx":
false,

/***/ "./src/IssueFilter.jsx":
false,

/***/ "./src/IssueList.jsx":
false,

/***/ "./src/IssueReport.jsx":
false,

/***/ "./src/IssueTable.jsx":
false,

/***/ "./src/NotFound.jsx":
false,

/***/ "./src/NumInput.jsx":
false,

/***/ "./src/Page.jsx":
false,

/***/ "./src/Toast.jsx":
false,

/***/ "./src/graphQLFetch.js":
false,

/***/ "./src/routes.js":
false,

/***/ "./src/store.js":
false,

/***/ "./webpack.config.js":
/*!***************************!*\
  !*** ./webpack.config.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {const path = __webpack_require__(/*! path */ "path");

module.exports = {
  mode: 'development',
  entry: {
    app: ['./browser/app.jsx']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }]
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all'
    }
  },
  devtool: 'source-map'
};
/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "isomorphic-fetch":
false,

/***/ "react":
false,

/***/ "react-bootstrap":
false,

/***/ "react-dom/server":
false,

/***/ "react-router-bootstrap":
false,

/***/ "react-router-dom":
false,

/***/ "source-map-support":
false,

/***/ "webpack-node-externals":
false

};
//# sourceMappingURL=server.007c60f8d0c3cb0f2d09.hot-update.js.map