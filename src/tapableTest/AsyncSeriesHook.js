const { AsyncSeriesHook } = require('tapable');

// 初始化同步钩子
const hook = new AsyncSeriesHook(['arg1', 'arg2', 'arg3']);

console.time('timer');

// 注册事件
hook.tapAsync('flag1', (arg1, arg2, arg3, callback) => {
    console.log('flag1:', arg1, arg2, arg3);
    setTimeout(() => {
        // 1s后调用callback表示 flag1执行完成
        callback();
    }, 1000);
});

hook.tapPromise('flag2', (arg1, arg2, arg3) => {
    console.log('flag2:', arg1, arg2, arg3);
    // tapPromise返回Promise
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
});

// 调用事件并传递执行参数
hook.callAsync('callFunction', 'params1', 'params2', () => {
    console.log('全部执行完毕 done');
    console.timeEnd('timer');
});
