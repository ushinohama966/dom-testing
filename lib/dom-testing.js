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
            reject("not found id: " + id);
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
            reject("not found id: " + id);
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
        console.log("now sleeping...");
        try {
            sleep(sleep_time).then(() => {
                resolve("sleep");
            });
        }
        catch (err) {
            reject(err);
        }
    });
};
exports.testSleep = testSleep;
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
            reject(err);
        }
    });
};
exports.scroll = scroll;
// dirty code
const syncDoTest = (tests, sleep_time = 0, start_index = 0, pass_cnt = 0) => {
    if (start_index >= tests.length)
        return console.log("(" + pass_cnt + "/" + start_index + ") tests are passed");
    tests[start_index]()
        .then((value) => {
        if (value == "sleep") {
            tests.splice(start_index, 1);
            start_index--;
        }
        else {
            console.log("test" + (start_index + 1) + " >>> passed");
            pass_cnt++;
        }
    })
        .catch((err) => {
        console.log(err);
        console.log("test" + (start_index + 1) + " >>> failed");
    })
        .finally(() => {
        (0, exports.syncDoTest)(tests, sleep_time, start_index + 1, pass_cnt);
    });
};
exports.syncDoTest = syncDoTest;
