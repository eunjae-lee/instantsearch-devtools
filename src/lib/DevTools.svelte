<script lang="ts">
  import type { InstantSearch } from 'instantsearch.js'
  import JSONTree from 'svelte-json-tree';
  
  import "../tailwind.css";

  export let instantSearchInstance: InstantSearch;
  let uiState = instantSearchInstance.getUiState();

  instantSearchInstance.use(() => ({
    onStateChange({ uiState: newUiState }) {
      uiState = newUiState
    }
  }))
</script>

<p class="text-3xl">hey</p>
<div style="--json-tree-font-size: 1rem">
  <JSONTree value={uiState} />
</div>