require('dotenv').config();
const express = require('express');
const app = express();
const middleware = express.static('public'); 
const port = process.env.UI_SERVER_PORT || 8000;
const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT || 'http://localhost:3000/graphql';
const env = { UI_API_ENDPOINT };
app.get('/env.js', (req,res) => {
    res.send(`window.ENV = ${JSON.stringify(env)}`);
});  
app.use(middleware);
app.listen(port, () => {console.log(`UI started on port ${port}`)});