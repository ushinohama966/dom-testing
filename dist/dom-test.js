"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncDoTest = exports.inputString = exports.clickButton = void 0;
const clickButton = (id) => {
    const promise = new Promise((resolve, reject) => {
        const button = document.getElementById(id);
        //let cnt = 5;
        //let len_cnt = 0;
        if (button) {
            button.click();
            resolve(1);
            /*
            const timer = setInterval(() => {
              button.click();
              len_cnt++;
              if (len_cnt >= cnt) {
                clearInterval(timer);
              }
            }, 200);
            */
        }
        else {
            alert("id: " + id + "が見つかりませんでした");
            reject("clickButton");
        }
    });
    return promise;
};
exports.clickButton = clickButton;
const inputString = (id, str, inputTime) => {
    // inputのtypeがわからない
    const promise = new Promise((resolve, reject) => {
        const sleep_time = inputTime || 50;
        let len_cnt = 0;
        const input = document.getElementById(id);
        if (input) {
            input.value = "";
            const timer = setInterval(() => {
                input.value += str[len_cnt];
                len_cnt++;
                if (len_cnt >= str.length) {
                    clearInterval(timer);
                    resolve(1);
                }
            }, sleep_time);
        }
        else {
            alert("id: " + id + "が見つかりませんでした");
            reject("inputString");
        }
    });
    return promise;
};
exports.inputString = inputString;
const syncDoTest = (tests, startIndex = 0) => {
    if (startIndex >= tests.length)
        return;
    console.log("test" + startIndex);
    tests[startIndex]()
        .then(() => {
        (0, exports.syncDoTest)(tests, startIndex + 1);
    })
        .catch(() => {
        console.log(startIndex + "番目のテストに失敗しました");
    });
    // for (let i = 0; i < tests.length; i++) {
    //   console.log("test" + (i + 1).toString());
    //   tests[i]()
    // }
};
exports.syncDoTest = syncDoTest;