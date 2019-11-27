const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require('./webpack.base.conf');
const siteConfig = require('../config/config')
module.exports = merge(config, {
    devtool: siteConfig.dev.devtool,
    devServer: {
        contentBase: './src', //！！！静态文件获取地址(一般写html时以该地址为根目录，scss，js文件还是按层级关系来)，文档链接（ https: //webpack.js.org/configuration/dev-server/#devserver-contentbase）
        host: siteConfig.dev.host,
        hot: true,
        inline: true,
        port: siteConfig.dev.port,
        compress: true,
        open: siteConfig.dev.autoOpenBrowser,
        // publicPath: './', 
    },
    module: {
        rules: [{
                include: rootDir('sass'),
                test: /(\.scss|\.css)$/,
                use: [{
                    loader: "style-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "postcss-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true,
                        outputStyle: 'expanded',
                        sourceMapContents: true,
                        sourceComments: true,
                        sourceMapEmbed: true
                    }
                }],
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "raw-loader"
                }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
});
   
pagesBuild();

// 构建之前往入口文件添加HTML文件(HTML热更新)
/*addHtml();*/

function addHtml() {
    Object.keys(module.exports.entry).forEach((v) => {
        let str = `import 'pages/${v}.html'`;
        fs.readFile(rootDir(`entry/${v}.js`), 'UTF8', (err, data) => {
            if (!(data.indexOf(str) === -1) || v === 'common') {
                return
            }
            fs.appendFile(rootDir(`entry/${v}.js`), str);
        });
    });
}

//多页面html构建
function pagesBuild() {
    Object.keys(module.exports.entry).forEach((key) => {
        if (key === 'common') return
        const htmlPlugin = new HtmlWebpackPlugin({
            filename: `${key}.html`,
            chunks: ['vendor', key],
            inject: 'body',
            template: rootDir(`pages/${key}.html`),
        });
        module.exports.plugins.push(htmlPlugin);
    })
}

function rootDir(src) {
    return path.join(__dirname, '../src', src);
}