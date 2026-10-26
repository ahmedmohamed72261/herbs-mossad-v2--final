import Link from 'next/link';
import Layout from '@/components/Layout';
import PageBanner from '@/components/PageBanner';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import {
  FiArrowRight,
  FiCheckCircle,
  FiGlobe,
  FiPackage,
  FiAward,
  FiShield,
  FiTrendingUp,
  FiEye,
  FiTarget,
  FiHeart,
} from 'react-icons/fi';

const About = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const page = t.aboutPage;
  const isAr = language === 'ar';

  const vision = page.strategicVision;

  const values = [
    { icon: FiTarget, title: t.about.mission, description: page.missionDescription },
    { icon: FiEye, title: t.about.vision, description: page.visionDescription },
    { icon: FiHeart, title: page.valuesTitle, description: page.valuesDescription },
  ];

  const whyUsFeatures = [
    {
      icon: FiShield,
      title: isAr ? 'سلسلة توريد متكاملة رأسياً' : 'Vertically Integrated Supply',
      description: isAr
        ? 'من الزراعة والحصاد إلى المعالجة والتصدير، نحافظ على رقابة صارمة على كامل سلسلة التوريد الزراعية.'
        : 'From cultivation and harvesting to processing and export, we maintain strict control over our entire agricultural supply chain.',
      image: '/images/why-us-farm.jpg',
    },
    {
      icon: FiTrendingUp,
      title: isAr ? 'معالجة جاهزة للتصدير' : 'Export-Ready Processing',
      description: isAr
        ? 'مرافق متقدمة للتنظيف والفرز بالليزر والتجفيف لضمان تلبية متطلبات سلامة الأغذية الدولية الصارمة.'
        : 'Advanced cleaning, sorting, and drying facilities ensuring our bulk botanicals meet rigorous international food safety requirements.',
      image: '/images/why-us-processing.jpg',
    },
    {
      icon: FiAward,
      title: isAr ? 'مراقبة جودة معتمدة' : 'Certified Quality Control',
      description: isAr
        ? 'يتم اختبار واعتماد كل شحنة بدقة، مما يوفر إمكانية التتبع الكامل والامتثال لمعايير السوق العالمية.'
        : 'Every shipment is rigorously tested and certified, offering full traceability and compliance with global market standards.',
      image: '/images/why-us-quality.jpg',
    },
  ];

  return (
    <Layout title={t.about.title} description={page.heroBadge}>
      <PageBanner
        title={t.about.title}
        subtitle={t.about.subtitle}
        breadcrumb={[{ label: t.nav.about }]}
      />

      {/* 1. STORY & COMPANY OVERVIEW */}
      <section className="section-shell bg-white dark:bg-[#0B100E]">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div className="img-frame h-[380px] rounded-2xl lg:h-[480px]">
            <img src="/images/about.jpg" alt={page.storyTitle} />
          </div>

          <div>
            <span className="eyebrow">
              <img src="/images/organic/sub-img.png" alt="" className="h-5 w-auto" />
              {page.storyBadge}
            </span>
            <h2 className="section-title mt-2">{page.storyTitle}</h2>
            <p className="section-lead mt-5">{page.storyDescriptionOne}</p>
            <p className="mt-4 text-base leading-relaxed text-[#55695D] dark:text-white/70">
              {page.storyDescriptionTwo}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary">
                <span>{isAr ? 'استكشف منتجاتنا' : 'Explore Products'}</span>
                <FiArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
              <Link href="/contact" className="btn-ghost">
                {t.nav.contact}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE & OUR VISION (Transferred from Home) */}
      <section className="section-shell border-y border-[#EAE6DF] bg-[#FAF8F5] dark:border-white/5 dark:bg-[#0F1613]">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow justify-center">
              <img src="/images/organic/sub-img.png" alt="" className="h-5 w-auto" />
              {vision?.title || (isAr ? 'من نحن ورؤيتنا' : 'Who We Are & Our Vision')}
            </span>
            <h2 className="section-title mt-2">
              {vision?.subtitle || (isAr ? 'ربط الثروة الزراعية المصرية بالأسواق الدولية' : 'Connecting Egypt’s Agricultural Wealth with Global Markets')}
            </h2>
            <p className="section-lead mt-4">{vision?.description}</p>
          </div>

          {/* Strategic Quote Card */}
          <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-[#A5C232]/30 bg-white p-7 text-center shadow-sm sm:p-9 dark:bg-[#121B17]">
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#A5C232]">
              {t.brand.visionTitle}
            </span>
            <p className="font-display text-lg font-medium italic leading-relaxed text-[#1D2B24] sm:text-xl dark:text-white/90">
              &ldquo;{vision?.quote || t.brand.vision}&rdquo;
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-[#65766A] dark:text-white/60">
              <FiCheckCircle className="h-4 w-4 text-[#A5C232]" />
              <span>{isAr ? 'Herbiva مصر • كبرى شركات توريد وتصدير الأعشاب الطبية والعطرية' : 'Herbiva Egypt • Premier Botanical Exporter'}</span>
            </div>
          </div>

          {/* 3 Pillars: Who We Are | What We Export | What Sets Us Apart */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* 1. Who We Are */}
            <div className="flex h-full flex-col justify-between rounded-2xl border border-[#E7E3DC] bg-white p-7 shadow-sm transition hover:border-[#A5C232] dark:border-white/10 dark:bg-[#121A17]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#A5C232]/15 text-[#A5C232]">
                    <FiGlobe className="h-6 w-6" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#A5C232]">
                    01 / {isAr ? 'الهوية' : 'Identity'}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-[#0D1615] dark:text-white">
                  {vision?.pillars?.[0]?.title || (isAr ? 'إحنا مين؟' : 'Who We Are')}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#55695D] dark:text-white/70">
                  {vision?.pillars?.[0]?.desc ||
                    (isAr
                      ? 'شركة مصرية متخصصة في تجهيز وتصدير الحاصلات الزراعية والنباتات العطرية والطبية من قلب بني سويف والفيوم. ندير الدورة الزراعية مباشرة من الحقل حتى التحميل في الحاويات بمعايير دولية صارمة.'
                      : 'A premier Egyptian agricultural export company operating from the heart of Egypt’s herbal belt (Beni Suef & Fayoum). Overseeing the agricultural cycle from field to container.')}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 border-t border-[#EFECE6] pt-4 text-xs font-semibold text-[#0D1615] dark:border-white/10 dark:text-white/80">
                <FiCheckCircle className="text-[#A5C232]" />
                <span>{isAr ? 'مصدر مصري أصيل وموثوق 100%' : '100% Traceable Nile Basin Origin'}</span>
              </div>
            </div>

            {/* 2. What We Export */}
            <div className="flex h-full flex-col justify-between rounded-2xl border border-[#E7E3DC] bg-white p-7 shadow-sm transition hover:border-[#A5C232] dark:border-white/10 dark:bg-[#121A17]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#A5C232]/15 text-[#A5C232]">
                    <FiPackage className="h-6 w-6" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#A5C232]">
                    02 / {isAr ? 'المنتجات' : 'Portfolio'}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-[#0D1615] dark:text-white">
                  {vision?.pillars?.[1]?.title || (isAr ? 'بنصدر إيه؟' : 'What We Export')}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#55695D] dark:text-white/70">
                  {vision?.pillars?.[1]?.desc ||
                    (isAr
                      ? 'أكبر مصدري بذور الكزبرة والشمر والأعشاب في مصر. نوفر كزبرة فرز ليزر، بذور شمر عالية الزيت، زهور ومجروش بابونج، أوراق ريحان، كركديه مجفف، بردقوش، نعناع، ينسون وكمون.'
                      : 'Leading coriander and fennel seed exporters in Egypt. Bulk portfolio includes Sortex coriander, fennel, chamomile, basil, hibiscus, marjoram, spearmint, anise, and cumin.')}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 border-t border-[#EFECE6] pt-4 text-xs font-semibold text-[#0D1615] dark:border-white/10 dark:text-white/80">
                <FiCheckCircle className="text-[#A5C232]" />
                <span>{isAr ? 'حاويات كاملة وجزئية FCL & LCL' : 'FCL & LCL Bulk Worldwide'}</span>
              </div>
            </div>

            {/* 3. What Sets Us Apart */}
            <div className="flex h-full flex-col justify-between rounded-2xl border border-[#E7E3DC] bg-white p-7 shadow-sm transition hover:border-[#A5C232] dark:border-white/10 dark:bg-[#121A17]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#A5C232]/15 text-[#A5C232]">
                    <FiAward className="h-6 w-6" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#A5C232]">
                    03 / {isAr ? 'الميزة التنافسية' : 'Advantage'}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-[#0D1615] dark:text-white">
                  {vision?.pillars?.[2]?.title || (isAr ? 'إيه اللي يميزنا؟' : 'What Sets Us Apart')}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#55695D] dark:text-white/70">
                  {vision?.pillars?.[2]?.desc ||
                    (isAr
                      ? 'نقاء فائق عبر الفرز الضوئي بالليزر Sortex، مطابقة نسب المبيدات للمواصفات الأوروبية والأمريكية، تعبئة بحرية مخصصة، واستخراج كامل شهادات الفحص الحجري وشهادات التحليل COA.'
                      : 'Optical Sortex laser grading for 99%+ purity, EU/USDA pesticide compliance, custom seaworthy packaging, and comprehensive phytosanitary, COA & origin documentation.')}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 border-t border-[#EFECE6] pt-4 text-xs font-semibold text-[#0D1615] dark:border-white/10 dark:text-white/80">
                <FiCheckCircle className="text-[#A5C232]" />
                <span>{isAr ? 'ضمان المواصفات وتخليص جمركي سلس' : 'Guaranteed Specs & Swift Customs'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY US & DISCOVER OUR EXPERTISE (Transferred from Home) */}
      <section className="section-shell bg-white dark:bg-[#0B100E]">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow justify-center">
              <img src="/images/organic/sub-img.png" alt="" className="h-5 w-auto" />
              {isAr ? 'لماذا نحن' : 'Why Us'}
            </span>
            <h2 className="section-title mt-2">{t.home.whyChooseUs}</h2>
            <p className="section-lead mt-3">{t.homePage.formulaDescription}</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {whyUsFeatures.map((feature, idx) => (
              <div
                key={feature.title}
                className="overflow-hidden rounded-2xl border border-[#E7E3DC] bg-[#FAF8F5] shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/5"
              >
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#A5C232]/15 text-[#A5C232]">
                      <feature.icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#A5C232]">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-[#0D1615] dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5E5E5E] dark:text-white/70">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MISSION / VISION / VALUES */}
      <section className="section-shell bg-[#F6F4EC] dark:bg-[#101714]">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">
              <img src="/images/organic/sub-img.png" alt="" className="h-5 w-auto" />
              {page.philosophyBadge}
            </span>
            <h2 className="section-title mt-2">{page.philosophyTitle}</h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((value) => (
              <article key={value.title} className="card-organic p-8">
                <span className="icon-badge mb-6">
                  <value.icon className="h-8 w-8" />
                </span>
                <h3 className="font-display text-xl font-bold text-[#0D1615] dark:text-white">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5E5E5E] dark:text-white/70">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STATS */}
      <section className="section-dark">
        <div className="container grid grid-cols-2 gap-8 py-14 lg:grid-cols-4">
          {page.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="stat-number text-white font-extrabold">{stat.number}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/90">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="section-lime py-16">
        <div className="container flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-start">
          <div>
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
              {isAr ? 'جاهز لبدء تعاون تجاري موثوق؟' : 'Ready to Establish a Reliable Sourcing Partnership?'}
            </h3>
            <p className="mt-2 max-w-xl text-sm text-white/85">
              {isAr
                ? 'فريق التصدير لدينا جاهز لإعداد عروض أسعار تنافسية (FOB/CIF) وعينات معملية فورية.'
                : 'Connect with our export desk for harvest purity reports, container configurations, and proforma invoices.'}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-4">
            <Link href="/contact" className="btn-dark px-8 py-3.5 font-bold shadow-md">
              <span>{isAr ? 'اطلب عرض سعر الآن' : 'Request Instant Quotation'}</span>
            </Link>
            <Link href="/catalog" className="btn-white px-8 py-3.5 font-bold">
              <span>{t.nav.catalog}</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
