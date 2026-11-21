import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { ArrowUpRight, Award, BadgeCheck, Building2, CalendarDays, Camera, CheckCircle2, CircleDot, ClipboardCheck, ClipboardList, Droplets, Hammer, Home, Images, MapPin, Phone, PhoneCall, Search, Settings2, ShieldCheck, Shovel, Star, ThumbsUp, Workflow, Wrench } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import './LandingPage.css';

/* ─── Business Constants ─── */
const PHONE = '7020742830';
const PHONE_DISPLAY = '70207 42830';
const WA_BASE = `https://wa.me/91${PHONE}?text=`;
const contactPhone = `tel:+91${PHONE}`;

const HERO_BACKGROUNDS = [
  '/worksite.png',
  '/services/work-1.webp',
  '/services/work-5.webp',
  '/services/work-2.webp',
];

function waUrl(service = 'प्लंबिंग सेवा') {
  return WA_BASE + encodeURIComponent(
    `नमस्कार श्रीराम प्लंबिंग वर्क्स,\nमला *${service}* या कामाबद्दल माहिती हवी आहे.\nकृपया लवकर संपर्क करावा. धन्यवाद!`
  );
}

/* ─── Services with a single professional icon family ─── */
const services = [
  {
    title: 'नवीन प्लंबिंग',
    Icon: Wrench,
    plain: 'घरात नळ व पाण्याची नवीन लाइन बसवणे',
    desc: 'घरातील पाण्याची नवीन लाइन आणि फिटिंग बसवणे.',
    details: ['घरातील आणि बाहेरील फिटिंग', 'पाइपलाइन बसवणे', 'प्रेशर टेस्टिंग'],
    photo: '/services/work-1.webp',
  },
  {
    title: 'दुरुस्ती',
    Icon: Settings2,
    plain: 'गळती थांबवणे व जुने नळ दुरुस्त करणे',
    desc: 'गळती, नळ आणि पाइपलाइनची दुरुस्ती.',
    details: ['गळती शोधणे', 'व्हॉल्व्ह बदलणे', 'खराब पाइप बदलणे'],
    photo: '/services/work-2.webp',
  },
  {
    title: 'धुमसणे',
    Icon: Shovel,
    plain: 'जमीन घट्ट करणे — इमारतीचा पाया मजबूत',
    desc: 'माती आणि खडी दाबून पाया किंवा फरशीसाठी सपाट बेस तयार करणे.',
    details: ['माती व खडी कॉम्पॅक्शन', 'बेस तयार करणे', 'जमीन समतल करणे'],
    photo: '/services/work-3.webp',
  },
  {
    title: 'रिबारिंग',
    Icon: Building2,
    plain: 'काँक्रीटमध्ये लोखंडी बार बसवण्याचे काम',
    desc: 'काँक्रीटमध्ये नवीन स्टील बार बसवण्याचे काम.',
    details: ['केमिकल अँकरिंग', 'बीम व कॉलम जोड', 'स्टील बार बसवणे'],
    photo: '/services/work-4.webp',
  },
  {
    title: 'कोअर कटिंग',
    Icon: CircleDot,
    plain: 'भिंत व फरशीत गोल भोक पाडणे — पाइपसाठी',
    desc: 'पाइप किंवा डक्टसाठी काँक्रीटमध्ये गोल छिद्र करणे.',
    details: ['पाइपसाठी छिद्रे', 'स्लॅब ड्रिलिंग', 'बीम ड्रिलिंग'],
    photo: '/services/work-5.webp',
  },
  {
    title: 'ब्रेकर फोडकाम',
    Icon: Hammer,
    plain: 'मशिनने काँक्रीट फोडणे — जुन्या बांधकामासाठी',
    desc: 'ब्रेकरच्या साहाय्याने आवश्यक भागातील काँक्रीट फोडणे.',
    details: ['काँक्रीट फोडकाम', 'फरशी काढणे', 'भिंतीचे फोडकाम'],
    photo: '/services/work-6.webp',
  },
  {
    title: 'वॉल व RCC कटिंग',
    Icon: Wrench,
    plain: 'भिंत व स्लॅबमध्ये कापणी — दरवाजा, खिडकी',
    desc: 'भिंत किंवा स्लॅबमध्ये आवश्यक आकाराचे कटिंग.',
    details: ['दरवाजाचे कटिंग', 'खिडकीचे कटिंग', 'आरसीसी स्लॅब कटिंग'],
    photo: '/services/work-7.webp',
  },
];

