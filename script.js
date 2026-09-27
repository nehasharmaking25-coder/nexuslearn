// ===== NexusLearn — Interactive Logic =====

const subjects = [
  { emoji: '⚛️', title: 'Advanced Quantum Physics', sub: '12 modules · 68% complete', progress: 68, color: '#a855f7' },
  { emoji: '🧬', title: 'Human Anatomy', sub: '9 modules · 42% complete', progress: 42, color: '#3b82f6' },
  { emoji: '🧮', title: 'Calculus III', sub: '15 modules · 81% complete', progress: 81, color: '#ec4899' },
  { emoji: '💻', title: 'Data Structures & Algorithms', sub: '20 modules · 55% complete', progress: 55, color: '#22c55e' },
  { emoji: '🧠', title: 'Cognitive Psychology', sub: '8 modules · 33% complete', progress: 33, color: '#f59e0b' },
  { emoji: '🌌', title: 'Astrophysics', sub: '10 modules · 74% complete', progress: 74, color: '#6366f1' },
];

const flashcards = [
  { tag: 'Quantum', q: 'What is the Heisenberg Uncertainty Principle?', a: 'You cannot simultaneously know both the exact position and exact momentum of a particle with perfect precision.', color: '#a855f7' },
  { tag: 'Anatomy', q: 'What is the powerhouse of the cell?', a: 'The mitochondria — it generates ATP, the energy currency of the cell.', color: '#3b82f6' },
  { tag: 'Calculus', q: 'What is the derivative of sin(x)?', a: 'cos(x). The rate of change of sine is cosine.', color: '#ec4899' },
  { tag: 'DSA', q: 'What is the time complexity of binary search?', a: 'O(log n) — it halves the search space each step.', color: '#22c55e' },
  { tag: 'Psychology', q: 'What is the "primacy effect"?', a: 'The tendency to remember items at the beginning of a list better than those in the middle.', color: '#f59e0b' },
  { tag: 'Astro', q: 'What is a light-year?', a: 'The distance light travels in one year — about 9.46 trillion kilometers.', color: '#6366f1' },
];

const leaderboard = [
  { rank: 1, name: 'Aarav Mehta', sub: 'Quantum Physics', xp: 4820, initials: 'AM', color: 'linear-gradient(135deg,#a855f7,#3b82f6)' },
  { rank: 2, name: 'Sofia Rodriguez', sub: 'Human Anatomy', xp: 4510, initials: 'SR', color: 'linear-gradient(135deg,#ec4899,#a855f7)' },
  { rank: 3, name: 'Kenji Tanaka', sub: 'Calculus III', xp: 4380, initials: 'KT', color: 'linear-gradient(135deg,#3b82f6,#22c55e)' },
  { rank: 4, name: 'Priya Nair', sub: 'Data Structures', xp: 4120, initials: 'PN', color: 'linear-gradient(135deg,#f59e0b,#ec4899)' },
  { rank: 5, name: 'Liam OConnor', sub: 'Astrophysics', xp: 3890, initials: 'LO', color: 'linear-gradient(135deg,#6366f1,#3b82f6)' },
  { rank: 6, name: 'Zara Ahmed', sub: 'Cognitive Psychology', xp: 3650, initials: 'ZA', color: 'linear-gradient(135deg,#22c55e,#6366f1)' },
  { rank: 7, name: 'Diego Silva', sub: 'Calculus III', xp: 3410, initials: 'DS', color: 'linear-gradient(135deg,#a855f7,#ec4899)' },
];

const subjectsGrid = document.getElementById('subjectsGrid');
subjects.forEach((s, i) => {
  const card = document.createElement('div');
  card.className = 'subject-card glass reveal';
  card.style.transitionDelay = (i * 60) + 'ms';
  card.innerHTML = '<div class="subject-top"><span class="subject-emoji">' + s.emoji + '</span><span class="subject-badge" style="color:' + s.color + ';background:' + s.color + '1a;border:1px solid ' + s.color + '40;">' + s.progress + '%</span></div><h3 class="subject-title">' + s.title + '</h3><p class="subject-sub">' + s.sub + '</p><div class="subject-progress-row"><span class="subject-progress-label">Progress</span><span class="subject-progress-val">' + s.progress + '%</span></div><div class="exp-bar"><div class="exp-fill" data-progress="' + s.progress + '" style="background:linear-gradient(90deg,' + s.color + ',' + s.color + 'cc);"></div></div>';
  subjectsGrid.appendChild(card);
});

