declare type TestsReturnValue = number | "sleep";
export declare const clickButton: (id: string) => Promise<TestsReturnValue>;
export declare const inputString: (id: string, str: string, inputTime?: number | undefined) => Promise<TestsReturnValue>;
export declare const testSleep: (sleep_time: number) => Promise<TestsReturnValue>;
export declare const scroll: (x: number, y: number) => Promise<TestsReturnValue>;
export declare const syncDoTest: (tests: (() => Promise<TestsReturnValue>)[], sleep_time?: number, start_index?: number, pass_cnt?: number) => void;
export {};
