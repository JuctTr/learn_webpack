module.exports = function newF () {
    // 用new Object() 的方式新建了一个对象 obj
    const obj = {};
    // 取出第一个参数，也就是我们要传入的构造函数
    // eslint-disable-next-line prefer-rest-params
    const Constructor = [].shift.call(arguments)

    // eslint-disable-next-line no-proto
    obj.__proto__ = Constructor.prototype

    // eslint-disable-next-line prefer-rest-params
    const result = Constructor.apply(obj, arguments)

    return typeof result === 'object' ? result : obj;
}
