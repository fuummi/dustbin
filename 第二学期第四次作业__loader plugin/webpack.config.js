const path = require('path')
const myloader = require('myloader')
const myplugin = require('myplugin')
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'myloader',
                        options: {
                            str: '摆烂',
                            to: '卷',
                        }
                    }
                ]
            },
        ],
    },
    plugins: [
        new myplugin({
            path:'./dist',
        })
    ],
}