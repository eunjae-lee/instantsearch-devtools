<script lang="ts">
  import type { InstantSearch } from 'instantsearch.js'
  import UiState from './UiState.svelte'
  import RenderState from './RenderState.svelte'
  
  import "../tailwind.css";

  export let opened: boolean;
  export let instantSearchInstance: InstantSearch;
  let uiState = instantSearchInstance.getUiState();

  type TabButton = {
    title: string;
    name: string;
  }
  let tabButtons: TabButton[] = [
    {
      title: 'uiState',
      name: 'uiState',
    },
    {
      title: 'renderState',
      name: 'renderState',
    }
  ]

  let activeTab = 'uiState';

  function setActiveTab(tabButton: TabButton) {
    activeTab = tabButton.name;
  }

  instantSearchInstance.use(() => ({
    onStateChange({ uiState: newUiState }) {
      uiState = newUiState
    }
  }))
</script>

<div class={`absolute top-0 left-0 w-full h-full z-10 ${opened ? 'block' : 'hidden'}`}>
  <div class="absolute bg-gray-900 w-full h-full opacity-20" on:click={() => opened = false}></div>
  <div class="relative m-4 p-4 bg-white rounded-md shadow-md">
    <button type="button" class="absolute right-4 bg-gray-200 text-gray-500 p-1 rounded-sm hover:bg-gray-300" on:click={() => opened = false}>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <p class="ml-2 text-gray-600 font-light">InstantSearch DevTools</p>

    <div class="border-b border-gray-300 mb-4">
      <div class="mt-4 -mb-px w-full flex gap-4">
        {#each tabButtons as tabButton}
          <button type="button" on:click={() => setActiveTab(tabButton)} class={`py-2 px-3 rounded-t-sm hover:bg-indigo-50 ${activeTab === tabButton.name ? 'text-indigo-700 border-b-2 border-indigo-600' : 'text-gray-600 border-b-2 border-transparent hover:border-indigo-300'}`}>{tabButton.title}</button>
        {/each}
      </div>
    </div>
    <div class={activeTab === 'uiState' ? 'block' : 'hidden'}>
      <UiState {uiState} />
    </div>
    <div class={activeTab === 'renderState' ? 'block' : 'hidden'}>
      <RenderState {instantSearchInstance} />
    </div>
  </div>
</div>