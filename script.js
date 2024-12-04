// Variables for tabs and sections
const stopwatchTab = document.getElementById('stopwatch-tab');
const clockTab = document.getElementById('clock-tab');
const stopwatchSection = document.getElementById('stopwatch-section');
const clockSection = document.getElementById('clock-section');

// Stopwatch and Timer functionality variables
let timerInterval;
let running = false;
let timeElapsed = 0;  // Time in seconds

// Buttons
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const timerDisplay = document.getElementById('timer-display');

// Start Timer
startBtn.addEventListener('click', () => {
  if (!running) {
    running = true;
    startBtn.textContent = 'Pause';
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    timerInterval = setInterval(updateTime, 1000);
  } else {
    running = false;
    startBtn.textContent = 'Resume';
    clearInterval(timerInterval);
  }
});

// Pause Timer
pauseBtn.addEventListener('click', () => {
  running = false;
  startBtn.textContent = 'Resume';
  clearInterval(timerInterval);
});

// Reset Timer
resetBtn.addEventListener('click', () => {
  running = false;
  timeElapsed = 0;
  timerDisplay.textContent = '00:00';
  startBtn.textContent = 'Start';
  clearInterval(timerInterval);
});

// Update Timer Display
function updateTime() {
  timeElapsed++;
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;
  timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
}

// Format Time (MM:SS)
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// Real-time Clock Update
function updateClock() {
  const timeElement = document.getElementById('time');
  const dateElement = document.getElementById('date');
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const day = now.toLocaleString('en-US', { weekday: 'long' });
  const date = now.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  timeElement.textContent = `${hours}:${minutes}:${seconds}`;
  dateElement.textContent = `${day}, ${date}`;
}

// Initialize Clock Update every second
setInterval(updateClock, 1000);
updateClock(); // Initial call to display time immediately

// Switch between Stopwatch and Clock tabs
stopwatchTab.addEventListener('click', () => {
  stopwatchTab.classList.add('active');
  clockTab.classList.remove('active');
  stopwatchSection.classList.add('active');
  clockSection.classList.remove('active');
});

clockTab.addEventListener('click', () => {
  clockTab.classList.add('active');
  stopwatchTab.classList.remove('active');
  clockSection.classList.add('active');
  stopwatchSection.classList.remove('active');
});
