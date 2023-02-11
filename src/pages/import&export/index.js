import { print } from './num.js';

print();

function button() {
    const button = document.createElement('button');
    const text = document.createTextNode('click me');
    button.appendChild(text);
    button.onclick = () =>
        import('./info.js').then(res => {
            console.log(res.log);
        });
    return button;
}

document.body.appendChild(button());
