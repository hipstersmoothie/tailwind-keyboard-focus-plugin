// eslint-disable-next-line import/no-extraneous-dependencies
import React from "react";
import { createKeyboardFocus, getStoredValue } from "./create-keyboard-focus";

/** Manage the keyboard focus data attribute */
export default function useKeyboardFocus() {
  const [isKeyboardNav, isKeyboardNavSet] = React.useState(getStoredValue());

  React.useEffect(() => {
    const focusManager = createKeyboardFocus({ onUpdate: isKeyboardNavSet });

    focusManager.addListeners();

    return () => {
      focusManager.removeListeners();
    };
  }, []);

  return isKeyboardNav;
}
