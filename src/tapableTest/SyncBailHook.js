const { SyncBailHook } = require('tapable');

const hook = new SyncBailHook(['arg1', 'arg2', 'arg3']);

// 注册事件
hook.tap('flag1', (arg1, arg2, arg3) => {
    console.log('flag1:', arg1, arg2, arg3);
    // 存在返回值 阻断flag2事件的调用
    return true;
});

// flag1返回true，这个事件就被阻断了
hook.tap('flag2', (arg1, arg2, arg3) => {
    console.log('flag2:', arg1, arg2, arg3);
});

// 调用事件并传递执行参数
hook.call('callFunction', 'params1', 'params2');
