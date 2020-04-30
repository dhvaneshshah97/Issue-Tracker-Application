const express = require('express');
const proxy = require('http-proxy-middleware');
const apiProxyTarget = process.env.API_PROXY_TARGET;
if (apiProxyTarget){
    app.use('/graphql',proxy({target : apiProxyTarget}));
}
const app = express();
const middleware = express.static('public');   
app.use(middleware);
app.listen(8000, () => {console.log("UI started on port 8000")});