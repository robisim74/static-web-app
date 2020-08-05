/**
 * Site configuration
 */
const config = {
    buildDir: 'build',
    /**
     * Entry points as in src folder
     */
    entries: [
        { name: 'home', template: './index.html', module: './index.ts', style: './index.scss', path: '/' },
        { name: 'about', template: './about/index.html', module: './about/index.ts', style: './about/index.scss', path: 'about/' },
    ],
    /**
     *  Files or directories to copy from src to the build directory
     */
    assets: [
        'assets',
    ],
    /**
     * For sitemap URLs
     */
    hostname: 'https://example.com',
};


module.exports = config;
