/* Web Components */
import './components/nav-menu';

console.log('static-web-app: NODE_ENV ' + process.env.NODE_ENV);
console.log('static-web-app: envNAME ' + envName);

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});
