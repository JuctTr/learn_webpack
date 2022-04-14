

export function customCall (context) {
    if (typeof this !== 'function') {
        throw new TypeError()
    }
    context = context || window;
    context.fn = this;
    // eslint-disable-next-line prefer-rest-params
    const args = [...arguments].slice(1);
    const result = context.fn(...args);
    delete context.fn;
    return result;
}

export function customApply (context) {
    if (typeof this !== 'function') {
        throw new TypeError()
    }
    context = context || window
    context.fn = this;
    let result;
    // 判断第二个参数是否存在，也就是context后面有没有一个数组
    // 如果存在，则需要展开第二个参数
    // eslint-disable-next-line prefer-rest-params
    if (arguments[1]) {
        // eslint-disable-next-line prefer-rest-params
        result = context.fn(...arguments[1]);
    } else {
        result = context.fn();
    }
    delete context.fn;
    return result;
}
export function customBind (context) {
    if (typeof this !== 'function') {
        throw new TypeError()
    }
    context = context || window
    const Func = this;
    // eslint-disable-next-line prefer-rest-params
    const args = [...arguments].slice(1);
    // 返回一个函数
    return function F () {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
        if (this instanceof F) {
            // eslint-disable-next-line prefer-rest-params
            return new Func(...args, ...arguments)
        }
        // eslint-disable-next-line prefer-rest-params
        return Func.apply(context, args.concat(...arguments))
    }
}
