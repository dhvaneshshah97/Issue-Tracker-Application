const express = require('express');
const app = express();
const middleware = express.static('public');   
app.use(middleware);
app.listen(8000, () => {console.log("UI started on port 8000")});