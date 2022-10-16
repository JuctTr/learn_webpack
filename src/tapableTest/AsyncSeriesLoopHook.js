const { AsyncSeriesLoopHook } = require('tapable');
console.time('timer');
const hook = new AsyncSeriesLoopHook(['arg1', 'arg2', 'arg3']);

let flag1 = 2;
let flag2 = 1;

/**
 * 事件存在非 undefined 返回值那么就掉头从最开始进行重新执行
 */

// 注册事件
hook.tapAsync('flag1', (arg1, arg2, arg3, callback) => {
    console.log('flag1');
    setTimeout(() => {
        if (flag1 !== 3) {
            return callback(flag1++);
        }
        callback();
    }, 1000);
});

hook.tapPromise('flag2', (arg1, arg2, arg3) => {
    console.log('flag2');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (flag2 !== 3) {
                return resolve(flag2++);
            }
            resolve();
        }, 1000);
    });
});

// 调用事件并传递执行参数
hook.callAsync('callFunction', 'params1', 'params2', () => {
    console.log('全部执行完毕 done');
    console.timeEnd('timer');
});
