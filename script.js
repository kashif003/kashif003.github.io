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
function enterSite(){
  entrance.classList.add('hide');
  document.body.style.overflow = '';
  try { sessionStorage.setItem('entered', '1'); } catch(e){ /* storage blocked, the overlay just shows again next visit */ }
  window.removeEventListener('keydown', onKeyEnter);
}
function onKeyEnter(e){
  if(e.key === 'Enter' || e.key === ' '){ enterSite(); }
}
if(alreadyEntered() || window.location.hash){
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

// ============ PROJECTS SLIDER ============
(function setupGoodsSlider(){
  const track = document.getElementById('goodsTrack');
  const prevBtn = document.getElementById('goodsPrev');
  const nextBtn = document.getElementById('goodsNext');
  const dotsWrap = document.getElementById('goodsDots');
  if(!track || !prevBtn || !nextBtn || !dotsWrap) return;

  const cards = Array.from(track.children);

  // build one dot per card
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.setAttribute('aria-label', 'Go to project ' + (i + 1));
    dot.addEventListener('click', () => {
      track.scrollTo({ left: cards[i].offsetLeft - cards[0].offsetLeft, behavior: 'smooth' });
    });
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function cardStep(){
    // width of a card plus its gap, based on the first card's box
    const card = cards[0];
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || '0');
    return card.getBoundingClientRect().width + gap;
  }

  function scrollByCards(direction){
    track.scrollBy({ left: direction * cardStep(), behavior: 'smooth' });
  }

  prevBtn.addEventListener('click', () => scrollByCards(-1));
  nextBtn.addEventListener('click', () => scrollByCards(1));

  function updateUI(){
    const maxScroll = track.scrollWidth - track.clientWidth - 2; // small tolerance
    prevBtn.disabled = track.scrollLeft <= 2;
    nextBtn.disabled = track.scrollLeft >= maxScroll;

    // figure out which card is closest to the track's left edge to highlight its dot
    let closestIndex = 0;
    let closestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - cards[0].offsetLeft - track.scrollLeft);
      if(dist < closestDist){ closestDist = dist; closestIndex = i; }
    });
    if(nextBtn.disabled){ closestIndex = cards.length - 1; }
    dots.forEach((d, i) => d.classList.toggle('active', i === closestIndex));
  }

  track.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateUI);
  }, { passive: true });

  window.addEventListener('resize', updateUI);

  updateUI();
})();
