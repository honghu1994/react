const path = require('path');

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
            }
        ]
    }
}