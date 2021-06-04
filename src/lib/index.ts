import type { InstantSearch } from "instantsearch.js";
import DevTools from "./DevTools.svelte";

const debug = ({
  container,
  instantSearchInstance,
}: {
  container: string;
  instantSearchInstance: InstantSearch;
}) => {
  const containerElem = document.querySelector(container);

  const devTools = new DevTools({
    target: containerElem,
    props: {
      instantSearchInstance,
    },
  });

  return devTools;
};

export { debug };
