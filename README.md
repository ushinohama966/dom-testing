## dom-testing

dom操作のテストを自動化するライブラリです

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
  syncDoTest,
} from "../lib/dom-test/lib/dom-test";

syncDoTest([
                clickButton.bind(null, "sum-btn"),
                inputString.bind(null, "input-email", "test@xxx.com"),
                inputString.bind(null, "input-pass", "123456"),
                clickButton.bind(null, "submit"),
              ]);

```

