<script lang="ts">
  import UiStateSearchBox from './UiStateSearchBox.svelte'
  import UiStateRefinementList from './UiStateRefinementList.svelte'
  import JSONTree from 'svelte-json-tree';

  export let uiState;
</script>

{#each Object.keys(uiState) as indexName}
  <p class="text-2xl"><span class="text-gray-800">Index </span><code class="ml-2 text-indigo-800 text-xl border border-indigo-300 py-1 px-2 rounded-md">{indexName}</code></p>
  <div class="mt-8 flex flex-col gap-4">
    <UiStateSearchBox {indexName} query={uiState[indexName].query} />
    {#each Object.keys(uiState[indexName].refinementList || {}) as refinementListAttribute}
      <UiStateRefinementList {uiState} {indexName} attribute={refinementListAttribute} />
    {/each}
  </div>
{/each}

<div style="--json-tree-font-size: 1rem" class="mt-10">
  <JSONTree value={uiState} />
</div>