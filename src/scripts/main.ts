import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const en = document.documentElement.lang === 'en';
const L = { copy: en ? 'Copy' : '复制', copied: en ? 'Copied ✓' : '已复制 ✓', cert: en ? 'Certificate' : '证书' };
const fine = matchMedia('(pointer: fine)').matches;
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));
const navH = 68;

let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

const scrollToHash = (hash: string) => {
  const el = hash === '#' || hash === '' ? document.body : document.querySelector(hash);
  if (!el) return false;
  const y = hash === '#top' || el === document.body ? 0 : (el as HTMLElement).getBoundingClientRect().top + scrollY - (hash === '#about' ? 0 : navH - 1);
  lenis ? lenis.scrollTo(y, { duration: 1.3 }) : scrollTo({ top: y });
  return true;
};

/* page curtain */
const curtain = document.querySelector<HTMLElement>('.curtain');
if (curtain) {
  const arrived = sessionStorage.getItem('cur') === '1';
  if (arrived) {
    sessionStorage.removeItem('cur');
    gsap.set(curtain, { y: 0, yPercent: 0 });
    gsap.to(curtain, { yPercent: -100, duration: 0.8, ease: 'power4.inOut', delay: 0.08, onComplete: () => document.documentElement.classList.remove('cur') });
  }
  addEventListener('pageshow', (e) => {
    if ((e as PageTransitionEvent).persisted) gsap.set(curtain, { yPercent: 100 });
  });
}

document.addEventListener('click', (e) => {
  const a = (e.target as Element).closest('a');
  if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || a.target === '_blank') return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return;
  if (url.pathname === location.pathname && url.hash) {
    if (scrollToHash(url.hash)) {
      e.preventDefault();
      history.pushState(null, '', url.hash);
    }
    return;
  }
  if (url.pathname === location.pathname || !curtain || reduce) return;
  e.preventDefault();
  sessionStorage.setItem('cur', '1');
  gsap.fromTo(curtain, { yPercent: 100 }, { yPercent: 0, duration: 0.6, ease: 'power4.inOut', onComplete: () => (location.href = a.href) });
});

if (location.hash) setTimeout(() => scrollToHash(location.hash), 60);

/* progress + nav */
const bar = document.querySelector<HTMLElement>('.progress i');
const nav = document.querySelector('.nav');
ScrollTrigger.create({
  start: 0,
  end: 'max',
  onUpdate: (s) => {
    if (bar) bar.style.transform = `scaleX(${s.progress})`;
    nav?.classList.toggle('solid', scrollY > 24);
  },
});

/* scrollspy */
const groups = new Map<Element, HTMLAnchorElement[]>();
$<HTMLAnchorElement>('a[data-spy]').forEach((a) => {
  const g = a.closest('ul, .toc')!;
  groups.set(g, [...(groups.get(g) ?? []), a]);
});
groups.forEach((links) => {
  links.forEach((a, idx) => {
    const t = document.querySelector(new URL(a.href).hash);
    if (!t) return;
    const parent = a.dataset.sub;
    let endTrigger: Element = t;
    let end = 'bottom 45%';
    if (parent) {
      const next = links.slice(idx + 1).find((l) => l.dataset.sub === parent);
      const nt = next && document.querySelector(new URL(next.href).hash);
      endTrigger = nt ?? document.getElementById(parent) ?? t;
      end = nt ? 'top 45%' : 'bottom 45%';
    }
    ScrollTrigger.create({
      trigger: t,
      endTrigger,
      start: 'top 45%',
      end,
      onToggle: (s) => {
        a.classList.toggle('active', s.isActive);
        if (!parent) return;
        const pl = links.find((l) => !l.dataset.sub && new URL(l.href).hash === '#' + parent);
        pl?.classList.toggle('has-active', links.some((l) => l.dataset.sub === parent && l.classList.contains('active')));
      },
    });
  });
});

