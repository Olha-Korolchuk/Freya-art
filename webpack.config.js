const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/main.tsx',
    devServer: {
        open: true,
        port: 3000,
        historyApiFallback: true,
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.png'],
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i, // Add this rule to handle image files
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]', // Name format for output files
                            outputPath: 'assets/images', // Directory where images will be output
                        },
                    },
                ],
            },
            {
                test: /\.css$/, // Add this rule to handle CSS files
                use: ['style-loader', 'css-loader'], // Loaders to process CSS
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
    ],
};
