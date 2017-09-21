var path = require('path')

module.exports = {
    entry: './index.js',

    output: {
        path: __dirname,
        filename: 'index.bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
}