const flashcardsGrid = document.getElementById('flashcardsGrid');
flashcards.forEach((f, i) => {
  const card = document.createElement('div');
  card.className = 'flashcard reveal';
  card.style.transitionDelay = (i * 60) + 'ms';
  card.innerHTML = '<div class="flashcard-face flashcard-front"><span class="flashcard-tag" style="color:' + f.color + ';">' + f.tag + '</span><p class="flashcard-q">' + f.q + '</p><span class="flashcard-hint">Tap to reveal answer</span></div><div class="flashcard-face flashcard-back"><span class="flashcard-tag" style="color:' + f.color + ';">Answer</span><p class="flashcard-a">' + f.a + '</p><span class="flashcard-hint">Tap to flip back</span></div>';
  card.addEventListener('click', function() { card.classList.toggle('flipped'); });
  flashcardsGrid.appendChild(card);
});

const leaderboardList = document.getElementById('leaderboardList');
leaderboard.forEach((p) => {
  const row = document.createElement('div');
  row.className = 'leader-row';
  const rankClass = p.rank === 1 ? 'rank-1' : p.rank === 2 ? 'rank-2' : p.rank === 3 ? 'rank-3' : 'rank-other';
  row.innerHTML = '<div class="rank-badge ' + rankClass + '">' + p.rank + '</div><div class="leader-avatar" style="background:' + p.color + ';">' + p.initials + '</div><div class="leader-info"><div class="leader-name">' + p.name + '</div><div class="leader-sub">' + p.sub + '</div></div><div class="leader-xp">' + p.xp.toLocaleString() + ' <span>XP</span></div>';
  leaderboardList.appendChild(row);
});

document.querySelectorAll('.subject-card').forEach(function(card) {
  card.addEventListener('mousemove', function(e) {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = 'perspective(900px) rotateY(' + (x * 10) + 'deg) rotateX(' + (-y * 10) + 'deg) translateY(-4px)';
  });
  card.addEventListener('mouseleave', function() {
    card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
  });
});

const revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(function(el) { revealObserver.observe(el); });

function animateCount(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(tick);
}
const countObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(function(el) { countObserver.observe(el); });

const barObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      const fill = entry.target;
      fill.style.width = fill.getAttribute('data-progress') + '%';
      barObserver.unobserve(fill);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.exp-fill').forEach(function(el) { barObserver.observe(el); });

const CIRCUMFERENCE = 2 * Math.PI * 130;
const ringProgress = document.getElementById('ringProgress');
const timerTime = document.getElementById('timerTime');
const timerMode = document.getElementById('timerMode');
const timerHint = document.getElementById('timerHint');
const playBtn = document.getElementById('playBtn');
const resetBtn = document.getElementById('resetBtn');
const skipBtn = document.getElementById('skipBtn');
const modeTabs = document.querySelectorAll('.mode-tab');

let totalSeconds = 45 * 60;
let remaining = totalSeconds;
let interval = null;
let isRunning = false;

function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return m + ':' + sec;
}
function updateRing() {
  const offset = CIRCUMFERENCE * (1 - remaining / totalSeconds);
  ringProgress.style.strokeDashoffset = offset;
  timerTime.textContent = formatTime(remaining);
}
function setMode(minutes, label, hint) {
  totalSeconds = minutes * 60;
  remaining = totalSeconds;
  timerMode.textContent = label;
  timerHint.textContent = hint;
  stopTimer();
  updateRing();
}
function startTimer() {
  if (isRunning) return;
  isRunning = true;
  playBtn.classList.add('playing');
  interval = setInterval(function() {
    if (remaining <= 0) { stopTimer(); return; }
    remaining--;
    updateRing();
  }, 1000);
}
function stopTimer() {
  isRunning = false;
  playBtn.classList.remove('playing');
  clearInterval(interval);
}

playBtn.addEventListener('click', function() { if (isRunning) stopTimer(); else startTimer(); });
resetBtn.addEventListener('click', function() { remaining = totalSeconds; stopTimer(); updateRing(); });
skipBtn.addEventListener('click', function() { remaining = 0; stopTimer(); updateRing(); });

modeTabs.forEach(function(tab) {
  tab.addEventListener('click', function() {
    modeTabs.forEach(function(t) { t.classList.remove('active'); });
    tab.classList.add('active');
    const min = parseInt(tab.getAttribute('data-min'), 10);
    const mode = tab.getAttribute('data-mode');
    const labels = { focus: 'Focus Session', short: 'Short Break', long: 'Long Break' };
    const hints = { focus: 'Deep work mode', short: 'Stretch & breathe', long: 'Recharge fully' };
    setMode(min, labels[mode], hints[mode]);
  });
});

updateRing();

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const navObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      navLinks.forEach(function(l) { l.classList.remove('active'); });
      const link = document.querySelector('.nav-link[href="#' + entry.target.id + '"]');
      if (link) link.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(function(s) { navObserver.observe(s); });

console.log('NexusLearn initialized');