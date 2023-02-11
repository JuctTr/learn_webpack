const { SyncHook } = require('tapable');

/**
 * 如果同时使用 before 和 stage 时，优先会处理 before ，在满足 before 的条件之后才会进行 stage 的判断。
 * 不建议混用这两个属性。换句话说如果你选择在你的 hooks.tap 中使用 stage 的话就不要在出现 before ，反之亦然
 */

const hooks = new SyncHook();

hooks.tap(
    {
        name: 'flag1',
    },
    () => {
        console.log('This is flag1 function.');
    }
);

hooks.tap(
    {
        name: 'flag2',
        // flag2 事件函数会在flag1之前进行执行
        before: 'flag1',
    },
    () => {
        console.log('This is flag2 function.');
    }
);

hooks.call();

// ================================= Stage属性 ===============================

const hookStage = new SyncHook();

hookStage.tap(
    {
        name: 'flag1',
        stage: 1,
    },
    () => {
        console.log('This is flag1 function.');
    }
);

hookStage.tap(
    {
        name: 'flag2',
        // 默认为stage: 0,
    },
    () => {
        console.log('This is flag2 function.');
    }
);

hooks.call();
