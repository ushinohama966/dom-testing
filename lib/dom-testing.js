"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncDoTest = exports.scroll = exports.testSleep = exports.inputString = exports.clickButton = void 0;
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
            console.log("not found id: " + id);
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
        // let input: any = document.getElementById(id);
        let input = document.getElementsByClassName(id)[0];
        // if (!input) {
        //   input = document.getElementsByClassName(id);
        // }
        if (input) {
            input.value = "";
            const timer = setInterval(() => {
                input.value += str[len_cnt];
                // input.innerText += str[len_cnt]
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
            console.log("not found id: " + id);
            reject(0);
        }
    });
};
exports.inputString = inputString;
const sleep = (sleep_time) => {
    return new Promise((resolve) => {
        const timer = setInterval(() => {
            clearTimeout(timer);
            resolve(1);
        }, sleep_time);
    });
};
const testSleep = (sleep_time) => {
    return new Promise((resolve, reject) => {
        console.log("test is sleeping...");
        try {
            sleep(sleep_time).then(() => {
                resolve(1);
            });
        }
        catch (err) {
            reject(console.error(err));
        }
    });
};
exports.testSleep = testSleep;
// cnt is not good
// complexity recursion
// dirty code
const scroll = (x, y, cntY = 1, cntX = 1) => {
    return new Promise((resolve, reject) => {
        try {
            const shiftY = y - window.scrollY;
            const shiftX = x - window.scrollX;
            if (shiftY < 0)
                cntY = -1;
            if (shiftX < 0)
                cntX = -1;
            const newY = window.scrollY + cntY;
            const newX = window.scrollX + cntX;
            if (shiftY == 0 && shiftX == 0) {
                window.scroll(x, y);
                return resolve(1);
            }
            else if (shiftX == 0) {
                window.scroll(x, newY);
            }
            else if (shiftY == 0) {
                window.scroll(newX, y);
            }
            else {
                window.scroll(newX, newY);
            }
            sleep(1).then(() => {
                (0, exports.scroll)(x, y).then(() => {
                    return resolve(1);
                });
            });
        }
        catch (err) {
            reject(console.log(err));
        }
    });
};
exports.scroll = scroll;
const syncDoTest = (tests, startIndex = 0) => {
    if (startIndex >= tests.length)
        return console.log("all(" + startIndex + ") tests are passed");
    tests[startIndex]()
        .then(() => {
        console.log("test" + (startIndex + 1) + " >>> passed");
        (0, exports.syncDoTest)(tests, startIndex + 1);
    })
        .catch(() => {
        console.log("test" + (startIndex + 1) + " >>> failed");
    });
};
exports.syncDoTest = syncDoTest;
