/* eslint-disable no-use-before-define */

const STORAGE_KEY = "data-keyboard-focus";

/** See if we have a stored keyboard navigation initial value */
export const getStoredValue = () => {
  if (typeof window === "undefined") {
    return;
  }

  return document.querySelector("body")?.getAttribute(STORAGE_KEY) === "true";
};

interface CreateKeyboardFocusOptions {
  /** Called when the start of keyboard navigation changes */
  onUpdate?: (isKeyboardNav: boolean) => void;
}

/** Initialize the construct that manages keyboard focus */
export const createKeyboardFocus = ({
  onUpdate = () => undefined,
}: CreateKeyboardFocusOptions) => {
  /** Ran when we are enabling keyboard nav */
  const on = () => {
    onUpdate(true);

    document.querySelector("body")?.setAttribute(STORAGE_KEY, "true");

    document.removeEventListener("keydown", keyDown, false);
    document.addEventListener("mousedown", mouseDown, false);
    document.addEventListener("touchstart", onTouch, false);
  };

  /** Ran when we are disabling keyboard nav */
  const off = () => {
    onUpdate(false);

    document.querySelector("body")?.removeAttribute(STORAGE_KEY);

    document.addEventListener("keydown", keyDown, false);
    document.removeEventListener("mousedown", mouseDown, false);
    document.removeEventListener("touchstart", onTouch, false);
  };

  /** An Event listener that listens for keyboard navigation */
  function keyDown(e: KeyboardEvent) {
    if (e.key !== "Tab" && !e.key.includes("Arrow")) {
      return;
    }

    on();
  }

  /** An Event listener that listens for mouse navigation */
  function mouseDown(e: MouseEvent) {
    // If all these values are zero the click happened via
    // Enter or Space
    if (
      e.screenX === 0 &&
      e.screenY === 0 &&
      e.clientX === 0 &&
      e.clientY === 0
    ) {
      return;
    }

    off();
  }

  /** An Event listener that listens for mouse navigation */
  function onTouch(e: TouchEvent) {
    // If all these values are zero the click happened via
    // Enter or Space

    if (
      e.touches[0].screenX === 0 &&
      e.touches[0].screenY === 0 &&
      e.touches[0].clientX === 0 &&
      e.touches[0].clientY === 0
    ) {
      return;
    }

    off();
  }

  /** Add keyboard event listeners */
  function addListeners() {
    const initial = getStoredValue();

    if (initial) {
      onUpdate(initial);
      document.addEventListener("mousedown", mouseDown, false);
      document.addEventListener("touchstart", onTouch, false);
    } else {
      document.addEventListener("keydown", keyDown, false);
    }
  }

  /** Remove keyboard event listeners */
  function removeListeners() {
    document.removeEventListener("keydown", keyDown, false);
    document.removeEventListener("mousedown", mouseDown, false);
    document.removeEventListener("touchstart", onTouch, false);
  }

  return {
    addListeners,
    removeListeners,
  };
};
