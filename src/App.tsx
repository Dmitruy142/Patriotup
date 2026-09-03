import { useState, useEffect, useRef, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Phone, Menu, X, Factory, Banknote, CalendarClock, ShieldCheck,
  Square, RectangleHorizontal, Frame, DoorOpen, Grid2x2, Sun, TreePalm,
  DoorClosed, Grid3x3, Wrench, ArrowRight, Quote, ChevronLeft, ChevronRight,
  Star, MapPin, Mail, Clock, Calculator, Building2, Layers, FileCheck,
  FileText, Sparkles, Trash2, ArrowUpRight, Award, CheckCircle2,
  Check, User, Loader2, Send, XCircle, Target, Users, TrendingUp,
} from 'lucide-react';
import { useReveal, useCountUp } from '@/hooks';

const PHONE = '8 (8452) 25-45-25';
const PHONE_TEL = PHONE.replace(/[^+\d]/g, '');

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

const NAV = [
  { label: 'Продукция', href: '#products' },
  { label: 'Услуги', href: '#why' },
  { label: 'Наши работы', href: '#works' },
  { label: 'Преимущества', href: '#advantages' },
  { label: 'О компании', href: '#about' },
  { label: 'Контакты', href: '#contacts' },
];

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress-bar" style={{ width: `${p}%` }} />
    </div>
  );
}

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

function Header({ onQuiz }: { onQuiz: () => void }) {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(30);
  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="header-inner">
        <a href="#top" className="logo">
          <span className="logo-mark" aria-hidden="true">
            <img src="/assets/images/ChatGPT_Image_16_мар._2026_г.,_07_05_47.png" alt="" />
          </span>
          <span className="logo-text">
            <span className="lt-name">PATRIOT</span>
            <span className="lt-sub">Завод металлоконструкций</span>
          </span>
        </a>
        <nav className="nav">
          {NAV.map((n) => <a key={n.label} href={n.href}>{n.label}</a>)}
        </nav>
        <div className="header-right">
          <a href={`tel:${PHONE_TEL}`} className="header-phone">
            <Phone size={14} />
            {PHONE}
          </a>
          <button type="button" className="header-cta" onClick={onQuiz}>Получить расчёт</button>
          <button className="burger" type="button" aria-label="Меню" aria-expanded={open} onClick={() => setOpen(v => !v)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <div className={`mobile-menu${open ? ' open' : ''}`}>
        {NAV.map(n => <a key={n.label} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>)}
        <button type="button" className="btn btn-primary btn-block" style={{ marginTop: 12 }} onClick={() => { setOpen(false); onQuiz(); }}>
          Получить расчёт
        </button>
        <a href={`tel:${PHONE_TEL}`} className="mm-phone" onClick={() => setOpen(false)}>{PHONE}</a>
      </div>
    </header>
  );
}

const PROOF = [
  { n: '01', v: '20 лет', l: 'на рынке' },
  { n: '02', v: '2500+', l: 'реализованных объектов' },
  { n: '03', v: 'до 5 лет', l: 'гарантии' },
  { n: '04', v: 'под ключ', l: 'производство + монтаж' },
];

