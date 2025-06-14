const msg = new SpeechSynthesisUtterance();
const voicesDropdown = document.getElementById('voiceSelect');
const rate = document.getElementById('rate');
const pitch = document.getElementById('pitch');
const text = document.getElementById('text');
const speakButton = document.getElementById('speak');
const stopButton = document.getElementById('stop');

let voices = [];

function populateVoices() {
  voices = speechSynthesis.getVoices();
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

function setVoice() {
  msg.voice = voices.find(v => v.name === voicesDropdown.value);
  restartSpeech();
}

function speak() {
  if (!text.value.trim()) return;
  msg.text = text.value;
  msg.rate = rate.value;
  msg.pitch = pitch.value;
  speechSynthesis.speak(msg);
}

function stop() {
  speechSynthesis.cancel();
}

function restartSpeech() {
  stop();
  speak();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
rate.addEventListener('change', restartSpeech);
pitch.addEventListener('change', restartSpeech);
speakButton.addEventListener('click', speak);
stopButton.addEventListener('click', stop);

populateVoices();