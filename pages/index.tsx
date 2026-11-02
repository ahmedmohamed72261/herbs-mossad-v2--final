import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import { useApi } from '@/hooks/useApi';
import {
  FiArrowRight,
  FiCheckCircle,
  FiGlobe,
  FiShield,
  FiAward,
  FiPackage,
  FiCheck,
  FiChevronDown,
  FiClock,
  FiLayers,
  FiFileText,
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

  // 3 Core Export Advantage Pillars
  const pillars = [
    {
      step: '01',
      icon: FiGlobe,
      title: isAr ? 'سلسلة توريد متكاملة رأسياً' : 'Vertically Integrated Supply',
      subtitle: isAr ? 'من الحقول المصرية إلى حاويات التصدير' : 'From Nile Fields to Export Containers',
      description: isAr
        ? 'ندير دورة التوريد مباشرة من مزارعنا المتعاقد عليها في بني سويف والفيوم. حصاد دقيق، رقابة صارمة، وتتبع كامل لكل دفعة محاصيل.'
        : 'Direct oversight from contracted farms across Egypt’s herbal belt (Beni Suef & Fayoum). Careful harvesting, strict controls, and complete batch traceability.',
    },
    {
      step: '02',
      icon: FiLayers,
      title: isAr ? 'معالجة وفرز Sortex بنقاء 99%+' : 'Sortex Cleaning & Export Processing',
      subtitle: isAr ? 'فرز بصري بالليزر ونزع دقيق للشوائب' : 'Optical Laser Sorting & Purity Control',
      description: isAr
        ? 'أحدث خطوط الفرز البصري (Sortex) وغربلة آلية بالهواء تضمن إزالة كافة الشوائب والأجسام الغريبة والوصول لنقاء يفوق 99% مع الحفاظ على الزيوت الطيارة.'
        : 'State-of-the-art optical Sortex laser sorting and air screening ensuring removal of foreign matter and achieving ≥99% purity while preserving natural essential oils.',
    },
    {
      step: '03',
      icon: FiAward,
      title: isAr ? 'جودة معتمدة وشهادات دولية' : 'Certified Quality & Compliance',
      subtitle: isAr ? 'مطابقة لمعايير الاتحاد الأوروبي و FDA' : 'EU & US FDA MRL Standards',
      description: isAr
        ? 'فحوصات ميكروبيولوجية دقيقة، تحليل متبقيات المبيدات، وإصدار شهادات التحليل المخبري (COA) وشهادات الصحة النباتية المعتمدة مع كل شحنة.'
        : 'Rigorous microbiological screening, pesticide residue testing under strict international MRLs, with official Phytosanitary and batch COA documentation.',
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
        <div className="absolute inset-0 bg-[#0D1615]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1615]/10 via-[#0D1615]/10 to-transparent lg:w-4/5" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0D1615] to-transparent" />

        <div className="container relative py-20 lg:min-h-[640px] lg:py-28 flex flex-col justify-center">
          <div className="grid lg:grid-cols-[1.25fr_0.75fr] items-center gap-12">
            <div className="max-w-2xl">
              {/* Trust badge */}
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C6A15B]/50 bg-[#0D1615]/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#C6A15B] backdrop-blur-md shadow-sm">
                <img
                  src="/images/logo-leaves.png"
                  alt=""
                  className="h-4 w-auto max-h-4 object-contain inline-block shrink-0 drop-shadow-[0_0_6px_rgba(198,161,91,0.5)]"
                />
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
                  className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold shadow-lg shadow-[#7E9E2C]/25 whitespace-nowrap transition hover:scale-[1.02]"
                >
                  <span className="whitespace-nowrap">{isAr ? 'طلب تسعير تصدير' : 'Request Export Quote'}</span>
                  <FiArrowRight className="h-4 w-4 rtl:rotate-180 shrink-0" />
                </Link>

                <a
                  href="#products-section"
                  className="btn-white inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold whitespace-nowrap transition hover:scale-[1.02]"
                >
                  <span className="whitespace-nowrap">{page.exploreBtn || t.common.exploreProducts}</span>
                </a>
              </div>

              {/* Micro-features below buttons */}
              <div className="mt-10 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-medium text-white/80">
                {page.featuredTagSecondary.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-2">
                    <FiCheckCircle className="h-4 w-4 text-[#7E9E2C]" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Right side: Framed floating cards leaving the central Herbiva circular logo completely clear */}
            <div className="hidden lg:flex flex-col justify-between items-end min-h-[580px] py-4 ltr:pr-2 rtl:pl-2 pointer-events-none">
              {/* Card 1: Floats at Top-Right */}
              <div className="pointer-events-auto animate-float-gentle flex items-center gap-4 rounded-[20px] border border-white/15 bg-[#0D1615]/70 p-5 shadow-2xl backdrop-blur-md w-full max-w-[320px] transition hover:border-[#7E9E2C]/50">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7E9E2C] text-white shadow-md">
                  <FiCheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-white">
                    {isAr ? 'تداول نظيف وموثق' : 'Clean Handling'}
                  </p>
                  <p className="mt-0.5 text-xs text-white/70">
                    {isAr ? 'قابل للتتبع، مفحوص مخبرياً، جاهز للتصدير.' : 'Traceable, tested, export-ready.'}
                  </p>
                </div>
              </div>

              {/* Card 2: Floats at Bottom-Right */}
              <div className="pointer-events-auto animate-float-delayed flex items-center gap-4 rounded-[20px] border border-white/15 bg-[#0D1615]/70 p-5 shadow-2xl backdrop-blur-md w-full max-w-[300px] transition hover:border-[#7E9E2C]/50 ltr:translate-x-4 rtl:-translate-x-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-[#C6A15B] shadow-md">
                  <FiGlobe className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-display text-3xl font-bold leading-none text-white">50+</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#C6A15B]">
                    {isAr ? 'أسواق تصدير' : 'EXPORT MARKETS'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll To Explore Indicator */}
        <div className="relative z-10 flex items-center justify-center gap-2 pb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
          <FiChevronDown className="h-3.5 w-3.5 animate-bounce text-[#7E9E2C]" />
          <span>{isAr ? 'مرر للاستكشاف' : 'SCROLL TO EXPLORE'}</span>
        </div>

        {/* Continuous Animated Certification Marquee ("animations move from side to another") */}
        <div className="relative z-10 border-t border-b border-white/10 bg-[#070B0A]/85 py-4 backdrop-blur-md overflow-hidden">
          <div className="marquee-mask overflow-hidden">
            <div className="animate-marquee flex w-max items-center">
              {[0, 1, 2, 3].map((dup) => (
                <div key={dup} className="flex items-center shrink-0">
                  <span className="mx-8 inline-flex items-center gap-2.5 whitespace-nowrap text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white/75">
                    <FiShield className="h-4 w-4 text-[#7E9E2C] shrink-0" />
                    <span>HACCP CERTIFIED</span>
                  </span>
                  <span className="mx-8 inline-flex items-center gap-2.5 whitespace-nowrap text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white/75">
                    <FiShield className="h-4 w-4 text-[#7E9E2C] shrink-0" />
                    <span>ISO 22000</span>
                  </span>
                  <span className="mx-8 inline-flex items-center gap-2.5 whitespace-nowrap text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white/75">
                    <FiShield className="h-4 w-4 text-[#7E9E2C] shrink-0" />
                    <span>EU COMPLIANT</span>
                  </span>
                  <span className="mx-8 inline-flex items-center gap-2.5 whitespace-nowrap text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white/75">
                    <FiShield className="h-4 w-4 text-[#7E9E2C] shrink-0" />
                    <span>USDA ORGANIC OPTIONS</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Key Metrics Ribbon - Clean Crisp Light Surface */}
      <section className="relative bg-white py-8 sm:py-10 border-b border-[#E2E8E3] dark:bg-[#0E1A15] dark:border-white/10">
        <div className="container grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
          <div className="text-center">
            <p className="font-display text-3xl font-extrabold text-[#2D6A35] dark:text-[#7E9E2C] sm:text-4xl lg:text-5xl">200+</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-[#3B4D44] dark:text-white/60">
              {isAr ? 'منتجات ومحاصيل' : 'PRODUCTS'}
            </p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl font-extrabold text-[#2D6A35] dark:text-[#7E9E2C] sm:text-4xl lg:text-5xl">50+</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-[#3B4D44] dark:text-white/60">
              {isAr ? 'أسواق تصدير' : 'EXPORT MARKETS'}
            </p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl font-extrabold text-[#2D6A35] dark:text-[#7E9E2C] sm:text-4xl lg:text-5xl">30+</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-[#3B4D44] dark:text-white/60">
              {isAr ? 'عاماً في التوريد' : 'YEARS SOURCING'}
            </p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl font-extrabold text-[#2D6A35] dark:text-[#7E9E2C] sm:text-4xl lg:text-5xl">99%+</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-[#3B4D44] dark:text-white/60">
              {isAr ? 'نسبة نقاء معتمدة' : 'PURITY VERIFIED'}
            </p>
          </div>
        </div>
      </section>

      {/* 2. CORE EXPORT PILLARS - Strategic Why Us (Arranged Logically Before Catalog) */}
      <section className="section-shell bg-[#FAF8F5] dark:bg-[#0C1512] border-b border-[#E2E8E3] dark:border-white/10">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow justify-center">
              <img src="/images/organic/sub-img.png" alt="" className="h-5 w-auto" />
              {isAr ? 'ركائز الجودة والتصدير' : 'Why Leading Importers Choose Us'}
            </span>
            <h2 className="section-title mt-2">
              {isAr ? 'التميز الزراعي المصري وفق أعلى المعايير الدولية' : 'Precision Egyptian Sourcing for Global Buyers'}
            </h2>
            <p className="section-lead mt-3">
              {isAr
                ? 'ندير سلسلة الإمداد من الحقل إلى الحاوية، موفرين لشركائنا الدوليين نقاء لا يضاهى ووثائق فحص رسمية كاملة.'
                : 'Direct Nile Valley cultivation, optical laser cleaning, and rigorous laboratory screening tailored for international tea blenders, extractors, and food processors.'}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.step}
                  className="card-organic p-8 flex flex-col justify-between transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#7E9E2C]/15 text-[#2D6A35] dark:text-[#C6A15B]">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#C6A15B]">
                        {pillar.step}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-lg font-bold text-[#0E231B] dark:text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-[#2D6A35] dark:text-[#C6A15B]">
                      {pillar.subtitle}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#3B4D44] dark:text-white/70">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 border-t border-[#E2E8E3] pt-4 text-xs font-semibold text-[#0E231B] dark:border-white/10 dark:text-white/80">
                    <FiCheckCircle className="h-4 w-4 text-[#7E9E2C] shrink-0" />
                    <span>{isAr ? 'جاهز للتصدير الفوري' : 'International Compliance'}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. UNIFIED PRODUCTS & CATEGORIES SECTION */}
      <section id="products-section" className="section-shell bg-white dark:bg-[#0E1A15]">
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
                ? 'bg-[#205338] text-white shadow-sm'
                : 'bg-white text-[#253830] border border-[#E2E8E3] hover:border-[#7E9E2C] dark:bg-white/5 dark:border-white/10 dark:text-white/80'
                }`}
            >
              {t.common.filterAll}
            </button>

            {apiCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition ${String(selectedCategory) === String(cat.id)
                  ? 'bg-[#205338] text-white shadow-sm'
                  : 'bg-white text-[#253830] border border-[#E2E8E3] hover:border-[#7E9E2C] dark:bg-white/5 dark:border-white/10 dark:text-white/80'
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
            <div className="mt-12 rounded-2xl border border-dashed border-[#E2E8E3] bg-[#FAF8F5] p-12 text-center dark:border-white/10 dark:bg-white/5">
              <FiPackage className="mx-auto h-12 w-12 text-[#7E9E2C]/60" />
              <p className="mt-3 font-display text-lg font-bold text-[#0E231B] dark:text-white">
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
              className="btn-white inline-flex items-center gap-2 px-8 py-3.5 font-bold border border-[#E2E8E3] dark:border-white/15"
            >
              <FiFileText className="h-4 w-4 text-[#7E9E2C]" />
              <span>{t.nav.catalog} (PDF)</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FACILITY & PROCESSING VIDEO SHOWCASE - Bright Sunlit Botanical Theme */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F2F6F0] via-[#FAF8F5] to-[#E8F1E5] py-[70px] lg:py-[90px] border-y border-[#E2E8E3] dark:bg-[#0C1512] dark:border-white/10">
        <div className="container relative">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#7E9E2C]/30 bg-[#FAF8F5] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#2D6A35] shadow-sm dark:bg-white/5 dark:text-[#C6A15B]">
              <img
                src="/images/logo-leaves.png"
                alt=""
                className="h-4 w-auto max-h-4 object-contain inline-block shrink-0"
              />
              {isAr ? 'منشأة الفرز والمعالجة في مصر' : 'Behind The Sourcing • Facility Tour'}
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-[#0E231B] sm:text-3xl lg:text-4xl dark:text-white">
              {isAr
                ? 'شاهد تكنولوجيا الفرز البصري والمعالجة الآلية لمحاصيلنا'
                : 'Optical Sortex Cleaning & Processing in Action'}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#2C3F34] dark:text-white/80">
              {isAr
                ? 'نضمن نقاء يفوق 99% من خلال أحدث خطوط الفرز البصري (Sortex) والتحكم الميكروبيولوجي الدقيق قبل شحن الحاويات من صعيد مصر لكافة الموانئ الدولية.'
                : 'Discover how our raw herbs, seeds, and spices are cleaned, optical Sortex sorted, and prepared under strict international quality controls before export.'}
            </p>
          </div>

          {/* Video Player Card */}
          <div className="mt-10 mx-auto max-w-4xl overflow-hidden rounded-2xl border border-[#E2E8E3] bg-white shadow-xl dark:border-white/15 dark:bg-[#111E19]">
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
            {/* Video Feature Points in Clean Bright Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white border-t border-[#E2E8E3] text-center text-xs dark:bg-[#0E1A15] dark:border-white/10">
              <div className="flex items-center justify-center gap-2">
                <FiCheck className="h-4 w-4 text-[#7E9E2C] shrink-0" />
                <span className="text-[#0E231B] font-semibold dark:text-white">{isAr ? 'فرز Sortex بنقاء ≥99%' : '≥99% Sortex Purity'}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FiCheck className="h-4 w-4 text-[#7E9E2C] shrink-0" />
                <span className="text-[#0E231B] font-semibold dark:text-white">{isAr ? 'تعقيم بالبخار الطبيعي' : 'Steam Sterilization'}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FiCheck className="h-4 w-4 text-[#7E9E2C] shrink-0" />
                <span className="text-[#0E231B] font-semibold dark:text-white">{isAr ? 'تحليل COA معتمد' : 'Batch COA Certified'}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FiCheck className="h-4 w-4 text-[#7E9E2C] shrink-0" />
                <span className="text-[#0E231B] font-semibold dark:text-white">{isAr ? 'تغليف وتصدير مباشر' : 'Direct Nile Export'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS - Direct Credibility Proof */}
      <section className="section-shell bg-white dark:bg-[#0E1A15]">
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
                className="flex flex-col justify-between rounded-2xl border border-[#E2E8E3] bg-[#FAF8F5] p-8 shadow-sm transition hover:shadow-md hover:border-[#7E9E2C]/50 dark:border-white/10 dark:bg-white/5"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#C6A15B]">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                  <p className="mt-4 font-display text-base leading-relaxed text-[#23382D] dark:text-white/90">
                    &ldquo;{item.text}&rdquo;
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-3 border-t border-[#E2E8E3] pt-4 dark:border-white/10">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#7E9E2C] font-display text-sm font-bold text-white shadow-sm">
                    {item.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-[#0E231B] dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-xs text-[#4A5B53] dark:text-white/60">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CLEAN, BRIGHT B2B CALL-TO-ACTION (NO DUPLICATE CONTACT SERVICES!) */}
      {/* As instructed: zero repetitive address/phone/email boxes that duplicated the Footer directly underneath */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EEF5E8] via-[#FAF8F5] to-[#E5EFE2] py-[70px] lg:py-[90px] border-t border-[#E2E8E3] dark:bg-[#0C1512] dark:border-white/10">
        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#7E9E2C]/30 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#2D6A35] shadow-sm dark:bg-white/10 dark:text-[#C6A15B]">
              <img
                src="/images/logo-leaves.png"
                alt=""
                className="h-4 w-auto max-h-4 object-contain inline-block shrink-0"
              />
              {isAr ? 'بدء شراكة توريد وتصدير' : 'Wholesale Sourcing Partnership'}
            </span>

            <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-[#0E231B] sm:text-3xl lg:text-4xl dark:text-white">
              {page.ctaTitle}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#2C3F34] dark:text-white/80">
              {page.ctaDescription}
            </p>

            {/* High-Impact Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-base font-bold shadow-lg"
              >
                <span>{page.ctaPrimary}</span>
                <FiArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>

              <Link
                href="/catalog"
                className="btn-white inline-flex items-center gap-2 px-8 py-3.5 text-base font-bold"
              >
                <FiFileText className="h-4 w-4 text-[#7E9E2C]" />
                <span>{isAr ? 'تحميل الكتالوج (PDF)' : 'Download Catalog (PDF)'}</span>
              </Link>
            </div>

            {/* Clean Bright Assurance Badges */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-start">
              <div className="flex items-center gap-3 rounded-xl border border-[#E2E8E3] bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#FAF3E3] text-[#8C6D2D]">
                  <FiClock className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-xs font-bold uppercase tracking-wider text-[#0E231B] dark:text-white">
                    {isAr ? 'استجابة سريعة' : 'Rapid Response'}
                  </p>
                  <p className="text-xs text-[#4A5B53] dark:text-white/60">
                    {isAr ? 'عروض أسعار رسمية خلال 24 ساعة' : 'Official proforma within 24h'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-[#E2E8E3] bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#FAF3E3] text-[#8C6D2D]">
                  <FiShield className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-xs font-bold uppercase tracking-wider text-[#0E231B] dark:text-white">
                    {isAr ? 'شهادات فحص كاملة' : 'Certified Compliance'}
                  </p>
                  <p className="text-xs text-[#4A5B53] dark:text-white/60">
                    {isAr ? 'COA، صحة نباتية وتبخير' : 'COA, Phytosanitary & Fumigation'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-[#E2E8E3] bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#FAF3E3] text-[#8C6D2D]">
                  <FiGlobe className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-xs font-bold uppercase tracking-wider text-[#0E231B] dark:text-white">
                    {isAr ? 'شحن لـ 50+ ميناء' : '50+ Global Ports'}
                  </p>
                  <p className="text-xs text-[#4A5B53] dark:text-white/60">
                    {isAr ? 'حاويات FCL و LCL بحرياً وجوياً' : 'FCL & LCL Sea/Air Freight'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
