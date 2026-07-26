const SKILLS = [
  { name: 'C', cat: 'lang', tag: 'Language', level: 82 },
  { name: 'JavaScript', cat: 'lang', tag: 'Language', level: 74 },
  { name: 'HTML', cat: 'web', tag: 'Web', level: 88 },
  { name: 'CSS', cat: 'web', tag: 'Web', level: 80 },
  { name: 'MySQL', cat: 'data', tag: 'Database', level: 70 },
  { name: 'GitHub', cat: 'tools', tag: 'Tool', level: 75 },
  { name: 'VS Code', cat: 'tools', tag: 'Tool', level: 90 },
  { name: 'Code::Blocks', cat: 'tools', tag: 'Tool', level: 78 },
  { name: 'Problem Solving', cat: 'soft', tag: 'Soft Skill', level: 88 },
  { name: 'Team Collaboration', cat: 'soft', tag: 'Soft Skill', level: 85 },
  { name: 'Event Coordination', cat: 'soft', tag: 'Soft Skill', level: 90 },
  { name: 'Leadership', cat: 'soft', tag: 'Soft Skill', level: 84 },
];

const PROJECTS = [
  {
    title: 'CampusConnect',
    cat: 'capstone',
    catLabel: 'Capstone',
    desc: 'A student service portal built for centralizing the day-to-day requests students bounce between offices for.',
    stack: ['JavaScript', 'HTML/CSS', 'MySQL'],
  },
  {
    title: 'Smart Blind Assistance',
    cat: 'social',
    catLabel: 'Robotics Social Impact',
    desc: 'An assistive hardware project for blind individuals, built using sensors and logic standing in for a second pair of eyes.',
    stack: ['C', 'Hardware', 'Sensors'],
  },
  {
    title: 'Digital Farming Assistant',
    cat: 'social',
    catLabel: 'SRS Social Impact',
    desc: 'An application giving farmers direct access to crop and weather information.',
    stack: ['Requirements Design', 'JavaScript'],
  },
  {
    title: 'Quiz Game',
    cat: 'c',
    catLabel: 'Structured Programming',
    desc: 'A quiz game built with clean control flow over flashy features.',
    stack: ['C'],
  },
  {
    title: 'Online Voting System',
    cat: 'c',
    catLabel: 'C Capstone',
    desc: 'A voting management system built in C where correctness mattered above all.',
    stack: ['C'],
  },
  {
    title: 'Banking Management System',
    cat: 'c',
    catLabel: 'C Systems',
    desc: 'Account creation, deposits, withdrawals, and balance tracking from scratch.',
    stack: ['C'],
  },
  {
    title: 'Blood Donation System',
    cat: 'social',
    catLabel: 'C Social Impact',
    desc: 'A donor-patient matching system organized by blood group.',
    stack: ['C'],
  },
];

const TIMELINE = [
  {
    year: '2026',
    title: 'Vice President, Notre Dame Science Club',
    desc: 'Leading club initiatives and representing the science community.',
  },
  {
    year: '2026',
    title: 'Class Representative, DIU',
    desc: 'Bridging academic communication between students and faculty.',
  },
  {
    year: '2025-2026',
    title: 'Member, DIUSEC & Notre Dame Volunteering Club',
    desc: 'Staying active in the software engineering and volunteering communities.',
  },
  {
    year: '2026',
    title: 'Event Volunteer',
    desc: 'On the ground for Daffodil Family Day, 13th Convocation, Codetrap, and BreakOut Contest.',
  },
];

// RENDER
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  grid.innerHTML = SKILLS.map(s => `
    <div class="skill-card reveal-up" data-cat="${s.cat}" style="--level:${s.level}%">
      <div class="skill-head">
        <h3>${s.name}</h3>
        <span class="skill-tag">${s.tag}</span>
      </div>
      <div class="skill-bar"><i></i></div>
    </div>
  `).join('');
}

function renderProjects() {
  const grid = document.getElementById('workGrid');
  grid.innerHTML = PROJECTS.map((p, i) => `
    <article class="project-card reveal-up" data-cat="${p.cat}">
      <div class="project-media"><span class="p-index">${String(i+1).padStart(2,'0')}</span></div>
      <div class="project-body">
        <span class="project-cat">${p.catLabel}</span>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="project-stack">${p.stack.map(t => `<span>${t}</span>`).join('')}</div>
      </div>
    </article>
  `).join('');
}

function renderTimeline() {
  const el = document.getElementById('timeline');
  el.innerHTML = TIMELINE.map(t => `
    <div class="tl-item reveal-up">
      <span class="tl-dot"></span>
      <div class="tl-year">${t.year}</div>
      <h3>${t.title}</h3>
      <p>${t.desc}</p>
    </div>
  `).join('');
}

renderSkills();
renderProjects();
renderTimeline();

// LOADER
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('is-hidden'), 500);
});
setTimeout(() => document.getElementById('loader')?.classList.add('is-hidden'), 2500);

// CURSOR
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mx = -100, my = -100, rx = -100, ry = -100;

window.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
});

