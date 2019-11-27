//根据当前的环境定义根路径
//process.env是nodejs的进程环境变量，可以添加任意属性
//在这里就是根据开发模式和生产模式配置的NODE_ENV的不同值来动态改变项目资源根路径
//官方文档（http://nodejs.cn/api/process.html#process_process_env）
const rootDir = process.env.NODE_ENV === 'development' ?
   'https://greatfilm.cn/':          //正式上线后这里改为域名
   '/';                              //正式上线后这里改为"/"，主要考虑火狐浏览器不支持跨域名。



module.exports = {
    //测试或上线地址
    rootDir: rootDir,
    //阿里图标库的CDN链接
    cdn: 'https://at.alicdn.com/t/font_825640_287tohs8kzw.css',

    //开发环境配置
    dev: {
        // 服务器配置,官方文档（https://webpack.js.org/configuration/dev-server/）
        // 主机名(调响应式需要改为本机IP地址才能在手机端访问)
        // 查看本机IP地址(window系统)：
        // 1. 快捷键：win + r打开运行窗口
        // 2. 输入cmd回车打开命令行窗口
        // 3. 在命令行窗口输入：ipconfig回车查看IPV4地址即可
        host: 'localhost',
        // host: '192.168.1.110',
        port: 4500, //端口选择
        autoOpenBrowser: true, //自动打开浏览器

        //Source Maps配置
        //官方文档（https://webpack.js.org/configuration/devtool/#development）
        //中文解释参考（https://segmentfault.com/a/1190000004280859）
        //推荐开发模式用cheap-module-eval-source-map
        devtool: 'cheap-module-eval-source-map',
    },

    //生产环境配置
    build: {
        //Source Maps配置
        //官方文档（https://webpack.js.org/configuration/devtool/#development）
        //中文解释参考（https://segmentfault.com/a/1190000004280859）
        devtool: 'source-map',

        // 打包代码分析配置
        bundleAnalyzerReport: false
    }
}