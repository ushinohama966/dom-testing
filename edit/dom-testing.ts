type TestsReturnValue = number | "sleep";

// class DomTesting {
//   testFunction: () => Promise<TestsReturnValue>;
//   test_name?: string;
//   constructor(func: any) {
//     this.testFunction = func;
//   }
//   name(s: string) {
//     this.test_name = s;
//   }
// }

const clickButton = (id: string) => {
  return new Promise<TestsReturnValue>((resolve, reject) => {
    const button = document.getElementById(id);
    if (button) {
      button.click();
      resolve(1);
    } else {
      reject("not found id: " + id);
    }
  });
};

const inputString = (id: string, str: string, inputTime?: number) => {
  return new Promise<TestsReturnValue>((resolve, reject) => {
    const sleep_time = inputTime || 50;
    let len_cnt = 0;
    // any
    let input: any = document.getElementById(id);

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
    } else {
      reject("not found id: " + id);
    }
  });
};

const sleep = (sleep_time: number) => {
  return new Promise<1>((resolve) => {
    const timer = setInterval(() => {
      clearTimeout(timer);
      resolve(1);
    }, sleep_time);
  });
};

const testSleep = (sleep_time: number) => {
  return new Promise<TestsReturnValue>((resolve, reject) => {
    console.log("now sleeping...");
    try {
      sleep(sleep_time).then(() => {
        resolve("sleep");
      });
    } catch (err) {
      reject(err);
    }
  });
};

const scroll = (x: number, y: number) => {
  return new Promise<TestsReturnValue>((resolve, reject) => {
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
    } catch (err) {
      reject(err);
    }
  });
};

// dirty code
const syncDoTest = (
  tests: (() => Promise<TestsReturnValue>)[],
  sleep_time = 0,
  start_index = 0,
  pass_cnt = 0,
  pass_arr: ("passed" | "failed")[] = []
) => {
  console.log("test" + (start_index + 1) + " start");
  tests[start_index]()
    .then((value) => {
      // if it is sleep func skip
      if (value == "sleep") {
        tests.splice(start_index, 1);
        start_index--;
      } else {
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
      console.log("test" + (start_index + 1) + " >>> failed");
    })
    .finally(() => {
      // test is over
      if (start_index + 1 >= tests.length) {
        console.log("------------------------------");
        for (let i = 0; i < tests.length; i++) {
          console.log("test" + (i + 1) + " >>> " + pass_arr[i]);
        }
        console.log(
          "(" + pass_cnt + "/" + (start_index + 1) + ") tests are passed"
        );
        return;
      }
      // sleep every test
      if (sleep_time != 0) {
        sleep(sleep_time).then(() => {
          syncDoTest(tests, sleep_time, start_index + 1, pass_cnt, pass_arr);
        });
      } else {
        syncDoTest(tests, sleep_time, start_index + 1, pass_cnt, pass_arr);
      }
    });
};

const syncTest = (
  tests: (() => Promise<TestsReturnValue>)[],
  sleep_time = 0
  // start_index = 0,
) => {
  syncDoTest(tests, sleep_time);
};

export { syncTest, scroll, testSleep, inputString, clickButton };