/* split headline */
$('[data-split]').forEach((el) => {
  const text = el.textContent ?? '';
  el.setAttribute('aria-label', text);
  el.innerHTML = [...text].map((c) => `<span class="ch" aria-hidden="true">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
});

/* reveal */
if (!reduce) {
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 92%',
    once: true,
    onEnter: (els) => gsap.fromTo(els, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', overwrite: true }),
  });
}

/* counters */
$('[data-count]').forEach((el) => {
  const end = parseFloat(el.dataset.count!);
  const dec = parseInt(el.dataset.dec ?? '0');
  if (reduce) return;
  const o = { v: 0 };
  el.textContent = (0).toFixed(dec);
  ScrollTrigger.create({
    trigger: el,
    start: 'top 92%',
    once: true,
    onEnter: () => gsap.to(o, { v: end, duration: 1.8, ease: 'power3.out', onUpdate: () => (el.textContent = o.v.toFixed(dec)) }),
  });
});

/* course bars + chart bars */
const fillOnView = (sel: string, to: (el: HTMLElement) => gsap.TweenVars) => {
  $(sel).forEach((el, i) => {
    if (reduce) return gsap.set(el, to(el));
    ScrollTrigger.create({
      trigger: el,
      start: 'top 94%',
      once: true,
      onEnter: () => gsap.to(el, { ...to(el), duration: 1.3, ease: 'power3.out', delay: (i % 8) * 0.05 }),
    });
  });
};
fillOnView('.course .bar i', (el) => ({ scaleX: parseFloat(el.dataset.p!) }));
fillOnView('.bar-row .fill', () => ({ scaleX: 1 }));

/* flow */
$('.flow').forEach((flow) => {
  const steps = $('.step', flow);
  const set = (p: number) => {
    flow.style.setProperty('--prog', String(p));
    steps.forEach((s, i) => s.classList.toggle('lit', p >= (i / steps.length) * 0.85 + 0.03));
  };
  if (reduce) return set(1);
  ScrollTrigger.create({ trigger: flow, start: 'top 65%', end: 'bottom 70%', scrub: true, onUpdate: (s) => set(s.progress) });
});

/* whole project card is clickable */
$('.proj').forEach((card) => {
  const go = card.querySelector<HTMLAnchorElement>('a.btn.primary');
  if (!go) return;
  card.addEventListener('click', (e) => {
    if ((e.target as Element).closest('a, button') || getSelection()?.toString()) return;
    go.click();
  });
});

/* pointer effects */
if (fine && !reduce) {
  const glow = document.querySelector<HTMLElement>('.glow');
  if (glow) {
    const gx = gsap.quickTo(glow, 'x', { duration: 0.8, ease: 'power3' });
    const gy = gsap.quickTo(glow, 'y', { duration: 0.8, ease: 'power3' });
    addEventListener('pointermove', (e) => {
      glow.classList.add('on');
      gx(e.clientX);
      gy(e.clientY);
    });
  }
  $('.card, .proj').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${(e as PointerEvent).clientX - r.left}px`);
      el.style.setProperty('--my', `${(e as PointerEvent).clientY - r.top}px`);
      if (el.classList.contains('proj')) {
        el.style.setProperty('--ry', `${(((e as PointerEvent).clientX - r.left) / r.width - 0.5) * 3}deg`);
        el.style.setProperty('--rx', `${-(((e as PointerEvent).clientY - r.top) / r.height - 0.5) * 3}deg`);
      }
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  });
  $('[data-magnet]').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
    const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      x(((e as PointerEvent).clientX - r.left - r.width / 2) * 0.25);
      y(((e as PointerEvent).clientY - r.top - r.height / 2) * 0.35);
    });
    el.addEventListener('pointerleave', () => (x(0), y(0)));
  });
}

/* copy to clipboard */
document.addEventListener('click', async (e) => {
  const b = (e.target as Element).closest<HTMLButtonElement>('[data-copy]');
  if (!b) return;
  const text = b.dataset.copy!;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const t = Object.assign(document.createElement('textarea'), { value: text });
    document.body.append(t);
    t.select();
    document.execCommand('copy');
    t.remove();
  }
  b.textContent = L.copied;
  b.classList.add('copied');
  setTimeout(() => {
    b.textContent = L.copy;
    b.classList.remove('copied');
  }, 1600);
});

