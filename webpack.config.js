var path = require('path');

const entryPATH = path.resolve(`${ __dirname }/app/src`)
const outputPATH = path.resolve(`${ __dirname }/dist`)

module.exports =  {
    entry: path.resolve(`${ entryPATH }/index.js`),
    output: {
        path: outputPATH,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: entryPATH,
                loader: 'babel-loader',
                query: {
                    presets: [
                        'react',
                        'es2015',
                    ]
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
};
