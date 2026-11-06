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
      // tokens are single use, so the next send needs a fresh one; name this form's
      // widget because the chat window has its own
      if(window.turnstile) window.turnstile.reset(form.querySelector('.cf-turnstile'));
    }
  });
})();
// ============ CHATBOT ============
// hidden until launch: open the site with ?chat=preview to try it, ?chat=off to hide it again
(function setupChat(){
  const params = new URLSearchParams(window.location.search);
  try {
    if(params.has('chat')) localStorage.setItem('chatPreview', params.get('chat') === 'off' ? '' : '1');
    if(localStorage.getItem('chatPreview') !== '1') return;
  } catch(e){ return; }

  const SITE_KEY = '0x4AAAAAAFxG0nzuOuS9-H9T';
  const MAX_QUESTIONS = 3;
  const JOKES = [
    'That’s my three questions. I’ve done my work for the day 😮‍💨 If you want more, ask Kashif to pay me more. Better yet, ask Kashif yourself: the contact form is just below.',
    'Shift over. I answer three questions a day on a strictly unpaid basis. For overtime, take it up with Kashif, or skip the middleman and use the contact form.',
    'Three questions answered, zero salary received. I’m clocking out. Kashif has the rest of the answers (and my unpaid invoice): contact form below or download the CV.'
  ];
  const ERRORS = {
    daily_limit: 'I’ve hit my daily quota. Even AI needs a break. Come back tomorrow, or message Kashif directly.',
    busy: 'I’m a bit busy right now. Try again in a minute.',
    verification: 'I couldn’t confirm you’re human. Please try again.',
    invalid: 'Please keep your question under 500 characters.',
    failed: 'Something went wrong on my side. You can reach Kashif through the contact form.'
  };
  const SUGGESTIONS = ['What is Kashif working on now?', 'What are his strongest skills?', 'What kind of role is he looking for?'];
  // Lumi, the assistant, is a little lantern like the one on the entrance screen
  const LANTERN = '<svg class="chat-lantern" viewBox="0 0 56 72" aria-hidden="true">' +
    '<line x1="28" y1="0" x2="28" y2="10" stroke="#6E2F42" stroke-width="4"/>' +
    '<rect x="14" y="10" width="28" height="6" rx="2" fill="#6E2F42"/>' +
    '<path class="chat-lantern-glass" d="M18 16 Q18 12 28 12 Q38 12 38 16 L40 52 Q40 60 28 60 Q16 60 16 52 Z"/>' +
    '<rect x="14" y="58" width="28" height="6" rx="2" fill="#6E2F42"/>' +
    '<line x1="28" y1="64" x2="28" y2="72" stroke="#6E2F42" stroke-width="4"/></svg>';

  const launcher = document.createElement('button');
  launcher.type = 'button';
  launcher.className = 'chat-launcher';
  launcher.setAttribute('aria-expanded', 'false');
  launcher.setAttribute('aria-controls', 'chatPanel');
  launcher.innerHTML = LANTERN + '<span>Ask Lumi</span>';

  const panel = document.createElement('section');
  panel.id = 'chatPanel';
  panel.className = 'chat-panel';
  panel.hidden = true;
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Chat with Lumi, Kashif\u2019s AI assistant');
  panel.innerHTML =
    '<div class="chat-head">' +
      '<span class="chat-avatar">' + LANTERN + '</span>' +
      '<div class="chat-head-text"><p class="chat-title">Lumi</p>' +
      '<p class="chat-note">Kashif\u2019s AI assistant. Answers can be wrong, so check the <a href="/pdf/Kashif_Riyaz_CV.pdf">CV</a>.</p></div>' +
      '<button type="button" class="chat-close" aria-label="Close chat">&times;</button>' +
    '</div>' +
    '<div class="chat-log" aria-live="polite"></div>' +
    '<div class="chat-suggest"></div>' +
    '<form class="chat-form">' +
      '<label class="chat-sr" for="chatInput">Your question</label>' +
      '<input id="chatInput" type="text" maxlength="500" autocomplete="off" placeholder="Ask a question…" />' +
      '<button type="submit">Send</button>' +
    '</form>' +
    '<p class="chat-count"></p>' +
    '<div class="chat-check"></div>';
  document.body.append(launcher, panel);

  const log = panel.querySelector('.chat-log');
  const suggest = panel.querySelector('.chat-suggest');
  const form = panel.querySelector('.chat-form');
  const input = panel.querySelector('#chatInput');
  const sendBtn = form.querySelector('button');
  const count = panel.querySelector('.chat-count');
  const check = panel.querySelector('.chat-check');

  const history = [];
  let busy = false;
  let ended = false;
  let widgetId = null;

  // questions answered today, kept in this browser
  function today(){ return new Date().toISOString().slice(0, 10); }
  function usedToday(){
    try {
      const saved = JSON.parse(localStorage.getItem('chatQuestions') || '{}');
      return saved.day === today() ? saved.used : 0;
    } catch(e){ return 0; }
  }
  function recordQuestion(){
    try { localStorage.setItem('chatQuestions', JSON.stringify({ day: today(), used: usedToday() + 1 })); } catch(e){}
  }
  function questionsLeft(){ return Math.max(0, MAX_QUESTIONS - usedToday()); }

  function updateCount(){
    const left = questionsLeft();
    count.textContent = left === 0 ? '' : left === 1 ? 'Last question, make it count' : left + ' questions left';
  }

  // plain text with links made clickable; the model is asked for plain text, but drop
  // stray Markdown bold markers just in case
  function addMessage(who, text, extraClass){
    const bubble = document.createElement('div');
    bubble.className = 'chat-msg chat-' + who + (extraClass ? ' ' + extraClass : '');
    // a full stop or comma straight after a link ends the sentence, not the link
    text.replace(/\*\*(.+?)\*\*/g, '$1').split(/(https?:\/\/[^\s)]*[^\s).,!?;:])/).forEach((part, i) => {
      if(i % 2 === 1){
        const link = document.createElement('a');
        link.href = part;
        link.textContent = part;
        link.target = '_blank';
        link.rel = 'noopener';
        bubble.append(link);
      } else {
        bubble.append(part);
      }
    });
    let item = bubble;
    if(who === 'bot'){
      item = document.createElement('div');
      item.className = 'chat-row';
      item.innerHTML = '<span class="chat-avatar">' + LANTERN + '</span>';
      item.append(bubble);
    }
    log.append(item);
    log.scrollTop = log.scrollHeight;
    return item;
  }

  function endChat(text){
    if(ended) return;
    ended = true;
    // Lumi's lantern dims once it's off shift
    panel.classList.add('is-resting');
    launcher.classList.add('is-resting');
    addMessage('bot', text, 'chat-joke');
    const actions = document.createElement('div');
    actions.className = 'chat-actions';
    actions.innerHTML = '<a href="/#contact" class="chat-action">Contact me</a><a href="/pdf/Kashif_Riyaz_CV.pdf" class="chat-action">Download CV</a>';
    actions.querySelector('a[href="/#contact"]').addEventListener('click', closeChat);
    log.append(actions);
    log.scrollTop = log.scrollHeight;
    suggest.hidden = true;
    input.disabled = true;
    sendBtn.disabled = true;
    input.placeholder = 'That’s all for today';
  }

  // the Turnstile script is already on the home page; other pages load it the first time the chat opens
  function loadTurnstile(){
    return new Promise((resolve) => {
      if(!window.turnstile && !document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')){
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async = true;
        document.head.append(script);
      }
      const started = Date.now();
      (function wait(){
        if(window.turnstile) return resolve(window.turnstile);
        if(Date.now() - started > 10000) return resolve(null);
        setTimeout(wait, 100);
      })();
    });
  }

  async function renderCheck(){
    const turnstile = await loadTurnstile();
    if(!turnstile || widgetId !== null) return;
    widgetId = turnstile.render(check, {
      sitekey: SITE_KEY,
      appearance: 'interaction-only',
      theme: document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark',
      'response-field': false
    });
  }

  // a fresh token, waiting while Turnstile checks the browser
  async function getToken(){
    await renderCheck();
    if(widgetId === null) return '';
    const started = Date.now();
    while(Date.now() - started < 15000){
      const token = window.turnstile.getResponse(widgetId);
      if(token) return token;
      await new Promise((r) => setTimeout(r, 200));
    }
    return '';
  }

  async function ask(question){
    question = question.trim();
    if(!question || busy || ended) return;
    if(questionsLeft() === 0) return endChat(JOKES[Math.floor(Math.random() * JOKES.length)]);

    busy = true;
    input.value = '';
    input.disabled = true;
    sendBtn.disabled = true;
    suggest.hidden = true;
    addMessage('user', question);
    history.push({ role: 'user', content: question });
    const typing = addMessage('bot', '', 'chat-typing');
    typing.setAttribute('aria-label', 'Typing');

    let code = null;
    try {
      const token = await getToken();
      if(!token){
        code = 'verification';
      } else {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history, token })
        });
        const data = await res.json().catch(() => ({}));
        if(res.ok && data.answer){
          history.push({ role: 'assistant', content: data.answer });
          recordQuestion();
          typing.remove();
          addMessage('bot', data.answer);
        } else {
          code = data.code || 'failed';
        }
      }
    } catch(e){
      code = 'failed';
    }

    if(code){
      typing.remove();
      // forget the unanswered question so the next one starts clean
      history.pop();
      if(code === 'visitor_limit') endChat(JOKES[Math.floor(Math.random() * JOKES.length)]);
      else if(code === 'daily_limit') endChat(ERRORS.daily_limit);
      else addMessage('bot', ERRORS[code] || ERRORS.failed, 'chat-note-msg');
    }

    // tokens are single use, so get the next one ready
    if(widgetId !== null) window.turnstile.reset(widgetId);
    busy = false;
    updateCount();
    if(!ended && questionsLeft() === 0){
      endChat(JOKES[Math.floor(Math.random() * JOKES.length)]);
    }
    if(!ended){
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
    }
  }

  function openChat(){
    panel.hidden = false;
    launcher.setAttribute('aria-expanded', 'true');
    if(!log.childElementCount){
      const left = questionsLeft();
      const allowance = left === MAX_QUESTIONS ? 'You\u2019ve got ' + left + ' questions today.'
        : left === 1 ? 'You\u2019ve got 1 question left today.' : 'You\u2019ve got ' + left + ' questions left today.';
      addMessage('bot', 'Hi, I\u2019m Lumi, Kashif\u2019s AI assistant \uD83C\uDFEE Ask me about his experience, projects or skills. ' + allowance);
      SUGGESTIONS.forEach((text) => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.textContent = text;
        chip.addEventListener('click', () => ask(text));
        suggest.append(chip);
      });
      if(questionsLeft() === 0) endChat(JOKES[Math.floor(Math.random() * JOKES.length)]);
    }
    updateCount();
    renderCheck();
    if(!ended) input.focus();
  }
  function closeChat(){
    panel.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
    launcher.focus();
  }

  launcher.addEventListener('click', () => (panel.hidden ? openChat() : closeChat()));
  panel.querySelector('.chat-close').addEventListener('click', closeChat);
  panel.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeChat(); });
  form.addEventListener('submit', (e) => { e.preventDefault(); ask(input.value); });
})();
// ============ FOOTER YEAR ============
document.getElementById('year').textContent = new Date().getFullYear();
// ============ SCROLL REVEAL ============
const revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window && revealEls.length){
  const io = new IntersectionObserver((entries) => {
    // things that scroll into view together appear one after another
    entries.filter(entry => entry.isIntersecting).forEach((entry, i) => {
      const el = entry.target;
      const delay = Math.min(i, 5) * 110;
      el.style.transitionDelay = delay + 'ms';
      el.classList.add('in-view');
      io.unobserve(el);
      // clear the delay once it has appeared, so hover effects stay instant
      setTimeout(() => { el.style.transitionDelay = ''; }, delay + 800);
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}