function Hero({ onQuiz }: { onQuiz: () => void }) {
  const { ref, inView } = useReveal();
  const years = useCountUp(20, inView);
  const objs = useCountUp(2500, inView, 2000);
  return (
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-tech" aria-hidden="true">
        <span className="ht-coord">N 51°32′ · E 46°00′</span>
        <span className="ht-sep" />
        <span className="ht-label">SARATOV · RU</span>
      </div>
      <div className="wrap hero-inner">
        <div className={`hero-text reveal${inView ? ' in' : ''}`} ref={ref}>
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            20 лет на рынке Саратова
          </div>
          <h1 className="hero-h1">
            Остекление и металлоконструкции
            <br />
            для вашего дома и бизнеса
            <span className="h1-accent">от собственного завода</span>
          </h1>
          <p className="hero-sub">
            Производим и устанавливаем алюминиевые и пластиковые конструкции,
            фасады, входные группы, витражи и металлоконструкции.
          </p>

          <div className="hero-cta">
            <button type="button" className="btn btn-primary btn-hero" onClick={onQuiz}>
              Получить расчёт
              <ArrowRight size={16} />
            </button>
            <a href="#works" className="btn btn-outline btn-hero">Смотреть работы</a>
          </div>
          <div className="hero-meta">
            <span className="hero-meta-tick" />
            Расчёт за 1 минуту · Без обязательств
          </div>
          <div className="hero-proof">
            {PROOF.map(p => (
              <div className="proof-item" key={p.n}>
                <span className="proof-num">{p.n}</span>
                <span className="proof-v">
                  {p.n === '01' ? `${Math.round(years)} лет` : p.n === '02' ? `${Math.round(objs).toLocaleString('ru')}+` : p.v}
                </span>
                <span className="proof-l">{p.l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <img
            className="hero-img"
            src="https://images.pexels.com/photos/11861957/pexels-photo-11861957.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt="Фасад здания с алюминиевой витражной системой"
            loading="eager"
          />
          <div className="hero-img-fade" />
          <div className="hero-badge-top">
            <span className="hbt-label">ФАСАД / ВИТРАЖ</span>
            <span className="hbt-dim">1200 м²</span>
          </div>
          <div className="hero-info-card">
            <span className="hic-mark" />
            <div className="hic-text">
              <div className="hic-title">Собственное производство</div>
              <div className="hic-sub">Завод в Саратове · с 2006 г.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const ABOUT_STATS = [
  { ic: CalendarClock, v: '2006', l: 'Год основания' },
  { ic: Building2, v: '2500+', l: 'Реализованных объектов' },
  { ic: Users, v: '50+', l: 'Специалистов в штате' },
  { ic: ShieldCheck, v: '5 лет', l: 'Максимальная гарантия' },
];

const ABOUT_MILESTONES = [
  { year: '2006', text: 'Основание завода «Патриот» в Саратове' },
  { year: '2010', text: 'Запуск линии алюминиевых фасадов и витражей' },
  { year: '2015', text: 'Открытие второго производственного цеха' },
  { year: '2020', text: 'Более 2000 реализованных объектов по региону' },
  { year: '2026', text: 'Полный цикл: проектирование, производство, монтаж' },
];

function About({ onQuiz }: { onQuiz: () => void }) {
  const { ref, inView } = useReveal();
  const stats = useCountUp(2500, inView, 2000);
  return (
    <section className="section about-section" id="about">
      <div className="wrap">
        <div className="h2-center">
          <span className="eyebrow">О компании</span>
          <h2>Завод «Патриот» — 20 лет на рынке</h2>
          <div className="dash" />
        </div>
        <div className={`about-grid reveal${inView ? ' in' : ''}`} ref={ref}>
          <div className="about-left">
            <div className="about-img-wrap">
              <img
                src="https://images.pexels.com/photos/8020247/pexels-photo-8020247.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Производственный цех завода"
                loading="lazy"
              />
              <div className="about-img-badge">
                <span className="aib-num">с 2006</span>
                <span className="aib-lbl">года на рынке</span>
              </div>
            </div>
          </div>
          <div className="about-right">
            <p className="about-lead">
              «Патриот» — завод металлоконструкций и остекления полного цикла.
              Мы проектируем, производим и устанавливаем алюминиевые и пластиковые
              конструкции, фасады, входные группы и металлоконструкции.
            </p>
            <p className="about-text">
              За 20 лет работы реализовали более 2500 объектов в Саратове, Энгельсе
              и области. Работаем напрямую с завода — без посредников и наценок.
              Контролируем качество на каждом этапе: от закупки материала до монтажа.
            </p>
            <div className="about-stats">
              <div className="about-stat">
                <span className="as-ic"><CalendarClock /></span>
                <span className="as-v">2006</span>
                <span className="as-l">Год основания</span>
              </div>
              <div className="about-stat">
                <span className="as-ic"><Building2 /></span>
                <span className="as-v">{Math.round(stats).toLocaleString('ru')}+</span>
                <span className="as-l">Объектов сдано</span>
              </div>
              <div className="about-stat">
                <span className="as-ic"><Users /></span>
                <span className="as-v">50+</span>
                <span className="as-l">Специалистов</span>
              </div>
              <div className="about-stat">
                <span className="as-ic"><ShieldCheck /></span>
                <span className="as-v">5 лет</span>
                <span className="as-l">Гарантия</span>
              </div>
            </div>
            <div className="about-timeline">
              {ABOUT_MILESTONES.map(m => (
                <div className="about-milestone" key={m.year}>
                  <span className="am-dot" />
                  <span className="am-year">{m.year}</span>
                  <span className="am-text">{m.text}</span>
                </div>
              ))}
            </div>
            <button type="button" className="btn btn-primary" style={{ marginTop: 20 }} onClick={onQuiz}>
              Получить расчёт <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const WHY = [
  { ic: Factory, t: 'Собственное производство', d: 'Полный цикл от материала до монтажа, контроль качества на каждом этапе. Без посредников — цена ниже.' },
  { ic: Banknote, t: 'Честная фиксированная цена', d: 'Продаём напрямую с завода — дешевле, чем через дилеров и подрядчиков. Фиксируем стоимость в договоре.' },
  { ic: CalendarClock, t: 'Соблюдаем сроки', d: 'Фиксируем сроки в договоре и сдаём объекты вовремя, работаем даже в мороз до −15°.' },
  { ic: ShieldCheck, t: 'Гарантия до 5 лет', d: 'Официальная гарантия на все виды конструкций и монтажных работ. Сервис и ремонт по гарантии.' },
];

function AdvantageCard({ ic: Ic, title, desc, num }: { ic: React.ElementType; title: string; desc: string; num: number }) {
  return (
    <div className="why-card" style={{ animationDelay: `${num * 80}ms` }}>
      <div className="why-card-glow" aria-hidden="true" />
      <div className="why-num" aria-hidden="true">{String(num).padStart(2, '0')}</div>
      <div className="why-ic"><Ic /></div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function Why({ onQuiz }: { onQuiz: () => void }) {
  const { ref, inView } = useReveal();
  return (
    <section className="section why-section" id="why">
      <div className="wrap">
        <div className="h2-center">
          <span className="eyebrow">Почему мы</span>
          <h2>Почему выбирают нас</h2>
          <div className="dash" />
        </div>
        <div className={`why-grid reveal${inView ? ' in' : ''}`} ref={ref}>
          {WHY.map((w, i) => <AdvantageCard key={w.t} ic={w.ic} title={w.t} desc={w.d} num={i + 1} />)}
        </div>
        <div className="prod-btn-row">
          <button type="button" className="btn btn-primary" onClick={onQuiz}>
            Получить расчёт стоимости <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

const PRODUCTS = [
  { ic: Square, l: 'Алюминиевые окна' },
  { ic: RectangleHorizontal, l: 'Пластиковые окна' },
  { ic: Grid3x3, l: 'Остекление балконов и лоджий' },
  { ic: Building2, l: 'Алюминиевые фасады' },
  { ic: DoorOpen, l: 'Входные группы' },
  { ic: Sun, l: 'Зимние сады и веранды' },
  { ic: Grid2x2, l: 'Офисные перегородки' },
  { ic: Frame, l: 'Витражи' },
  { ic: DoorClosed, l: 'Стальные двери' },
  { ic: Grid3x3, l: 'Решётки на окна' },
  { ic: TreePalm, l: 'Навесы и козырьки' },
  { ic: Grid3x3, l: 'Заборы и ограждения' },
  { ic: DoorClosed, l: 'Ворота и калитки' },
  { ic: Wrench, l: 'Металлоконструкции любой сложности' },
  { ic: Layers, l: 'Изделия из металла' },
];

function ProductCard({ ic: Ic, label, idx }: { ic: React.ElementType; label: string; idx: number }) {
  return (
    <div className="prod-card" style={{ animationDelay: `${idx * 50}ms` }}>
      <div className="prod-ic"><Ic /></div>
      <div className="l">{label}</div>
      <ArrowUpRight className="prod-arrow" size={16} />
    </div>
  );
}

function Products({ onQuiz }: { onQuiz: () => void }) {
  const { ref, inView } = useReveal();
  return (
    <section className="section prod-section" id="products">
      <div className="wrap">
        <div className="h2-center">
          <span className="eyebrow">Продукция</span>
          <h2>Что мы производим</h2>
          <div className="dash" />
        </div>
        <div className={`prod-grid reveal${inView ? ' in' : ''}`} ref={ref}>
          {PRODUCTS.map((p, i) => <ProductCard key={p.l} ic={p.ic} label={p.l} idx={i} />)}
        </div>
        <div className="prod-btn-row">
          <button type="button" className="btn btn-primary" onClick={onQuiz}>
            Рассчитать стоимость <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

type WorkItem = {
  img: string;
  title: string;
  type: string;
  area: string;
  client: string;
  year: string;
  scope: string;
  description: string;
  gallery: string[];
};

const WORKS: WorkItem[] = [
  {
    img: '/assets/works/fas_signal_01.jpg',
    title: 'Фасадное остекление «Сигнал-Теплотехника»',
    type: 'Фасад', area: 'Энгельс',
    client: 'ООО «Сигнал-Теплотехника»', year: '2023',
    scope: 'Витражное остекление фасада, 480 м². Алюминиевая стоечно-ригельная система, тёплый контур.',
    description: 'Выполнено фасадное остекление производственного здания. Применена алюминиевая система Provedal с терморазрывом. Стеклопакеты с энергоэффективным покрытием. Срок работ — 45 дней. Гарантия — 5 лет.',
    gallery: ['/assets/works/fas_signal_01.jpg', '/assets/works/fasady_01.jpg', '/assets/works/fasady_02.jpg'],
  },
  {
    img: '/assets/works/fasady_01.jpg',
    title: 'Алюминиевые фасады и витражи, бизнес-центр',
    type: 'Фасад', area: 'Саратов',
    client: 'Бизнес-центр «Каскад»', year: '2022',
    scope: 'Фасадное остекление, 320 м². Витражные алюминиевые системы, тонированные стеклопакеты.',
    description: 'Остекление фасада пятиэтажного бизнес-центра. Использована стоечно-ригельная система Alutech ALT W72. Тонированное солнцезащитное стекло. Монтаж выполнен за 30 рабочих дней.',
    gallery: ['/assets/works/fasady_01.jpg', '/assets/works/fasady_02.jpg', '/assets/works/fasady_03.jpg'],
  },
  {
    img: '/assets/works/Kega1.jpg',
    title: '«КЕГА», ул. Гвардейская, 86',
    type: 'Фасад', area: 'Саратов',
    client: 'Развлекательный центр «КЕГА»', year: '2021',
    scope: 'Фасадное остекление входной зоны, 180 м². Алюминиевые витражи, закалённое стекло.',
    description: 'Выполнено остекление фасада развлекательного центра. Алюминиевая система с терморазрывом, закалённое стекло 6 мм. Особое внимание уделено ветровой нагрузке — усилённый профиль.',
    gallery: ['/assets/works/Kega1.jpg', '/assets/works/fasady_04.jpg', '/assets/works/fasady_05.jpg'],
  },
  {
    img: '/assets/works/kare_02.jpg',
    title: 'Шоу-рум и кафе «KARE» (ТЦ «Антей»)',
    type: 'Входная группа', area: 'Саратов',
    client: 'Мебельный шоу-рум «KARE»', year: '2023',
    scope: 'Входная группа со стеклянным тамбуром, 45 м². Алюминиевые двери, закалённое стекло.',
    description: 'Изготовление и монтаж входной группы для мебельного шоу-рума. Стеклянный тамбур с алюминиевым каркасом, автоматические раздвижные двери. Стекло — закалённое, 8 мм. Срок — 15 дней.',
    gallery: ['/assets/works/kare_02.jpg', '/assets/works/gal1prev.jpg', '/assets/works/gal2prev.jpg'],
  },
  {
    img: '/assets/works/gal1prev.jpg',
    title: 'Магазин «Антей», ул. Волжская',
    type: 'Входная группа', area: 'Саратов',
    client: 'Торговый центр «Антей»', year: '2022',
    scope: 'Входная группа, 60 м². Алюминиевый профиль, стеклянные перегородки, автоматические двери.',
    description: 'Выполнена реконструкция входной группы торгового центра. Установлены алюминиевые двери с доводчиками, стеклянные перегородки тамбура. Стекло — закалённое триплекс. Срок монтажа — 12 дней.',
    gallery: ['/assets/works/gal1prev.jpg', '/assets/works/gal4prev.jpg', '/assets/works/gal5prev.jpg'],
  },
  {
    img: '/assets/works/bp01.jpg',
    title: '«BurgerPlace», ул. Кутякова, 7',
    type: 'Входная группа', area: 'Саратов',
    client: 'Сеть быстрого питания «BurgerPlace»', year: '2024',
    scope: 'Входная группа, 30 м². Алюминиевые окна и двери, стеклопакеты с тонировкой.',
    description: 'Изготовление и установка входной группы для ресторана быстрого питания. Тёплый алюминиевый профиль, стеклопакеты с солнцезащитной тонировкой. Двери с антипаник-системой. Срок — 10 дней.',
    gallery: ['/assets/works/bp01.jpg', '/assets/works/m_ipp_02.jpg', '/assets/works/gal6prev.jpg'],
  },
  {
    img: '/assets/works/work2.jpg',
    title: 'Офисная перегородка, «АльфаСтрахование»',
    type: 'Перегородка', area: 'Саратов',
    client: 'АО «АльфаСтрахование»', year: '2023',
    scope: 'Офисные перегородки, 120 м². Алюминиевый профиль, закалённое стекло, жалюзи.',
    description: 'Установлены офисные перегородки для отделения страховой компании. Алюминиевая система, закалённое стекло 6 мм с интегрированными жалюзи. Звукизоляция — до 35 дБ. Срок — 8 рабочих дней.',
    gallery: ['/assets/works/work2.jpg', '/assets/works/gal2prev.jpg', '/assets/works/m_3zhuk01.jpg'],
  },
  {
    img: '/assets/works/gal2prev.jpg',
    title: 'Перегородки для торгового зала, ТЦ «Антей»',
    type: 'Перегородка', area: 'Саратов',
    client: 'ТЦ «Антей»', year: '2022',
    scope: 'Стационарные перегородки, 85 м². Алюминиевый каркас, закалённое стекло.',
    description: 'Изготовлены и смонтированы стационарные стеклянные перегородки для торгового зала. Алюминиевый профиль окрашен в RAL 9006, стекло закалённое с матовой плёнкой. Срок — 7 дней.',
    gallery: ['/assets/works/gal2prev.jpg', '/assets/works/work2.jpg', '/assets/works/gal4prev.jpg'],
  },
  {
    img: '/assets/works/m_3zhuk01.jpg',
    title: 'Перегородки для магазина «Жуковский»',
    type: 'Перегородка', area: 'Саратов',
    client: 'Магазин «Жуковский»', year: '2024',
    scope: 'Мобильные перегородки, 50 м². Алюминиевый профиль, стекло триплекс.',
    description: 'Установлены мобильные стеклянные перегородки для зонирования торгового пространства. Стекло триплекс 6+6 мм, алюминиевый профиль с фетровыми уплотнителями для бесшумного хода. Срок — 5 дней.',
    gallery: ['/assets/works/m_3zhuk01.jpg', '/assets/works/gal5prev.jpg', '/assets/works/gal6prev.jpg'],
  },
  {
    img: '/assets/works/work1.jpg',
    title: 'Остекление балкона, жилой дом',
    type: 'Балкон', area: 'Саратов',
    client: 'Частный заказчик', year: '2024',
    scope: 'Тёплое остекление балкона, 6 м. ПВХ-профиль, двухкамерные стеклопакеты.',
    description: 'Выполнено тёплое остекление балкона в панельном доме. Использован ПВХ-профиль с двухкамерным стеклопакетом. Дополнительно выполнена отделка панелями ПВХ и утепление. Срок — 2 дня.',
    gallery: ['/assets/works/work1.jpg', '/assets/works/work3.jpg', '/assets/works/img_0300.jpg'],
  },
  {
    img: '/assets/works/work3.jpg',
    title: 'Остекление и отделка лоджии, ул. Ломоносова',
    type: 'Балкон', area: 'Саратов',
    client: 'Частный заказчик', year: '2023',
    scope: 'Тёплое остекление лоджии, 8 м. Алюминиевый профиль с терморазрывом.',
    description: 'Остекление лоджии с использованием алюминиевого тёплого профиля. Стеклопакеты с энергосбережением. Выполнена внутренняя отделка — ламинированные панели, утеплитель, подоконник. Срок — 3 дня.',
    gallery: ['/assets/works/work3.jpg', '/assets/works/work1.jpg', '/assets/works/img_0300.jpg'],
  },
  {
    img: '/assets/works/img_0300.jpg',
    title: 'Остекление двух балконов, ул. Ипподромная',
    type: 'Балкон', area: 'Саратов',
    client: 'Частный заказчик', year: '2024',
    scope: 'Холодное остекление двух балконов, 12 м. Алюминиевый профиль Provedal.',
    description: 'Холодное алюминиевое остекление двух балконов. Профиль Provedal C640, стекло закалённое 4 мм. Установлены отливы и козырёк. Срок — 1 день на оба балкона.',
    gallery: ['/assets/works/img_0300.jpg', '/assets/works/work1.jpg', '/assets/works/work3.jpg'],
  },
];
const FILTERS = ['Все работы', 'Фасады', 'Входные группы', 'Перегородки', 'Балконы'];

function PortfolioCard({ work, idx, onOpen }: { work: WorkItem; idx: number; onOpen: () => void }) {
  return (
    <div className="work-card" style={{ animationDelay: `${idx * 60}ms` }} onClick={onOpen}>
      <div className="work-img">
        <img src={work.img} alt={work.title} loading="lazy" />
        <div className="work-overlay">
          <span className="work-tag">{work.type}</span>
          <span className="work-view"><ArrowUpRight size={18} /></span>
        </div>
      </div>
      <div className="work-info">
        <h3>{work.title}</h3>
        <div className="work-meta">{work.type}<span className="sep">·</span>{work.area}</div>
      </div>
    </div>
  );
}

function ProjectModal({ work, onClose, onQuiz }: { work: WorkItem | null; onClose: () => void; onQuiz: () => void }) {
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setActiveImg(0);
  }, [work]);

  useEffect(() => {
    if (work) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [work]);

  useEffect(() => {
    if (!work) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [work, onClose]);

  if (!work) return null;
  const gallery = work.gallery.length > 0 ? work.gallery : [work.img];

  return (
    <>
      <div className="quiz-overlay" onClick={onClose} />
      <div className="project-modal" role="dialog" aria-modal="true" aria-label={work.title}>
        <button className="quiz-close" type="button" aria-label="Закрыть" onClick={onClose}>
          <X size={20} />
        </button>
        <div className="project-modal-gallery">
          <img src={gallery[activeImg]} alt={work.title} />
          {gallery.length > 1 && (
            <>
              <button
                className="project-gal-nav project-gal-prev"
                type="button"
                aria-label="Предыдущее фото"
                onClick={() => setActiveImg(i => (i - 1 + gallery.length) % gallery.length)}
              >
                <ChevronLeft size={22} />
              </button>
              <button
                className="project-gal-nav project-gal-next"
                type="button"
                aria-label="Следующее фото"
                onClick={() => setActiveImg(i => (i + 1) % gallery.length)}
              >
                <ChevronRight size={22} />
              </button>
              <div className="project-gal-thumbs">
                {gallery.map((g, i) => (
                  <button
                    key={i}
                    className={`project-gal-thumb${activeImg === i ? ' active' : ''}`}
                    type="button"
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={g} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="project-modal-info">
          <span className="project-modal-tag">{work.type}</span>
          <h3 className="project-modal-title">{work.title}</h3>
          <div className="project-modal-meta">
            <div className="pmm-row"><span className="pmm-label">Клиент</span><span className="pmm-val">{work.client}</span></div>
            <div className="pmm-row"><span className="pmm-label">Год</span><span className="pmm-val">{work.year}</span></div>
            <div className="pmm-row"><span className="pmm-label">Локация</span><span className="pmm-val">{work.area}</span></div>
          </div>
          <div className="project-modal-scope">
            <span className="pms-label">Объём работ</span>
            <p>{work.scope}</p>
          </div>
          <div className="project-modal-desc">
            <span className="pms-label">Описание</span>
            <p>{work.description}</p>
          </div>
          <button type="button" className="btn btn-primary btn-block btn-lg" onClick={() => { onClose(); onQuiz(); }}>
            Хочу такой же проект <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

function Works({ onQuiz }: { onQuiz: () => void }) {
  const [active, setActive] = useState('Все работы');
  const [visible, setVisible] = useState(12);
  const [selected, setSelected] = useState<WorkItem | null>(null);
  const { ref, inView } = useReveal();
  const filterMap: Record<string, (w: WorkItem) => boolean> = {
    'Все работы': () => true,
    'Фасады': w => w.type === 'Фасад',
    'Входные группы': w => w.type === 'Входная группа',
    'Перегородки': w => w.type === 'Перегородка',
    'Балконы': w => w.type === 'Балкон',
  };
  const shown = WORKS.filter(filterMap[active]).slice(0, visible);
  const filteredCount = WORKS.filter(filterMap[active]).length;
  return (
    <section className="section" id="works">
      <div className="wrap">
        <div className="h2-center">
          <span className="eyebrow">Портфолио</span>
          <h2>Портфолио объектов</h2>
          <div className="dash" />
        </div>
        <div className="filters">
          {FILTERS.map(f => (
            <button key={f} type="button"
              className={`filter-pill${active === f ? ' active' : ''}`}
              onClick={() => { setActive(f); setVisible(12); }}>{f}</button>
          ))}
        </div>
        <div className={`works-grid reveal${inView ? ' in' : ''}`} ref={ref}>
          {shown.map((w, i) => (
            <PortfolioCard key={w.title} work={w} idx={i} onOpen={() => setSelected(w)} />
          ))}
        </div>
        <div className="prod-btn-row">
          {visible < filteredCount ? (
            <button type="button" className="btn btn-outline-dark" onClick={() => setVisible(v => v + 6)}>Показать ещё <ArrowRight size={15} /></button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={onQuiz}>Рассчитать стоимость <ArrowRight size={15} /></button>
          )}
        </div>
      </div>
      <ProjectModal work={selected} onClose={() => setSelected(null)} onQuiz={onQuiz} />
    </section>
  );
}

const ADVANTAGES = [
  { ic: FileText, t: 'Работаем по договору', d: 'Все условия фиксируем письменно.' },
  { ic: Banknote, t: 'Фиксированная цена', d: 'Без доплат после замера.' },
  { ic: FileCheck, t: 'Прозрачная смета', d: 'Понятный расчёт до начала работ.' },
  { ic: Wrench, t: 'Профессиональный монтаж', d: 'Своими силами по технологии.' },
  { ic: Trash2, t: 'Уборка после работ', d: 'Оставляем объект чистым.' },
];

function Advantages() {
  const { ref, inView } = useReveal();
  return (
    <section className="section alt" id="advantages">
      <div className="wrap">
        <div className="h2-center">
          <span className="eyebrow">Преимущества</span>
          <h2>Наши преимущества</h2>
          <div className="dash" />
        </div>
        <div className={`adv-grid reveal${inView ? ' in' : ''}`} ref={ref}>
          {ADVANTAGES.map((a, i) => (
            <div className="adv-item" key={a.t} style={{ animationDelay: `${i * 70}ms` }}>
              <div className="adv-ic"><a.ic /></div>
              <h3>{a.t}</h3>
              <p>{a.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: '01', t: 'Заявка', d: 'Оставляете заявку на сайте или по телефону.' },
  { n: '02', t: 'Замер', d: 'Бесплатно выезжаем на объект, снимаем размеры.' },
  { n: '03', t: 'Расчёт', d: 'Готовим смету, фиксируем цену.' },
  { n: '04', t: 'Договор', d: 'Заключаем договор с фиксированными сроками.' },
  { n: '05', t: 'Производство', d: 'Изготавливаем конструкцию на собственном заводе.' },
  { n: '06', t: 'Монтаж', d: 'Устанавливаем силами своих специалистов.' },
  { n: '07', t: 'Сдача', d: 'Приёмка работ, документы, гарантия.' },
];

function ProcessStep({ n, t, d, last }: { n: string; t: string; d: string; last: boolean }) {
  return (
    <div className="proc-step">
      <div className="proc-circle">{n}</div>
      {!last && <div className="proc-arrow" />}
      <h3>{t}</h3>
      <p>{d}</p>
    </div>
  );
}

function Process({ onQuiz }: { onQuiz: () => void }) {
  const { ref, inView } = useReveal();
  return (
    <section className="section" id="process">
      <div className="wrap">
        <div className="h2-center">
          <span className="eyebrow">Как мы работаем</span>
          <h2>Этапы работы</h2>
          <div className="dash" />
        </div>
        <div className={`process-grid reveal${inView ? ' in' : ''}`} ref={ref}>
          {STEPS.map((s, i) => <ProcessStep key={s.n} {...s} last={i === STEPS.length - 1} />)}
        </div>
        <div className="prod-btn-row">
          <button type="button" className="btn btn-primary" onClick={onQuiz}>
            Оставить заявку <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  { name: 'Валерий Вадимович', role: 'навес для парковки', text: 'Заказывали навес для парковки. Сделали под ключ за неделю — от замера до монтажа. Качество металла и сварки отличное, цена честная.' },
  { name: 'Светлана Бурдина', role: 'остекление балкона', text: 'Остеклили балкон в тёплом варианте, сделали отделку. Работали аккуратно, всё убрали за собой. Теперь на балконе можно сидеть зимой.' },
  { name: 'Вова З.', role: 'фасад магазина', text: 'Остеклили фасад магазина. Сделали витражную систему на заказ, всё по проекту. Сроки выдержали, цена не вышла за рамки сметы.' },
  { name: 'Алексей М.', role: 'входная группа', text: 'Заказывали входную группу для магазина. Отличная работа, всё в срок и по смете. Ребята профессионалы своего дела, рекомендую.' },
  { name: 'Ирина Петровна', role: 'отделка балкона', text: 'Делали остекление и отделку лоджии. Всё чётко, аккуратно, в срок. Цена не менялась после замера, как и обещали. Спасибо!' },
  { name: 'Дмитрий К.', role: 'металлоконструкции', text: 'Заказывали металлокаркас для пристройки. Изготовили быстро, монтаж качественный. Цена устроила, работает без нареканий уже три года.' },
  { name: 'Марина С.', role: 'пластиковые окна', text: 'Поставили пластиковые окна на даче. Замерщик приехал бесплатно, всё измерял тщательно. Установили за один день, мусор убрали. Довольна.' },
  { name: 'Сергей В.', role: 'навес к дому', text: 'Сделали навес к дому из поликарбоната. Выглядит отлично, выдерживает снег. Цена в договоре не поменялась, установили за два дня.' },
  { name: 'Ольга Н.', role: 'фасад здания', text: 'Остеклили фасад нашего офиса. Работали по договору, сроки соблюли. Отдельное спасибо за то, что всё согласовывали с нашим архитектором.' },
];

function ReviewCard({ name, role, text }: { name: string; role: string; text: string }) {
  return (
    <div className="rev-card">
      <Quote className="rev-quote-ic" size={26} />
      <div className="rev-stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}</div>
      <p className="rev-text">{text}</p>
      <div className="rev-author">
        <div className="rev-ava">{name.charAt(0)}</div>
        <div>
          <div className="rev-name">{name}</div>
          <div className="rev-role">проект: {role}</div>
        </div>
      </div>
    </div>
  );
}

function Reviews() {
  const { ref, inView } = useReveal();
  const [page, setPage] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const PER_PAGE = 3;
  const totalPages = Math.ceil(REVIEWS.length / PER_PAGE);

  const goNext = useCallback(() => {
    setPage(p => (p + 1) % totalPages);
    setAnimKey(k => k + 1);
  }, [totalPages]);

  const goPrev = useCallback(() => {
    setPage(p => (p - 1 + totalPages) % totalPages);
    setAnimKey(k => k + 1);
  }, [totalPages]);

  const shown = REVIEWS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <section className="section alt" id="reviews">
      <div className="wrap">
        <div className="h2-center">
          <span className="eyebrow">Отзывы</span>
          <h2>Что говорят клиенты</h2>
          <div className="dash" />
        </div>
        <div className={`rev-slider-wrap reveal${inView ? ' in' : ''}`} ref={ref}>
          <button className="rev-nav rev-nav-prev" type="button" aria-label="Назад" onClick={goPrev}>
            <ChevronLeft size={22} />
          </button>
          <div className="rev-track" key={animKey}>
            <div className="rev-grid">
              {shown.map(r => <ReviewCard key={r.name + page} {...r} />)}
            </div>
          </div>
          <button className="rev-nav rev-nav-next" type="button" aria-label="Вперёд" onClick={goNext}>
            <ChevronRight size={22} />
          </button>
        </div>
        <div className="rev-dots">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} type="button"
              className={`rev-dot${page === i ? ' active' : ''}`}
              aria-label={`Страница ${i + 1}`}
              onClick={() => { setPage(i); setAnimKey(k => k + 1); }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQ = [
  { q: 'Может ли измениться цена после замера?', a: 'После замера мы готовим подробную смету. Стоимость фиксируется в договоре до начала работ — никаких неожиданных доплат.' },
  { q: 'Что входит в стоимость?', a: 'В смете отдельно и понятно указываем конструкцию, материалы, доставку и монтаж. Вы видите все позиции до подписания договора.' },
  { q: 'Как формируются сроки?', a: 'Срок зависит от выбранной конструкции и объёма проекта. Точные сроки называем до подписания договора и фиксируем письменно.' },
  { q: 'Кто выполняет монтаж?', a: 'Монтаж выполняют специалисты компании. Можно заказать полный цикл — от производства до установки.' },
  { q: 'Какая гарантия?', a: 'Официальная гарантия до 5 лет в зависимости от типа конструкции и работ. Все условия фиксируются в договоре.' },
  { q: 'Работаете ли вы по договору?', a: 'Да. В договоре закрепляем состав работ, стоимость, сроки и гарантийные обязательства.' },
  { q: 'Можно ли заказать только изготовление?', a: 'Да, можно заказать изготовление конструкций без монтажа. Доставка по Саратову и области.' },
  { q: 'Сколько стоит остекление балкона?', a: 'Остекление балкона или лоджии — от 49 999 ₽. Точную стоимость рассчитываем после бесплатного замера.' },
];

function FAQItem({ q, a, isOpen, onToggle, index }: { q: string; a: string; isOpen: boolean; onToggle: () => void; index: number }) {
  return (
    <div className={`faq-item${isOpen ? ' open' : ''}`}>
      <button className="faq-q" type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={onToggle}>
        <span className="num">{String(index + 1).padStart(2, '0')}</span>
        <span className="txt">{q}</span>
        <span className="faq-toggle" />
      </button>
      <div id={`faq-answer-${index}`} className="faq-a" style={{ maxHeight: isOpen ? 200 : 0 }}>
        <div className="faq-a-inner">{a}</div>
      </div>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const { ref, inView } = useReveal();
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="h2-center">
          <span className="eyebrow">FAQ</span>
          <h2>Частые вопросы</h2>
          <div className="dash" />
        </div>
        <div className={`faq-list reveal${inView ? ' in' : ''}`} ref={ref}>
          {FAQ.map((f, i) => (
            <FAQItem key={f.q} q={f.q} a={f.a} index={i}
              isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

type QuizStep = {
  key: string;
  question: string;
  options: { label: string; value: string }[];
};

const QUIZ_STEPS: QuizStep[] = [
  {
    key: 'type',
    question: 'Что вам нужно?',
    options: [
      { label: 'Остекление балкона', value: 'балкон' },
      { label: 'Окна (алюминий / пластик)', value: 'окна' },
      { label: 'Фасад / витраж', value: 'фасад' },
      { label: 'Входная группа', value: 'входная группа' },
      { label: 'Перегородка', value: 'перегородка' },
      { label: 'Навес / козырёк', value: 'навес' },
      { label: 'Металлоконструкции', value: 'металлоконструкции' },
      { label: 'Другое', value: 'другое' },
    ],
  },
  {
    key: 'location',
    question: 'Где находится объект?',
    options: [
      { label: 'Саратов', value: 'Саратов' },
      { label: 'Энгельс', value: 'Энгельс' },
      { label: 'Саратовская область', value: 'Саратовская область' },
      { label: 'Другой город', value: 'Другой город' },
    ],
  },
  {
    key: 'when',
    question: 'Когда планируете начать?',
    options: [
      { label: 'Как можно скорее', value: 'срочно' },
      { label: 'В течение месяца', value: 'месяц' },
      { label: 'Через 2–3 месяца', value: '2-3 месяца' },
      { label: 'Пока просто узнаю цену', value: 'узнать цену' },
    ],
  },
];

function QuizModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'form' | 'loading' | 'success' | 'error'>('form');

  useEffect(() => {
    if (open) {
      setStepIdx(0);
      setAnswers({});
      setName('');
      setPhone('');
      setStatus('form');
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const isContactStep = stepIdx >= QUIZ_STEPS.length;
  const progress = Math.round((stepIdx / (QUIZ_STEPS.length + 1)) * 100);

  const selectAnswer = (step: QuizStep, value: string) => {
    setAnswers(prev => ({ ...prev, [step.key]: value }));
    setTimeout(() => setStepIdx(i => i + 1), 200);
  };

  const goBack = () => {
    if (stepIdx > 0) setStepIdx(i => i - 1);
  };

  const submit = async () => {
    if (!name.trim() || !phone.trim()) return;
    setStatus('loading');
    const { error } = await supabase.from('quiz_leads').insert({
      name: name.trim(),
      phone: phone.trim(),
      answers,
    });
    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
    }
  };

  const phoneValid = phone.replace(/\D/g, '').length >= 10;

  return (
    <>
      <div className="quiz-overlay" onClick={onClose} />
      <div className="quiz-modal" role="dialog" aria-modal="true" aria-label="Квиз расчёта стоимости">
        <button className="quiz-close" type="button" aria-label="Закрыть" onClick={onClose}>
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div className="quiz-success">
            <div className="quiz-success-ic"><CheckCircle2 size={48} /></div>
            <h3>Заявка принята!</h3>
            <p>Мы свяжемся с вами в ближайшее время и подготовим расчёт стоимости.</p>
            <button type="button" className="btn btn-primary btn-block" onClick={onClose}>Отлично</button>
          </div>
        ) : status === 'error' ? (
          <div className="quiz-success">
            <div className="quiz-success-ic quiz-error-ic"><XCircle size={48} /></div>
            <h3>Не удалось отправить</h3>
            <p>Что-то пошло не так. Позвоните нам: <a href={`tel:${PHONE_TEL}`} style={{ color: 'var(--orange)', fontWeight: 700 }}>{PHONE}</a></p>
            <button type="button" className="btn btn-primary btn-block" onClick={() => setStatus('form')}>Попробовать снова</button>
          </div>
        ) : (
          <>
            <div className="quiz-header">
              <div className="quiz-progress-bar">
                <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="quiz-step-label">
                {isContactStep
                  ? 'Последний шаг'
                  : `Шаг ${stepIdx + 1} из ${QUIZ_STEPS.length + 1}`}
              </div>
            </div>

            {!isContactStep ? (
              <div className="quiz-body" key={stepIdx}>
                <h3 className="quiz-question">{QUIZ_STEPS[stepIdx].question}</h3>
                <div className="quiz-options">
                  {QUIZ_STEPS[stepIdx].options.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`quiz-option${answers[QUIZ_STEPS[stepIdx].key] === opt.value ? ' selected' : ''}`}
                      onClick={() => selectAnswer(QUIZ_STEPS[stepIdx], opt.value)}
                    >
                      <span>{opt.label}</span>
                      <ArrowRight size={16} className="quiz-option-arrow" />
                    </button>
                  ))}
                </div>
                {stepIdx > 0 && (
                  <button type="button" className="quiz-back" onClick={goBack}>
                    <ChevronLeft size={16} /> Назад
                  </button>
                )}
              </div>
            ) : (
              <div className="quiz-body" key="contact">
                <h3 className="quiz-question">Куда отправить расчёт?</h3>
                <p className="quiz-contact-hint">Укажите имя и телефон — подготовим расчёт и перезвоним.</p>
                <div className="quiz-inputs">
                  <div className="quiz-input-wrap">
                    <User size={18} className="quiz-input-ic" />
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="quiz-input"
                    />
                  </div>
                  <div className="quiz-input-wrap">
                    <Phone size={18} className="quiz-input-ic" />
                    <input
                      type="tel"
                      placeholder="Телефон"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="quiz-input"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-block btn-lg quiz-submit-btn"
                  disabled={!name.trim() || !phoneValid || status === 'loading'}
                  onClick={submit}
                >
                  {status === 'loading' ? (
                    <><Loader2 size={18} className="quiz-spinner" /> Отправляем...</>
                  ) : (
                    <>Получить расчёт <Send size={16} /></>
                  )}
                </button>
                <button type="button" className="quiz-back" onClick={goBack}>
                  <ChevronLeft size={16} /> Назад
                </button>
                <p className="quiz-disclaimer">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                  Мы не передаём ваши контакты третьим лицам.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

function Cta({ onQuiz }: { onQuiz: () => void }) {
  const { ref, inView } = useReveal();
  return (
    <section className="section" id="cta" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className={`cta-banner reveal${inView ? ' in' : ''}`} ref={ref}>
          <div className="cta-banner-img">
            <img
              src="https://images.pexels.com/photos/8020247/pexels-photo-8020247.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Производство металлоконструкций"
              loading="lazy"
            />
            <div className="cta-banner-img-overlay" />
          </div>
          <div className="cta-banner-content">
            <span className="cta-banner-eyebrow">Бесплатный расчёт</span>
            <h2>Рассчитайте стоимость за 1 минуту</h2>
            <p className="cta-banner-sub">
              Ответьте на несколько вопросов — подготовим предварительный расчёт и перезвоним.
              Фиксируем стоимость в договоре, без доплат после замера.
            </p>
            <button type="button" className="btn btn-primary btn-lg" onClick={onQuiz}>
              Получить расчёт <ArrowRight size={16} />
            </button>
            <div className="cta-banner-phone">
              или позвоните: <a href={`tel:${PHONE_TEL}`}>{PHONE}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const CONTACTS = [
  { ic: MapPin, label: 'Адреса', val: 'ул. Рабочая, 40/60 · ул. Ломоносова, 23 · просп. Энтузиастов, 34/40' },
  { ic: Phone, label: 'Телефон', val: PHONE },
  { ic: Mail, label: 'Email', val: 'info@patriot64.ru' },
  { ic: Clock, label: 'Режим работы', val: 'Пн–Чт 9:00–18:00, Пт 9:00–16:00, Сб–Вс выходной' },
];

function ContactSection({ onQuiz }: { onQuiz: () => void }) {
  const { ref, inView } = useReveal();
  return (
    <section className="section alt" id="contacts">
      <div className="wrap">
        <div className="h2-center">
          <span className="eyebrow">Контакты</span>
          <h2>Свяжитесь с нами</h2>
          <div className="dash" />
        </div>
        <div className={`contacts-grid reveal${inView ? ' in' : ''}`} ref={ref}>
          <div className="contact-rows">
            {CONTACTS.map(c => (
              <div className="contact-row" key={c.label}>
                <div className="contact-ic"><c.ic /></div>
                <div>
                  <div className="label">{c.label}</div>
                  <div className="val">{c.val}</div>
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-primary" style={{ marginTop: 8, alignSelf: 'flex-start' }} onClick={onQuiz}>
              Получить расчёт
            </button>
          </div>
          <div className="map-box">
            <div className="map-pin"><MapPin /></div>
            <div className="map-label">ул. Рабочая, 40/60, Саратов</div>
            <div className="map-watermark">Яндекс Карты · г. Саратов</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const FOOTER_LINKS = [
  { h4: 'Продукция', items: ['Алюминиевые окна', 'Пластиковые окна', 'Остекление балконов', 'Фасады и витражи'] },
  { h4: 'Услуги', items: ['Замер бесплатно', 'Монтаж конструкций', 'Отделка балконов', 'Доставка'] },
  { h4: 'Компания', items: ['О нас', 'Наши работы', 'Отзывы', 'Контакты'] },
];

function Footer({ onQuiz }: { onQuiz: () => void }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top" className="logo">
              <span className="logo-mark" aria-hidden="true">
                <img src="/assets/images/ChatGPT_Image_16_мар._2026_г.,_07_05_47.png" alt="" />
              </span>
              <span className="logo-text">
                <span className="lt-name">PATRIOT</span>
                <span className="lt-sub">Завод металлоконструкций</span>
              </span>
            </a>
            <p>Завод металлоконструкций и остекления. Производим и устанавливаем с 2006 года.</p>
            <div className="socials">
              <a className="social" href="https://t.me/zmk_patriot" target="_blank" rel="noreferrer">TG</a>
              <a className="social" href="https://vk.com/patriot64" target="_blank" rel="noreferrer">VK</a>
              <a className="social" href="https://ok.ru/patriot64" target="_blank" rel="noreferrer">ОК</a>
            </div>
          </div>
          {FOOTER_LINKS.map(col => (
            <div className="footer-col" key={col.h4}>
              <h4>{col.h4}</h4>
              <ul>{col.items.map(it => <li key={it}><a href="#works">{it}</a></li>)}</ul>
            </div>
          ))}
          <div className="footer-col footer-contacts">
            <h4>Контакты</h4>
            <div className="fc-row"><a href={`tel:${PHONE_TEL}`}>{PHONE}</a></div>
            <div className="fc-row"><a href="mailto:info@patriot64.ru">info@patriot64.ru</a></div>
            <div className="fc-row">ул. Рабочая, 40/60, Саратов</div>
            <button type="button" className="btn btn-primary" onClick={onQuiz}>Получить расчёт</button>
          </div>
        </div>
      </div>
      <div className="legal-bar">© 2026 ЗМК «Патриот»</div>
    </footer>
  );
}

function BackToTop() {
  const show = useScrolled(600);
  return (
    <button
      className={`back-to-top${show ? ' show' : ''}`}
      aria-label="Наверх"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowRight size={18} style={{ rotate: '-90deg' }} />
    </button>
  );
}

export default function App() {
  const [quizOpen, setQuizOpen] = useState(false);
  const openQuiz = useCallback(() => setQuizOpen(true), []);
  const closeQuiz = useCallback(() => setQuizOpen(false), []);
  return (
    <>
      <ScrollProgress />
      <Header onQuiz={openQuiz} />
      <main>
        <Hero onQuiz={openQuiz} />
        <About onQuiz={openQuiz} />
        <Why onQuiz={openQuiz} />
        <Products onQuiz={openQuiz} />
        <Works onQuiz={openQuiz} />
        <Advantages />
        <Process onQuiz={openQuiz} />
        <Reviews />
        <Faq />
        <Cta onQuiz={openQuiz} />
        <ContactSection onQuiz={openQuiz} />
      </main>
      <Footer onQuiz={openQuiz} />
      <BackToTop />
      <QuizModal open={quizOpen} onClose={closeQuiz} />
    </>
  );
}
