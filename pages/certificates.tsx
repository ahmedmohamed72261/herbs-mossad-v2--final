import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import PageBanner from '@/components/PageBanner';
import { StaggerGrid, StaggerItem, motion, AnimatePresence, FadeIn } from '@/components/Motion';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import { getAssetUrl } from '@/lib/api';
import { FiAward, FiRefreshCw, FiX, FiExternalLink, FiCalendar, FiCheckCircle, FiShield, FiArrowRight } from 'react-icons/fi';
import { useApi, Certificate } from '@/hooks/useApi';

const Certificates = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const page = t.certificatesPage;
  const [selected, setSelected] = useState<Certificate | null>(null);

  const { certificates, loading: apiLoading, errors, fetchCertificates } = useApi();
  const loading = apiLoading.certificates;
  const error = errors.certificates;

  useEffect(() => {
    if (certificates.length === 0) {
      fetchCertificates();
    }
  }, [certificates.length]);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    try {
      return new Date(dateStr).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    } catch { return dateStr; }
  };

  return (
    <Layout title={t.certificates.title}>
      <PageBanner
        title={t.certificates.title}
        subtitle={t.certificates.subtitle}
        breadcrumb={[{ label: t.certificates.title }]}
      />

      {/* Certificates Grid */}
      <section className="section-shell bg-white">
        <div className="container">
          {loading ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {[1, 2].map((i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-block h-64 rounded-none" />
                  <div className="space-y-4 p-8">
                    <div className="skeleton-line h-7 w-2/3" />
                    <div className="skeleton-line h-4 w-1/3" />
                    <div className="skeleton-line h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="glass-panel mx-auto max-w-lg p-12 text-center">
              <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-[#A5C232]/10 text-[#A5C232]">
                <FiAward className="h-7 w-7" />
              </div>
              <p className="mb-2 font-display text-xl font-bold text-[#0D1615] dark:text-white">{t.common.error}</p>
              <p className="mb-8 leading-relaxed text-[#5E5E5E] dark:text-white/60">
                {language === 'en' ? 'Unable to load certificates. Please try again.' : 'تعذر تحميل الشهادات. يرجى المحاولة مرة أخرى.'}
              </p>
              <button onClick={fetchCertificates} className="btn-primary">
                <FiRefreshCw className="h-4 w-4" />
                {language === 'en' ? 'Retry' : 'إعادة المحاولة'}
              </button>
            </div>
          ) : certificates.length === 0 ? (
            <div className="glass-panel mx-auto max-w-lg p-12 text-center">
              <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-[#0D1615]/5 text-[#5E5E5E] dark:bg-white/10 dark:text-white/60">
                <FiAward className="h-7 w-7" />
              </div>
              <p className="font-display text-xl font-bold text-[#0D1615] dark:text-white">{t.common.noData}</p>
            </div>
          ) : (
            <StaggerGrid className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {certificates.map((cert) => (
                <StaggerItem key={cert.id} className="h-full">
                  <button
                    onClick={() => setSelected(cert)}
                    className="group block h-full w-full text-left"
                  >
                    <article className="card-organic">
                      <div className="img-frame relative h-64 rounded-none">
                        {cert.image ? (
                          <img
                            src={getAssetUrl(cert.image)}
                            alt={language === 'en' ? cert.title_en : cert.title_ar}
                          />
                        ) : (
                          <div className="grid h-full w-full place-items-center bg-[#F8F8F8]">
                            <div className="text-center">
                              <FiAward className="mx-auto mb-2 h-20 w-20 text-[#A5C232]/60" />
                              <span className="text-sm font-bold uppercase tracking-wider text-[#0D1615]/40 dark:text-white/40">
                                {language === 'en' ? cert.title_en : cert.title_ar}
                              </span>
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-[#0D1615]/0 transition-colors duration-500 group-hover:bg-[#0D1615]/30">
                          <span className="inline-flex translate-y-4 items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 text-sm font-bold text-[#0D1615] opacity-0 shadow-xl transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                            <FiExternalLink className="h-4 w-4" />
                            {language === 'en' ? 'View Certificate' : 'عرض الشهادة'}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-8">
                        <div className="mb-4 flex items-start justify-between gap-4">
                          <h3 className="font-display text-[22px] font-bold text-[#0D1615] dark:text-white">
                            {language === 'en' ? cert.title_en : cert.title_ar}
                          </h3>
                          <FiAward className="h-7 w-7 shrink-0 text-[#A5C232]" />
                        </div>
                        {cert.issuer && (
                          <span className="tag-chip mb-4 self-start">
                            <FiAward className="h-3.5 w-3.5" />
                            {cert.issuer}
                          </span>
                        )}
                        <p className="section-lead mt-1 line-clamp-2">
                          {language === 'en' ? cert.description_en : cert.description_ar}
                        </p>
                      </div>
                    </article>
                  </button>
                </StaggerItem>
              ))}
            </StaggerGrid>
          )}
        </div>
      </section>

      {/* Processing Journey (Transferred from Home) */}
      <section className="section-lime py-[70px] lg:py-[100px]">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="img-frame h-[380px] rounded-2xl lg:h-[480px] shadow-2xl border border-white/20">
              <img src="/images/lab.jpg" alt={page.journeyTitle || 'Processing Journey'} />
            </div>

            <div>
              <span className="eyebrow text-white">
                <img src="/images/logo-leaves.png" alt="" className="h-5 w-auto max-h-5 object-contain inline-block brightness-0 invert" />
                {page.journeyBadge || (language === 'ar' ? 'رحلة المعالجة والرقابة' : 'The Processing Journey')}
              </span>
              <h2 className="section-title text-white mt-2">
                {page.journeyTitle || (language === 'ar' ? 'من الحصاد الحقلي إلى حاوية التصدير' : 'From Farm Harvest to Export Container')}
              </h2>
              <p className="section-lead text-white/90 mt-4">
                {page.journeyDesc || (language === 'ar'
                  ? 'تضمن منشآت المعالجة في بني سويف بمصر احتفاظ كل محصول بزيوتها الطبيعية ونقائها الفائق بما يطابق ويتجاوز متطلبات الاستيراد العالمية.'
                  : 'Our processing facilities in Beni Suef, Egypt ensure that every botanical batch retains its active essential oils and natural aroma while exceeding international import requirements.')}
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    step: '01',
                    title: language === 'ar' ? 'الزراعة والتوريد المستدام' : 'Cultivation & Sustainable Sourcing',
                    desc: language === 'ar' ? 'شراكات مع مزارعين معتمدين لحصاد المحاصيل في ذروة نضجها وزيوتها الطبيعية.' : 'Partnering with certified growers to harvest botanicals at peak essential oil maturity.',
                  },
                  {
                    step: '02',
                    title: language === 'ar' ? 'التنظيف والفرز الضوئي بالليزر (Sortex)' : 'Advanced Cleaning & Optical Sortex Sorting',
                    desc: language === 'ar' ? 'غربلة آلية ونزع الأتربة وفرز ليزري ضوئي للوصول لنقاء 99%+ وخلو تام من الشوائب.' : 'High-capacity Sortex laser grading ensuring 99%+ purity and removal of all foreign matter.',
                  },
                  {
                    step: '03',
                    title: language === 'ar' ? 'الفحص المعملي والتحليل COA' : 'Comprehensive Lab Analysis & COA',
                    desc: language === 'ar' ? 'اختبار دقيق لمتبقيات المبيدات، الفحوصات الميكروبيولوجية ونسب الرطوبة لكل تشغيلة.' : 'Rigorous batch screening for pesticide residues, microbiology, moisture, and active components.',
                  },
                  {
                    step: '04',
                    title: language === 'ar' ? 'التعبئة البحرية والتحميل بالحاويات' : 'Export Preparation & Seaworthy Packing',
                    desc: language === 'ar' ? 'تعبئة مخصصة في أكياس كرافت أو بولي بروبلين أو بالات مع استخراج شهادات الصحة النباتية.' : 'Custom kraft, PP bags, or cartons with complete phytosanitary and fumigation certificates.',
                  },
                ].map((item) => (
                  <div key={item.step} className="rounded-xl border border-white/20 bg-white/15 p-4 backdrop-blur-sm transition hover:bg-white/25">
                    <div className="flex items-start gap-4">
                      <span className="font-display text-base font-bold text-white">
                        {item.step}
                      </span>
                      <div>
                        <h3 className="font-display text-base font-bold text-white">{item.title}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-white/85">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Verification & Lab Analysis Assurance */}
      <section className="section-shell section-dim border-t border-[#E2E2E2]/70 dark:border-white/10">
        <div className="container">
          <FadeIn className="mx-auto max-w-4xl text-center">
            <span className="eyebrow justify-center">
              <img src="/images/logo-leaves.png" alt="" className="h-4 w-auto max-h-4 object-contain shrink-0 inline-block" />
              {language === 'en' ? 'Quality Guarantee' : 'ضمان الجودة'}
            </span>
            <h2 className="section-title">
              {language === 'en' ? 'Every Batch Tested & Verified' : 'فحص وتوثيق كل شحنة بدقة'}
            </h2>
            <p className="section-lead mx-auto mt-4 max-w-2xl">
              {language === 'en'
                ? 'All Herbiva botanical exports are backed by comprehensive Certificate of Analysis (COA), microbiological testing, pesticide residue screening, and full batch traceability.'
                : 'جميع صادرات هيربيفا مدعومة بشهادات تحليل شاملة وفحوصات ميكروبيولوجية وتحليل متبقيات المبيدات وتتبع كامل للدفعات.'}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 text-start">
              {[
                { titleEn: 'ISO 22000', titleAr: 'ISO 22000', descEn: 'Food Safety Management', descAr: 'إدارة سلامة الغذاء' },
                { titleEn: 'HACCP', titleAr: 'HACCP', descEn: 'Hazard Analysis Critical Control', descAr: 'نقاط التحكم الحرجة' },
                { titleEn: 'EU Compliant', titleAr: 'معتمد أوروبياً', descEn: 'Meets European Standards', descAr: 'مطابق للمعايير الأوروبية' },
                { titleEn: 'Full Traceability', titleAr: 'تتبع شامل', descEn: 'From Farm to Container', descAr: 'من الحقل إلى الحاوية' },
              ].map((item, idx) => (
                <div key={idx} className="rounded-[16px] border border-[#E2E2E2]/70 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
                  <FiCheckCircle className="h-6 w-6 text-[#A5C232] mb-3" />
                  <h3 className="font-display text-base font-bold text-[#0D1615] dark:text-white">
                    {language === 'en' ? item.titleEn : item.titleAr}
                  </h3>
                  <p className="mt-1 text-xs text-[#5E5E5E] dark:text-white/60">
                    {language === 'en' ? item.descEn : item.descAr}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                {language === 'en' ? 'Request Certificate of Analysis (COA)' : 'طلب شهادة تحليل (COA)'} <FiArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
              <Link href="/catalog" className="btn-white">
                {t.nav.catalog}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Certificate Preview Dialog */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel relative max-h-[90vh] w-full max-w-4xl overflow-y-auto shadow-[10px_25px_45px_rgba(0,0,0,0.25)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute ltr:right-5 rtl:left-5 top-5 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/80 text-[#0D1615] shadow-lg backdrop-blur-md transition-all hover:bg-white"
                aria-label={language === 'en' ? 'Close' : 'إغلاق'}
              >
                <FiX className="h-5 w-5" />
              </button>

              <div className="grid md:grid-cols-[1fr_1.2fr]">
                {/* Image Side */}
                <div className="relative min-h-[280px] overflow-hidden bg-[#F8F8F8] md:min-h-full">
                  {selected.image ? (
                    <img
                      src={getAssetUrl(selected.image)}
                      alt={language === 'en' ? selected.title_en : selected.title_ar}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center bg-[#F8F8F8]">
                      <FiAward className="h-24 w-24 text-[#A5C232]/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1615]/40 via-transparent to-transparent md:bg-gradient-to-r md:from-[#0D1615]/30 md:via-transparent md:to-transparent" />
                </div>

                {/* Content Side */}
                <div className="flex flex-col p-8 md:p-10">
                  <div className="flex-1">
                    <h2 className="mb-4 font-display text-3xl font-bold leading-tight text-[#0D1615] dark:text-white md:text-4xl">
                      {language === 'en' ? selected.title_en : selected.title_ar}
                    </h2>

                    <div className="mb-6 flex flex-wrap gap-3">
                      {selected.issuer && (
                        <span className="tag-chip">
                          <FiAward className="h-3.5 w-3.5" />
                          {selected.issuer}
                        </span>
                      )}
                      {selected.issued_date && (
                        <span className="inline-flex items-center gap-1.5 rounded-[4px] bg-[#0D1615]/5 px-3 py-1.5 text-xs font-bold text-[#5E5E5E] dark:bg-white/10 dark:text-white/70">
                          <FiCalendar className="h-3.5 w-3.5" />
                          {formatDate(selected.issued_date)}
                        </span>
                      )}
                    </div>

                    <div className="prose max-w-none">
                      <p className="section-lead text-base md:text-lg">
                        {language === 'en' ? selected.description_en : selected.description_ar}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-[#E2E2E2]/70 pt-6 dark:border-white/10">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#5E5E5E] dark:text-white/60">
                      {language === 'en' ? 'Quality Certified' : 'شهادة جودة'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A5C232]">
                      <FiAward className="h-4 w-4" />
                      HERBIVA
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Certificates;
