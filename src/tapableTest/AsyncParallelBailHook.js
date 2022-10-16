const { AsyncParallelBailHook } = require('tapable');

// 初始化同步钩子
const hook = new AsyncParallelBailHook(['arg1', 'arg2', 'arg3']);

console.time('timer');

/**
 * 1、因为钩子是并行的，所以 flag1 start 和 flag2 start 都会输出
 * 2、而由于保险作用，flag1 resolve 了一个 true返回值，所以这个时候，算是执行完成了，输出'全部执行完毕 done'
 * 3、由于并行的作用，最终还是会输出：'flag2 done:'
 */

// 注册事件
hook.tapPromise('flag1', (arg1, arg2, arg3) => {
    console.log('flag1 start:', arg1, arg2, arg3);
    return new Promise((resolve, reject) => {
        console.log('flag1 done:', arg1, arg2, arg3);
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });
});

hook.tapAsync('flag2', (arg1, arg2, arg3, callback) => {
    console.log('flag2 start:', arg1, arg2, arg3);
    setTimeout(() => {
        console.log('flag2 done:', arg1, arg2, arg3);
        callback();
    }, 3000);
});

hook.callAsync('callFunction', 'params1', 'params2', () => {
    console.log('全部执行完毕 done');
    console.timeEnd('timer');
});
