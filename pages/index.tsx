import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import { useApi, Product } from '@/hooks/useApi';
import {
  FiArrowRight,
  FiCheckCircle,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiShield,
  FiAward,
  FiPackage,
  FiCheck,
  FiChevronDown,
} from 'react-icons/fi';

const Home = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const page = t.homePage;
  const isAr = language === 'ar';

  const { products, categories: apiCategories, loading: apiLoading, fetchProducts, fetchCategories } = useApi();
  const [selectedCategory, setSelectedCategory] = useState<string | number>('all');

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
    if (apiCategories.length === 0) {
      fetchCategories();
    }
  }, [products.length, apiCategories.length, fetchProducts, fetchCategories]);

  // Filter products by selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return products.slice(0, 8);
    }
    return products
      .filter((p) => {
        if (!p.category) return false;
        return (
          String(p.category.id) === String(selectedCategory) ||
          p.category.slug === String(selectedCategory)
        );
      })
      .slice(0, 8);
  }, [products, selectedCategory]);

  const loading = apiLoading.products || apiLoading.categories;

  const contactCards = [
    {
      icon: FiMapPin,
      label: isAr ? 'المقر ومنشأة المعالجة' : 'Processing Facility & HQ',
      value: isAr ? 'كفر بني علي، سمسطا – بني سويف، مصر' : 'Kafr Bani Ali, Samasta – Beni Suef, Egypt',
      href: '/contact',
    },
    {
      icon: FiPhone,
      label: isAr ? 'هاتف المبيعات والتصدير' : 'Export Desk & Phone',
      value: isAr ? '00201107762512' : '+20 110 776 2512',
      href: 'tel:+201107762512',
    },
    {
      icon: FiMail,
      label: isAr ? 'البريد الإلكتروني التجاري' : 'Official Trade Email',
      value: 'export@herbiva.com',
      href: 'mailto:export@herbiva.com',
    },
    {
      icon: FiGlobe,
      label: isAr ? 'واتساب مباشر' : 'Direct WhatsApp',
      value: isAr ? '00201107762512' : '+20 110 776 2512',
      href: 'https://wa.me/201107762512',
    },
  ];

  return (
    <Layout title={t.home.heroTitle} description={page.heroDescription}>
      {/* 1. HERO SECTION - Clean, High Impact, Agricultural Background, No Video */}
      <section className="relative isolate overflow-hidden bg-[#0D1615] text-white">
        {/* Static Background Image with subtle high-contrast overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
          style={{ backgroundImage: "url('/images/hero-section.jpg')" }}
        />
        {/* Professional Dual Dark Gradients for Crisp Readability */}
        <div className="absolute inset-0 bg-[#0D1615]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1615]/95 via-[#0D1615]/80 to-transparent lg:w-4/5" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0D1615] to-transparent" />

        <div className="container relative py-20 lg:min-h-[640px] lg:py-28 flex flex-col justify-center">
          <div className="grid lg:grid-cols-[1.25fr_0.75fr] items-center gap-12">
            <div className="max-w-2xl">
              {/* Trust badge */}
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C6A15B]/50 bg-[#0D1615]/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#C6A15B] backdrop-blur-md shadow-sm">
                <img src="/images/logo-leaves.png" alt="" className="h-4 w-auto max-h-4 object-contain inline-block shrink-0 drop-shadow-[0_0_6px_rgba(198,161,91,0.5)]" />
                {page.heroBadge}
              </span>

              {/* Headline with exact colors: Line 1 white, Line 2 gold */}
              <h1 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-[56px]">
                <span className="block text-white">{page.heroTitleLine1}</span>
                <span className="mt-2 block text-[#C6A15B]">{page.heroTitleLine2}</span>
              </h1>

              {/* Concise description */}
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                {page.heroDescription}
              </p>

              {/* TWO BUTTONS: Green Request Export Quote & White Explore Products */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold shadow-lg shadow-[#A5C232]/25 transition hover:scale-[1.02]"
                >
                  <span>{isAr ? 'طلب تسعير تصدير' : 'Request Export Quote'}</span>
                  <FiArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>

                <a
                  href="#products-section"
                  className="btn-white inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold transition hover:scale-[1.02]"
                >
                  <span>{page.exploreBtn || t.common.exploreProducts}</span>
                </a>
              </div>

              {/* Micro-features below buttons */}
              <div className="mt-10 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-medium text-white/80">
                {page.featuredTagSecondary.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-2">
                    <FiCheckCircle className="h-4 w-4 text-[#A5C232]" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Right side: Framed floating cards leaving the central Herbiva circular logo completely clear */}
            <div className="hidden lg:flex flex-col justify-between items-end min-h-[620px] py-4 ltr:pr-2 rtl:pl-2 pointer-events-none">
              {/* Card 1: Floats at Top-Right, above the circular Herbiva seal */}
              <div className="pointer-events-auto animate-float-gentle flex items-center gap-4 rounded-[20px] border border-white/15 bg-[#0D1615]/60 p-4 shadow-2xl backdrop-blur-md w-full max-w-[310px] transition hover:border-[#A5C232]/50">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#A5C232] text-[#0D1615] shadow-md">
                  <FiCheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-white">
                    {isAr ? 'تداول نظيف وموثق' : 'Clean handling'}
                  </p>
                  <p className="mt-0.5 text-xs text-white/70">
                    {isAr ? 'قابل للتتبع، مفحوص مخبرياً، جاهز للتصدير.' : 'Traceable, tested, export-ready.'}
                  </p>
                </div>
              </div>

              {/* Card 2: Floats at Bottom-Right, below the circular Herbiva seal */}
              <div className="pointer-events-auto animate-float-delayed flex items-center gap-4 rounded-[20px] border border-white/15 bg-[#0D1615]/60 p-4 shadow-2xl backdrop-blur-md w-full max-w-[280px] transition hover:border-[#A5C232]/50 ltr:translate-x-6 rtl:-translate-x-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-[#A5C232] shadow-md">
                  <FiGlobe className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold leading-none text-white">50+</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#A5C232]">
                    {isAr ? 'أسواق تصدير' : 'EXPORT MARKETS'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll To Explore Indicator */}
        <div className="relative z-10 flex items-center justify-center gap-2 pb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
          <FiChevronDown className="h-3.5 w-3.5 animate-bounce text-[#A5C232]" />
          <span>{isAr ? 'مرر للاستكشاف' : 'SCROLL TO EXPLORE'}</span>
        </div>

        {/* Continuous Animated Certification Marquee ("animations move from side to another") */}
        <div className="relative z-10 border-t border-b border-white/10 bg-[#070B0A]/85 py-4 backdrop-blur-md overflow-hidden">
          <div className="marquee-mask overflow-hidden">
            <div className="animate-marquee flex w-max items-center">
              {[0, 1, 2, 3].map((dup) => (
                <div key={dup} className="flex items-center shrink-0">
                  <span className="mx-8 inline-flex items-center gap-2.5 whitespace-nowrap text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white/75">
                    <FiShield className="h-4 w-4 text-[#A5C232] shrink-0" />
                    <span>HACCP CERTIFIED</span>
                  </span>
                  <span className="mx-8 inline-flex items-center gap-2.5 whitespace-nowrap text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white/75">
                    <FiShield className="h-4 w-4 text-[#A5C232] shrink-0" />
                    <span>ISO 22000</span>
                  </span>
                  <span className="mx-8 inline-flex items-center gap-2.5 whitespace-nowrap text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white/75">
                    <FiShield className="h-4 w-4 text-[#A5C232] shrink-0" />
                    <span>EU COMPLIANT</span>
                  </span>
                  <span className="mx-8 inline-flex items-center gap-2.5 whitespace-nowrap text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white/75">
                    <FiShield className="h-4 w-4 text-[#A5C232] shrink-0" />
                    <span>USDA ORGANIC OPTIONS</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global Key Metrics Ribbon */}
        <div className="relative bg-[#070B0A] py-8 sm:py-10">
          <div className="container grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
            <div className="text-center">
              <p className="font-display text-3xl font-extrabold text-[#A5C232] sm:text-4xl lg:text-5xl">200+</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-white/60">
                {isAr ? 'منتجات ومحاصيل' : 'PRODUCTS'}
              </p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl font-extrabold text-[#A5C232] sm:text-4xl lg:text-5xl">50+</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-white/60">
                {isAr ? 'أسواق تصدير' : 'EXPORT MARKETS'}
              </p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl font-extrabold text-[#A5C232] sm:text-4xl lg:text-5xl">30+</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-white/60">
                {isAr ? 'عاماً في التوريد' : 'YEARS SOURCING'}
              </p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl font-extrabold text-[#A5C232] sm:text-4xl lg:text-5xl">98%</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-white/60">
                {isAr ? 'نسبة نقاء معتمدة' : 'PURITY VERIFIED'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. UNIFIED PRODUCTS & CATEGORIES SECTION (Merged as requested) */}
      <section id="products-section" className="section-shell bg-[#FAF8F5] dark:bg-[#0B100E]">
        <div className="container">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow justify-center">
              <img src="/images/organic/sub-img.png" alt="" className="h-5 w-auto" />
              {t.products.title}
            </span>
            <h2 className="section-title mt-2">{t.home.featuredProducts}</h2>
            <p className="section-lead mt-3">{page.featuredDescription}</p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition ${selectedCategory === 'all'
                ? 'bg-[#0D1615] text-white shadow-md dark:bg-[#A5C232] dark:text-[#0D1615]'
                : 'bg-white text-[#272320] border border-[#E2E2E2] hover:border-[#A5C232] dark:bg-white/5 dark:border-white/10 dark:text-white/80'
                }`}
            >
              {t.common.filterAll}
            </button>

            {apiCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition ${String(selectedCategory) === String(cat.id)
                  ? 'bg-[#0D1615] text-white shadow-md dark:bg-[#A5C232] dark:text-[#0D1615]'
                  : 'bg-white text-[#272320] border border-[#E2E2E2] hover:border-[#A5C232] dark:bg-white/5 dark:border-white/10 dark:text-white/80'
                  }`}
              >
                {isAr ? cat.name_ar : cat.name_en}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-block m-3 h-[220px] rounded-[16px]" />
                  <div className="px-6 pb-6 pt-2 space-y-3">
                    <div className="skeleton-line h-3 w-1/3" />
                    <div className="skeleton-line h-5 w-3/4" />
                    <div className="skeleton-line h-3 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-dashed border-[#E2E2E2] bg-white p-12 text-center dark:border-white/10 dark:bg-white/5">
              <FiPackage className="mx-auto h-12 w-12 text-[#A5C232]/60" />
              <p className="mt-3 font-display text-lg font-bold text-[#0D1615] dark:text-white">
                {t.common.noData}
              </p>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={isAr ? product.name_ar : product.name_en}
                  category={isAr ? product.category?.name_ar || '' : product.category?.name_en || ''}
                  description={isAr ? product.short_description_ar : product.short_description_en}
                  image={product.image || null}
                />
              ))}
            </div>
          )}

          {/* View Full Catalog Link */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 font-bold shadow-md"
            >
              <span>{t.common.viewAll}</span>
              <FiArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>

            <Link
              href="/catalog"
              className="btn-white inline-flex items-center gap-2 px-8 py-3.5 font-bold border border-[#E2E2E2] dark:border-white/15"
            >
              <span>{t.nav.catalog} (PDF)</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FACILITY & PROCESSING VIDEO SHOWCASE (Brand Lime Theme) */}
      <section className="section-lime relative overflow-hidden py-[70px] lg:py-[100px] border-y border-black/5">
        <img
          src="/images/organic/body-illutions01.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 right-0 hidden w-72 opacity-25 lg:block rtl:left-0 rtl:right-auto"
        />

        <div className="container relative">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
              <img src="/images/logo-leaves.png" alt="" className="h-4 w-auto max-h-4 object-contain inline-block shrink-0 brightness-0 invert" />
              {isAr ? 'منشأة الفرز والمعالجة في مصر' : 'Behind The Sourcing • Facility Tour'}
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
              {isAr
                ? 'شاهد تكنولوجيا الفرز البصري والمعالجة الآلية لمحاصيلنا'
                : 'Optical Sortex Cleaning & Processing in Action'}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/90">
              {isAr
                ? 'نضمن نقاء يفوق 99% من خلال أحدث خطوط الفرز البصري (Sortex) والتحكم الميكروبيولوجي الدقيق قبل شحن الحاويات من صعيد مصر لكافة الموانئ الدولية.'
                : 'Discover how our raw herbs, seeds, and spices are cleaned, optical Sortex sorted, and prepared under strict international quality controls before export.'}
            </p>
          </div>

          {/* Video Player Card */}
          <div className="mt-10 mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/25 bg-[#0D1615] shadow-2xl">
            <div className="relative aspect-video w-full bg-black">
              <video
                src="/images/herbiva-showreel.mp4"
                poster="/images/hero-section.jpg"
                controls
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Video Feature Points */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#0D1615] border-t border-white/10 text-center text-xs">
              <div className="flex items-center justify-center gap-2">
                <FiCheck className="h-4 w-4 text-[#A5C232] shrink-0" />
                <span className="text-white/90 font-medium">{isAr ? 'فرز Sortex بنقاء ≥99%' : '≥99% Sortex Purity'}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FiCheck className="h-4 w-4 text-[#A5C232] shrink-0" />
                <span className="text-white/90 font-medium">{isAr ? 'تعقيم بالبخار الطبيعي' : 'Steam Sterilization'}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FiCheck className="h-4 w-4 text-[#A5C232] shrink-0" />
                <span className="text-white/90 font-medium">{isAr ? 'تحليل COA معتمد' : 'Batch COA Certified'}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FiCheck className="h-4 w-4 text-[#A5C232] shrink-0" />
                <span className="text-white/90 font-medium">{isAr ? 'تغليف وتصدير مباشر' : 'Direct Nile Export'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS - Direct Credibility Proof */}
      <section className="section-shell bg-white dark:bg-[#0D1615]">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">
              <img src="/images/organic/sub-img.png" alt="" className="h-5 w-auto" />
              {page.testimonialsBadge}
            </span>
            <h2 className="section-title mt-2">{page.testimonialsTitle}</h2>
            <p className="section-lead mt-3">{page.testimonialsDescription}</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {page.testimonialsItems.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-[#E2E2E2] bg-[#FAF8F5] p-8 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/5"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#A5C232]">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                  <p className="mt-4 font-display text-base leading-relaxed text-[#272320] dark:text-white/90">
                    &ldquo;{item.text}&rdquo;
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3 border-t border-[#EAE6DF] pt-4 dark:border-white/10">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#A5C232] font-display text-sm font-bold text-white">
                    {item.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-[#0D1615] dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-xs text-[#5E5E5E] dark:text-white/60">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GET IN TOUCH / DIRECT INQUIRY (Brand Lime Theme) */}
      <section className="section-lime relative overflow-hidden py-[70px] lg:py-[100px] border-t border-black/5">
        <div className="container relative">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                <img src="/images/logo-leaves.png" alt="" className="h-4 w-auto max-h-4 object-contain inline-block shrink-0 brightness-0 invert" />
                {page.ctaBadge}
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                {page.ctaTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/90">
                {page.ctaDescription}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="btn-dark inline-flex items-center gap-2 px-8 py-3.5 text-base font-bold shadow-lg shadow-black/20"
                >
                  <span>{page.ctaPrimary}</span>
                  <FiArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>

                <a
                  href="https://wa.me/201107762512"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-white inline-flex items-center gap-2 px-8 py-3.5 text-base font-bold"
                >
                  <FiGlobe className="h-4 w-4 text-[#A5C232]" />
                  <span>{isAr ? 'واتساب: 00201107762512' : 'WhatsApp: +20 110 776 2512'}</span>
                </a>
              </div>
            </div>

            {/* Direct Contact Cards with translucent glass styling */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {contactCards.map((card) => (
                <a
                  key={card.label}
                  href={card.href}
                  className="flex flex-col justify-between rounded-2xl bg-white/20 p-6 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30 border border-white/20"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#0D1615]">
                      <card.icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
                      {card.label}
                    </span>
                  </div>
                  <p className="mt-4 font-display text-sm font-bold text-white">
                    {card.value}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
