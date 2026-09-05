import { useState, useEffect, useRef, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Phone, Menu, X, Factory, Banknote, CalendarClock, ShieldCheck,
  Wrench, ArrowRight, Quote, ChevronLeft, ChevronRight,
  Star, MapPin, Mail, Clock, FileCheck,
  Trash2, ArrowUpRight, CheckCircle2,
  Check, User, Loader2, Send, XCircle,
  Square, Frame, DoorOpen, Grid2x2, Sun, DoorClosed, Grid3x3,
  RectangleHorizontal, TreePalm,
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
  { n: '01', v: '20 лет', l: 'на рынке Саратова' },
  { n: '02', v: '2500+', l: 'объектов сдано' },
  { n: '03', v: 'до 5 лет', l: 'гарантии в договоре' },
  { n: '04', v: 'под ключ', l: 'производство + монтаж' },
];

function Hero({ onQuiz }: { onQuiz: () => void }) {
  const { ref, inView } = useReveal();
  const years = useCountUp(20, inView);
  const objs = useCountUp(2500, inView, 2000);
  return (
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="wrap hero-inner">
        <div className={`hero-text reveal${inView ? ' in' : ''}`} ref={ref}>
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            Собственное производство в Саратове с 2006 года
          </div>
          <h1 className="hero-h1">
            Остекление и металлоконструкции
            <br />
            с фиксированной ценой в договоре
            <span className="h1-accent">без доплат после замера</span>
          </h1>
          <p className="hero-sub">
            Производим и устанавливаем алюминиевые и пластиковые конструкции,
            фасады, входные группы, витражи и металлоконструкции.
            Смета по 6 позициям — вы видите, за что платите.
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
            Расчёт за 1 минуту · Замер бесплатно · Без обязательств
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

const ABOUT_MILESTONES = [
  { year: '2006', text: 'Основание завода «Патриот» в Саратове — начинаем с остекления балконов и окон' },
  { year: '2010', text: 'Запуск линии алюминиевых фасадов и витражей — выходим на коммерческие объекты' },
  { year: '2015', text: 'Открытие второго производственного цеха — расширяем ассортимент металлоконструкций' },
  { year: '2020', text: 'Более 2000 реализованных объектов по Саратову, Энгельсу и области' },
  { year: '2026', text: 'Полный цикл: проектирование, производство, монтаж — 50+ специалистов в штате' },
];

function About({ onQuiz }: { onQuiz: () => void }) {
  const { ref, inView } = useReveal();
  const stats = useCountUp(2500, inView, 2000);
  return (
    <section className="section about-section" id="about">
      <div className="wrap">
        <div className="h2-center">
          <span className="eyebrow">О компании</span>
          <h2>Завод «Патриот» — 20 лет на рынке Саратова</h2>
          <div className="dash" />
        </div>
        <div className={`about-grid reveal${inView ? ' in' : ''}`} ref={ref}>
          <div className="about-left">
            <div className="about-img-wrap">
              <img
                src="https://images.pexels.com/photos/8961342/pexels-photo-8961342.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Производственный цех — процесс изготовления конструкций"
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
            <div className="about-timeline">
              {ABOUT_MILESTONES.map(m => (
                <div className="about-milestone" key={m.year}>
                  <span className="am-dot" />
                  <span className="am-year">{m.year}</span>
                  <span className="am-text">{m.text}</span>
                </div>
              ))}
            </div>
            <div className="about-inline-stats">
              <div className="ais-item">
                <span className="ais-v">{Math.round(stats).toLocaleString('ru')}+</span>
                <span className="ais-l">объектов сдано</span>
              </div>
              <div className="ais-item">
                <span className="ais-v">50+</span>
                <span className="ais-l">специалистов</span>
              </div>
              <div className="ais-item">
                <span className="ais-v">5 лет</span>
                <span className="ais-l">макс. гарантия</span>
              </div>
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
  { ic: Factory, t: 'Собственное производство', d: 'Полный цикл от материала до монтажа — не перепродаём, а делаем сами. Поэтому контролируем сроки и качество на каждом этапе.' },
  { ic: Banknote, t: 'Фиксированная цена в договоре', d: 'Смета по 6 позициям — профиль, стекло, монтаж, подоконник, вывоз мусора, гарантия. Цена не изменится, даже если монтаж займёт больше времени.' },
  { ic: CalendarClock, t: 'Сроки в договоре', d: 'Фиксируем дату монтажа письменно. Подтверждаем за 48 часов, бригадир звонит за 30 минут до приезда.' },
  { ic: ShieldCheck, t: 'Гарантия до 5 лет', d: 'Официальная гарантия письменно в договоре. Реакция на обращение — в течение 48 часов, выезд сервиса бесплатно.' },
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
            Получить фиксированную смету <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

type ProductInfo = {
  label: string;
  desc: string;
  features: string[];
  photo: string;
  icon: React.ElementType;
};

const PRODUCTS: ProductInfo[] = [
  {
    label: 'Алюминиевые окна',
    desc: 'Лёгкие и долговечные окна из алюминиевого профиля. Не деформируются, не боятся перепадов температур. Подходят для балконов, фасадов, коммерческих помещений.',
    features: ['Профиль Provedal и Alutech', 'Срок службы 50+ лет', 'Покраска в любой цвет RAL', 'Тёплый и холодный варианты'],
    photo: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
    icon: Square,
  },
  {
    label: 'Пластиковые окна',
    desc: 'ПВХ-профиль с двухкамерными стеклопакетами — тепло и тихо. Идеально для квартир и домов. Установка с откосами и подоконниками в один день.',
    features: ['Двухкамерные стеклопакеты', 'Энергосберегающее покрытие', 'Откосы и подоконник в тот же день', 'Москитные сетки в комплекте'],
    photo: 'https://images.pexels.com/photos/1643374/pexels-photo-1643374.jpeg?auto=compress&cs=tinysrgb&w=600',
    icon: Square,
  },
  {
    label: 'Остекление балконов и лоджий',
    desc: 'Холодное алюминиевое и тёплое остекление под ключ. Замер, производство, монтаж, отделка и вывоз мусора — один подрядчик, одна цена.',
    features: ['Холодное от 35 000 ₽', 'Тёплое с терморазрывом', 'Отделка и утепление', 'Мусор убираем сами'],
    photo: 'https://images.pexels.com/photos/6538933/pexels-photo-6538933.jpeg?auto=compress&cs=tinysrgb&w=600',
    icon: RectangleHorizontal,
  },
  {
    label: 'Алюминиевые фасады',
    desc: 'Витражное и фасадное остекление для бизнес-центров, магазинов и производственных зданий. Стоечно-ригельные системы с терморазрывом.',
    features: ['Стоечно-ригельные системы', 'Закалённое и тонированное стекло', 'Тёплый контур для круглогодичного использования', 'Гарантия 5 лет'],
    photo: 'https://images.pexels.com/photos/11861957/pexels-photo-11861957.jpeg?auto=compress&cs=tinysrgb&w=600',
    icon: Grid2x2,
  },
  {
    label: 'Входные группы',
    desc: 'Стеклянные тамбуры, алюминиевые двери, автоматические раздвижные системы. Для магазинов, кафе, офисов и бизнес-центров.',
    features: ['Закалённое стекло 6–8 мм', 'Автоматические раздвижные двери', 'Антипаник-система', 'Монтаж за 10–15 дней'],
    photo: 'https://images.pexels.com/photos/181341/office-work-office-building-181341.jpeg?auto=compress&cs=tinysrgb&w=600',
    icon: DoorOpen,
  },
  {
    label: 'Зимние сады и веранды',
    desc: 'Остеклённые веранды, беседки и зимние сады. Алюминиевый каркас с тёплым контуром — комфортно круглый год.',
    features: ['Тёплый алюминиевый профиль', 'Панорамное остекление', 'Любые размеры и формы', 'Слияние с ландшафтом'],
    photo: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600',
    icon: TreePalm,
  },
  {
    label: 'Офисные перегородки',
    desc: 'Стационарные и мобильные стеклянные перегородки для зонирования офисов, торговых залов и переговорных. Звукоизоляция до 35 дБ.',
    features: ['Закалённое стекло 6 мм', 'Интегрированные жалюзи', 'Звукоизоляция до 35 дБ', 'Монтаж за 5–8 дней'],
    photo: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=600',
    icon: Grid3x3,
  },
  {
    label: 'Витражи',
    desc: 'Витражные алюминиевые системы для фасадов, кровли и интерьеров. Индивидуальное изготовление под проект.',
    features: ['Алюминиевый каркас', 'Любые размеры и конфигурации', 'Энергосберегающие стеклопакеты', 'Покраска в RAL'],
    photo: 'https://images.pexels.com/photos/2599538/pexels-photo-2599538.jpeg?auto=compress&cs=tinysrgb&w=600',
    icon: Frame,
  },
  {
    label: 'Стальные двери',
    desc: 'Входные двери для квартир, домов и коммерческих помещений. Три класса: Эконом, Стандарт, Премиум. С установкой.',
    features: ['Три класса защиты', 'Терморазрыв в двери', 'Монтаж с отделкой откосов', 'От 13 000 ₽'],
    photo: 'https://images.pexels.com/photos/345431/pexels-photo-345431.jpeg?auto=compress&cs=tinysrgb&w=600',
    icon: DoorClosed,
  },
  {
    label: 'Решётки на окна',
    desc: 'Декоративные и защитные решётки на окна. Сварные и кованые варианты. Покраска в любой цвет.',
    features: ['Сварные и кованые', 'Любой рисунок', 'Покраска в RAL', 'Монтаж на любые окна'],
    photo: 'https://images.pexels.com/photos/2092700/pexels-photo-2092700.jpeg?auto=compress&cs=tinysrgb&w=600',
    icon: Grid3x3,
  },
  {
    label: 'Навесы и козырьки',
    desc: 'Навесы для автомобилей, козырьки над входом. Из поликарбоната, металлопрофиля и стекла. Сварные металлокаркасы.',
    features: ['Поликарбонат или стекло', 'Сварной металлокаркас', 'Выдерживает снеговую нагрузку', 'Любые размеры'],
    photo: 'https://images.pexels.com/photos/2596277/pexels-photo-2596277.jpeg?auto=compress&cs=tinysrgb&w=600',
    icon: Sun,
  },
  {
    label: 'Заборы и ограждения',
    desc: 'Заборы из профнастила, металлические ограждения, сварные секции. С монтажом под ключ.',
    features: ['Профнастил, евроштакетник, сетка', 'Сварные секции', 'Покраска в RAL', 'Монтаж под ключ'],
    photo: 'https://images.pexels.com/photos/2092656/pexels-photo-2092656.jpeg?auto=compress&cs=tinysrgb&w=600',
    icon: Grid2x2,
  },
  {
    label: 'Ворота и калитки',
    desc: 'Откатные, распашные и секционные ворота. Калитки в едином стиле с забором. Автоматика по запросу.',
    features: ['Откатные и распашные', 'Секционные ворота', 'Автоматика Came, Nice', 'Калитки в едином стиле'],
    photo: 'https://images.pexels.com/photos/2092057/pexels-photo-2092057.jpeg?auto=compress&cs=tinysrgb&w=600',
    icon: DoorOpen,
  },
  {
    label: 'Металлоконструкции любой сложности',
    desc: 'Металлокаркасы, лестницы, перила, фермы — проектируем и изготавливаем по вашим размерам. Своё производство.',
    features: ['Проектирование по ТЗ', 'Сварные металлоконструкции', 'Любая сложность', 'Покраска и антикоррозийная обработка'],
    photo: 'https://images.pexels.com/photos/8961342/pexels-photo-8961342.jpeg?auto=compress&cs=tinysrgb&w=600',
    icon: Factory,
  },
  {
    label: 'Изделия из металла',
    desc: 'Кованые и сварные изделия: решётки, перила, лестницы, заборы, навесы. Индивидуальное изготовление.',
    features: ['Художественная ковка', 'Сварные конструкции', 'Любой дизайн', 'Покраска и цинкование'],
    photo: 'https://images.pexels.com/photos/2092699/pexels-photo-2092699.jpeg?auto=compress&cs=tinysrgb&w=600',
    icon: Wrench,
  },
];

function ProductCard({ product, idx, onOpen }: { product: ProductInfo; idx: number; onOpen: () => void }) {
  const Ic = product.icon;
  return (
    <div className="prod-card" style={{ animationDelay: `${idx * 50}ms` }} onClick={onOpen} role="button" tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter') onOpen(); }}
    >
      <div className="prod-ic"><Ic /></div>
      <div className="l">{product.label}</div>
      <ArrowUpRight className="prod-arrow" size={16} />
    </div>
  );
}

function ProductModal({ product, onClose, onQuiz }: { product: ProductInfo | null; onClose: () => void; onQuiz: () => void }) {
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [product, onClose]);

  if (!product) return null;

  return (
    <>
      <div className="quiz-overlay" onClick={onClose} />
      <div className="project-modal product-detail-modal" role="dialog" aria-modal="true" aria-label={product.label}>
        <button className="quiz-close" type="button" aria-label="Закрыть" onClick={onClose}>
          <X size={20} />
        </button>
        <div className="project-modal-gallery">
          <img src={product.photo} alt={product.label} />
        </div>
        <div className="project-modal-info">
          <span className="project-modal-tag">Продукция</span>
          <h3 className="project-modal-title">{product.label}</h3>
          <div className="project-modal-scope">
            <span className="pms-label">Описание</span>
            <p>{product.desc}</p>
          </div>
          <div className="product-features">
            <span className="pms-label">Ключевые особенности</span>
            <ul>
              {product.features.map(f => (
                <li key={f}><Check size={14} /> {f}</li>
              ))}
            </ul>
          </div>
          <button type="button" className="btn btn-primary btn-block btn-lg" onClick={() => { onClose(); onQuiz(); }}>
            Рассчитать стоимость <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

function Products({ onQuiz }: { onQuiz: () => void }) {
  const { ref, inView } = useReveal();
  const [selected, setSelected] = useState<ProductInfo | null>(null);
  return (
    <section className="section prod-section" id="products">
      <div className="wrap">
        <div className="h2-center">
          <span className="eyebrow">Продукция</span>
          <h2>Что мы производим</h2>
          <div className="dash" />
        </div>
        <div className={`prod-grid reveal${inView ? ' in' : ''}`} ref={ref}>
          {PRODUCTS.map((p, i) => <ProductCard key={p.label} product={p} idx={i} onOpen={() => setSelected(p)} />)}
        </div>
        <div className="prod-btn-row">
          <button type="button" className="btn btn-primary" onClick={onQuiz}>
            Рассчитать стоимость <ArrowRight size={15} />
          </button>
        </div>
      </div>
      <ProductModal product={selected} onClose={() => setSelected(null)} onQuiz={onQuiz} />
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
  areaM2: string;
  days: string;
};

const WORKS: WorkItem[] = [
  {
    img: '/assets/works/fas_signal_01.jpg',
    title: 'Фасадное остекление «Сигнал-Теплотехника»',
    type: 'Фасад', area: 'Энгельс',
    client: 'ООО «Сигнал-Теплотехника»', year: '2023',
    areaM2: '480', days: '45',
    scope: 'Витражное остекление фасада, 480 м². Алюминиевая стоечно-ригельная система, тёплый контур.',
    description: 'Выполнено фасадное остекление производственного здания. Применена алюминиевая система Provedal с терморазрывом. Стеклопакеты с энергоэффективным покрытием. Срок работ — 45 дней. Гарантия — 5 лет.',
    gallery: ['/assets/works/fas_signal_01.jpg', '/assets/works/fasady_01.jpg', '/assets/works/fasady_02.jpg'],
  },
  {
    img: '/assets/works/fasady_01.jpg',
    title: 'Алюминиевые фасады и витражи, бизнес-центр',
    type: 'Фасад', area: 'Саратов',
    client: 'Бизнес-центр «Каскад»', year: '2022',
    areaM2: '320', days: '30',
    scope: 'Фасадное остекление, 320 м². Витражные алюминиевые системы, тонированные стеклопакеты.',
    description: 'Остекление фасада пятиэтажного бизнес-центра. Использована стоечно-ригельная система Alutech ALT W72. Тонированное солнцезащитное стекло. Монтаж выполнен за 30 рабочих дней.',
    gallery: ['/assets/works/fasady_01.jpg', '/assets/works/fasady_02.jpg', '/assets/works/fasady_03.jpg'],
  },
  {
    img: '/assets/works/Kega1.jpg',
    title: '«КЕГА», ул. Гвардейская, 86',
    type: 'Фасад', area: 'Саратов',
    client: 'Развлекательный центр «КЕГА»', year: '2021',
    areaM2: '180', days: '25',
    scope: 'Фасадное остекление входной зоны, 180 м². Алюминиевые витражи, закалённое стекло.',
    description: 'Выполнено остекление фасада развлекательного центра. Алюминиевая система с терморазрывом, закалённое стекло 6 мм. Особое внимание уделено ветровой нагрузке — усилённый профиль.',
    gallery: ['/assets/works/Kega1.jpg', '/assets/works/fasady_04.jpg', '/assets/works/fasady_05.jpg'],
  },
  {
    img: '/assets/works/kare_02.jpg',
    title: 'Шоу-рум и кафе «KARE» (ТЦ «Антей»)',
    type: 'Входная группа', area: 'Саратов',
    client: 'Мебельный шоу-рум «KARE»', year: '2023',
    areaM2: '45', days: '15',
    scope: 'Входная группа со стеклянным тамбуром, 45 м². Алюминиевые двери, закалённое стекло.',
    description: 'Изготовление и монтаж входной группы для мебельного шоу-рума. Стеклянный тамбур с алюминиевым каркасом, автоматические раздвижные двери. Стекло — закалённое, 8 мм. Срок — 15 дней.',
    gallery: ['/assets/works/kare_02.jpg', '/assets/works/gal1prev.jpg', '/assets/works/gal2prev.jpg'],
  },
  {
    img: '/assets/works/gal1prev.jpg',
    title: 'Магазин «Антей», ул. Волжская',
    type: 'Входная группа', area: 'Саратов',
    client: 'Торговый центр «Антей»', year: '2022',
    areaM2: '60', days: '12',
    scope: 'Входная группа, 60 м². Алюминиевый профиль, стеклянные перегородки, автоматические двери.',
    description: 'Выполнена реконструкция входной группы торгового центра. Установлены алюминиевые двери с доводчиками, стеклянные перегородки тамбура. Стекло — закалённое триплекс. Срок монтажа — 12 дней.',
    gallery: ['/assets/works/gal1prev.jpg', '/assets/works/gal4prev.jpg', '/assets/works/gal5prev.jpg'],
  },
  {
    img: '/assets/works/bp01.jpg',
    title: '«BurgerPlace», ул. Кутякова, 7',
    type: 'Входная группа', area: 'Саратов',
    client: 'Сеть быстрого питания «BurgerPlace»', year: '2024',
    areaM2: '30', days: '10',
    scope: 'Входная группа, 30 м². Алюминиевые окна и двери, стеклопакеты с тонировкой.',
    description: 'Изготовление и установка входной группы для ресторана быстрого питания. Тёплый алюминиевый профиль, стеклопакеты с солнцезащитной тонировкой. Двери с антипаник-системой. Срок — 10 дней.',
    gallery: ['/assets/works/bp01.jpg', '/assets/works/m_ipp_02.jpg', '/assets/works/gal6prev.jpg'],
  },
  {
    img: '/assets/works/work2.jpg',
    title: 'Офисная перегородка, «АльфаСтрахование»',
    type: 'Перегородка', area: 'Саратов',
    client: 'АО «АльфаСтрахование»', year: '2023',
    areaM2: '120', days: '8',
    scope: 'Офисные перегородки, 120 м². Алюминиевый профиль, закалённое стекло, жалюзи.',
    description: 'Установлены офисные перегородки для отделения страховой компании. Алюминиевая система, закалённое стекло 6 мм с интегрированными жалюзи. Звукоизоляция — до 35 дБ. Срок — 8 рабочих дней.',
    gallery: ['/assets/works/work2.jpg', '/assets/works/gal2prev.jpg', '/assets/works/m_3zhuk01.jpg'],
  },
  {
    img: '/assets/works/gal2prev.jpg',
    title: 'Перегородки для торгового зала, ТЦ «Антей»',
    type: 'Перегородка', area: 'Саратов',
    client: 'ТЦ «Антей»', year: '2022',
    areaM2: '85', days: '7',
    scope: 'Стационарные перегородки, 85 м². Алюминиевый каркас, закалённое стекло.',
    description: 'Изготовлены и смонтированы стационарные стеклянные перегородки для торгового зала. Алюминиевый профиль окрашен в RAL 9006, стекло закалённое с матовой плёнкой. Срок — 7 дней.',
    gallery: ['/assets/works/gal2prev.jpg', '/assets/works/work2.jpg', '/assets/works/gal4prev.jpg'],
  },
  {
    img: '/assets/works/m_3zhuk01.jpg',
    title: 'Перегородки для магазина «Жуковский»',
    type: 'Перегородка', area: 'Саратов',
    client: 'Магазин «Жуковский»', year: '2024',
    areaM2: '50', days: '5',
    scope: 'Мобильные перегородки, 50 м². Алюминиевый профиль, стекло триплекс.',
    description: 'Установлены мобильные стеклянные перегородки для зонирования торгового пространства. Стекло триплекс 6+6 мм, алюминиевый профиль с фетровыми уплотнителями для бесшумного хода. Срок — 5 дней.',
    gallery: ['/assets/works/m_3zhuk01.jpg', '/assets/works/gal5prev.jpg', '/assets/works/gal6prev.jpg'],
  },
  {
    img: '/assets/works/work1.jpg',
    title: 'Остекление балкона, жилой дом',
    type: 'Балкон', area: 'Саратов',
    client: 'Частный заказчик', year: '2024',
    areaM2: '6', days: '2',
    scope: 'Тёплое остекление балкона, 6 м. ПВХ-профиль, двухкамерные стеклопакеты.',
    description: 'Выполнено тёплое остекление балкона в панельном доме. Использован ПВХ-профиль с двухкамерным стеклопакетом. Дополнительно выполнена отделка панелями ПВХ и утепление. Срок — 2 дня.',
    gallery: ['/assets/works/work1.jpg', '/assets/works/work3.jpg', '/assets/works/img_0300.jpg'],
  },
  {
    img: '/assets/works/work3.jpg',
    title: 'Остекление и отделка лоджии, ул. Ломоносова',
    type: 'Балкон', area: 'Саратов',
    client: 'Частный заказчик', year: '2023',
    areaM2: '8', days: '3',
    scope: 'Тёплое остекление лоджии, 8 м. Алюминиевый профиль с терморазрывом.',
    description: 'Остекление лоджии с использованием алюминиевого тёплого профиля. Стеклопакеты с энергосбережением. Выполнена внутренняя отделка — ламинированные панели, утеплитель, подоконник. Срок — 3 дня.',
    gallery: ['/assets/works/work3.jpg', '/assets/works/work1.jpg', '/assets/works/img_0300.jpg'],
  },
  {
    img: '/assets/works/img_0300.jpg',
    title: 'Остекление двух балконов, ул. Ипподромная',
    type: 'Балкон', area: 'Саратов',
    client: 'Частный заказчик', year: '2024',
    areaM2: '12', days: '1',
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
        <div className="work-meta">
          {work.type}<span className="sep">·</span>{work.area}
        </div>
        <div className="work-teaser">{work.areaM2} м² · {work.days} дней</div>
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
            <div className="pmm-row"><span className="pmm-label">Площадь</span><span className="pmm-val">{work.areaM2} м²</span></div>
            <div className="pmm-row"><span className="pmm-label">Срок</span><span className="pmm-val">{work.days} дней</span></div>
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
  const [visible, setVisible] = useState(6);
  const [selected, setSelected] = useState<WorkItem | null>(null);
  const { ref, inView } = useReveal();
  const filterMap: Record<string, (w: WorkItem) => boolean> = {
    'Все работы': () => true,
    'Фасады': w => w.type === 'Фасад',
    'Входные группы': w => w.type === 'Входная группа',
    'Перегородки': w => w.type === 'Перегородка',
    'Балконы': w => w.type === 'Балкон',
  };
  const filtered = WORKS.filter(filterMap[active]);
  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;
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
              onClick={() => { setActive(f); setVisible(6); }}>{f}</button>
          ))}
        </div>
        <div className={`works-grid reveal${inView ? ' in' : ''}`} ref={ref}>
          {shown.map((w, i) => (
            <PortfolioCard key={w.title} work={w} idx={i} onOpen={() => setSelected(w)} />
          ))}
        </div>
        <div className="prod-btn-row">
          {hasMore ? (
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
  { ic: Banknote, t: 'Прозрачная оплата', d: '50% при подписании договора, остаток — после того как вы приняли готовый результат. Никакой предоплаты в 100%.' },
  { ic: Wrench, t: 'Свой монтаж', d: 'Устанавливаем силами собственных специалистов, без субподряда. Бригадир звонит за 30 минут до приезда.' },
  { ic: FileCheck, t: 'Что входит в смету', d: 'Материал, фурнитура, монтаж, вывоз мусора — фиксируется в смете до начала работ. Вы видите все позиции.' },
  { ic: CalendarClock, t: 'Соблюдаем сроки', d: 'Дата монтажа в договоре. Подтверждаем за 48 часов. На 3-й день сообщаем статус производства.' },
  { ic: Trash2, t: 'Уборка после работ', d: 'Плёнка на полу, мусор забираем с собой. Оставляем объект чистым — это стандарт, а не дополнительная услуга.' },
];

function Advantages() {
  const { ref, inView } = useReveal();
  return (
    <section className="section alt" id="advantages">
      <div className="wrap">
        <div className="h2-center">
          <span className="eyebrow">Преимущества</span>
          <h2>Как мы защищаем вас от сюрпризов</h2>
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
  { n: '01', t: 'Заявка', d: 'Оставляете заявку на сайте или по телефону. Отвечаем за 15 минут в рабочее время.' },
  { n: '02', t: 'Замер', d: 'Бесплатно выезжаем на объект — сегодня или завтра. Замерщик представляется по имени.' },
  { n: '03', t: 'Расчёт', d: 'Готовим смету по 6 позициям, фиксируем цену. Вы видите, за что платите.' },
  { n: '04', t: 'Договор', d: 'Заключаем договор с фиксированной ценой и сроком монтажа. 50% аванс.' },
  { n: '05', t: 'Производство', d: 'Изготавливаем конструкцию на собственном заводе. На 3-й день — статус.' },
  { n: '06', t: 'Монтаж', d: 'Устанавливаем силами своих специалистов. Плёнка на пол, мусор убираем.' },
  { n: '07', t: 'Сдача', d: 'Приёмка работ, гарантийный талон. Через 6 дней — звоним: «Как всё работает?»' },
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

function Process() {
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
  { q: 'Нужно ли платить всю сумму сразу?', a: 'Нет. Стандартная схема — 50% аванс при подписании договора, оставшиеся 50% — после завершения работ и вашей приёмки. Точный порядок фиксируется в договоре до начала работ.' },
  { q: 'Почему у вас дороже, чем у частных мастеров?', a: 'Мы работаем с собственного производства и даём письменную гарантию на монтаж отдельно от гарантии на материал — это входит в цену. У частных мастеров этого обычно нет.' },
];

function FAQItem({ q, a, isOpen, onToggle, index }: { q: string; a: string; isOpen: boolean; onToggle: () => void; index: number }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);
  return (
    <div className={`faq-item${isOpen ? ' open' : ''}`}>
      <button className="faq-q" type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={onToggle}>
        <span className="num">{String(index + 1).padStart(2, '0')}</span>
        <span className="txt">{q}</span>
        <span className="faq-toggle" />
      </button>
      <div id={`faq-answer-${index}`} className="faq-a" style={{ maxHeight: isOpen ? height : 0 }}>
        <div className="faq-a-inner" ref={contentRef}>{a}</div>
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
  options: { label: string; value: string; photo: string }[];
};

const QUIZ_STEPS: QuizStep[] = [
  {
    key: 'type',
    question: 'Что вам нужно?',
    options: [
      { label: 'Остекление балкона', value: 'балкон', photo: 'https://images.pexels.com/photos/6538933/pexels-photo-6538933.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { label: 'Окна (алюминий / пластик)', value: 'окна', photo: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { label: 'Фасад / витраж', value: 'фасад', photo: 'https://images.pexels.com/photos/11861957/pexels-photo-11861957.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { label: 'Входная группа', value: 'входная группа', photo: 'https://images.pexels.com/photos/181341/office-work-office-building-181341.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { label: 'Перегородка', value: 'перегородка', photo: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { label: 'Навес / козырёк', value: 'навес', photo: 'https://images.pexels.com/photos/2596277/pexels-photo-2596277.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { label: 'Металлоконструкции', value: 'металлоконструкции', photo: 'https://images.pexels.com/photos/8961342/pexels-photo-8961342.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { label: 'Другое', value: 'другое', photo: 'https://images.pexels.com/photos/2092699/pexels-photo-2092699.jpeg?auto=compress&cs=tinysrgb&w=400' },
    ],
  },
  {
    key: 'location',
    question: 'Где находится объект?',
    options: [
      { label: 'Саратов', value: 'Саратов', photo: 'https://images.pexels.com/photos/11596849/pexels-photo-11596849.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { label: 'Энгельс', value: 'Энгельс', photo: 'https://images.pexels.com/photos/11596849/pexels-photo-11596849.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { label: 'Саратовская область', value: 'Саратовская область', photo: 'https://images.pexels.com/photos/11596849/pexels-photo-11596849.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { label: 'Другой город', value: 'Другой город', photo: 'https://images.pexels.com/photos/11596849/pexels-photo-11596849.jpeg?auto=compress&cs=tinysrgb&w=400' },
    ],
  },
  {
    key: 'when',
    question: 'Когда планируете начать?',
    options: [
      { label: 'Как можно скорее', value: 'срочно', photo: 'https://images.pexels.com/photos/7437486/pexels-photo-7437486.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { label: 'В течение месяца', value: 'месяц', photo: 'https://images.pexels.com/photos/7437486/pexels-photo-7437486.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { label: 'Через 2–3 месяца', value: '2-3 месяца', photo: 'https://images.pexels.com/photos/7437486/pexels-photo-7437486.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { label: 'Пока просто узнаю цену', value: 'узнать цену', photo: 'https://images.pexels.com/photos/7437486/pexels-photo-7437486.jpeg?auto=compress&cs=tinysrgb&w=400' },
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
    setTimeout(() => setStepIdx(i => i + 1), 250);
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
      <div className="quiz-modal quiz-modal-photo" role="dialog" aria-modal="true" aria-label="Квиз расчёта стоимости">
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
                <div className="quiz-options-photo">
                  {QUIZ_STEPS[stepIdx].options.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`quiz-option-photo${answers[QUIZ_STEPS[stepIdx].key] === opt.value ? ' selected' : ''}`}
                      onClick={() => selectAnswer(QUIZ_STEPS[stepIdx], opt.value)}
                    >
                      <div className="quiz-opt-img">
                        <img src={opt.photo} alt={opt.label} loading="lazy" />
                        <div className="quiz-opt-img-overlay" />
                      </div>
                      <span className="quiz-opt-label">{opt.label}</span>
                      <span className="quiz-opt-check"><Check size={14} /></span>
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
        <div className={`cta-banner-compact reveal${inView ? ' in' : ''}`} ref={ref}>
          <div className="cta-compact-img">
            <img
              src="https://images.pexels.com/photos/8961342/pexels-photo-8961342.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Производство металлоконструкций"
              loading="lazy"
            />
            <div className="cta-compact-img-overlay" />
          </div>
          <div className="cta-compact-content">
            <span className="cta-compact-eyebrow">Бесплатный расчёт</span>
            <h2>Рассчитайте стоимость за 1 минуту</h2>
            <p className="cta-compact-sub">
              Ответьте на 3 вопроса — подготовим предварительный расчёт и перезвоним.
              Фиксируем стоимость в договоре, без доплат после замера.
            </p>
            <div className="cta-compact-actions">
              <button type="button" className="btn btn-primary btn-lg" onClick={onQuiz}>
                Получить расчёт <ArrowRight size={16} />
              </button>
              <a href={`tel:${PHONE_TEL}`} className="cta-compact-phone">
                <Phone size={16} /> {PHONE}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const CONTACTS = [
  { ic: MapPin, label: 'Адреса', val: 'ул. Рабочая, 40/60 · ул. Ломоносова, 23 · просп. Энтузиастов, 34/40' },
  { ic: Phone, label: 'Телефон', val: PHONE, href: `tel:${PHONE_TEL}` },
  { ic: Mail, label: 'Email', val: 'info@patriot64.ru', href: 'mailto:info@patriot64.ru' },
  { ic: Clock, label: 'Режим работы', val: 'Пн–Чт 9:00–18:00, Пт 9:00–16:00, Сб–Вс выходной' },
];

const SOCIALS = [
  { label: 'Telegram', href: 'https://t.me/zmk_patriot', short: 'TG' },
  { label: 'WhatsApp', href: 'https://wa.me/79658820188', short: 'WA' },
  { label: 'ВКонтакте', href: 'https://vk.com/patriot64', short: 'VK' },
  { label: 'Одноклассники', href: 'https://ok.ru/group/53116457910336', short: 'ОК' },
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
                  <div className="val">{c.href ? <a href={c.href}>{c.val}</a> : c.val}</div>
                </div>
              </div>
            ))}
            <div className="contact-socials">
              <div className="label" style={{ marginBottom: 10 }}>Мы в соцсетях</div>
              <div className="socials-row">
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-btn" aria-label={s.label}>
                    <span className="social-btn-short">{s.short}</span>
                    <span className="social-btn-label">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
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
              <a className="social" href="https://wa.me/79658820188" target="_blank" rel="noreferrer">WA</a>
              <a className="social" href="https://vk.com/patriot64" target="_blank" rel="noreferrer">VK</a>
              <a className="social" href="https://ok.ru/group/53116457910336" target="_blank" rel="noreferrer">ОК</a>
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
        <Process />
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
