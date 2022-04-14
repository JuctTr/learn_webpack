module.exports = function newF () {
    // 用new Object() 的方式新建了一个对象 obj
    const obj = new Object();
    // 取出第一个参数，也就是我们要传入的构造函数
    let Constructor = [].shift.call(arguments)

    obj.__proto__ = Constructor.prototype

    const result = Constructor.apply(obj, arguments)

    return typeof result === 'object' ? result : obj;
}
