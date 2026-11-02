import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiSend,
  FiTwitter,
} from 'react-icons/fi';

const Footer = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const [email, setEmail] = useState('');
  const isEn = language === 'en';

  const copy = {
    about:
      isEn
        ? 'Exporting premium herbs, spices, seeds, and botanical ingredients with careful sourcing, strict quality control, and professional international handling.'
        : 'نصدر أعشاباً وتوابل وبذوراً ومكونات نباتية فاخرة مع توريد دقيق ورقابة صارمة على الجودة وتعامل دولي احترافي.',
    pages: isEn ? 'PAGES' : 'الصفحات',
    support: isEn ? 'SUPPORT' : 'الدعم',
    newsletter: isEn ? 'JOIN OUR MAILING LIST' : 'انضم إلى قائمتنا البريدية',
    newsletterText:
      isEn
        ? 'Join our weekly newsletter to discover our latest products and sourcing news.'
        : 'اشترك في نشرتنا الأسبوعية لمعرفة أحدث منتجاتنا وأخبار التوريد.',
    emailPlaceholder: isEn ? 'Your email address' : 'بريدك الإلكتروني',
    subscribe: isEn ? 'Subscribe' : 'اشترك',
    rights: isEn ? 'All Rights Reserved.' : 'جميع الحقوق محفوظة.',
    subscribed: isEn ? 'Thanks for subscribing!' : 'شكراً لاشتراكك!',
  };

  const pageLinks = [
    { href: '/', label: t.nav.home },
    { href: '/products', label: t.nav.products },
    { href: '/certificates', label: t.nav.certificates },
    { href: '/export', label: t.nav.export },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  const supportLinks = [
    { href: '/faq', label: t.nav.faq || 'FAQ' },
    { href: '/catalog', label: t.nav.catalog },
    { href: '/team', label: t.nav.team },
  ];

  const handleSubscribe = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;
    toast.success(copy.subscribed);
    setEmail('');
  };

  return (
    <footer className={`relative overflow-hidden bg-[#FAF8F5] text-[#2C3F34] border-t border-[#E2E8E3] dark:bg-[#0C1512] dark:text-[#D0DDD5] dark:border-white/10 ${language === 'ar' ? 'rtl' : ''}`}>
      <div className="relative">
        {/* Main Footer Columns */}
        <div className="container grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center">
              <Link href="/" className="block">
                <img
                  src="/images/logo-horizental.png"
                  alt={t.brand.name}
                  className="h-10 w-auto dark:brightness-0 dark:invert"
                />
              </Link>
              <div className="border-s border-[#DCDCDC] ps-4 text-[12px] font-medium tracking-wide text-[#55695D] ltr:ms-5 rtl:ms-5 dark:border-white/15 dark:text-white/60">
                <span className="italic font-semibold text-[#8C6D2D] dark:text-[#C6A15B]">{t.brand.tagline}</span>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-[#3B4E44] dark:text-white/70">{copy.about}</p>
            <div className="mt-6 flex gap-3">
              {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-[#D5DFD7] bg-white text-[#2C3F34] transition hover:border-[#7E9E2C] hover:bg-[#7E9E2C] hover:text-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-[#7E9E2C]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h5 className="mb-4 font-display text-[15px] font-bold uppercase tracking-wider text-[#0E231B] dark:text-white">
              {copy.pages}
            </h5>
            <ul className="space-y-2.5">
              {pageLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[14px] text-[#3B4E44] transition hover:text-[#2D6A35] dark:text-white/70 dark:hover:text-[#C6A15B]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h5 className="mb-4 font-display text-[15px] font-bold uppercase tracking-wider text-[#0E231B] dark:text-white">
              {copy.support}
            </h5>
            <ul className="space-y-2.5">
              {supportLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[14px] text-[#3B4E44] transition hover:text-[#2D6A35] dark:text-white/70 dark:hover:text-[#C6A15B]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h5 className="mb-4 font-display text-[15px] font-bold uppercase tracking-wider text-[#0E231B] dark:text-white">
              {copy.newsletter}
            </h5>
            <p className="text-[14px] leading-relaxed text-[#3B4E44] dark:text-white/70">{copy.newsletterText}</p>
            <form onSubmit={handleSubscribe} className="mt-4 flex items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={copy.emailPlaceholder}
                className="h-[48px] w-full rounded-[8px] border border-[#D5DFD7] bg-white px-4 text-[14px] text-[#0E231B] outline-none transition placeholder:text-[#6F8077] focus:border-[#7E9E2C] focus:ring-2 focus:ring-[#7E9E2C]/20 dark:border-white/15 dark:bg-white/5 dark:text-white"
              />
              <button type="submit" className="btn-primary shrink-0 px-5" aria-label={copy.subscribe}>
                <FiSend className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-[#E2E8E3] dark:border-white/10">
          <div className="container flex flex-col items-center justify-between gap-3 py-5 text-[13px] text-[#55695E] dark:text-white/50 md:flex-row">
            <p>
              &copy; {new Date().getFullYear()} {t.brand.name}. {copy.rights}
            </p>
            <div className="flex gap-6">
              <Link href="#" className="transition hover:text-[#2D6A35] dark:hover:text-[#C6A15B]">
                {isEn ? 'Terms & Conditions' : 'الشروط والأحكام'}
              </Link>
              <Link href="#" className="transition hover:text-[#2D6A35] dark:hover:text-[#C6A15B]">
                {isEn ? 'Privacy Policy' : 'سياسة الخصوصية'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;