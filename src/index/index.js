import _ from "lodash";
import "./index.scss";
import { common } from "../common/utils";
// import printMe from "./print.js";

function component() {
    const element = document.createElement("div");
    const btn = document.createElement("button");

    btn.innerHTML = "Click me and check the console!!~";
    btn.onclick = function () {
        alert("click button");
    };

    // lodash（目前通过一个 script 引入）对于执行这一行是必需的
    // lodash 在当前 script 中使用 import 引入
    // element.innerHTML = "HelloWebpack";
    element.innerHTML = _.join(["Hello", "webpack"], " ");
    element.classList.add("app");
    element.appendChild(btn);
    // 改变文件

    return element;
}

document.body.appendChild(component());
