// {
//     mode: 'development',
//     devtool: 'inline-source-map',
//     ......
//     optimization: {
//         usedExports: true, // 启动 TreeShaking 的标记功能
//     },
// };
import { bar, foo, Greet } from './utils';
import shuffle from 'lodash/shuffle';

console.log(bar);

// eslint-disable-next-line no-unused-vars
const a = foo;
new Greet();

function button() {
    const button = document.createElement('button');
    const text = document.createTextNode('click me');
    button.appendChild(text);
    button.onclick = () =>
        import('./dynamicImport.js').then(res => {
            console.log(res);
        });
    return button;
}

document.body.appendChild(button());

console.log(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
