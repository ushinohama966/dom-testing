export const clickButton = (id: string) => {
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
    } else {
      console.log("not found id: " + id);
      reject("clickButton");
    }
  });
};

interface InputStringProp {
  test_name?: string;
  id: string;
  str: string;
  inputTime?: number;
}

export const inputString = (id: string, str: string, inputTime?: number) => {
  // inputのtypeがわからない
  return new Promise((resolve, reject) => {
    const sleep_time = inputTime || 50;
    let len_cnt = 0;
    const input: any = document.getElementById(id);

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
    } else {
      // reject(console.log(test_name + " >>> failed"));
      console.log("not found id: " + id);
      reject(0);
    }
  });
};

const sleep = (sleep_time: number) => {
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      clearTimeout(timer);
      resolve(1);
    }, sleep_time);
  });
};

export const testSleep = (sleep_time: number) => {
  return new Promise((resolve, reject) => {
    console.log("test is sleeping...");
    try {
      sleep(sleep_time).then(() => {
        resolve(1);
      });
    } catch (err) {
      reject(console.error(err));
    }
  });
};

// cnt is not good
// complexity recursion

export const scroll = (x: number, y: number, cntY = 1, cntX = 1) => {
  return new Promise((resolve, reject) => {
    try {
      const shiftY = y - window.scrollY;
      const shiftX = x - window.scrollX;

      if (shiftY < 0) cntY = -1;
      if (shiftX < 0) cntX = -1;
      const newY = window.scrollY + cntY;
      const newX = window.scrollX + cntX;
      if (shiftY == 0 && shiftX == 0) {
        window.scroll(x, y);
        return resolve(1);
      } else if (shiftX == 0) {
        window.scroll(x, newY);
      } else if (shiftY == 0) {
        window.scroll(newX, y);
      } else {
        window.scroll(newX, newY);
      }
      sleep(1).then(() => {
        scroll(x, y).then(() => {
          return resolve(1);
        });
      });
    } catch (err) {
      reject(console.log(err));
    }
  });
};

export const syncDoTest = (tests: any[], startIndex = 0) => {
  if (startIndex >= tests.length) return;
  tests[startIndex]()
    .then(() => {
      console.log("test" + (startIndex + 1) + " >>> success");
      syncDoTest(tests, startIndex + 1);
    })
    .catch(() => {
      console.log("test" + (startIndex + 1) + " >>> failed");
    });
};
