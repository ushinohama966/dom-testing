declare type TestsReturnValue = number | "sleep";
declare const clickButton: (id: string) => Promise<TestsReturnValue>;
declare const inputString: (id: string, str: string, inputTime?: number | undefined) => Promise<TestsReturnValue>;
declare const testSleep: (sleep_time: number) => Promise<TestsReturnValue>;
declare const scroll: (x: number, y: number) => Promise<TestsReturnValue>;
declare const syncDoTest: (tests: (() => Promise<TestsReturnValue>)[], sleep_time?: number, start_index?: number, pass_cnt?: number, pass_arr?: ("passed" | "failed")[]) => void;
export { syncDoTest, scroll, testSleep, inputString, clickButton };
