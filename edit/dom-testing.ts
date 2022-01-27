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

export const inputString = (id: string, str: string, inputTime?: number) => {
  return new Promise((resolve, reject) => {
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

export const scroll = (x: number, y: number) => {
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
    } catch (err) {
      reject(console.log(err));
    }
  });
};

export const syncDoTest = (tests: any[], startIndex = 0) => {
  if (startIndex >= tests.length)
    return console.log("all(" + startIndex + ") tests are passed");
  tests[startIndex]()
    .then(() => {
      console.log("test" + (startIndex + 1) + " >>> passed");
      syncDoTest(tests, startIndex + 1);
    })
    .catch(() => {
      console.log("test" + (startIndex + 1) + " >>> failed");
    });
};