/* award reel: certificate / ceremony photo crossfade */
$('[data-reel]').forEach((reel) => {
  const imgs = $<HTMLImageElement>('img', reel);
  const dots = $('.dots i', reel);
  const label = reel.querySelector<HTMLElement>('.reel-label')!;
  let cur = 0;
  const go = (n: number) => {
    imgs[cur].classList.remove('on');
    dots[cur].classList.remove('on');
    cur = n % imgs.length;
    imgs[cur].classList.add('on');
    dots[cur].classList.add('on');
    label.textContent = imgs[cur].dataset.label!;
    label.classList.remove('swap');
    void label.offsetWidth;
    label.classList.add('swap');
  };
  if (reduce) return;
  let timer = 0;
  const start = () => (timer = window.setInterval(() => go(cur + 1), 1500));
  const stop = () => clearInterval(timer);
  new IntersectionObserver(([e]) => (e.isIntersecting ? (stop(), start()) : stop())).observe(reel);
  reel.closest('.award')?.addEventListener('pointerenter', stop);
  reel.closest('.award')?.addEventListener('pointerleave', () => (stop(), start()));
});

/* autoplay-on-view videos (covers) */
const watchVideo = (v: HTMLVideoElement, onIn: () => void, onOut: () => void, t = 0.4) =>
  new IntersectionObserver(([e]) => (e.isIntersecting ? onIn() : onOut()), { threshold: t }).observe(v);
if (!reduce) $<HTMLVideoElement>('video[data-autoplay]').forEach((v) => watchVideo(v, () => void v.play().catch(() => {}), () => v.pause()));

