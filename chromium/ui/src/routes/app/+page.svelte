<script>
  import SideNav from './lib/components/SideNav.svelte';
  import HomeIcon from '$lib/components/icons/Home.svelte';
  import SettingsIcon from '$lib/components/icons/Settings.svelte';
  import Home from './lib/views/Home.svelte';
  import Settings from './lib/views/Settings.svelte';
  import view from './lib/stores/view';
  import com from './lib/com';
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

  const onComEvent = e => {
    console.log('app event', e);
  };

  const onComRequest = (payload, respond) => {
    console.log('app request', payload);
    respond({ message: 'Hello from the app!' });
  };

  onMount(() => {
    com.on('event', onComEvent);
    com.on('request', onComRequest);

    (async () => {
      $view = views[0];
      loading = { show: false, message: '' };

      const resp = await com.request({ type: 'evosoft.app.ready' });
      console.log('app ready', resp);
    })();

    return () => {
      com.off('event', onComEvent);
      com.off('request', onComRequest);
    };
  });
</script>

{#if !loading.show}
  <div class="flex h-full">
    <SideNav {views} />
    <svelte:component this={$view.component} />
  </div>
{/if}
