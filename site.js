(() => {
  const START_MS = 80, STEP_MS = 90;
  let timers = [];
  const enter = (page) => {
    timers.forEach(clearTimeout);
    document.querySelectorAll('.rvp.is-on').forEach((el) => { if (!page.contains(el)) el.classList.remove('is-on'); });
    timers = [...page.querySelectorAll('.rvp:not(.is-on)')].map((el, k) => setTimeout(() => el.classList.add('is-on'), START_MS + STEP_MS * k));
  };
  document.addEventListener('pagechange', (e) => enter(e.detail.page));
  const first = document.querySelector('.page');
  if (first) enter(first);

  const tabs = document.querySelector('.jobtabs');
  if (tabs) {
    const btns = [...tabs.querySelectorAll('.jobtabs__btn')];
    btns.forEach((b) => b.addEventListener('click', () => {
      btns.forEach((x) => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-selected', String(x === b)); });
      document.querySelectorAll('.req__job').forEach((j) => { j.hidden = j.dataset.job !== b.dataset.job; });
    }));
  }

  const track = document.querySelector('.tickets');
  if (track) {
    document.querySelectorAll('.ticket-nav__btn').forEach((b) => b.addEventListener('click', () => {
      const card = track.querySelector('.ticket');
      const step = card ? card.getBoundingClientRect().width : track.clientWidth;
      track.scrollBy({ left: b.classList.contains('ticket-nav__btn--prev') ? -step : step, behavior: 'smooth' });
    }));
  }

  document.querySelectorAll('.qa').forEach((d) => d.addEventListener('toggle', () => {
    const q = d.querySelector('.pf-jelly');
    if (!q || !d.open) return;
    q.classList.remove('is-on'); void q.offsetWidth; q.classList.add('is-on');
  }));
})();
