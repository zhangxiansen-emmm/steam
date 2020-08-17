module.exports = {
  // 指定脚本的运行环境，一个环境定义了一组预定义的全局变量
  "env": {
    "browser": true, //浏览器环境中的全局变量
    "es6": true, //启用除了modules以外的所有ES6特性（该选项会自动设置 ecmaVersion 解析器选项为 6）
    "node": true, //Node.js 全局变量和 Node.js 作用域
  },
  "extends": [
    "eslint:recommended", //所有在规则页面被标记为“✔️”的规则将会默认开启
    "plugin:react/recommended"
  ],
  // 设置全局变量
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  // 指定解析器
  "parser": "babel-eslint", //兼容ES处于实验性阶段的语法，如类属性用”=“赋值
  // 指定解析器选项
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "generators": true,
      "experimentalObjectRestSpread": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  // 第三方插件
  "plugins": [
    "react",
    "class-property",
  ],
  "settings": {
    'import/resolver': {
      // 识别 webpack 配置的路径别名
      webpack: {
        config: 'webpack.config.js',
      }
    },
  },
  "rules": {
    "comma-dangle": 1,
    "quotes": [0, "single"],
    "global-strict": 0,
    "no-extra-semi": 1,
    "no-underscore-dangle": 0,
    "no-console": 0,
    "no-undef": "warn",
    "no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "args": "after-used",
        "ignoreRestSiblings": false,
        "varsIgnorePattern": "createElement"
      }
    ],
    "no-trailing-spaces": [1, { "skipBlankLines": true }],
    "no-unreachable": 1,
    "no-alert": 0,
    "no-mixed-spaces-and-tabs": 1,
    "no-empty-pattern": 1,
    "no-empty": 1,
    "no-useless-escape": 1,
    "no-case-declarations": 1,
    "no-debugger": 1,
    "react/no-string-refs": 1,
    "react/react-in-jsx-scope": 2,
    "react/no-direct-mutation-state": 1,
    "react/prop-types": 0,
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/jsx-no-undef": 2,
    "react/display-name": 0,
    "react/no-deprecated": 0,
    "react/no-unescaped-entities": 1,
    "react/jsx-key": 1,
    "react/jsx-no-target-blank": 1,
    "react/no-find-dom-node": 1,
    "experimentalDecorators": 0
  }
}