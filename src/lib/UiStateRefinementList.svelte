<script lang="ts">
  import type { UiState } from 'instantsearch.js'
import UiState from './UiState.svelte';

  export let indexName: string;
  export let uiState: UiState;
  export let attribute: string;
  
  let showCode: null | 'getter' | 'setter' = null;

  function setShowCode(code: 'getter' | 'setter') {
    if (showCode === code) {
      showCode = null;
    } else {
      showCode = code;
    }
  }
</script>

<div class="border border-gray-300 rounded-sm shadow-sm py-4 px-4">
  <div>
    <span class="bg-indigo-100 text-indigo-800 py-1 px-4 rounded-full">RefinementList: "{attribute}"</span>
  </div>
  <div class="mt-2 ml-2 flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span class="ml-1">
      Refinements: {JSON.stringify(uiState[indexName].refinementList[attribute])}
    </span>
    <button type="button" on:click={() => setShowCode('getter')} class="ml-4 flex items-center font-light bg-gray-100 rounded-sm p-2 hover:bg-gray-200">
      <span>Getter</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    </button>
    <button type="button" on:click={() => setShowCode('setter')} class="ml-2 flex items-center font-light bg-gray-100 rounded-sm p-2 hover:bg-gray-200">
      <span>Setter</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    </button>
  </div>
  {#if showCode === 'getter'}
  <div class="ml-2">
    <pre class="mt-2 text-sm bg-gray-800 text-gray-200 py-2 px-4 rounded-md">
      <code>{`// Getter

instantSearchInstance.getUiState()['${indexName}'].refinementList['${attribute}']
`}</code>
    </pre>
  </div>
  {/if}
  {#if showCode === 'setter'}
  <div class="ml-2">
    <pre class="mt-2 text-sm bg-gray-800 text-gray-200 py-2 px-4 rounded-md">
      <code>{`// Setter

instantSearchInstance.setUiState({
  ...instantSearchInstance.getUiState(),
  '${indexName}': {
    ...instantSearchInstance.getUiState()['${indexName}'],
    refinementList: {
      ...instantSearchInstance.getUiState()['${indexName}'].refinementList,
      '${attribute}': [
        'some value1',
        'some value2',
      ],
    },
  },
});

// or

import merge from 'deepmerge';
instantSearchInstance.setUiState(merge(
  instantSearchInstance.getUiState(),
  {
    '${indexName}': {
      refinementList: {
        '${attribute}': [
          'some value1',
          'some value2',
        ],
      },
    },
  },
))
`}</code>
    </pre>
  </div>
  {/if}
</div>