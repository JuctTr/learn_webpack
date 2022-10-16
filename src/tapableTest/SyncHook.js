const { SyncHook } = require('tapable');

const hook = new SyncHook(['arg1, arg2']);

hook.tap('hook1', (arg1, arg2) => {
    console.log(1);
    console.log(arg1, arg2);
});

hook.tap('hook2', (arg1, arg2) => {
    console.log(3);
    console.log(arg1, arg2);
});

hook.call('name2', 'age2');
