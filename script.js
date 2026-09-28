function updateClock() {
  const now = new Date();

  const time = now.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
  });

  document.getElementById('clock').textContent = time;
}

updateClock();

setInterval(updateClock, 1000);