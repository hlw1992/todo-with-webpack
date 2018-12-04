const path=require('path')
const VueLoaderPlugin=require('vue-loader/lib/plugin')
const HTMLPlugin=require('html-webpack-plugin')
const webpack=require('webpack')
//单独分离打包css
const ExtractPlugin=require('extract-text-webpack-plugin')
//判断 开发环境
const isDev= process.env.NODE_ENV==='development'

const config={
    target:'web',
    mode:'production',
    //入口文件路径
    // entry:path.join(__dirname,'src/index.js'),
    entry:__dirname+'/src/index.js',
    //输出
    output:{
        filename:'bundle.[hash:8].js',
        path:__dirname+'/dist/'
    },
    module:{
        rules:[
            {test:/\.vue$/,use:'vue-loader'},
            {test:/\.jsx$/,use:'babel-loader'},
            {test:/\.css$/,use:[
                'style-loader',
                'css-loader'
            ]},
            {test:/\.(gif|jpg|jpeg|png|svg)$/,use:[
                {
                    loader:'url-loader',
                    options:{
                        limit:1024,
                        name:'[name]-aaa.[ext]'
                    }
                }
            ]}
        ]
    },  
    plugins:[
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV: isDev ? '"development"':'"production"'
            }
        }),
        new HTMLPlugin()
    ]
}
//根据开发环境 改变配置文件
if(isDev){
    config.module.rules.push({
        test:/\.styl(us)?$/,
        use:[
            'style-loader',
            'css-loader',
            {
                loader:'postcss-loader',
                options:{
                    sourceMap:true
                }
            },
            'stylus-loader'
            ]
        })
    config.devtool='#cheap-module-eval-source-map'
    config.devServer={
        port:8000,
        host:'0.0.0.0',
        overlay:{
            errors:true
        },
        //局部组件热更新,配合下面两行代码使用
        hot:true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}else{
    config.entry={
        app: path.join(__dirname+'/src/index.js'),
        vendor: ['vue']
    }
    config.output.filename='[name].[chunkhash:8].js'
    config.module.rules.push(
        {
        test:/\.styl(us)?$/,
        use:ExtractPlugin.extract({
            fallback:'style-loader',
            use:[
                'css-loader',
                {
                    loader:'postcss-loader',
                    options:{
                        sourceMap:true
                    }
                },
                'stylus-loader'
            ]
        })
        }
    )
    config.plugins.push(
        new ExtractPlugin('styles.[chunkhash:8].css')
    )
    config.optimization = {
        splitChunks: {
          cacheGroups: {
            commons: {
              chunks: 'initial',
              minChunks: 2, maxInitialRequests: 5,
              minSize: 0
            },
            vendor: {
              test: /node_modules/,
              chunks: 'initial',
              name: 'vendor',
              priority: 10,
              enforce: true
            }
          }
        },
        runtimeChunk: true
    }
}
module.exports=config