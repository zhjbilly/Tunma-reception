const AutoImport = require('unplugin-auto-import/webpack');
module.exports = {
    plugins: [
        AutoImport({
            imports: [
                'vue', // 自动引入 Vue API
                'vue-router', // 如果需要，自动引入 Vue Router API
            ],
            dts: true, // 生成类型声明文件
        }),
    ],
};
