<script>
  import SignalIcon from '$lib/components/icons/Signal.svelte';
  import view from '../stores/view';

  /** @type {View[]}*/
  export let views = [];

  /**
   * @param {View} v
   */
  const onMenuClick = v => ($view = v);
</script>

<div class="w-fit max-w-[300px] min-w-[150px] py-5 px-5 shadow-md">
  <div class="flex pb-5">
    <SignalIcon class="w-10 h-10 text-red-700" />
    <h1 class="text-2xl font-bold ml-2 text-indigo-700 m-0 p-0">EvoSoft Voice</h1>
  </div>

  <ul class="flex flex-col">
    {#each views as menu}
      <button on:click={() => onMenuClick(menu)}>
        <li
          class="hover:bg-gray-200 my-2 px-5 rounded-lg py-2"
          class:active={menu.name == $view.name}
        >
          <div class="flex items-center space-x-2">
            {#if menu.icon}
              <svelte:component this={menu.icon} class="w-5 h-5" />
            {/if}
            <span>{menu.name}</span>
          </div>
        </li>
      </button>
    {/each}
  </ul>
</div>

<style lang="postcss">
  .active {
    @apply bg-gray-200;
  }
</style>
