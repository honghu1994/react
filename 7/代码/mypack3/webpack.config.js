const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    // 设置打包的模式是生产模式
    mode:'production',
    // 设置入口文件地址
    entry:'./src/index.js',
    // 设置打包生成的文件名称及存储地址
    output:{
        filename:'main.js',
        path:path.resolve(__dirname,'public')
    },
    module:{ // 设置其他文件的loader规则
        rules:[
            {
                test:/\.css$/,
                // loader的执行顺序是从右往左执行
                loader:['style-loader','css-loader']
            },
            {
                test:/\.less$/,
                loader:['style-loader','css-loader','less-loader']
            },
            {
                test:/\.(jpe?g|png|gif)$/,
                use:{
                    // url-loader 会根据limit的大小来使用file-loader
                    // 当文件的容量小于limit，就用url-loader,当容量大于limit，url-loader会调用file-loader
                    loader:'url-loader',
                    options:{
                        // 设置图片的容器，小于这个容量的打包成base64
                        // 大于这个容量的，打包成文件 10240
                        limit:10240,
                        // 打包成文后，用原来的文件名和扩展名
                        name:'[name].[ext]',
                        // 将打包的文件放入到images文件夹中
                        outputPath:'images/'
                    }
                }
            },
            { // 打包react代码相关设置
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader"
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                'file-loader'
                ]
            }
        ]
    },
    plugins:[
        // 将src里面的index.html模板打包到public文件中去的插件
        new HtmlWebpackPlugin({template:'./src/index.html'}),
        // 清理public文件夹的插件
        //new CleanWebpackPlugin(),
        // 组件热更新插件
        new webpack.HotModuleReplacementPlugin()
    ],
    // 开发服务器相关设置
    devServer:{
        // 默认运行的文件夹
        contentBase:'./public',
        // 自动打开浏览器，运行网页
        open:true,
        port:8080,
        // 开启热更新，这样，在修改样式时，页面不刷新就可以更新样式
        hot:true
    }
}