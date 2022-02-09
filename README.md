## dom-testing

A javascript library for dom operation test

## Install

```
npm install -D dom-testing
```

or

```
yarn add -D dom-testing
```

## Usage

```
import {
  clickButton,
  inputString,
  syncTest,
  matchElement,
  testSleep,
  scroll
} from "../lib/dom-test/lib/dom-test";

syncTest([
      inputString.bind(null, "element id", "test@xxx.com"),
      inputString.bind(null, "element id", "123456"),
      clickButton.bind(null, "element id"),
    ]);

syncTest([
      matchElement.bind(null, "element id", "expect string"),
      testSleep.bind(null, "sleeptime"),
      scroll.bind(null, x, y),
])

```

## License
[MIT](https://github.com/lkl191/dom-testing/blob/master/LICENSE)
