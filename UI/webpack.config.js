const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.jsx',
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
            },
        ],
    },
};