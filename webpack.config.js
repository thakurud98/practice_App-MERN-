var webpack = require('webpack')
var path = require('path')
/**Webpack config for loaders and plugins etc.. */
module.exports = {

    entry : './client/main.js',

    output : {
        path: path.resolve(__dirname,'./dist'),
        filename: 'bundle.js',
 
      publicPath: '/', // if you don't put the "/" here, you get this error:
    },

    module : {
        rules: [
            {
                //here we define what file type this rule should apply to
                test: /\.css$/,
                //which loader we are gonna use, string or array(for multiple)
                use:['style-loader', 'css-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
            
        ]
    }
}