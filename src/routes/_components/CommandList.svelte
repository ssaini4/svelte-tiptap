<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  let selectedIndex = 0;
  const dispatch = createEventDispatcher();

  export let items: any[] = [];
  export let command;
  export let editor;
  export let range;

  function onKeyDown(event) {
    if (event.key === 'ArrowUp') {
      upHandler();
      return true;
    }

    if (event.key === 'ArrowDown') {
      downHandler();
      return true;
    }

    if (event.key === 'Enter') {
      enterHandler();
      return true;
    }

    return false;
  }

  function upHandler() {
    selectedIndex = (selectedIndex + items.length - 1) % items.length;
  }

  function downHandler() {
    selectedIndex = (selectedIndex + 1) % items.length;
  }

  function enterHandler() {
    selectItem(selectedIndex);
  }

  const selectItem = (index: number) => {
    const item = items[index];
    // va.track('Slash Command Used', {
    // 	command: item.title
    // });
    if (item) {
      command(item);
    }
  };
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="items">
  {#each items as item, index}
    <button class="item" class:is-selected={index === selectedIndex} on:click={() => selectItem(index)}>
      {item.element || item.title}
    </button>
  {/each}
</div>

<style>
  .items {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .is-selected {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f0f0f0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>
