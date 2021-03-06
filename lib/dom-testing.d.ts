/*!
 * Copyright(c) 2022 lkl191(https://github.com/lkl191)
 * MIT
 */
declare type TestsReturnValue = number | "sleep";
declare const matchElement: (id: string, expect: string) => Promise<TestsReturnValue>;
declare const clickButton: (id: string) => Promise<TestsReturnValue>;
declare const inputString: (id: string, str: string, inputTime?: number | undefined) => Promise<TestsReturnValue>;
declare const testSleep: (sleep_time: number) => Promise<TestsReturnValue>;
declare const scroll: (x: number, y: number) => Promise<TestsReturnValue>;
declare const syncTest: (tests: (() => Promise<TestsReturnValue>)[], sleep_time?: number) => void;
export { syncTest, scroll, testSleep, inputString, clickButton, matchElement };
