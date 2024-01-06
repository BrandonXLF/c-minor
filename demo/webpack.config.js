import CopyPlugin from 'copy-webpack-plugin';

export default [
    {
        entry: {
            index: './src/index.js',
        },
        mode: 'development',
        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: './src/index.{html,css}',
                        to: '[name][ext]',
                    },
                ],
            }),
        ],
    },
];