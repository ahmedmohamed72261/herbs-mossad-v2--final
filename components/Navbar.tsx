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
      {/* utility bar */}
      <div className="hidden bg-[#0D1615] text-white/75 lg:block">
        <div className="container flex items-center justify-between py-2 text-[13px]">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <FiMapPin className="h-4 w-4 text-[#A5C232]" />
              {language === 'ar' ? 'كفر بني علي، سمسطا – بني سويف، مصر' : 'Kafr Bani Ali, Samasta – Beni Suef, Egypt'}
            </span>
            <a href="mailto:export@herbiva.com" className="inline-flex items-center gap-2 transition hover:text-[#D1F349]">
              <FiMail className="h-4 w-4 text-[#A5C232]" />
              export@herbiva.com
            </a>
          </div>

          <div className="flex items-center gap-6">
            {/* Desktop Language Switcher */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="inline-flex items-center gap-2 rounded-lg px-2.5 py-1 text-[13px] font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
                aria-expanded={isLangOpen}
                aria-label="Select Language"
              >
                <FiGlobe className="h-4 w-4 text-[#A5C232]" />
                <span>{currentLangObj.flag} {currentLangObj.short}</span>
                <FiChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <div className="absolute top-full z-50 mt-1.5 w-40 overflow-hidden rounded-xl border border-white/10 bg-[#0D1615] p-1.5 shadow-2xl backdrop-blur-xl ltr:right-0 rtl:left-0">
                  {languagesList.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-start text-[13px] font-medium transition ${language === lang.code
                          ? 'bg-[#A5C232]/20 text-[#A5C232]'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                      {language === lang.code && <FiCheck className="h-3.5 w-3.5 text-[#A5C232]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-1.5 text-white/80 transition hover:text-[#D1F349]"
              aria-label="Toggle dark/light theme"
            >
              {theme === 'light' ? <FiMoon className="h-4 w-4" /> : <FiSun className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* main nav */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`border-b border-[#E2E2E2]/70 bg-white/95 backdrop-blur-xl transition-shadow duration-300 dark:bg-[#0F1613]/95 ${isScrolled ? 'shadow-[0_10px_30px_rgba(0,0,0,0.08)]' : ''
          }`}
      >
        <div className="container flex items-center justify-between gap-3 py-3">
          {/* Brand Logo & Marketing Slogan */}
          <div className="flex shrink-0 items-center">
            <Link href="/" className="block">
              <img
                src="/images/logo-horizental.png"
                alt={t.brand.name}
                className="h-10 w-auto transition-transform hover:scale-[1.02] dark:brightness-0 dark:invert"
              />
            </Link>
            <div className="hidden border-s border-[#DCDCDC] ps-4 text-[12px] font-medium tracking-wide text-[#5D6F63] xl:inline-block ltr:ms-5 rtl:ms-5 dark:border-white/15 dark:text-white/60">
              <span className="italic font-semibold text-[#A68036] dark:text-[#C6A15B]">{t.brand.tagline}</span>
            </div>
          </div>

          <div className="hidden items-center gap-0.5 xl:flex">
            {navLinks.map((link) => (
              <div key={link.href} className="group relative">
                {link.dropdown ? (
                  <>
                    <button
                      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-[12px] px-2.5 py-2.5 text-[13px] font-bold transition ${isActive(link.href)
                          ? 'text-[#245B2C] dark:text-[#D1F349]'
                          : 'text-[#1D2B24] hover:text-[#245B2C] dark:text-white/85 dark:hover:text-[#D1F349]'
                        }`}
                    >
                      <span>{link.label}</span>
                      <FiChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                    </button>
                    <div
                      className="invisible absolute top-full z-50 mt-2 w-56 translate-y-2 overflow-hidden rounded-[16px] border border-[#E2E2E2] bg-white p-2 opacity-0 shadow-[10px_20px_40px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 dark:border-white/10 dark:bg-[#0F1613] ltr:left-0 rtl:right-0"
                    >
                      {productsDropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block rounded-[10px] px-4 py-2.5 text-[14px] font-semibold text-[#1D2B24] transition hover:bg-[#F6F4EC] hover:text-[#245B2C] dark:text-white/85 dark:hover:bg-white/5 dark:hover:text-[#D1F349]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={`block whitespace-nowrap rounded-[12px] px-2.5 py-2.5 text-[13px] font-bold transition ${isActive(link.href)
                        ? 'text-[#245B2C] dark:text-[#D1F349]'
                        : 'text-[#1D2B24] hover:text-[#245B2C] dark:text-white/85 dark:hover:text-[#D1F349]'
                      }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/contact" className="btn-primary btn-sm hidden xl:inline-flex">
              <span>{t.homePage.quoteBtn || t.homePage.shopNow}</span>
              <FiArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="grid h-11 w-11 place-items-center rounded-[12px] border border-[#E2E2E2] text-[#0D1615] transition hover:border-[#0D1615] dark:border-white/15 dark:text-white xl:hidden"
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* mobile menu */}
      {isMenuOpen && (
        <div className="border-b border-[#E2E2E2] bg-white px-6 pb-6 pt-4 shadow-xl dark:border-white/10 dark:bg-[#0F1613] xl:hidden">
          <p className="mb-4 border-b border-[#EFEFEF] pb-3 text-[12px] font-medium italic text-[#5D6F63] dark:border-white/10 dark:text-[#A7B3A9]">
            {t.brand.tagline}
          </p>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <div key={link.href}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => setIsProductsOpen((open) => !open)}
                      className="flex w-full items-center justify-between rounded-[12px] px-4 py-3 text-[15px] font-semibold text-[#272320] dark:text-white/85"
                    >
                      <span>{link.label}</span>
                      <FiChevronDown className={`h-4 w-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isProductsOpen && (
                      <div className="mt-1 space-y-1 ltr:ml-4 rtl:mr-4">
                        {productsDropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block rounded-[10px] px-4 py-2 text-[14px] font-medium text-[#5E5E5E] hover:text-[#A5C232] dark:text-white/60"
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
                    className="block rounded-[12px] px-4 py-3 text-[15px] font-semibold text-[#272320] hover:text-[#A5C232] dark:text-white/85"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Language Selector Pills */}
          <div className="mt-5 border-t border-[#EFEFEF] pt-4 dark:border-white/10">
            <p className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-[#5E5E5E] dark:text-white/50">
              Language / اللغة
            </p>
            <div className="grid grid-cols-5 gap-1.5">
              {languagesList.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`flex flex-col items-center justify-center rounded-xl py-2 text-[12px] font-semibold transition ${language === lang.code
                      ? 'bg-[#A5C232] text-white shadow-sm'
                      : 'border border-[#E2E2E2] bg-white text-[#0D1615] dark:border-white/15 dark:bg-white/5 dark:text-white'
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
              className="flex-1 rounded-[12px] border border-[#E2E2E2] px-4 py-2.5 text-center text-sm font-semibold text-[#0D1615] dark:border-white/15 dark:text-white"
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
