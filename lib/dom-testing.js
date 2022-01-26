"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncDoTest = exports.testSleep = exports.inputString = exports.clickButton = void 0;
const clickButton = (id) => {
    return new Promise((resolve, reject) => {
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
            console.log("id: " + id + "が見つかりませんでした");
            reject("clickButton");
        }
    });
};
exports.clickButton = clickButton;
const inputString = (id, str, inputTime) => {
    // inputのtypeがわからない
    return new Promise((resolve, reject) => {
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
                    // resolve(console.log(test_name + " >>> success!"));
                    resolve(1);
                }
            }, sleep_time);
        }
        else {
            // reject(console.log(test_name + " >>> failed"));
            reject(0);
        }
    });
};
exports.inputString = inputString;
const testSleep = (sleep_time) => {
    return new Promise((resolve, reject) => {
        console.log("test is sleeping...");
        try {
            const timer = setInterval(() => {
                clearTimeout(timer);
                resolve(1);
            }, sleep_time);
        }
        catch (err) {
            reject(console.error(err));
        }
    });
};
exports.testSleep = testSleep;
const syncDoTest = (tests, startIndex = 0) => {
    if (startIndex >= tests.length)
        return;
    tests[startIndex]()
        .then(() => {
        console.log("test" + (startIndex + 1) + " >>> success");
        (0, exports.syncDoTest)(tests, startIndex + 1);
    })
        .catch(() => {
        console.log("test" + (startIndex + 1) + " >>> failed");
    });
};
exports.syncDoTest = syncDoTest;
