// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
      parser: 'babel-eslint'
    },
    env: {
      browser: true,
    },
    extends: [
      // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
      // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
      'plugin:vue/essential', 
      // https://github.com/standard/standard/blob/master/docs/RULES-en.md
      'standard'
    ],
    // required to lint *.vue files
    plugins: [
      'vue'
    ],
    // add your custom rules here
    rules: {
      // allow async-await
      'generator-star-spacing': 'off',
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      "no-multiple-empty-lines": ["error", {
        "max": 2, // "max"（默认2：）强制连续空行的最大数量
        "maxEOF": 2, // "maxEOF" 在文件末尾强制执行最大数量的连续空行
        "maxBOF": 2 // "maxBOF" 在文件的开头强制执行最大数量的连续空行
    }]
    }
  }
  