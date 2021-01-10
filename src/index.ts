import plugin from "tailwindcss/plugin";

interface ModifySelectorsArgs {
  /** The current selectors className */
  className: string;
}

interface AddVariantArgs {
  /** Run a function to modify a selector */
  modifySelectors: (fn: (args: ModifySelectorsArgs) => string) => void;
  /** The user's configured separator */
  separator: string;
}

interface PluginArgs {
  /** Add a variant */
  addVariant: (name: string, fn: (args: AddVariantArgs) => void) => void;
  /** Create a className */
  e: (className: string) => string;
}

const keyboardFocusPlugin = plugin(({ addVariant, e }: PluginArgs) => {
  addVariant("keyboard-focus", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `[data-keyboard-focus] .${e(
        `keyboard-focus${separator}${className}:focus`
      )}`;
    });
  });
});

export * from "./create-keyboard-focus";
export * from "./useKeyboardFocus";
export default keyboardFocusPlugin;
