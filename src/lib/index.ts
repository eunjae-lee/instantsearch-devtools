import type { InstantSearch } from "instantsearch.js";
import DevTools from "./DevTools.svelte";

type DevToolsProps = {
  container: string;
  instantSearchInstance: InstantSearch;
};

type DevToolsApi = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const createDevTools = ({
  container,
  instantSearchInstance,
}: DevToolsProps): DevToolsApi => {
  const containerElem = document.querySelector(container);

  let devTools: DevTools | undefined = undefined;

  const open = () => {
    if (!devTools) {
      devTools = new DevTools({
        target: containerElem,
        props: {
          instantSearchInstance,
          opened: true,
        },
      });
    } else {
      devTools.$set({ opened: true });
    }
  };

  const close = () => {
    if (devTools) {
      devTools.$set({ opened: false });
    }
  };

  const toggle = () => {
    if (devTools) {
      devTools.$set({ opened: !devTools.$$.props.opened });
    } else {
      open();
    }
  };

  return {
    open,
    close,
    toggle,
  };
};

export { createDevTools };
