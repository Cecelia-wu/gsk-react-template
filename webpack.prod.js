const { merge } = require("webpack-merge"); //引入merge工具
const common = require("./webpack.common.js"); //引入刚才写的公共的webpack.common.js文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//使用merge，可以把common里面写的所有配置项都合并过来，然后再单独写在生产环境下需要的配置即可
module.exports = merge(common, {
  mode: "production", //当前环境变量
  output: {
    filename: "static/js/[name].[contenthash:8].js", //将js文件放到对应的目录下，并使用hash值命名，当js内容修改后，文件名也会对应修改
    publicPath: "./" //公共路径，生产环境写相对路径，这样前端页面放到其他的目录下的时候不会出现白屏问题
  },
  devtool: "source-map",  //生产环境下用的source map 模式
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [ //loader 顺序是自下而上执行，所以顺序一定不要错
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../../" //这个路径是控制打包的css文件里面写的路径，因为把css文件放到了static/css文件下了，所以需要重置下css里面的公共路径配置
            }
          },
          "css-loader", //如果需要使用css module模式的话，在这个loader里面添加配置即可，自己百度下
          "sass-loader"
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules/", //处理js文件，剔除node_modules文件里面的文件
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", {
                  "runtime": "automatic"
                }]
              ]
              //生产环境下不需要HRM热模块更新，所以去掉
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/[name]_[contenthash:8].css" //配置css文件输出路径
    }),
  ]
})