/* image viewer */
$('[data-viewer]').forEach((v) => {
  const thumbs = $<HTMLButtonElement>('.v-thumb', v);
  const strip = v.querySelector<HTMLElement>('.v-strip')!;
  const img = v.querySelector<HTMLImageElement>('.v-img')!;
  const shot = v.querySelector<HTMLElement>('.v-shot')!;
  const main = v.querySelector<HTMLElement>('.v-main')!;
  const cap = v.querySelector<HTMLElement>('.v-cap')!;
  const [tag, title, text, note] = ['.v-tag', '.v-title', '.v-text', '.v-note'].map((s) => v.querySelector<HTMLElement>(s)!);
  const count = v.querySelector<HTMLElement>('.v-count b')!;
  let cur = 0;
  const apply = () => {
    const d = thumbs[cur].dataset;
    img.src = d.src!;
    img.alt = d.title!;
    main.dataset.lb = d.src;
    main.dataset.caption = `${d.tag} · ${d.title}`;
    tag.textContent = d.tag!;
    title.textContent = d.title!;
    text.textContent = d.caption!;
    note.textContent = d.note!;
    note.hidden = !d.note;
    count.textContent = String(cur + 1).padStart(2, '0');
  };
  const show = (i: number) => {
    cur = (i + thumbs.length) % thumbs.length;
    thumbs.forEach((t, k) => t.classList.toggle('on', k === cur));
    const t = thumbs[cur];
    strip.scrollTo({ left: t.offsetLeft - (strip.clientWidth - t.clientWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
    if (reduce) return apply();
    gsap.to([shot, cap], {
      opacity: 0,
      y: 8,
      duration: 0.18,
      onComplete: () => {
        apply();
        gsap.to([shot, cap], { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' });
      },
    });
  };
  thumbs.forEach((t, i) => t.addEventListener('click', () => i !== cur && show(i)));
  v.querySelector('.v-nav.prev')!.addEventListener('click', () => show(cur - 1));
  v.querySelector('.v-nav.next')!.addEventListener('click', () => show(cur + 1));
});

/* video stage */
$('[data-vstage]').forEach((st) => {
  const video = st.querySelector<HTMLVideoElement>('video')!;
  const screen = st.querySelector<HTMLElement>('.vs-screen')!;
  const bar = st.querySelector<HTMLElement>('.vs-progress i')!;
  const badge = st.querySelector<HTMLElement>('.vs-badge')!;
  const desc = st.querySelector<HTMLElement>('.vs-desc')!;
  const tabs = $<HTMLButtonElement>('.vs-tab', st);
  let userPaused = false;
  let inView = false;
  const sync = () => st.classList.toggle('paused', video.paused);
  video.addEventListener('play', sync);
  video.addEventListener('pause', sync);
  video.addEventListener('timeupdate', () => {
    const p = video.duration ? video.currentTime / video.duration : 0;
    bar.style.transform = `scaleX(${p})`;
    const f = st.querySelector<HTMLElement>('.vs-tab.on .vs-fill');
    if (f) f.style.transform = `scaleX(${p})`;
  });
  screen.addEventListener('click', () => {
    if (video.paused) {
      userPaused = false;
      void video.play().catch(() => {});
    } else {
      userPaused = true;
      video.pause();
    }
  });
  tabs.forEach((t) =>
    t.addEventListener('click', () => {
      if (t.classList.contains('on')) return;
      tabs.forEach((o) => {
        o.classList.toggle('on', o === t);
        const f = o.querySelector<HTMLElement>('.vs-fill');
        if (f) f.style.transform = 'scaleX(0)';
      });
      video.src = t.dataset.src!;
      desc.textContent = t.dataset.desc!;
      badge.textContent = t.dataset.speed!;
      userPaused = false;
      video.load();
      if (inView && !reduce) void video.play().catch(() => {});
    }),
  );
  sync();
  if (!reduce)
    watchVideo(
      video,
      () => {
        inView = true;
        if (!userPaused) void video.play().catch(() => {});
      },
      () => {
        inView = false;
        video.pause();
      },
      0.45,
    );
});

/* collaboration case filter */
$('[data-collab]').forEach((root) => {
  const tabs = $<HTMLButtonElement>('[data-cg]', root);
  const cases = $<HTMLDetailsElement>('.c-case', root);
  tabs.forEach((t) =>
    t.addEventListener('click', () => {
      tabs.forEach((o) => o.classList.toggle('on', o === t));
      const g = t.dataset.cg;
      const shown = cases.filter((c) => (c.classList.toggle('hide', g !== 'all' && c.dataset.group !== g), g === 'all' || c.dataset.group === g));
      if (!reduce) gsap.fromTo(shown, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.04, ease: 'power3.out' });
      ScrollTrigger.refresh();
    }),
  );
});

/* lightbox */
const lb = document.querySelector<HTMLElement>('.lb');
if (lb) {
  const img = lb.querySelector('img')!;
  const cap = lb.querySelector('figcaption')!;
  const alt = lb.querySelector<HTMLElement>('.alt')!;
  const close = () => {
    lb.classList.remove('open');
    lenis?.start();
  };
  const show = (src: string) => (img.src = new URL(src, document.baseURI).href);
  $('[data-lb]').forEach((b) =>
    b.addEventListener('click', () => {
      const extra: { label: string; img: string }[] = JSON.parse(b.dataset.extra || '[]');
      const main = b.dataset.lb!;
      cap.textContent = b.dataset.caption ?? '';
      alt.innerHTML = '';
      if (extra.length) {
        [{ label: L.cert, img: main }, ...extra].forEach((o, i) => {
          const x = document.createElement('button');
          x.textContent = o.label;
          x.className = i ? '' : 'on';
          x.onclick = () => {
            $('button', alt).forEach((n) => n.classList.toggle('on', n === x));
            show(o.img);
          };
          alt.append(x);
        });
      }
      show(main);
      lb.classList.add('open');
      lenis?.stop();
    }),
  );
  lb.addEventListener('click', (e) => {
    if (e.target === lb || (e.target as Element).classList.contains('x')) close();
  });
  addEventListener('keydown', (e) => e.key === 'Escape' && close());
}
