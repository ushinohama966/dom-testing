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
      console.log("id: " + id + "が見つかりませんでした");
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
        len_cnt++;
        if (len_cnt >= str.length) {
          clearInterval(timer);
          // resolve(console.log(test_name + " >>> success!"));
          resolve(1);
        }
      }, sleep_time);
    } else {
      // reject(console.log(test_name + " >>> failed"));
      reject(0);
    }
  });
};

export const testSleep = (sleep_time: number) => {
  return new Promise((resolve, reject) => {
    console.log("test is sleeping...");
    try {
      const timer = setInterval(() => {
        clearTimeout(timer);
        resolve(1);
      }, sleep_time);
    } catch (err) {
      reject(console.error(err));
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
