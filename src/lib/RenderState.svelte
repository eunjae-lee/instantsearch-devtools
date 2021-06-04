<script lang="ts">
  import type { InstantSearch } from 'instantsearch.js'
  import JSONTree from 'svelte-json-tree';
  export let instantSearchInstance: InstantSearch;
</script>

<div style="--json-tree-font-size: 1rem">
  <JSONTree value={instantSearchInstance.renderState} />
</div>