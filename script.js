let isMuted = false;
let audioContext;
let gainNode;
let source;

async function setupAudio() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  source = audioContext.createMediaStreamSource(stream);
  gainNode = audioContext.createGain();
  source.connect(gainNode).connect(audioContext.destination);
}

document.getElementById('toggleBtn').addEventListener('click', () => {
  if (!gainNode) return;

  isMuted = !isMuted;
  gainNode.gain.value = isMuted ? 0 : 1;
  document.getElementById('toggleBtn').textContent = isMuted ? "Unmute" : "Mute";
});

setupAudio();
