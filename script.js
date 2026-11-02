// ============ STRING LIGHTS: generate bulbs along the wire ============
(function buildBulbs(){
  const row = document.getElementById('bulbRow');
  if(!row) return;
  const count = 26;
  for(let i=0;i<count;i++){
    const b = document.createElement('div');
    b.className = 'bulb';
    b.style.animationDelay = (Math.random()*3.4).toFixed(2) + 's';
    row.appendChild(b);
  }
})();
// ============ ENTRANCE TRANSITION ============
const entrance = document.getElementById('entrance');
const enterBtn = document.getElementById('enterBtn');
function alreadyEntered(){
  try { return sessionStorage.getItem('entered') === '1'; } catch(e){ return false; }
}
function markEntered(){
  try { sessionStorage.setItem('entered', '1'); } catch(e){ /* storage blocked, the overlay just shows again next visit */ }
}
function enterSite(){
  entrance.classList.add('hide');
  document.body.style.overflow = '';
  markEntered();
  window.removeEventListener('keydown', onKeyEnter);
}
function onKeyEnter(e){
  if(e.key === 'Enter' || e.key === ' '){ enterSite(); }
}
if(!entrance){
  // arrived on an inner page, so don't stop them at the door on the way home
  markEntered();
} else if(alreadyEntered() || window.location.hash){
  // skip the overlay on repeat visits and on links straight to a section
  entrance.style.display = 'none';
} else {
  enterBtn.addEventListener('click', enterSite);
  window.addEventListener('keydown', onKeyEnter);
  document.body.style.overflow = 'hidden';
}
// ============ THEME TOGGLE ============
(function setupTheme(){
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  if(!toggle) return;
  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch(e){ /* theme just won't persist */ }
  });
})();
// ============ CONTACT FORM ============
(function setupContactForm(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  const status = document.getElementById('contactStatus');
  const button = form.querySelector('button[type="submit"]');
  function showStatus(text, kind){
    status.textContent = text;
    status.className = 'contact-status ' + kind;
  }
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    button.disabled = true;
    showStatus('Sending…', '');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      const data = await res.json().catch(() => ({}));
      if(!res.ok) throw new Error(data.error);
      form.reset();
      showStatus('✅ Thanks! Your message is on its way.', 'is-success');
      button.textContent = '✅ Sent';
      setTimeout(() => { button.textContent = 'Send message'; }, 4000);
    } catch(err){
      showStatus((err.message || 'Could not send your message.') + ' You can also email me directly.', 'is-error');
    } finally {
      button.disabled = false;
      // tokens are single use, so the next send needs a fresh one
      if(window.turnstile) window.turnstile.reset();
    }
  });
})();
// ============ FOOTER YEAR ============
document.getElementById('year').textContent = new Date().getFullYear();
// ============ SCROLL REVEAL ============
const revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window && revealEls.length){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}
