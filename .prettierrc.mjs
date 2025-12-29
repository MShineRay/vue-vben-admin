/** @type {import('prettier').Config} */
export default {
  // 基础配置
  printWidth: 100, // 每行最大字符数
  tabWidth: 2, // 缩进空格数
  useTabs: false, // 使用空格而非 tab
  semi: false, // 不使用分号（Vue 项目常用）
  singleQuote: true, // 使用单引号
  quoteProps: 'as-needed', // 只在需要时给对象属性加引号
  trailingComma: 'es5', // 尾随逗号（ES5 兼容）
  bracketSpacing: true, // 对象括号间空格
  arrowParens: 'always', // 箭头函数参数总是加括号
  endOfLine: 'lf', // 使用 LF 换行符

  // Vue 相关
  vueIndentScriptAndStyle: false, // Vue 文件中的 script 和 style 标签不缩进

  // 文件特定配置
  overrides: [
    {
      files: '*.vue',
      options: {
        parser: 'vue',
      },
    },
    {
      files: '*.json',
      options: {
        parser: 'json',
        trailingComma: 'none',
      },
    },
    {
      files: '*.md',
      options: {
        parser: 'markdown',
        proseWrap: 'preserve', // Markdown 保持原样
        printWidth: 80, // Markdown 使用较窄的行宽
      },
    },
  ],
};
