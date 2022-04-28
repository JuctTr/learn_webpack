// const loaderUtils = require('loader-utils');

/**
 * @description
 * @param {string|Buffer} source 源文件内容
 * @param {object} sourceMap SourceMap 数据
 * @param {any} meta meta 数据，可以是任何内容
 */
function conditionLoader (source, sourceMap, meta) {
    // 获取选项
    // const options = this.query;
    // 配置文件传进来的文件类型等数据
    // const { fileType = 'js' } = options;

    const commentStart = '\\/\\*'
    const commentEnd = '\\*\\/'

    const splitReg = new RegExp(`(${commentStart}\\s*?\\/?wxa[\\s\\S]*?${commentEnd})`)
    const codeAndAnnoArr = source.split(splitReg)
    if (codeAndAnnoArr.length <= 1) return source

    const matchReg = new RegExp(`${commentStart}\\s*?wxa[\\s\\S]+?(if|else-if|else)([\\s\\S]*?)${commentEnd}`)
    const ifEndReg = new RegExp(`${commentStart}\\s*?\\/wxa\\s*?${commentEnd}`)


    let funcBody = 'let code = ``;'
    codeAndAnnoArr.forEach(fragment => {
        const matchResut = fragment.match(matchReg)
        if (matchResut) {
            const isIfStart = matchResut[1] === 'if'
            const isElseIf = matchResut[1] === 'else-if'
            const isElse = matchResut[1] === 'else'
            const condition = (matchResut[2] || '').replace(':', '')
            if (isIfStart && condition) {
                funcBody += `if(${condition}){`
            } else if (isElseIf && condition) {
                funcBody += `} else if(${condition}){`
            } else if (isElse) {
                funcBody += `} else {`
            } else {
                throw new Error(`不支持的条件编译语法:${fragment}`)
            }
        } else if (ifEndReg.test(fragment)) {
            funcBody += `}`
        }
    })
    /* eslint-disable no-new-func */
    try {
        return new Function('app', 'type', funcBody)()
    } catch (e) {
        throw new Error(`条件编译存在语法错误${e.message}`)
    }

    // callback(
    //     err: Error | null,    // 错误信息
    //     content: string | Buffer,    // content信息
    //     sourceMap?: SourceMap,    // sourceMap
    //     meta?: any    // 会被 webpack 忽略，可以是任何东西
    //   );
    // const callback = this.async();
    // callback(null, `${source} => asyncLoader`, sourceMap, meta)
}

module.exports = conditionLoader;
