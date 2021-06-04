import algoliasearch from "algoliasearch";
import instantsearch from "instantsearch.js";
import {
  searchBox,
  hits,
  refinementList,
  pagination,
} from "instantsearch.js/es/widgets";

import { debug } from "./lib";

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

const search = instantsearch({
  indexName: "instant_search",
  searchClient,
});

search.addWidgets([
  searchBox({
    container: "#searchbox",
  }),
  hits({
    container: "#hits",
    templates: {
      item: `
<article>
  <h1>{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}</h1>
  <p>{{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}</p>
</article>
`,
    },
  }),
  refinementList({
    container: "#brand-list",
    attribute: "brand",
  }),
  pagination({
    container: "#pagination",
  }),
]);

search.start();

document.querySelector(".btn-open-devtools").addEventListener("click", () => {
  debug({ container: "#devtools", instantSearchInstance: search });
});
