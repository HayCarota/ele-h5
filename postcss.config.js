module.exports = {
    Plugin: {
        autoprefixer: {
            overrideBrowerslist: ['Android >= 4.0', 'iOS >= 7'] // css前缀适配版本
        },
        'postcss-pxtorem': {
            rootValue: 16, // 根节点的 fontSize 值
            propList: ['*'], // 需要修改的css属性为全部
            selectorBlackList: [':root'] // root定义的值
        }
    }
}