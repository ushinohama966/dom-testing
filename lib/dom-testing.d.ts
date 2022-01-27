export declare const clickButton: (id: string) => Promise<unknown>;
export declare const inputString: (id: string, str: string, inputTime?: number | undefined) => Promise<unknown>;
export declare const testSleep: (sleep_time: number) => Promise<unknown>;
export declare const scroll: (x: number, y: number) => Promise<unknown>;
export declare const syncDoTest: (tests: any[], startIndex?: number) => void;
