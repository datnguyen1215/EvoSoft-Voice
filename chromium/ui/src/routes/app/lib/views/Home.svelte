<script>
  import speech from '$lib/speech';
  import { onMount } from 'svelte';
  import com from '../com';
  import commands from '$lib/commands';

  let transcript = '';

  let buttonText = 'Start Speech Recognition';
  let textbox = null;

  const toggleSpeechRecognition = () => speech.toggle();

  const onTranscript = t => {
    com.event({ type: 'evosoft.voice.transcript', data: { ...t, text: commands.replace(t.text) } });

    if (!t.final) {
      transcript = t.text;
      return;
    }

    transcript = t.text;
  };

  const onSpeechRecognitionStarted = () => {
    buttonText = 'Stop Speech Recognition';
    com.event({ type: 'evosoft.voice.started' });
  };

  const onSpeechRecognitionEnded = () => {
    buttonText = 'Start Speech Recognition';
    com.event({ type: 'evosoft.voice.stopped' });
  };

  const onContentScriptEvent = payload => {
    const { type, data } = payload;

    switch (type) {
      case 'evosoft.voice.toggle':
        speech.toggle();
        break;
    }
  };

  onMount(() => {
    speech.on('transcript', onTranscript);
    speech.on('started', onSpeechRecognitionStarted);
    speech.on('ended', onSpeechRecognitionEnded);
    com.on('event', onContentScriptEvent);

    return () => {
      com.off('event', onContentScriptEvent);
      speech.off('transcript', onTranscript);
      speech.off('started', onSpeechRecognitionStarted);
      speech.off('ended', onSpeechRecognitionEnded);
      speech.stop();
    };
  });
</script>

<div class="flex flex-col m-auto">
  <div class="border h-10 cursor-text select-text" contenteditable="true" role="textbox"></div>
  <input bind:this={textbox} class="border h-10" type="text" />
  <p>Transcript: {transcript}</p>
  <button class="btn" on:click={toggleSpeechRecognition}>{buttonText}</button>
</div>
