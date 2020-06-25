/* eslint linebreak-style: ["error", "windows"] */
const express = require('express');
require('dotenv').config();
const path = require('path');

const port = process.env.UI_SERVER_PORT || 8000;
// const proxy = require('http-proxy-middleware');
// const apiProxyTarget = process.env.API_PROXY_TARGET;
// if (apiProxyTarget){
//     app.use('/graphql',proxy({target : apiProxyTarget}));
// }
const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT
    || 'http://localhost:3000/graphql';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID; 
const UI_AUTH_ENDPOINT = process.env.UI_AUTH_ENDPOINT;
const env = { 
    UI_API_ENDPOINT,
    GOOGLE_CLIENT_ID,
    UI_AUTH_ENDPOINT, 
};

const app = express();

const enableHMR = (process.env.ENABLE_HMR || 'true') === 'true';
if (enableHMR && (process.env.NODE_ENV !== 'production')) {
    console.log('Adding dev middleware, enabling HMR');
    /* eslint "global-require": "off" */
    /* eslint "import/no-extraneous-dependencies": "off" */
    const webpack = require('webpack');
    const devMiddleware = require('webpack-dev-middleware');
    const hotMiddleware = require('webpack-hot-middleware');
    const config = require('./webpack.config.js');
    config.entry.app.push('webpack-hot-middleware/client');
    config.plugins = config.plugins || [];
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    const compiler = webpack(config);
    app.use(devMiddleware(compiler));
    app.use(hotMiddleware(compiler));
}

app.get('/env.js', (req, res) => {
    res.send(`window.ENV = ${JSON.stringify(env)}`)
})
const middleware = express.static('public');
app.use('/', middleware);
app.get('*', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
});
app.listen(8000, () => { console.log(`UI started on port ${port}`) });