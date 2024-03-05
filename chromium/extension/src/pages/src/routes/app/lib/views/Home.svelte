<script>
  import voice from '../core/voice';
  import { onMount } from 'svelte';

  let transcript = '';

  const startVoiceRecognition = () => {
    voice.start();
  };

  const onTranscript = t => {
    console.log(t);
    if (!t.final) {
      transcript = t.text;
      return;
    }

    transcript = t.text;
  };

  onMount(() => {
    voice.on('transcript', onTranscript);

    return () => {
      voice.off('transcript', onTranscript);
      voice.stop();
    };
  });
</script>

<div class="flex flex-col m-auto">
  <p>Transcript: {transcript}</p>
  <button class="btn" on:click={startVoiceRecognition}> Start Voice Recognition </button>
</div>