(function ringLoop() {
  rx += (mx - rx) * 0.16;
  ry += (my - ry) * 0.16;
  ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
  requestAnimationFrame(ringLoop);
})();

document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('is-active'));
  el.addEventListener('mouseleave', () => ring.classList.remove('is-active'));
});

// MAGNETIC BUTTONS
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top - r.height/2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.4}px)`;
  });
  el.addEventListener('mouseleave', () => { el.style.transform = ''; });
});

// HERO CANVAS
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
let particles = [], cw, ch;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resizeCanvas() {
  cw = canvas.width = canvas.offsetWidth * devicePixelRatio;
  ch = canvas.height = canvas.offsetHeight * devicePixelRatio;
}

function initParticles() {
  const count = window.innerWidth < 700 ? 26 : 54;
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * cw,
    y: Math.random() * ch,
    r: (Math.random() * 2 + 0.6) * devicePixelRatio,
    vx: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
    vy: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
    hue: Math.random() > 0.5 ? '124,92,255' : '0,231,255',
    a: Math.random() * 0.5 + 0.15,
  }));
}

function drawParticles() {
  ctx.clearRect(0,0,cw,ch);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > cw) p.vx *= -1;
    if (p.y < 0 || p.y > ch) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(${p.hue},${p.a})`;
    ctx.fill();
  });
  if (!reduceMotion) requestAnimationFrame(drawParticles);
}

resizeCanvas(); initParticles(); drawParticles();
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

// HERO TITLE REVEAL
function splitChars(el) {
  const text = el.dataset.text;
  el.innerHTML = '';
  [...text].forEach((ch, i) => {
    const wrap = document.createElement('span');
    wrap.className = 'char-wrap';
    const inner = document.createElement('span');
    inner.className = 'char';
    inner.textContent = ch === ' ' ? '\u00A0' : ch;
    inner.style.transitionDelay = `${i * 0.035}s`;
    wrap.appendChild(inner);
    el.appendChild(wrap);
  });
}
document.querySelectorAll('.hero-title .line').forEach(splitChars);
setTimeout(() => {
  document.querySelectorAll('.char').forEach(c => {
    c.style.transition = 'transform 0.85s cubic-bezier(.16,.84,.44,1)';
    c.style.transform = 'translateY(0)';
  });
}, 300);

// SCROLL REVEAL OBSERVER
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

// COUNTERS
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let cur = 0;
      const step = Math.max(1, Math.round(target/40));
      const tick = () => {
        cur = Math.min(target, cur + step);
        el.textContent = cur;
        if (cur < target) requestAnimationFrame(tick);
      };
      tick();
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => countObserver.observe(el));

// NAV & MOBILE MENU
const nav = document.getElementById('nav');
const scrollBar = document.getElementById('scrollBar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 20);
  const h = document.documentElement;
  const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  scrollBar.style.width = pct + '%';
}, { passive: true });

const burger = document.getElementById('navBurger');
const navMobile = document.getElementById('navMobile');
burger.addEventListener('click', () => {
  const open = navMobile.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', open);
});
navMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navMobile.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
}));

// BACK TO TOP
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
});

// SKILL & PROJECT FILTERS
document.querySelectorAll('[data-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.skill-card').forEach(card => {
      card.classList.toggle('is-hidden', f !== 'all' && card.dataset.cat !== f);
    });
  });
});

document.querySelectorAll('[data-pfilter]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-pfilter]').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const f = btn.dataset.pfilter;
    document.querySelectorAll('.project-card').forEach(card => {
      card.classList.toggle('is-hidden', f !== 'all' && card.dataset.cat !== f);
    });
  });
});

// IMAGE TOGGLE LOGIC FOR ACHIEVEMENTS
document.querySelectorAll('.img-toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const imgId = btn.getAttribute('data-img');
    const img = document.getElementById(imgId);
    
    if (img.classList.contains('hidden')) {
      img.classList.remove('hidden');
      btn.textContent = 'Hide';
    } else {
      img.classList.add('hidden');
      btn.textContent = imgId === 'marathonImg' ? "Let's see me" : "View Result";
    }
  });
});

// CONTACT FORM
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;
  const name = document.getElementById('cf-name');
  const email = document.getElementById('cf-email');
  const message = document.getElementById('cf-message');

  [name, message].forEach(input => {
    const field = input.closest('.field');
    const ok = input.value.trim().length > 1;
    field.classList.toggle('is-invalid', !ok);
    if (!ok) valid = false;
  });

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  email.closest('.field').classList.toggle('is-invalid', !emailOk);
  if (!emailOk) valid = false;

  if (!valid) {
    formNote.textContent = 'Please fix the highlighted fields.';
    formNote.style.color = '#ff6b6b';
    return;
  }

  const subject = encodeURIComponent(`Portfolio message from ${name.value.trim()}`);
  const body = encodeURIComponent(`${message.value.trim()}\n\n- ${name.value.trim()} (${email.value.trim()})`);
  window.location.href = `mailto:ullah242-35-555@diu.edu.bd?subject=${subject}&body=${body}`;
  formNote.textContent = 'Opening your email client...';
  formNote.style.color = 'var(--accent-2)';
});