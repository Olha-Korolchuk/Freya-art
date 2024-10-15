const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    mode: 'production',
    plugins: [new MiniCssExtractPlugin()],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[name]__[local]',
                                // namedExport: true, case 1;
                                namedExport: false,
                            },
                        },
                    },
                ],
            },
        ],
    },
};

module.exports = merge(baseConfig, config);
