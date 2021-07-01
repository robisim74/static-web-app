/**
 * Site configuration
 */
const config = {
    buildDir: 'build',
    /**
     * Entry points as in src folder
     */
    entries: [
        { name: 'home', template: './index.html', module: './index.ts', style: './index.scss', path: '/static-web-app' },
        { name: 'about', template: './about/index.html', module: './about/index.ts', style: './about/index.scss', path: '/static-web-app/about' },
    ],
    /**
     * Files or directories to copy from src to the build directory
     */
    assets: [
        'assets',
        '404.html'
    ],
    /**
     * Polyfills for legacy build
     */
    polyfills: [
        'core-js/modules/es.promise',
        'core-js/modules/es.array.iterator',
        '@webcomponents/webcomponentsjs'
    ],
    /**
     * Production base href
     */
    baseHref: 'https://robisim74.github.io/static-web-app/',
    /**
     * For sitemap URLs
     */
    hostname: 'https://robisim74.github.io'
};

module.exports = config;
