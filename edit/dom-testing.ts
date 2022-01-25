export const clickButton = (id: string) => {
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
    } else {
      alert("id: " + id + "が見つかりませんでした");
      reject("clickButton");
    }
  });
  return promise;
};

export const inputString = (id: string, str: string, inputTime?: number) => {
  // inputのtypeがわからない
  const promise = new Promise((resolve, reject) => {
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
          resolve(1);
        }
      }, sleep_time);
    } else {
      alert("id: " + id + "が見つかりませんでした");
      reject("inputString");
    }
  });
  return promise;
};

export const syncDoTest = (tests: any[], startIndex = 0) => {
  if (startIndex >= tests.length) return;
  // console.log("test" + startIndex);
  tests[startIndex]()
    .then(() => {
      console.log("test" + startIndex + " >>> success");
      syncDoTest(tests, startIndex + 1);
    })
    .catch(() => {
      console.log("test" + startIndex + ">>> failed");
    });

  // for (let i = 0; i < tests.length; i++) {
  //   console.log("test" + (i + 1).toString());
  //   tests[i]()
  // }
};
