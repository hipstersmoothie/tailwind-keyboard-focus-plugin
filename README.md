# `tailwind-keyboard-focus-plugin`

![npm](https://img.shields.io/npm/v/tailwind-keyboard-focus-plugin)
![CircleCI](https://img.shields.io/circleci/build/github/hipstersmoothie/tailwind-keyboard-focus-plugin?token=50b7b4966e6ca9cdf757e2b24a02d31036b81bab)

A [tailwindcss](https://tailwindcss.com/) plugin that adds a `keyboard-focus` variant.

Focus rings are great and a vital part of the web, but you may not want to always show them.
The `keyboard-focus` variant will only apply the className when the user is navigating via the keyboard and the element is focused.
The enables you to create an enhanced focus experience for those users.

```jsx
import React from 'react';

const App = () => (
  <button className="focus:outline-none keyboard-focus:ring">
    Focus only shows for keyboard users
  </button>
)
```

## Installation

First install the plugin:

```sh
npm i tailwind-keyboard-focus-plugin
# or with yarn
yarn add tailwind-keyboard-focus-plugin
```

Then add it to your `tailwind.config.js`:

```js
const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  plugins: [require("tailwind-keyboard-focus-plugin")],
  // Turn it on for the styles you want it enabled for
  variants: {
    extend: {
      ringWidth: ["keyboard-focus"],
    },
  },
};
```

With the above configuration you can now use a className like `keyboard-focus:ring`! :tada:

## Usage

The classNames generated by this plugin work be managing the `data-keyboard-focus` attribute on the `body` element.

To make this work you will need to call the following code somewhere in you website.

```js
const { createKeyboardFocus } = require("tailwind-keyboard-focus-plugin");

const keyboardFocus = createKeyboardFocus();

// Start managing keyboard focus
keyboardFocus.addListeners();

// Stop managing keyboard focus
keyboardFocus.removeListeners();
```

### React

This package ships with a hook initializes the focus manager for you.
Call this hook somewhere near the top of you application.

```jsx
import { useKeyboardFocus } from "tailwind-keyboard-focus-plugin";

const App = () => {
  useKeyboardFocus();

  return <div>My App</div>;
};
```

This hook also returns the current state of if the user is navigating via the keyboard.

```jsx
import { useKeyboardFocus } from "tailwind-keyboard-focus-plugin";

const App = () => {
  const isKeyboardNav = useKeyboardFocus();

  return <div>My App {isKeyboardNav ? "in dark mode" : ""}</div>;
};
```

### Custom CSS

You can use this data attribute to even write your own custom focus styles

```css
[data-keyboard-focus] .button {
  background: red;
}
```