const navigation = [
  ['home', 'मुख्यपृष्ठ', Home],
  ['services', 'आमच्या सेवा', Wrench],
  ['about', 'आमच्याबद्दल', Building2],
  ['gallery', 'कामाची झलक', Images],
  ['testimonials', 'ग्राहकांचे अनुभव', Star],
  ['process', 'कामाची पद्धत', ClipboardList],
  ['contact', 'संपर्क', PhoneCall],
];

const processSteps = [
  { num: '01', Icon: Phone, title: 'संपर्क साधा', desc: 'तुमच्या कामाची माहिती WhatsApp वर पाठवा किंवा फोन करा.' },
  { num: '02', Icon: Search, title: 'कामाची पाहणी', desc: 'कामाचे स्वरूप आणि साहित्य पाहणी करून ठरवले जाईल.' },
  { num: '03', Icon: Wrench, title: 'काम सुरू', desc: 'वेळ, साहित्य आणि खर्च ठरवून काम सुरू केले जाईल.' },
  { num: '04', Icon: ClipboardCheck, title: 'काम पूर्ण', desc: 'काम पूर्ण झाल्यावर जागा स्वच्छ करून सुपूर्द केली जाईल.' },
];

const testimonials = [
  {
    name: 'दीपक कुंभार',
    village: 'सांगली',
    stars: 5,
    quote: 'संतोष यांनी आमच्या घराचे संपूर्ण प्लंबिंग व कोअर कटिंग वेळेत आणि स्वच्छपणे केले. खूपच चांगले काम!',
  },
  {
    name: 'नाईक साहेब',
    village: 'मर्दवाडी',
    stars: 5,
    quote: 'धुमुस मशिनचे काम एकदम परफेक्ट झाले. भाव योग्य आणि काम उत्तम. पुन्हा नक्की बोलवेन.',
  },
  {
    name: 'सुंदर पाटील',
    village: 'वाळवा',
    stars: 5,
    quote: 'वॉल कटिंग व RCC कटिंग एकदम अचूक झाले. कामगार वेळेवर आले, जागा स्वच्छ ठेवली. खूप आभार!',
  },
];

/* ─── Trust stats (correct client data) ─── */
const trustStats = [
  {
    icon: CheckCircle2,
    value: 2700,
    suffix: '+',
    label: 'पूर्ण झालेली कामे',
    theme: 'aqua',
  },
  {
    icon: Award,
    value: 20,
    suffix: ' वर्षे',
    label: 'अनुभव (२००७ पासून)',
    theme: 'teal',
  },
  {
    icon: ShieldCheck,
    value: 100,
    suffix: '%',
    label: 'वेळेची आणि गुणवत्तेची हमी',
    theme: 'cyan',
  },
];

/* ─── CountUp hook ─── */
function useCountUp(target, duration = 1800, trigger) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, trigger]);
  return count;
}

/* ─── Single stat with count-up ─── */
function StatBadge({ stat, trigger }) {
  const count = useCountUp(stat.value, 1600, trigger);
  return (
    <div className="trust-stat">
      <div className="trust-num-row">
        <span className="trust-num">{count}</span>
        <span className="trust-suffix">{stat.suffix}</span>
      </div>
      <span className="trust-label">{stat.label}</span>
    </div>
  );
}

/* ─── Trust Strip ─── */
function TrustStrip() {
  const ref = useRef(null);
  const [triggered, setTriggered] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTriggered(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div className="trust-strip hero-trust-strip reveal" ref={ref} aria-label="आमची उपलब्धी">
      {trustStats.map(s => <StatBadge key={s.label} stat={s} trigger={triggered} />)}
    </div>
  );
}

