function instance_of (ordinary, construct) {
    const proro = construct.prototype;

    while (true) {
        if (ordinary === null) {
            return false
        }
        if (ordinary === proro) {
            return true
        }
        ordinary = ordinary.__proto__
    }
}

function newF (...args) {
    const target = {};

    const constructor = Array.prototype.shift.call(args);

    target.__proto__ = constructor.prototype;

    const result = constructor.apply(target, args)

    return typeof result === 'object' ? result : target;
}


function myCall (context) {
    if (typeof this !== 'function') {
        throw new TypeError()
    }
    context = context || window;
    context.fn = this;

    const args = [...arguments].slice(1)

    const result = context.fn(args)

    delete context.fn;

    return result;
}

function myApply (context) {
    if (typeof this !== 'function') {
        throw new TypeError()
    }
    context = context || window;
    context.fn = this;


    // 执行函数（相当于上文的bar(...args)）
    var result = null;
    if (arguments[1]) {
        result = context.fn(...arguments[1]);
    } else {
        result = context.fn();
    }

    delete context.fn;

    return result;
}

function myBind (context) {
    if (typeof this !== 'function') {
        throw new TypeError()
    }
    context = context || window;

    const Func = this;

    const args = [...arguments].slice(1);

    return function F () {
        if (this instanceof F) {
            return new Func(args, ...arguments);
        }
        return Func.apply(context, args.concat(...arguments))
    }
}


function myPromise () {
    return new Promise((resolve, reject) => {
        reject('error')
    })
}


// myPromise().then(res => {
//     console.info(res)
// }, error => {
//     console.error(error)
// }).catch(error => {
//     console.error('catch', error)
// })

function demo (s) {
    const hashMap = {
        ')': '(',
        '}': '{',
        ']': '[',
    }

    const result = []

    for (const item of s) {
        if (hashMap[item]) {
            if (!result.length || result[result.length - 1] !== hashMap[item]) {
                return false
            }

            result.pop()
        } else {
            result.push(item)
        }
    }

    return !result.length
}
console.log(demo('([]{}()}}'))


function a () { this.b = 3 }
const c = new a()
a()
a.prototype.b = 5;
console.log(c.b)
console.log(a.b)


console.log('script start ')
setTimeout(() => {
    console.log('setTimeout 1')
})

new Promise(resolve => {
    console.log('Promise 1')
    setTimeout(() => {
        resolve()
    })
}).then(() => {
    console.log('Promise then 1')
}).then(() => {
    console.log('Promise then 2')
})
console.log('script end')
