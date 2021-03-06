"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchElement = exports.clickButton = exports.inputString = exports.testSleep = exports.scroll = exports.syncTest = void 0;
const matchElement = (id, expect) => {
    return new Promise((resolve, reject) => {
        const elem = document.getElementById(id);
        if (!elem)
            return reject("not found id: " + id);
        if (elem.innerHTML == expect) {
            resolve(1);
        }
        else {
            reject("The expected value does not match the specified element" +
                "\n" +
                "elem.innerHTML: " +
                elem.innerHTML +
                "\n" +
                "expect: " +
                expect);
        }
    });
};
exports.matchElement = matchElement;
const clickButton = (id) => {
    return new Promise((resolve, reject) => {
        const button = document.getElementById(id);
        if (button) {
            button.click();
            resolve(1);
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
// no export
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
                scroll(x, y).then(() => {
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
// no export
const syncDoTest = (tests, sleep_time = 0, start_index = 0, pass_cnt = 0, pass_arr = []) => {
    console.log("test" + (start_index + 1) + " start");
    tests[start_index]()
        .then((value) => {
        // if it is sleep func skip
        if (value == "sleep") {
            tests.splice(start_index, 1);
            start_index--;
        }
        else {
            // test is passed
            pass_arr.push("passed");
            console.log("test" + (start_index + 1) + " >>> passed");
            pass_cnt++;
        }
    })
        .catch((err) => {
        // test is failed
        pass_arr.push("failed");
        console.log(err);
        console.error("test" + (start_index + 1) + " >>> failed");
    })
        .finally(() => {
        // test is over
        if (start_index + 1 >= tests.length) {
            console.log("------------------------------");
            for (let i = 0; i < tests.length; i++) {
                console.log("test" + (i + 1) + " >>> " + pass_arr[i]);
            }
            console.log("(" + pass_cnt + "/" + (start_index + 1) + ") tests are passed");
            return;
        }
        // sleep every test
        if (sleep_time != 0) {
            sleep(sleep_time).then(() => {
                syncDoTest(tests, sleep_time, start_index + 1, pass_cnt, pass_arr);
            });
        }
        else {
            syncDoTest(tests, sleep_time, start_index + 1, pass_cnt, pass_arr);
        }
    });
};
const syncTest = (tests, sleep_time = 0) => {
    syncDoTest(tests, sleep_time);
};
exports.syncTest = syncTest;