/* ─── Brand (with triple-tap secret admin) ─── */
function Brand({ onSecretAdminAccess, onNavClick }) {
  const tapCount = useRef(0);
  const tapTimer = useRef(null);
  const lastTap = useRef(0);

  const handleLogoTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 60) return;
    lastTap.current = now;
    tapCount.current += 1;
    if (tapTimer.current) clearTimeout(tapTimer.current);
    if (tapCount.current >= 3) {
      tapCount.current = 0;
      try { navigator.vibrate?.([40, 60, 40]); } catch (_) {}
      onSecretAdminAccess?.();
    } else {
      tapTimer.current = setTimeout(() => { tapCount.current = 0; }, 750);
    }
  };

  return (
    <div className="identity">
      <img
        src="/shriram_logo.jpg"
        alt="श्रीराम प्लंबिंग वर्क्स"
        className="brand-logo-img"
        onClick={handleLogoTap}
        title="श्रीराम प्लंबिंग वर्क्स"
      />
      <a
        href="#home"
        className="brand-text"
        onClick={(e) => {
          if (onNavClick) {
            e.preventDefault();
            onNavClick();
          }
        }}
      >
        <span>श्रीराम प्लंबिंग वर्क्स</span>
        <small>SHRIRAM PLUMBING WORKS</small>
      </a>
    </div>
  );
}

/* ─── Decorative Ornament Section Heading (Line + Double Dots + Title + Double Dots + Line) ─── */
function SectionHeading({ title, subtitle, id, className = '' }) {
  return (
    <div className={`section-heading-ornament ${className}`}>
      {subtitle && <p className="eyebrow">{subtitle}</p>}
      <div className="ornament-row">
        <div className="ornament-line ornament-line-left" aria-hidden="true">
          <span className="ornament-bar" />
          <span className="ornament-dot dot-sm" />
          <span className="ornament-dot dot-lg" />
        </div>
        <h2 id={id} className="ornament-title">{title}</h2>
        <div className="ornament-line ornament-line-right" aria-hidden="true">
          <span className="ornament-dot dot-lg" />
          <span className="ornament-dot dot-sm" />
          <span className="ornament-bar" />
        </div>
      </div>
    </div>
  );
}

/* ─── Vibrant Gradient Section Divider Bar ─── */
function SectionDivider() {
  return <div className="section-gradient-divider" aria-hidden="true" />;
}

