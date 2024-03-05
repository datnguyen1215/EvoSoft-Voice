<script>
  import voice from '../core/voice';
  import { onMount } from 'svelte';

  let transcript = '';

  let buttonText = 'Start Voice Recognition';

  const startVoiceRecognition = () => {
    voice.toggle();
  };

  const onTranscript = t => {
    if (!t.final) {
      transcript = t.text;
      return;
    }

    transcript = t.text;
  };

  const onVoiceStarted = () => {
    buttonText = 'Stop Voice Recognition';
  };

  const onVoiceEnded = () => {
    buttonText = 'Start Voice Recognition';
  };

  onMount(() => {
    voice.on('transcript', onTranscript);
    voice.on('started', onVoiceStarted);
    voice.on('ended', onVoiceEnded);

    return () => {
      voice.off('transcript', onTranscript);
      voice.off('started', onVoiceStarted);
      voice.off('ended', onVoiceEnded);
      voice.stop();
    };
  });
</script>

<div class="flex flex-col m-auto">
  <p>Transcript: {transcript}</p>
  <button class="btn" on:click={startVoiceRecognition}>{buttonText}</button>
</div>
