import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import Layout from '@/components/Layout';
import PageBanner from '@/components/PageBanner';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import {
  FiChevronDown,
  FiChevronUp,
  FiHelpCircle,
  FiSearch,
  FiArrowRight,
  FiMail,
  FiPhone,
  FiSend,
  FiShield,
  FiPackage,
  FiTruck,
} from 'react-icons/fi';

const FaqPage = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const page = t.faqPage;
  const isAr = language === 'ar';

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Comprehensive FAQ list combining the home FAQs + expanded B2B export questions
  const allFaqs = useMemo(() => {
    const baseFaqs = t.homePage.faqs || [];
    const additionalFaqs = [
      {
        question: isAr ? 'ما هي شروط الشحن والتسليم المتاحة (Incoterms)؟' : 'What shipping terms (Incoterms) do you support?',
        answer: isAr
          ? 'ندعم كافة شروط التجارة الدولية المعتمدة مثل FOB (ميناء الإسكندرية / دمياط / بورسعيد)، CIF (شامل الشحن والتأمين لميناء وصولك)، و CFR. نقوم بالتنسيق مع كبرى خطوط الملاحة لضمان أفضل أسعار نولون وأسرع أوقات عبور.'
          : 'We support all standard international Incoterms including FOB (Alexandria, Damietta, or Port Said), CIF (including freight and marine insurance to your destination port), and CFR. We work with leading shipping lines to secure optimal freight rates and transit times.',
      },
      {
        question: isAr ? 'ما هي المستندات الرسمية المرفقة مع كل حاوية تصدير؟' : 'What official documentation is provided with each export shipment?',
        answer: isAr
          ? 'نوفر طقماً مستندياً كاملاً يشمل: الفاتورة التجارية الموثقة، بيان التعبئة (Packing List)، بوليصة الشحن البحرية الأصلية (Bill of Lading)، شهادة الصحة النباتية الرسمية (Phytosanitary Certificate)، شهادة المنشأ الرسمية (Certificate of Origin)، شهادة التحليل المعملي (COA)، وشهادة التبخير (Fumigation Certificate).'
          : 'Every commercial container is accompanied by a full document package: Certified Commercial Invoice, Detailed Packing List, Original Ocean Bill of Lading (B/L), Official Phytosanitary Certificate from the Egyptian Ministry of Agriculture, Certificate of Origin, Batch Certificate of Analysis (COA), and Fumigation Certificate.',
      },
      {
        question: isAr ? 'كيف يتم التعامل مع فحص متبقيات المبيدات والميكروبيولوجي؟' : 'How do you handle pesticide residue screening and microbiological testing?',
        answer: isAr
          ? 'تخضع كل شحنة لفحوصات معملية دقيقة في معامل معتمدة دولياً (ISO 17025) وفقاً للحدود القصوى لمتبقيات المبيدات (MRL) المعتمدة في الاتحاد الأوروبي (EU) وهيئة الغذاء والدواء الأمريكية (FDA). نرسل نتائج التحاليل للعميل قبل شحن الحاوية للموافقة عليها.'
          : 'Every export batch is tested in accredited international laboratories (ISO 17025) adhering to the strict Maximum Residue Limits (MRL) required by the European Union and the US FDA. Laboratory analysis reports are shared with the buyer prior to container departure for pre-approval.',
      },
      {
        question: isAr ? 'ما هي طرق وخيارات الدفع المقبولة للطلبات التجارية؟' : 'What are the accepted payment methods for commercial orders?',
        answer: isAr
          ? 'نقبل التحويلات البنكية المباشرة (T/T) بشروط دفع مرنة للعملاء المنتظمين، وكذلك خطابات الاعتماد المستندية غير القابلة للإلغاء والمؤكدة (Irrevocable Confirmed L/C at sight) لتوفير أقصى درجات الأمان المالي للطرفين.'
          : 'We accept telegraphic bank transfers (T/T) with structured advance/balance milestones, as well as Irrevocable Confirmed Letters of Credit at sight (L/C) to ensure financial security and transparency for both parties.',
      },
      {
        question: isAr ? 'هل تتيحون زيارة مزارعكم ومنشأة الفرز في بني سويف؟' : 'Can prospective buyers visit your processing facilities and farms in Egypt?',
        answer: isAr
          ? 'نرحب دائماً بزيارة عملائنا وشركائنا التجاريين لمنشآتنا في بني سويف لمتابعة مراحل الزراعة والفرز بالليزر والمعالجة والتعبئة مباشرة والاطلاع على معايير الجودة المطبقة.'
          : 'We warmly welcome international buyers, procurement managers, and audit teams to visit our processing facilities and partner farms in Beni Suef, Egypt to inspect our sorting lines, storage warehouses, and quality management systems firsthand.',
      },
    ];

    return [...baseFaqs, ...additionalFaqs];
  }, [t.homePage.faqs, isAr]);

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return allFaqs;
    const q = searchQuery.toLowerCase();
    return allFaqs.filter(
      (item) =>
        item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
    );
  }, [allFaqs, searchQuery]);

  return (
    <Layout title={page.title} description={page.subtitle}>
      <PageBanner
        title={page.title}
        subtitle={page.subtitle}
        breadcrumb={[{ label: t.nav.faq }]}
      />

      <section className="section-shell bg-white dark:bg-[#0B100E]">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            {/* Search Bar */}
            <div className="relative mb-10">
              <FiSearch className="absolute top-1/2 -translate-y-1/2 h-5 w-5 text-[#5E5E5E] ltr:left-4 rtl:right-4 dark:text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={page.searchPlaceholder || (isAr ? 'ابحث في الأسئلة الشائعة...' : 'Search questions...')}
                className="w-full rounded-2xl border border-[#E2E2E2] bg-[#FAF8F5] py-4 text-base transition focus:border-[#A5C232] focus:bg-white focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white ltr:pl-12 ltr:pr-4 rtl:pr-12 rtl:pl-4"
              />
            </div>

            {/* Quick Categories Bar */}
            <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-xl border border-[#E2E2E2]/70 bg-[#FAF8F5] p-4 dark:border-white/10 dark:bg-white/5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#A5C232]/15 text-[#A5C232]">
                  <FiPackage className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-[#0D1615] dark:text-white">
                    {isAr ? 'الكميات والتعبئة' : 'MOQ & Packaging'}
                  </p>
                  <p className="text-xs text-[#5E5E5E] dark:text-white/60">
                    {isAr ? 'من 500 كجم لحاويات كاملة' : 'From 500kg to FCL'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-[#E2E2E2]/70 bg-[#FAF8F5] p-4 dark:border-white/10 dark:bg-white/5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#A5C232]/15 text-[#A5C232]">
                  <FiShield className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-[#0D1615] dark:text-white">
                    {isAr ? 'الجودة والفحص COA' : 'Quality & COA'}
                  </p>
                  <p className="text-xs text-[#5E5E5E] dark:text-white/60">
                    {isAr ? 'معايير ISO 22000 و EU' : 'ISO 22000 & EU Specs'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-[#E2E2E2]/70 bg-[#FAF8F5] p-4 dark:border-white/10 dark:bg-white/5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#A5C232]/15 text-[#A5C232]">
                  <FiTruck className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-[#0D1615] dark:text-white">
                    {isAr ? 'الشحن والتسليم' : 'Shipping & Terms'}
                  </p>
                  <p className="text-xs text-[#5E5E5E] dark:text-white/60">
                    {isAr ? 'FOB, CIF, CFR عالمياً' : 'FOB, CIF, CFR Worldwide'}
                  </p>
                </div>
              </div>
            </div>

            {/* Questions Accordion */}
            <div className="space-y-4">
              {filteredFaqs.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#E2E2E2] p-8 text-center text-[#5E5E5E] dark:border-white/10 dark:text-white/60">
                  {isAr ? 'لم يتم العثور على نتائج مطابقة لبحثك.' : 'No matching questions found.'}
                </div>
              ) : (
                filteredFaqs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <div
                      key={faq.question}
                      className={`overflow-hidden rounded-2xl border transition ${
                        isOpen
                          ? 'border-[#A5C232] bg-[#FAF8F5] shadow-sm dark:bg-[#121B17]'
                          : 'border-[#E2E2E2] bg-white hover:border-[#A5C232]/50 dark:border-white/10 dark:bg-white/5'
                      }`}
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="flex w-full items-center justify-between gap-4 p-5 text-start font-display text-base font-bold text-[#0D1615] dark:text-white sm:text-lg"
                        aria-expanded={isOpen}
                      >
                        <span className="flex items-center gap-3">
                          <FiHelpCircle className={`h-5 w-5 shrink-0 ${isOpen ? 'text-[#A5C232]' : 'text-[#8E9B93]'}`} />
                          <span>{faq.question}</span>
                        </span>
                        <span className="shrink-0 text-[#8E9B93]">
                          {isOpen ? <FiChevronUp className="h-5 w-5 text-[#A5C232]" /> : <FiChevronDown className="h-5 w-5" />}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-[#EAE6DF] px-6 pb-6 pt-4 text-sm leading-relaxed text-[#1C2C23] dark:border-white/10 dark:text-white/85 sm:text-base font-normal">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              )}
            </div>

            {/* Direct Contact Assistance Card */}
            <div className="mt-14 rounded-2xl bg-gradient-to-br from-[#0F241A] via-[#153426] to-[#0A1811] border border-[#A5C232]/30 p-8 text-white shadow-2xl">
              <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-start">
                <div>
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D1F349]">
                    <img src="/images/logo-leaves.png" alt="" className="h-4 w-auto max-h-4 object-contain shrink-0 inline-block brightness-0 invert" />
                    {isAr ? 'فريق المبيعات والتصدير' : 'B2B Trade Desk'}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-bold sm:text-2xl text-white">
                    {page.contactTitle}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm text-white/90">
                    {page.contactDesc}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-3">
                  <Link href="/contact" className="btn-primary inline-flex items-center gap-2 px-6 py-3 font-bold shadow-md">
                    <span>{page.contactBtn}</span>
                    <FiArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Link>
                  <a
                    href="https://wa.me/201107762512"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-white inline-flex items-center gap-2 px-6 py-3 font-bold"
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FaqPage;
