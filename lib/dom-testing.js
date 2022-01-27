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
    return new Promise((resolve, reject) => {
        const sleep_time = inputTime || 50;
        let len_cnt = 0;
        // any
        let input = document.getElementById(id);
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
const scroll = (x, y) => {
    return new Promise((resolve, reject) => {
        try {
            const shiftY = y - window.scrollY;
            const shiftX = x - window.scrollX;
            const newY = shiftY != 0 ? window.scrollY + shiftY / Math.abs(shiftY) : y;
            const newX = shiftX != 0 ? window.scrollX + shiftX / Math.abs(shiftX) : x;
            window.scroll(newX, newY);
            if (shiftY == 0 && shiftX == 0) {
                return resolve(1);
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
