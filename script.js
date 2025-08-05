let isMuted = false;
let audioContext = null;
let gainNode = null;
let source = null;

async function setupAudio() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    source = audioContext.createMediaStreamSource(stream);
    gainNode = audioContext.createGain();
    gainNode.gain.value = 1; // Start unmuted
    source.connect(gainNode).connect(audioContext.destination);
  } catch (err) {
    console.error('Microphone access denied or failed:', err);
    alert('Microphone access is required to use this app.');
  }
}

// Attach the event listener immediately
document.getElementById('toggleBtn').addEventListener('click', () => {
  if (!gainNode) {
    console.warn("Gain node not initialized yet.");
    return;
  }

  isMuted = !isMuted;
  gainNode.gain.setValueAtTime(isMuted ? 0 : 1, audioContext.currentTime);
  document.getElementById('toggleBtn').textContent = isMuted ? "Unmute" : "Mute";
});

// Run setup ASAP
window.addEventListener('DOMContentLoaded', () => {
  setupAudio();
});
