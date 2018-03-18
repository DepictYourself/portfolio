const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader', 
                        options: { 
                            extract: true,
                            spriteFilename: svgPath => `sprite${svgPath.substr(-4)}`
                        } 
                    },
                    'svg-fill-loader',
                ]
            },
            /* {
                test: /\.scss$/,
                use: [
                  {
                    loader: 'style-loader'
                  },
                  {
                    loader: 'css-loader'
                  },
                  {
                    loader: 'sass-loader'
                  }
                ]
              }, */
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                    {
                        loader: "css-loader",
                        options: { minimize: true }
                    },
                    {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true}
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[path][name].[ext]'
                        }  
                    }
                ]
            }
            
        ]
    },
    plugins: [
        extractSass,
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new SpriteLoaderPlugin()
    ]
}