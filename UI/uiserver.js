 /* eslint linebreak-style: ["error", "windows"] */
const express = require('express');
require('dotenv').config();

const port = process.env.UI_SERVER_PORT || 8000;
// const proxy = require('http-proxy-middleware');
// const apiProxyTarget = process.env.API_PROXY_TARGET;
// if (apiProxyTarget){
//     app.use('/graphql',proxy({target : apiProxyTarget}));
// }
const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT 
    || 'http://localhost:3000/graphql';
const env = { UI_API_ENDPOINT };

const app = express();
app.get('/env.js', (req, res) => {
    res.send(`window.ENV = ${JSON.stringify(env)}`)
    })
const middleware = express.static('public');   
app.use(middleware);
app.listen(8000, () => {console.log(`UI started on port ${port}`)});