require('dotenv').config();
const express = require("express");
const cors = require('cors');
const port = process.env.API_SERVER_PORT || 3000;
const { connectToDb } = require('./db');
const { installHandler } = require('./api_handler')
const auth = require('./auth');
const app = express();
app.use(cors());
app.use('/auth', auth.routes);

installHandler(app);

(async function start() {
    try {
        await connectToDb();
        app.listen(port, () => {
            console.log(`API server started on port ${port}`);
        });
    }
    catch (err) {
        console.log('ERROR:', err);
    }
}());
