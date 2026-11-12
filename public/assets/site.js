// CC2ASN landing page behaviour: navigation, uses hover, query builder, FAQ, brackets.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- navigation: phone menu, and the bar's action steps aside while the hero's button shows ----
  const menuBtn = $('.nav__menu');
  const links = $('#nav-links');
  if (menuBtn && links) {
    const close = () => { links.classList.remove('is-open'); menuBtn.setAttribute('aria-expanded', 'false'); };
    menuBtn.addEventListener('click', () => {
      const open = !links.classList.contains('is-open');
      links.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    $$('a', links).forEach((a) => a.addEventListener('click', close));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }
  const navAction = $('[data-nav-action]');
  const heroAction = $('[data-hero-action]');
  if (navAction && heroAction && 'IntersectionObserver' in window) {
    navAction.classList.add('is-away');
    new IntersectionObserver(([e]) => navAction.classList.toggle('is-away', e.isIntersecting)).observe(heroAction);
  }

  // ---- uses: hover, focus or tap a use case; the box says how the lists help ----
  const items = $$('.uses__item');
  const box = $('#uses-box');
  if (items.length && box) {
    const boxName = $('.uses__box-name', box);
    const boxDesc = $('.uses__box-desc', box);
    const grid = box.parentElement;
    const narrow = matchMedia('(max-width: 47.99em)');
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    let current = items.find((b) => b.getAttribute('aria-pressed') === 'true') || items[0];
    // on a phone the box sits right under the list it explains
    const place = () => {
      if (narrow.matches) current.closest('.uses__group').append(box);
      else if (box.parentElement !== grid) grid.append(box);
    };
    const show = (btn) => {
      if (btn === current) return;
      current = btn;
      items.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      const fill = () => { boxName.textContent = btn.textContent; boxDesc.textContent = btn.dataset.desc; box.classList.remove('is-swap'); };
      if (reduced) fill(); else { box.classList.add('is-swap'); clearTimeout(box._t); box._t = setTimeout(fill, 140); }
      place();
    };
    items.forEach((b) => {
      b.addEventListener('click', () => show(b));
      b.addEventListener('focus', () => show(b));
      b.addEventListener('mouseenter', () => { if (fine.matches) show(b); });
    });
    narrow.addEventListener('change', place);
    place();
  }

  // ---- the query builder ----
  const form = $('#tool');
  if (form) {
    const ccInput = $('#cc');
    const state = { cc: ccInput.value || 'NO', type: 'ASN', client: 'curl', format: 'text' };
    const out = $('#cmd');
    const what = $('#cmd-what');
    const open = $('#open');
    const copy = $('#copy');
    const formatRow = $('[data-only="curl"]', form);
    const noun = { ASN: 'Every AS number', IPV4: 'Every IPv4 prefix', IPV6: 'Every IPv6 prefix', ALL: 'All AS numbers and prefixes' };

    const render = () => {
      const cc = state.cc;
      const path = state.type === 'ASN' ? cc : `${state.type}/${cc}`;
      const url = `https://api.cc2asn.com/${path}${state.format === 'json' && state.client === 'curl' ? '?format=json' : ''}`;
      const words = (state.type === 'ASN' ? cc : `${state.type} ${cc}`).toLowerCase();
      out.textContent = state.client === 'curl' ? `curl ${url}`
        : state.client === 'netcat' ? `echo ${words} | nc cc2asn.com 43`
        : `whois -h cc2asn.com '${words}'`;
      const json = state.client === 'curl' && state.format === 'json';
      const opt = ccInput.selectedOptions[0];
      const country = opt ? opt.textContent.replace(/ \([A-Z]{2}\)$/, '') : cc;
      what.textContent = `${noun[state.type]} registered to ${country}, ${json ? 'as JSON' : 'one per line'}.`;
      formatRow.hidden = state.client !== 'curl';
      open.hidden = state.client !== 'curl';
      open.href = url;
    };

    ccInput.addEventListener('change', () => { state.cc = ccInput.value; render(); });
    form.addEventListener('submit', (e) => e.preventDefault());

    $$('.steps', form).forEach((group) => {
      const key = group.dataset.group;
      $$('.step', group).forEach((b) => b.addEventListener('click', () => {
        $$('.step', group).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        state[key] = b.dataset.value;
        render();
      }));
    });

    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(out.textContent);
        copy.textContent = 'Copied';
      } catch {
        const r = document.createRange(); r.selectNodeContents(out);
        const s = getSelection(); s.removeAllRanges(); s.addRange(r);
        copy.textContent = 'Selected, press copy';
      }
      clearTimeout(copy._t);
      copy._t = setTimeout(() => { copy.textContent = 'Copy command'; }, 1600);
    });
    render();
  }

  // ---- FAQ: one answer at a time; on wide screens it shows large in the pane ----
  const qs = $$('.faq__q');
  const pane = $('.faq__answer');
  const wide = matchMedia('(min-width: 48em)');
  const select = (btn, toggle = false) => {
    const opening = toggle && !wide.matches ? btn.getAttribute('aria-expanded') !== 'true' : true;
    qs.forEach((b) => {
      const on = b === btn && opening;
      b.setAttribute('aria-expanded', String(on));
      const a = document.getElementById(b.getAttribute('aria-controls'));
      if (a) a.hidden = !on;
    });
    if (pane && wide.matches) {
      const a = document.getElementById(btn.getAttribute('aria-controls'));
      if (pane.dataset.for === btn.id) return;
      pane.dataset.for = btn.id;
      const swap = () => { pane.innerHTML = a ? a.innerHTML : ''; pane.classList.remove('is-swap'); };
      if (reduced || !pane.innerHTML) swap();
      else { pane.classList.add('is-swap'); setTimeout(swap, 150); }
    }
  };
  qs.forEach((b) => {
    b.addEventListener('click', () => select(b, true));
    b.addEventListener('focus', () => { if (wide.matches) select(b); });
    b.addEventListener('mouseenter', () => { if (wide.matches) select(b); });
  });
  if (qs[0]) select(qs[0]);
  wide.addEventListener('change', () => { const cur = qs.find((b) => b.getAttribute('aria-expanded') === 'true') || qs[0]; if (pane) delete pane.dataset.for; select(cur); });

  // ---- brackets close in around the statement as it rises from 85% to 50% of the screen ----
  const stmt = $('[data-brackets] .usage__word');
  if (stmt && !reduced) {
    const [l, r] = $$('.br', stmt);
    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = stmt.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      const p = Math.min(1, Math.max(0, (innerHeight * 0.85 - mid) / (innerHeight * 0.35)));
      const travel = (innerWidth < 768 ? 120 : 300) * (1 - p);
      l.style.transform = `translateX(${-travel}px)`;
      r.style.transform = `translateX(${travel}px)`;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    update();
  }

  // ---- scenes ----
  if (window.Stage) { Stage.init(); }
})();
