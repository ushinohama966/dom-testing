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
    ]);

```

## License
MIT
