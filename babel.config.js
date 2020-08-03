module.exports = {
    env: {
        // Config to generate bundles for modern browsers
        modern: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            esmodules: true
                        }
                    },
                    '@babel/typescript'
                ]
            ],
            plugins: [
                '@babel/plugin-syntax-dynamic-import'
            ]
        },
        // Config to generate bundles for legacy browsers
        legacy: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        useBuiltIns: 'usage',
                        corejs: '3.0.0',
                        targets: 'defaults'
                    },
                    '@babel/typescript'
                ]
            ],
            plugins: [
                '@babel/plugin-syntax-dynamic-import'
            ]
        },
    }
};