function debounce (func, wait, options) {
    const isFunction = Object.prototype.toString.call(func) === '[object Function]';
    if (!isFunction) return new Error('the ,dfasdfasdfsdf. not a function')

    let leading = false
    let maxing = false
    let trailing = true

    leading = options.leading
    maxing = +wait
    trailing = options.trailing


    var timer = null;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            func.apply(context, args);
        }, wait);
    };
}