/* ─── Continuous Smooth Service Marquee ─── */
function ServiceCarousel() {
  const dialog = useRef(null);
  const [opened, setOpened] = useState(null);

  useLayoutEffect(() => {
    if (opened !== null && dialog.current) dialog.current.showModal();
  }, [opened]);

  const svc = opened !== null ? services[opened] : null;

  return (
    <section id="services" className="offerings" aria-labelledby="service-title">
      <SectionHeading title="आमच्या सेवा" id="service-title" subtitle="सर्व प्रकारची कामे" />

      <div className="service-marquee-viewport">
        <div
          className={`service-marquee-track ${opened !== null ? 'is-paused' : ''}`}
        >
          {/* Loop 1 */}
          <div className="service-marquee-group">
            {services.map((s, i) => (
              <article className="work-card" key={`group1-${s.title}-${i}`}>
                <div className="work-card-img-wrap">
                  <img src={s.photo} alt={s.title} loading="lazy" />
                  <span className="service-icon" aria-hidden="true"><s.Icon /></span>
                </div>
                <div>
                  <h3>
                    <button type="button" className="card-open" aria-haspopup="dialog" onClick={() => setOpened(i)}>
                      {s.title}
                    </button>
                  </h3>
                  <p className="service-plain">{s.plain}</p>
                  <ul>{s.details.map(d => <li key={d}>{d}</li>)}</ul>
                  <a href={waUrl(s.title)} target="_blank" rel="noopener noreferrer" className="card-enquiry-link">
                    <WhatsAppIcon aria-hidden="true" /> चौकशी करा <ArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Loop 2 (seamless endless continuation) */}
          <div className="service-marquee-group" aria-hidden="true">
            {services.map((s, i) => (
              <article className="work-card" key={`group2-${s.title}-${i}`}>
                <div className="work-card-img-wrap">
                  <img src={s.photo} alt={s.title} loading="lazy" />
                  <span className="service-icon" aria-hidden="true"><s.Icon /></span>
                </div>
                <div>
                  <h3>
                    <button type="button" className="card-open" aria-haspopup="dialog" onClick={() => setOpened(i)}>
                      {s.title}
                    </button>
                  </h3>
                  <p className="service-plain">{s.plain}</p>
                  <ul>{s.details.map(d => <li key={d}>{d}</li>)}</ul>
                  <a href={waUrl(s.title)} target="_blank" rel="noopener noreferrer" className="card-enquiry-link">
                    <WhatsAppIcon aria-hidden="true" /> चौकशी करा <ArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <dialog ref={dialog} className="work-dialog" aria-labelledby="opened-title"
        onClose={() => setOpened(null)}
        onClick={e => { if (e.target === dialog.current) dialog.current.close(); }}>
        {svc && (
          <div className="work-dialog-panel">
            <button type="button" className="dialog-close" aria-label="बंद करा" onClick={() => dialog.current.close()}>×</button>
            <div className="dialog-icon-banner" aria-hidden="true"><svc.Icon /></div>
            <img src={svc.photo} alt={svc.title} />
            <div className="dialog-copy">
              <h2 id="opened-title">{svc.title}</h2>
              <p className="service-plain-big">{svc.plain}</p>
              <p>{svc.desc}</p>
              <ul>{svc.details.map(d => <li key={d}>{d}</li>)}</ul>
              <a className="action" href={waUrl(svc.title)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon aria-hidden="true" /> WhatsApp वर चौकशी करा <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}

/* ─── Testimonials ─── */
function Testimonials() {
  return (
    <section id="testimonials" className="testimonials-section" aria-labelledby="testi-heading">
      <SectionHeading title="ग्राहकांचे अनुभव" id="testi-heading" subtitle="त्यांनी वापरले, त्यांचे मत" />
      <div className="testi-grid">
        {testimonials.map((t, i) => (
          <article className="testi-card" key={i}>
            <div className="testi-stars" aria-label={`${t.stars} स्टार`}>
              {'⭐'.repeat(t.stars)}
            </div>
            <blockquote>"{t.quote}"</blockquote>
            <footer className="testi-author">
              <span className="testi-avatar" aria-hidden="true">
                {t.name.charAt(0)}
              </span>
              <span>
                <strong>{t.name}</strong>
                <small>{t.village}</small>
              </span>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ─── Real Site Gallery (Infinite Butter-Smooth CSS Marquee) ─── */
function SiteGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const sitePhotos = [
    { src: '/site-gallery/site-3.jpg', caption: 'पंप व पाण्याची लाईन फिटिंग' },
    { src: '/site-gallery/site-9.jpg', caption: 'भूमिगत ड्रेनेज लाईन' },
    { src: '/site-gallery/site-1.jpg', caption: 'इमारतीचे बाहेरील प्लंबिंग' },
    { src: '/site-gallery/site-2.jpg', caption: 'बाहेरील ड्रेनेज पाईप फिटिंग' },
    { src: '/site-gallery/site-4.jpg', caption: 'भिंतीतील पाण्याची लाईन' },
    { src: '/site-gallery/site-5.jpg', caption: 'इमारतीवरील पाईपलाईन' },
    { src: '/site-gallery/site-6.jpg', caption: 'बाथटब बसवण्याचे काम' },
    { src: '/site-gallery/site-7.jpg', caption: 'बाथरूममधील अंतर्गत फिटिंग' },
    { src: '/site-gallery/site-8.jpg', caption: 'गरम व थंड पाण्याची फिटिंग' },
  ];

  const items = sitePhotos;

  return (
    <section id="gallery" className="site-gallery-section" aria-labelledby="sg-heading">
      <SectionHeading title="प्रत्यक्ष कामाचे फोटो" id="sg-heading" subtitle="प्रत्यक्ष साईटवरून" />
      <p className="site-gallery-sub">आमच्या साईटवरील प्लंबिंग, पाईपलाईन व फिटिंग कामांची झलक.</p>
      <div className="site-gallery-wrapper">
        <div className="site-gallery-track" aria-label="साईट फोटो गॅलरी">
          {items.map((p, i) => (
            <figure
              className="site-gallery-item"
              key={i}
              onClick={() => setSelectedPhoto(p)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedPhoto(p); }}
              aria-label={`${p.caption} फोटो मोठा करा`}
            >
              <div className="gallery-img-box">
                <img src={p.src} alt={p.caption} loading="lazy" />
                <span className="gallery-overlay-badge">
                  <Search size={14} aria-hidden="true" /> फोटो पहा
                </span>
              </div>
              <figcaption>{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      {selectedPhoto && (
        <div className="gallery-lightbox" onClick={() => setSelectedPhoto(null)} role="dialog" aria-modal="true">
          <div className="gallery-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="gallery-lightbox-close"
              onClick={() => setSelectedPhoto(null)}
              aria-label="बंद करा"
            >×</button>
            <img src={selectedPhoto.src} alt={selectedPhoto.caption} />
            <div className="gallery-lightbox-info">
              <h3>{selectedPhoto.caption}</h3>
              <a
                href={waUrl(selectedPhoto.caption)}
                target="_blank"
                rel="noopener noreferrer"
                className="action action-wa"
              >
                <WhatsAppIcon size={16} aria-hidden="true" /> WhatsApp वर चौकशी
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ─── Floating bottom bar (mobile) ─── */
function FloatingBar() {
  return (
    <div className="floating-bar" role="navigation" aria-label="झटपट संपर्क">
      <a href={contactPhone} className="float-btn float-call">
        <Phone className="float-icon" aria-hidden="true" />
        <span>कॉल करा</span>
      </a>
      <a href={waUrl()} target="_blank" rel="noopener noreferrer" className="float-btn float-wa">
        <WhatsAppIcon className="float-icon" aria-hidden="true" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}

/* ─── Scroll-to-top ─── */
function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const checkScroll = () => {
      const top = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setShow(top > 250);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    document.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => {
      window.removeEventListener('scroll', checkScroll);
      document.removeEventListener('scroll', checkScroll);
    };
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      className="scroll-top-btn"
      onClick={() => {
        try {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
          document.body.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (_) {
          window.scrollTo(0, 0);
        }
      }}
      aria-label="वर जा"
      title="वर जा"
    >
      ↑
    </button>
  );
}

/* ─── Main Page ─── */
export default function LandingPage({ onSecretAdminAccess }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroBgIndex, setHeroBgIndex] = useState(0);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);

  /* Auto hero background slideshow across the 4 selected images */
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroBgIndex(prev => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  /* Contact form */
  const [formName, setFormName] = useState('');
  const [formMobile, setFormMobile] = useState('');
  const [formService, setFormService] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formDetails, setFormDetails] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let text = `नमस्कार श्रीराम प्लंबिंग वर्क्स,\nमी *${formName || 'ग्राहक'}* बोलत आहे.\n`;
    if (formMobile) text += `मोबाईल: ${formMobile}\n`;
    if (formService) text += `काम: *${formService}*\n`;
    if (formAddress) text += `पत्ता: ${formAddress}\n`;
    if (formDetails) text += `माहिती: ${formDetails}\n`;
    text += `कृपया लवकर संपर्क करावा. धन्यवाद!`;
    window.open(WA_BASE + encodeURIComponent(text), '_blank', 'noopener,noreferrer');
  };

  /* Section reveal animation */
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion:reduce)');
    const obs = new IntersectionObserver(entries => {
      entries.filter(e => e.isIntersecting).forEach(({ target }, idx) => {
        obs.unobserve(target);
        if (!reduced.matches) {
          target.animate(
            [{ opacity: 0, transform: 'translateY(28px)' }, { opacity: 1, transform: 'translateY(0)' }],
            { duration: 500, delay: Math.min(idx, 4) * 60, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' }
          );
        }
      });
    }, { threshold: 0.07 });

    document.querySelectorAll(
      '.landing-root .reveal'
    ).forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Mobile nav dismiss */
  useEffect(() => {
    if (!menuOpen) return;
    const dismiss = (e) => { if (headerRef.current && !headerRef.current.contains(e.target)) setMenuOpen(false); };
    const esc = (e) => { if (e.key === 'Escape') { setMenuOpen(false); menuButtonRef.current?.focus(); } };
    const mq = matchMedia('(max-width:900px)');
    const closeOnWide = () => setMenuOpen(false);
    mq.addEventListener('change', closeOnWide);
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', esc);
    return () => {
      mq.removeEventListener('change', closeOnWide);
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', esc);
    };
  }, [menuOpen]);

  /* Header height CSS var */
  useLayoutEffect(() => {
    const measure = () => {
      if (headerRef.current)
        document.documentElement.style.setProperty('--header-height', headerRef.current.offsetHeight + 'px');
    };
    measure();
    const obs = new ResizeObserver(measure);
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  /* Smooth scroll to section */
  const scrollTo = (e, id) => {
    if (e && e.preventDefault) e.preventDefault();
    setMenuOpen(false);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="landing-root">
      {/* ─── HEADER ─── */}
      <header ref={headerRef} id="home" onClick={e => { if (e.target.closest('a')) setMenuOpen(false); }}>
        <Brand onSecretAdminAccess={onSecretAdminAccess} onNavClick={() => scrollTo(null, 'home')} />
        <nav id="main-navigation" className={menuOpen ? 'is-open' : ''} aria-label="मुख्य मेनू">
          {navigation.map(([id, label, Icon]) => (
            <a href={'#' + id} key={id} onClick={(e) => scrollTo(e, id)}>
              {Icon && (
                <span className="nav-icon-wrap">
                  <Icon className="nav-icon" size={16} strokeWidth={2.2} aria-hidden="true" />
                </span>
              )}
              <span className="nav-label">{label}</span>
            </a>
          ))}
        </nav>
        <a className="call" href={contactPhone} aria-label="कॉल करा">
          <span className="call-number">{PHONE_DISPLAY} ↗</span>
          <span className="call-short">कॉल ↗</span>
        </a>
        <button ref={menuButtonRef} className="menu-toggle" type="button"
          aria-controls="main-navigation" aria-expanded={menuOpen}
          aria-label={menuOpen ? 'मेनू बंद करा' : 'मेनू उघडा'}
          onClick={() => setMenuOpen(o => !o)}>
          <span /><span /><span />
        </button>
      </header>

      <main>
        {/* ─── HERO ─── */}
        <section className="intro">
          {/* ─── Slideshow Background (4 Selected Work Images) ─── */}
          <div className="intro-bg-slideshow" aria-hidden="true">
            {HERO_BACKGROUNDS.map((bg, idx) => (
              <div
                key={bg}
                className={`intro-bg-slide ${idx === heroBgIndex ? 'is-active' : ''}`}
                style={{ backgroundImage: `url(${bg})` }}
              />
            ))}
          </div>
          <div className="intro-copy">
            <p className="location reveal">📍 मिरजवाडी · वाळवा · सांगली</p>
            <h1 className="reveal hero-title">
              <span className="hero-title-part">पाण्याची लाइन.</span>{' '}
              <span className="hero-title-part">काँक्रीटचे <em>कटिंग.</em></span>
            </h1>
            <p className="reveal">
              नवीन घराचे प्लंबिंग, धुमुस मशिन, कोअर कटिंग, वॉल कटिंग व सर्व सिव्हिल कामे —
              <strong> २००७ पासून सांगली जिल्ह्यात विश्वासाने.</strong>
            </p>
            <div className="hero-actions reveal">
              <a className="action action-wa" href={waUrl()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon aria-hidden="true" /> WhatsApp वर चौकशी <ArrowUpRight aria-hidden="true" />
              </a>
              <a className="action action-call" href={contactPhone}>
                <Phone aria-hidden="true" /> आत्ता कॉल करा
              </a>
            </div>
            <TrustStrip />
          </div>

          {/* ─── Normal Subtle Sea Waves Divider ─── */}
          <div className="hero-waves-wrap" aria-hidden="true">
            <svg
              className="hero-waves"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 24 150 16"
              preserveAspectRatio="none"
              shapeRendering="auto"
            >
              <defs>
                <path
                  id="gentle-wave"
                  d="M-160 34c30 0 58-6 88-6s 58 6 88 6 58-6 88-6 58 6 88 6 v24h-352z"
                />
              </defs>
              <g className="hero-wave-parallax">
                <use href="#gentle-wave" xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255, 255, 255, 0.12)" />
                <use href="#gentle-wave" xlinkHref="#gentle-wave" x="48" y="2" fill="rgba(255, 255, 255, 0.22)" />
                <use href="#gentle-wave" xlinkHref="#gentle-wave" x="48" y="4" fill="rgba(240, 253, 250, 0.45)" />
                <use href="#gentle-wave" xlinkHref="#gentle-wave" x="48" y="6" fill="var(--c-bg-subtle, #f0fdfa)" />
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SERVICES ─── */}
        <SectionDivider />
        <ServiceCarousel />

        {/* ─── ABOUT ─── */}
        <SectionDivider />
        <section className="profile" id="about">
          <div className="profile-poster" aria-hidden="true" />
          <div className="profile-card reveal">
            <SectionHeading title="आमच्याबद्दल" />
            <p>
              <strong>श्रीराम प्लंबिंग वर्क्स</strong> — मिरजवाडी, नरसोबा मंदिराजवळ, वाळवा, सांगली येथे कार्यरत आहे.
              <strong> सन २००७ पासून</strong> सांगली जिल्ह्यातील हजारो घरे, इमारती आणि साईट्सवर नवीन प्लंबिंग,
              धुमुस मशिन कॉम्पॅक्शन, कोअर कटिंग, वॉल कटिंग आणि RCC कामे केली आहेत.
              <br /><br />
              आजपर्यंत <strong>२७०० हून अधिक साईट्स</strong> यशस्वीरीत्या पूर्ण केल्या आहेत.
              प्रत्येक काम वेळेत, स्वच्छपणे आणि गुणवत्तेने पूर्ण करण्याची <strong>१००% हमी.</strong>
            </p>
            <div className="about-stats-grid">
              <div className="about-stat-box">
                <span className="about-stat-val">२७००+</span>
                <span className="about-stat-lbl">पूर्ण कामे</span>
              </div>
              <div className="about-stat-box">
                <span className="about-stat-val">२० वर्षे</span>
                <span className="about-stat-lbl">अनुभव (२००७ पासून)</span>
              </div>
              <div className="about-stat-box">
                <span className="about-stat-val">१००%</span>
                <span className="about-stat-lbl">गुणवत्ता हमी</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SPECIALTIES ─── */}
        <SectionDivider />
        <section className="profile" id="specialties">
          <div className="profile-card reveal">
            <SectionHeading title="आमची खासियत" />
            <p>
              एकाच ठिकाणाहून सर्व सेवा — नवीन लाइन, गळती दुरुस्ती, कोअर कटिंग, धुमुस मशिन, रिबारिंग आणि ब्रेकर फोडकाम.
              वेगळे-वेगळे कामगार शोधण्याची गरज नाही. <strong>एकच नंबर — {PHONE_DISPLAY}.</strong>
            </p>
            <div className="specialty-chips">
              <span className="specialty-chip">✓ नवीन प्लंबिंग</span>
              <span className="specialty-chip">✓ कोअर कटिंग</span>
              <span className="specialty-chip">✓ वॉल कटिंग</span>
              <span className="specialty-chip">✓ धुमुस मशिन</span>
              <span className="specialty-chip">✓ ब्रेकर फोडकाम</span>
            </div>
          </div>
          <div className="profile-poster" aria-hidden="true" />
        </section>

        {/* ─── REAL SITE AUTO-SCROLL GALLERY ─── */}
        <SectionDivider />
        <SiteGallery />

        {/* ─── TESTIMONIALS ─── */}
        <SectionDivider />
        <Testimonials />

        {/* ─── PROCESS ─── */}
        <SectionDivider />
        <section id="process" className="process" aria-labelledby="process-heading">
          <SectionHeading title="आमच्या कामाची पद्धत" id="process-heading" subtitle="काम कसे होते?" className="reveal" />
          <div className="process-grid">
            {processSteps.map((s, i) => (
              <article className="reveal" key={s.num}>
                <span className="step-number">{s.num}</span>
                <span className="step-icon" aria-hidden="true"><s.Icon /></span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                {i < processSteps.length - 1 && (
                  <span className="step-arrow" aria-hidden="true">→</span>
                )}
              </article>
            ))}
          </div>
          <div className="process-cta reveal">
            <a href={waUrl()} target="_blank" rel="noopener noreferrer" className="action action-wa">
              <WhatsAppIcon aria-hidden="true" /> आत्ताच चौकशी सुरू करा <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* ─── CONTACT + FORM ─── */}
        <SectionDivider />
        <section id="contact" className="contact-area">
          <div className="contact-info">
            <SectionHeading title="कामाची चौकशी करा" subtitle="थेट संपर्क करा" className="reveal" />
            <p className="reveal" style={{ textAlign: 'center', marginBottom: '10px' }}>तुमच्या कामाची माहिती पाठवा — आम्ही लवकरच संपर्क करू.</p>
            <div className="contact-card reveal">
              <b><Building2 aria-hidden="true" /> श्रीराम प्लंबिंग वर्क्स</b>
              <span><CalendarDays aria-hidden="true" /> सन २००७ पासून कार्यरत | अनुभव: २० वर्षे</span>
              <a href={contactPhone} className="contact-link-call"><Phone aria-hidden="true" /> +91 {PHONE_DISPLAY}</a>
              <a href={waUrl()} target="_blank" rel="noopener noreferrer" className="contact-link-wa">
                <WhatsAppIcon aria-hidden="true" /> WhatsApp वर संपर्क करा
              </a>
              <address>
                <MapPin aria-hidden="true" /> नरसोबा मंदिराजवळ, मिरजवाडी<br />
                ता. वाळवा, जि. सांगली — ४१६३०१
              </address>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="reveal">
            <div className="form-row">
              <label>
                तुमचे नाव *
                <input required placeholder="उदा. राहुल शिंदे" value={formName} onChange={e => setFormName(e.target.value)} />
              </label>
              <label>
                मोबाईल क्रमांक *
                <input required type="tel" placeholder="उदा. ९८७६५४३२१०" value={formMobile} onChange={e => setFormMobile(e.target.value)} />
              </label>
            </div>
            <div className="form-row">
              <label>
                कोणते काम आहे? *
                <select required value={formService} onChange={e => setFormService(e.target.value)}>
                  <option value="" disabled>सेवा निवडा</option>
                  {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                </select>
              </label>
              <label>
                कामाचा पत्ता
                <input placeholder="उदा. मिरजवाडी, सांगली" value={formAddress} onChange={e => setFormAddress(e.target.value)} />
              </label>
            </div>
            <label>
              कामाची माहिती
              <textarea rows="4" placeholder="उदा. घराचे संपूर्ण प्लंबिंग व कोअर कटिंग करायचे आहे..."
                value={formDetails} onChange={e => setFormDetails(e.target.value)} />
            </label>
            <button className="action action-wa" type="submit">
              <WhatsAppIcon aria-hidden="true" /> चौकशी WhatsApp वर पाठवा <ArrowUpRight aria-hidden="true" />
            </button>
          </form>
        </section>
        <SectionDivider />
      </main>

      {/* ─── FOOTER ─── */}
      <footer>
        <div className="footer-brand">
          <Brand onSecretAdminAccess={onSecretAdminAccess} onNavClick={() => scrollTo(null, 'home')} />
          <p>
            प्लंबिंग · धुमुस मशिन · कोअर कटिंग<br />
            वॉल कटिंग · रिबारिंग · ब्रेकर फोडकाम
          </p>
          <span><BadgeCheck aria-hidden="true" /> २००७ पासून सांगली जिल्ह्यात सेवा — २७०० + साईट्स पूर्ण</span>
        </div>
        <div>
          <b>महत्त्वाचे दुवे</b>
          <a href="#home" onClick={(e) => scrollTo(e, 'home')}>मुख्यपृष्ठ</a>
          <a href="#about" onClick={(e) => scrollTo(e, 'about')}>आमच्याबद्दल</a>
          <a href="#services" onClick={(e) => scrollTo(e, 'services')}>आमच्या सेवा</a>
          <a href="#gallery" onClick={(e) => scrollTo(e, 'gallery')}>कामाची झलक</a>
          <a href="#testimonials" onClick={(e) => scrollTo(e, 'testimonials')}>ग्राहकांचे अनुभव</a>
          <a href="#process" onClick={(e) => scrollTo(e, 'process')}>कामाची पद्धत</a>
        </div>
        <div>
          <b>आमच्या सेवा</b>
          {services.slice(0, 5).map(s => (
            <a key={s.title} href="#services" onClick={(e) => scrollTo(e, 'services')}>{s.title}</a>
          ))}
        </div>
        <div>
          <b>थेट संपर्क</b>
          <a href={contactPhone}><Phone aria-hidden="true" /> +91 {PHONE_DISPLAY}</a>
          <a href={waUrl()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon aria-hidden="true" /> WhatsApp</a>
          <address>
            नरसोबा मंदिराजवळ,<br />
            मिरजवाडी, ता. वाळवा,<br />
            जि. सांगली — ४१६३०१
          </address>
        </div>
        <small className="copyright">
          © २०२६ श्रीराम प्लंबिंग वर्क्स. सर्व हक्क राखीव. | सन २००७ पासून कार्यरत.
        </small>
      </footer>

      {/* ─── FLOATING MOBILE BAR ─── */}
      <FloatingBar />

      {/* ─── SCROLL TO TOP ─── */}
      <ScrollToTop />
    </div>
  );
}
