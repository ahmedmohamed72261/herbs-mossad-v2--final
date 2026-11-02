import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'motion/react';
import { useAppStore, Language } from '@/store';
import { translations } from '@/lib/translations';
import { useApi } from '@/hooks/useApi';
import {
  FiArrowRight,
  FiChevronDown,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiMenu,
  FiMoon,
  FiSun,
  FiX,
  FiCheck,
} from 'react-icons/fi';

const languagesList: { code: Language; label: string; short: string; flag: string }[] = [
  { code: 'en', label: 'English', short: 'EN', flag: '🇬🇧' },
  { code: 'ar', label: 'العربية', short: 'عربي', flag: '🇪🇬' },
  { code: 'de', label: 'Deutsch', short: 'DE', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', short: 'FR', flag: '🇫🇷' },
  { code: 'es', label: 'Español', short: 'ES', flag: '🇪🇸' },
];

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, theme, setLanguage, toggleTheme } = useAppStore();
  const t = translations[language];
  const { categories, fetchCategories } = useApi();
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories, fetchCategories]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsLangOpen(false);
  }, [router.pathname]);

  // Click outside to close language dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/products', label: t.nav.products, dropdown: true },
    { href: '/certificates', label: t.nav.certificates },
    { href: '/export', label: t.nav.export },
    { href: '/about', label: t.nav.about },
    { href: '/faq', label: t.nav.faq },
    { href: '/team', label: t.nav.team },
    { href: '/contact', label: t.nav.contact },
  ];

  const productsDropdown = [
    { href: '/products', label: language === 'ar' ? 'كل المنتجات' : 'All Products' },
    ...categories.map((cat) => ({
      href: `/products?category_id=${cat.id}`,
      label: language === 'ar' ? cat.name_ar : cat.name_en,
    })),
  ];

  const currentLangObj = languagesList.find((l) => l.code === language) || languagesList[0];

  const isActive = (href: string) =>
    href === '/' ? router.pathname === '/' : router.pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Utility Bar */}
      <div className="hidden bg-[#F4F7F2] text-[#2C3F34] border-b border-[#E0E8E1] transition-colors duration-300 dark:bg-[#070D0B] dark:text-white/80 dark:border-white/10 lg:block">
        <div className="container flex items-center justify-between py-2 text-[13px]">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2 font-medium">
              <FiMapPin className="h-4 w-4 text-[#2D6A35] dark:text-[#7E9E2C]" />
              <span>{language === 'ar' ? 'كفر بني علي، سمسطا – بني سويف، مصر' : 'Kafr Bani Ali, Samasta – Beni Suef, Egypt'}</span>
            </span>
            <a
              href="mailto:export@herbiva.com"
              className="inline-flex items-center gap-2 font-medium transition hover:text-[#2D6A35] dark:hover:text-[#C6A15B]"
            >
              <FiMail className="h-4 w-4 text-[#2D6A35] dark:text-[#7E9E2C]" />
              <span>export@herbiva.com</span>
            </a>
          </div>

          <div className="flex items-center gap-6">
            {/* Desktop Language Switcher */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="inline-flex items-center gap-2 rounded-lg px-2.5 py-1 text-[13px] font-semibold text-[#2C3F34] transition hover:bg-[#E2EAE0] hover:text-[#0E231B] dark:text-white/90 dark:hover:bg-white/10 dark:hover:text-white"
                aria-expanded={isLangOpen}
                aria-label="Select Language"
              >
                <FiGlobe className="h-4 w-4 text-[#2D6A35] dark:text-[#7E9E2C]" />
                <span>{currentLangObj.flag} {currentLangObj.short}</span>
                <FiChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <div className="absolute top-full z-50 mt-1.5 w-40 overflow-hidden rounded-xl border border-[#E2E8E3] bg-white p-1.5 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0D1615] ltr:right-0 rtl:left-0">
                  {languagesList.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-start text-[13px] font-medium transition ${
                        language === lang.code
                          ? 'bg-[#7E9E2C]/15 text-[#2D6A35] font-bold dark:bg-[#7E9E2C]/20 dark:text-[#7E9E2C]'
                          : 'text-[#2C3F34] hover:bg-[#F4F7F2] hover:text-[#0E231B] dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                      {language === lang.code && <FiCheck className="h-3.5 w-3.5 text-[#2D6A35] dark:text-[#7E9E2C]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-1.5 rounded-lg p-1 text-[#2C3F34] transition hover:bg-[#E2EAE0] hover:text-[#2D6A35] dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-[#C6A15B]"
              aria-label="Toggle dark/light theme"
            >
              {theme === 'light' ? <FiMoon className="h-4 w-4" /> : <FiSun className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`border-b border-[#E2E8E3] bg-white/95 backdrop-blur-xl transition-shadow duration-300 dark:border-white/10 dark:bg-[#0C1512]/95 ${
          isScrolled ? 'shadow-[0_8px_24px_rgba(14,34,27,0.06)]' : ''
        }`}
      >
        <div className="container flex items-center justify-between gap-3 py-3.5">
          {/* Brand Logo & Slogan */}
          <div className="flex shrink-0 items-center">
            <Link href="/" className="block">
              <img
                src="/images/logo-horizental.png"
                alt={t.brand.name}
                className="h-10 w-auto transition-transform hover:scale-[1.02] dark:brightness-0 dark:invert"
              />
            </Link>
            <div className="hidden border-s border-[#DCDCDC] ps-4 text-[12px] font-medium tracking-wide text-[#55695D] xl:inline-block ltr:ms-5 rtl:ms-5 dark:border-white/15 dark:text-white/60">
              <span className="italic font-semibold text-[#8C6D2D] dark:text-[#C6A15B]">{t.brand.tagline}</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-0.5 xl:flex">
            {navLinks.map((link) => (
              <div key={link.href} className="group relative">
                {link.dropdown ? (
                  <>
                    <button
                      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-[10px] px-2.5 2xl:px-3 py-2 text-[13px] font-bold transition ${
                        isActive(link.href)
                          ? 'text-[#2D6A35] bg-[#7E9E2C]/10 dark:text-[#C6A15B] dark:bg-white/5'
                          : 'text-[#1D2B24] hover:text-[#2D6A35] hover:bg-[#FAF8F5] dark:text-white/90 dark:hover:text-[#C6A15B] dark:hover:bg-white/5'
                      }`}
                    >
                      <span>{link.label}</span>
                      <FiChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                    </button>
                    <div className="invisible absolute top-full z-50 mt-2 w-56 translate-y-2 overflow-hidden rounded-[16px] border border-[#E2E8E3] bg-white p-2 opacity-0 shadow-[0_12px_32px_rgba(14,34,27,0.1)] transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 dark:border-white/10 dark:bg-[#111E19] ltr:left-0 rtl:right-0">
                      {productsDropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block rounded-[10px] px-4 py-2.5 text-[14px] font-semibold text-[#1D2B24] transition hover:bg-[#FAF8F5] hover:text-[#2D6A35] dark:text-white/85 dark:hover:bg-white/5 dark:hover:text-[#C6A15B]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={`block whitespace-nowrap rounded-[10px] px-2.5 2xl:px-3 py-2 text-[13px] font-bold transition ${
                      isActive(link.href)
                        ? 'text-[#2D6A35] bg-[#7E9E2C]/10 dark:text-[#C6A15B] dark:bg-white/5'
                        : 'text-[#1D2B24] hover:text-[#2D6A35] hover:bg-[#FAF8F5] dark:text-white/90 dark:hover:text-[#C6A15B] dark:hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Action: Quote Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <Link
              href="/contact"
              className="btn-primary btn-sm hidden xl:inline-flex shadow-sm whitespace-nowrap shrink-0"
            >
              <span className="whitespace-nowrap">{t.homePage.quoteBtn || t.homePage.shopNow}</span>
              <FiArrowRight className="h-4 w-4 rtl:rotate-180 shrink-0" />
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-[#E2E8E3] text-[#0F221B] transition hover:border-[#7E9E2C] dark:border-white/15 dark:text-white xl:hidden"
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-b border-[#E2E8E3] bg-white px-6 pb-6 pt-4 shadow-xl dark:border-white/10 dark:bg-[#111E19] xl:hidden">
          <p className="mb-4 border-b border-[#EFEFEF] pb-3 text-[12px] font-medium italic text-[#55695D] dark:border-white/10 dark:text-[#A7B3A9]">
            {t.brand.tagline}
          </p>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <div key={link.href}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => setIsProductsOpen((open) => !open)}
                      className="flex w-full items-center justify-between rounded-[12px] px-4 py-3 text-[15px] font-semibold text-[#253830] dark:text-white/85"
                    >
                      <span>{link.label}</span>
                      <FiChevronDown
                        className={`h-4 w-4 transition-transform ${
                          isProductsOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isProductsOpen && (
                      <div className="mt-1 space-y-1 ltr:ml-4 rtl:mr-4">
                        {productsDropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block rounded-[10px] px-4 py-2 text-[14px] font-medium text-[#4A5B53] hover:text-[#2D6A35] dark:text-white/60"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="block rounded-[12px] px-4 py-3 text-[15px] font-semibold text-[#253830] hover:text-[#2D6A35] dark:text-white/85"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Language Selector Pills */}
          <div className="mt-5 border-t border-[#EFEFEF] pt-4 dark:border-white/10">
            <p className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-[#4A5B53] dark:text-white/50">
              Language / اللغة
            </p>
            <div className="grid grid-cols-5 gap-1.5">
              {languagesList.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`flex flex-col items-center justify-center rounded-xl py-2 text-[12px] font-semibold transition ${
                    language === lang.code
                      ? 'bg-[#7E9E2C] text-white font-bold shadow-sm'
                      : 'border border-[#E2E8E3] bg-white text-[#0F221B] dark:border-white/15 dark:bg-white/5 dark:text-white'
                  }`}
                >
                  <span className="text-sm">{lang.flag}</span>
                  <span className="mt-0.5 text-[11px]">{lang.short}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="flex-1 rounded-[12px] border border-[#E2E8E3] px-4 py-2.5 text-center text-sm font-semibold text-[#0F221B] dark:border-white/15 dark:text-white"
            >
              {theme === 'light' ? (
                <FiMoon className="inline h-4 w-4 align-middle ltr:mr-2 rtl:ml-2" />
              ) : (
                <FiSun className="inline h-4 w-4 align-middle ltr:mr-2 rtl:ml-2" />
              )}
              {theme === 'light' ? 'Dark' : 'Light'}
            </button>
          </div>

          <Link href="/contact" className="btn-primary mt-4 w-full justify-center">
            <span>{t.homePage.quoteBtn || t.homePage.shopNow}</span>
            <FiArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
