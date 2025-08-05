let audioContext;
let muteNode;
let isMuted = false;

async function initAudio() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  audioContext = new AudioContext({ latencyHint: 'interactive' });

  await audioContext.audioWorklet.addModule('mute-processor.js');

  const micSource = audioContext.createMediaStreamSource(stream);
  muteNode = new AudioWorkletNode(audioContext, 'mute-processor');
  micSource.connect(muteNode).connect(audioContext.destination);
}

function toggleMute() {
  if (!muteNode) return;
  isMuted = !isMuted;

  // Apply gain change exactly now
  muteNode.parameters.get('gain').setValueAtTime(
    isMuted ? 0 : 1,
    audioContext.currentTime
  );

  document.getElementById('toggleBtn').textContent = isMuted ? 'Unmute' : 'Mute';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('toggleBtn').addEventListener('click', toggleMute);
  initAudio();
});
