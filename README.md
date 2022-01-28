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
} from "../lib/dom-test/lib/dom-test";

syncTest([
      clickButton.bind(null, "element id"),
      inputString.bind(null, "element id", "test@xxx.com"),
      inputString.bind(null, "element id", "123456"),
      clickButton.bind(null, "element id"),
      clickButton.bind(null, "element id"),
      testSleep.bind(null, 1000),
      scroll.bind(null, 300, 300),
      testSleep.bind(null, 1000),
      scroll.bind(null, 0, 0),
      testSleep.bind(null, 1000),
      clickButton.bind(null, "element id"),
    ]);

```
