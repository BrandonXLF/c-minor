import CopyPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';

export default [
    {
        entry: {
            demo: './src/demo.js',
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: './src/demo.css',
                        to: 'demo.css',
                    },
                    {
                        from: './src/demo.html',
                        to: 'index.html',
                    }
                ],
            }),
            new webpack.ProvidePlugin({
                c: ['c-tiny', 'default']
            }),
        ],
    },
];