module.exports = {
    devServer: {
        host: 'localhost',
        port: 8089,
        https: false, //是否开启https
        hotOnly: true, //是否配置热更新
        open: false, //配置自动启动浏览器
        proxy: {
            '/api': {
                target: 'http://localhost:8009',
                changeOrigin: true,
                pathRewrite: {
                    // 这里少加了一个/api 
                    '^/api': '/api'
                }
            }
        }
    },
    //关闭eslintr检测
    lintOnSave: false,
    //改变标题
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = '图书管理系统'
                return args
            })
    }
}