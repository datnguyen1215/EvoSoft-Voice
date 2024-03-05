<script>
  import SideNav from './lib/components/SideNav.svelte';
  import HomeIcon from '$lib/components/icons/Home.svelte';
  import SettingsIcon from '$lib/components/icons/Settings.svelte';
  import Home from './lib/views/Home.svelte';
  import Settings from './lib/views/Settings.svelte';
  import view from './lib/stores/view';
  import { onMount } from 'svelte';

  let loading = { show: true, message: '' };

  /** @type {View[]} */
  const views = [
    {
      name: 'Home',
      component: Home,
      icon: HomeIcon
    },
    {
      name: 'Settings',
      component: Settings,
      icon: SettingsIcon
    }
  ];

  onMount(() => {
    $view = views[0];
    loading = { show: false, message: '' };
  });
</script>

{#if !loading.show}
  <div class="flex h-full">
    <SideNav {views} />
    <svelte:component this={$view.component} />
  </div>
{/if}
