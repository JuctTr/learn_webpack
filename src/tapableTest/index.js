const {
    SyncHook,
    SyncBailHook,
    AsyncParallelHook,
    AsyncSeriesHook,
} = require('tapable');

const hook = new SyncHook(['arg1, arg2'])


hook.tap('hook1', (arg1, arg2) => {
    console.log(1)
    console.log(arg1, arg2)
})

// hook.tap('hook2', (arg1, arg2) => {
//     console.log(arg1, arg2)
// })

hook.call('name', 'age')

hook.tap('hook3', (arg1, arg2) => {
    console.log(3)
    console.log(arg1, arg2)
})

hook.call('name3', 'age3')
