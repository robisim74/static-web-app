console.log('site-starter: ' + process.env.NODE_ENV);

/* example of es6 code that will need polyfills in the legacy build */
const array1 = [1, 2, 3, 4];
const map1 = array1.map(x => x * 2);
console.log(map1);

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});
