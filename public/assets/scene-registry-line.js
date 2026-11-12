// The data scene: the scroll reads one real RIPE NCC delegation line field by field and files it
// under NO_IPV4 as 2.148.0.0/14. Scrolling back undoes it. Phones and reduced motion get the finished
// composition (all four statements beside the parsed record).
Scenes['registry-line'] = (root, opts = {}) => Stage.scene(root, {
  hold: opts.hold ?? 1.6,
  scrub: true,
  beats: 4,
  phone: 'rest',
  build(tl, { q }) {
    const css = getComputedStyle(document.documentElement);
    const v = (n) => css.getPropertyValue(n).trim();
    const accent = v('--accent'), accentInk = v('--accent-ink'), ink = v('--ink'), surface = v('--surface');
    const steps = q('.data__steps li');
    const field = (n) => q(`.sef__f[data-f="${n}"]`);
    const row = (n) => q(`.sef__fields [data-row="${n}"]`);
    const result = q('.sef__result');
    const D = 0.12;
    const H = D / 2;
    const on = { backgroundColor: accent, color: accentInk, duration: D };
    const off = { backgroundColor: 'rgba(0,0,0,0)', color: ink, duration: D };

    // the first state: the raw line, its fields not yet read, the result not yet filed
    tl.fromTo(q('.sef__fields > div'), { opacity: 0.32 }, { opacity: 0.32, duration: 0.001 }, 0);
    tl.fromTo(result, { opacity: 0.4, backgroundColor: surface, color: ink, scale: 0.97 }, { opacity: 0.4, duration: 0.001 }, 0);

    // beat 1: the country and type fields are the key
    const b1 = 0.12;
    tl.to(steps[0], { autoAlpha: 0, duration: H }, b1)
      .fromTo(steps[1], { autoAlpha: 0 }, { autoAlpha: 1, duration: H }, b1 + H)
      .fromTo([...field('cc'), ...field('type'), ...row('cc'), ...row('type')], { backgroundColor: 'rgba(0,0,0,0)', color: ink }, on, b1)
      .to([...row('cc'), ...row('type')], { opacity: 1, duration: D }, b1);

    // beat 2: start address and count become a prefix length
    const b2 = 0.4;
    tl.to(steps[1], { autoAlpha: 0, duration: H }, b2)
      .fromTo(steps[2], { autoAlpha: 0 }, { autoAlpha: 1, duration: H }, b2 + H)
      .to([...field('cc'), ...field('type'), ...row('cc'), ...row('type')], off, b2)
      .fromTo([...field('start'), ...field('count'), ...row('count')], { backgroundColor: 'rgba(0,0,0,0)', color: ink }, on, b2)
      .to(row('count'), { opacity: 1, duration: D }, b2);

    // beat 3: the record is filed under the country's IPv4 list
    const b3 = 0.66;
    tl.to(steps[2], { autoAlpha: 0, duration: H }, b3)
      .fromTo(steps[3], { autoAlpha: 0 }, { autoAlpha: 1, duration: H }, b3 + H)
      .to([...field('start'), ...field('count'), ...row('count')], off, b3)
      .to(result, { opacity: 1, backgroundColor: accent, color: accentInk, scale: 1, duration: 0.22 }, b3);
  },
});
