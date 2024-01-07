import CopyPlugin from 'copy-webpack-plugin';

export default [
    {
        entry: {
            demo: './src/demo.js',
        },
        mode: 'development',
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
        ],
    },
];