// import _ from 'lodash';
import './index.scss';
// import { common } from '../common/utils';
// import printMe from "./print.js";

import debounce from '../debounce'
import { customCall } from '../handcode/call_apply_bind'

function component () {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    btn.innerHTML = 'Click me and check the console!~~~~~';
    btn.onclick = debounce(function () {
        // alert('click button');
        console.error('cllick button')
    }, 1000)

    // lodash（目前通过一个 script 引入）对于执行这一行是必需的
    // lodash 在当前 script 中使用 import 引入
    element.innerHTML = 'HelloWebpack';
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('app');
    element.appendChild(btn);
    // 改变文件

    return element;
}

document.body.appendChild(component());

const foo = {
    count: 1,
};


function Bar () {
    console.log(this.count);
}

// eslint-disable-next-line no-extend-native
Function.prototype.customCall = customCall

Bar.customCall(foo); // 1

