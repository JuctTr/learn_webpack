const css = require('css'); // 解析css 文件为 ast
const path = require('path');

/**
 * 偏函数
 * @param {*} type
 * @returns
 */
const isType = function (type) {
    return function (obj) {
        return Object.prototype.toString.call(obj) == '[object ' + type + ']';
    };
};
const _isArray = isType('Array');
const _isRegExp = isType('RegExp');

function checkOptions(options) {
    if (options.excludes && !_isArray(options.excludes))
        throw new TypeError('[px2vw-loader] => options.excludes must be Array');
    if (options.viewportWidth && typeof options.viewportWidth !== 'number') {
        throw new TypeError('[px2vw-loader] => options.viewportWidth must be number');
    }
    if (options.decimal && typeof options.decimal !== 'number') {
        throw new TypeError('[px2vw-loader] => options.decimal must be number');
    }
    if (options.afterConvertUnit && typeof options.afterConvertUnit !== 'string') {
        throw new TypeError('[px2vw-loader] => options.viewportWidth must be string');
    }
}

function ignoreFiles(filePath, options) {
    const excludes = options.excludes;
    if (!excludes) return false;

    const result = [];

    for (let i = 0; i < excludes.length; i++) {
        const item = excludes[i];
        if (typeof item == 'string') {
            const fullFilePath = path.join(process.cwd(), item);
            result.push(fullFilePath === filePath);
        } else if (_isRegExp(item)) {
            result.push(item.test(filePath));
        } else {
            throw new TypeError('[px2vw-loader] => options.excludes item must be String or RegExp');
        }
    }
    return result.some(item => item);
}

function transformUnit(value, options) {
    const matchResult = pxReg.exec(value);
    const target = matchResult[0]; // 10px
    const number = matchResult[1]; // 10
    const unit = options.viewportWidth || 375; // 不传默认是375
    const decimal = options.decimal || 8; // 保留几位小数 默认8位
    let newNumber = (parseFloat(number) / unit) * 100;
    let result = newNumber.toFixed(decimal);
    return value.replace(target, `${result}${options.afterConvertUnit}`);
}

/**
 * parse(解析)：解析源代码为 ast，抽象语法树
 * transform(转换)：对抽象语法树进行转换
 * generator(生成)：将转换后的 ast 生成新的代码
 * @param {*} source
 * @param {*} sourceMap
 * @param {*} meta
 * @returns
 */
const pxReg = /(\d+(\.\d+)?)px/; // px 的正则
const keepInitialReg = /(\d+(\.\d+)?)PX/; // 保留原来的单位，不被转换

function px2vwLoader(source, sourceMap, meta) {
    this.cacheable && this.cacheable();
    const options = this.getOptions();

    // 检查配置输入是否正确
    checkOptions(options);

    // 忽略文件
    const filePath = this.resource;
    if (ignoreFiles(filePath, options)) return source;

    function PX2px(value) {
        const number = keepInitialReg.exec(value)[1];
        return `${number}px`;
    }

    const cssObj = css.parse(source);
    const rules = cssObj.stylesheet.rules;

    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        const declarations = rule.declarations;

        for (let j = 0; j < declarations.length; j++) {
            const declaration = declarations[j];

            if (declaration.type !== 'declaration') return;

            if (pxReg.test(declaration.value)) {
                declaration.value = transformUnit(declaration.value, options);
            }

            if (keepInitialReg.test(declaration.value)) {
                declaration.value = PX2px(declaration.value);
            }
        }
    }

    return css.stringify(cssObj);
}

module.exports = px2vwLoader;
