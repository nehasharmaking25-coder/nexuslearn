/* ============ NEXUSLEARN — INTERACTIVITY ENGINE ============ */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = Math.min(i * 60, 400);
      entry.target.style.transitionDelay = delay + 'ms';
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(eased * target);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { animateCount(entry.target); countObserver.unobserve(entry.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-value').forEach(el => countObserver.observe(el));

const expObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.style.width = entry.target.dataset.width; expObserver.unobserve(entry.target); }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.exp-fill').forEach(el => expObserver.observe(el));

document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = 'perspective(900px) rotateY(' + (x * 10) + 'deg) rotateX(' + (-y * 10) + 'deg) translateY(-4px)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0)';
  });
});

document.querySelectorAll('.flashcard').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('flipped'); }
  });
});

const timerDisplay = document.getElementById('timerDisplay');
const timerMode = document.getElementById('timerMode');
const timerHint = document.getElementById('timerHint');
const playBtn = document.getElementById('playBtn');
const resetBtn = document.getElementById('resetBtn');
const ringProgress = document.querySelector('.ring-progress');
const CIRCUMFERENCE = 816.8;
let totalSeconds = 45 * 60;
let remaining = totalSeconds;
let interval = null;
const modeLabels = { focus: 'Focus Session', short: 'Short Break', long: 'Long Break' };
const modeHints = { focus: 'Stay locked in 🔒', short: 'Breathe & stretch 🌿', long: 'Recharge fully ☕' };
function formatTime(s) { const m = Math.floor(s / 60); const sec = s % 60; return String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0'); }
function updateRing() { ringProgress.style.strokeDashoffset = CIRCUMFERENCE * (1 - remaining / totalSeconds); }
function render() { timerDisplay.textContent = formatTime(remaining); updateRing(); }
function setMode(mode, minutes) {
  totalSeconds = minutes * 60; remaining = totalSeconds;
  timerMode.textContent = modeLabels[mode]; timerHint.textContent = modeHints[mode];
  stopTimer(); render();
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.mode-btn[data-mode="' + mode + '"]').classList.add('active');
}
function startTimer() {
  if (interval) return;
  playBtn.classList.add('playing');
  interval = setInterval(() => {
    if (remaining <= 0) { clearInterval(interval); interval = null; playBtn.classList.remove('playing'); timerHint.textContent = 'Session complete! 🎉'; return; }
    remaining--; render();
  }, 1000);
}
function stopTimer() { clearInterval(interval); interval = null; playBtn.classList.remove('playing'); }
playBtn.addEventListener('click', () => { if (interval) { stopTimer(); } else { startTimer(); } });
resetBtn.addEventListener('click', () => { stopTimer(); remaining = totalSeconds; render(); });
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => setMode(btn.dataset.mode, parseInt(btn.dataset.min, 10)));
});

const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const link = document.querySelector('.nav-link[href="#' + entry.target.id + '"]');
      if (link) link.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => navObserver.observe(s));

render();
setMode('focus', 45);
console.log('NexusLearn ready ⚡');