<script>
  import speech from '$lib/speech';
  import { onMount } from 'svelte';
  import com from '../com';

  let transcript = '';

  let buttonText = 'Start Speech Recognition';

  const toggleSpeechRecognition = () => speech.toggle();

  const onTranscript = t => {
    com.event({ type: 'evosoft.voice.transcript', data: t });

    if (!t.final) {
      transcript = t.text;
      return;
    }

    transcript = t.text;
  };

  const onSpeechRecognitionStarted = () => (buttonText = 'Stop Speech Recognition');

  const onSpeechRecognitionEnded = () => (buttonText = 'Start Speech Recognition');

  onMount(() => {
    speech.on('transcript', onTranscript);
    speech.on('started', onSpeechRecognitionStarted);
    speech.on('ended', onSpeechRecognitionEnded);

    return () => {
      speech.off('transcript', onTranscript);
      speech.off('started', onSpeechRecognitionStarted);
      speech.off('ended', onSpeechRecognitionEnded);
      speech.stop();
    };
  });
</script>

<div class="flex flex-col m-auto">
  <p>Transcript: {transcript}</p>
  <button class="btn" on:click={toggleSpeechRecognition}>{buttonText}</button>
</div>
