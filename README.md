# Site starter
![Node.js CI](https://github.com/robisim74/site-starter/workflows/Node.js%20CI/badge.svg)
> Build a site with Webpack, Babel, ES6 or TypeScript, critical CSS & differential loading. SEO & performance friendly

[Live example]( https://robisim74.github.io/site-starter/)

## Features

* _Babel_ & _webpack_
* ES6 & _TypeScript_
* CSS, _SASS_ & _Autoprefixer_
* _ESLint_
* Critical CSS
* Differential loading
* One page or Multi page
* Sitemap
* End-to-end testing with _Cypress_


## Contents
* [Getting started](#1)
* [Project structure](#2)
* [What's new](#3)


## <a name="1"></a>Getting started
Download the code & configure the project in `config.js` file.

### Installation
For development, _Node.js_ 12 or higher is required.

```Shell
npm install
```

### Start DevServer
```Shell
npm start
```

### Test
```Shell
npm test
```

### Build
```Shell
npm run build
```

![build](https://user-images.githubusercontent.com/14012361/89346127-d2efc480-d6a8-11ea-938e-92c155d50735.png)


## <a name="2"></a>Project structure
- Site
    - **src/** source code folder
    - **config.js** site configuration
    
- Scripts & configuration files
    - **build.js** building process
        - runs _webpack_ to generate es2015 bundles
        - runs _webpack_ to generate es5 bundles
        - runs _critical_ to inline critical CSS
        - runs _sitemap_ to generate `sitemap.xml`
    - **scripts/** scripts used by the building process
    - **babel.config.js** _Babel_ configuration
        - _modern_ env for development & production (es2015)
        - _legacy_ env for production (es5)
    - **webpack.config.dev.js** _webpack_ configuration for development
    - **webpack.config.prod.js** _webpack_ configurations for building es2015 & es5 bundles
    - **.browserslistrc** target browsers for es5 bundles & _Autoprefixer_
    - **postcss.config.js** _PostCSS_ configuration file to use _Autoprefixer_
    - **.eslintrc.js** _ESLint_ configuration file
    - **tsconfig** _TypeScript_ configuration file
    - **package.json** _npm_ options & scripts
- Testing:
    - **cypress/** _Cypress_ folder with test files
    - **cypress.json** _Cypress_ configuration file

## <a name="3"></a>What's new
You can find template changes [here](https://github.com/robisim74/site-starter/releases).


## License
MIT
