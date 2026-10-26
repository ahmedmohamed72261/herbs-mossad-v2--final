import Navbar from './Navbar';
import Footer from './Footer';
import Head from 'next/head';
import { PageTransition } from './Motion';
import FloatingWhatsApp from './FloatingWhatsApp';
import GoToTop from './GoToTop';
import { useAppStore } from '@/store';
// import ChatAgent from './ChatAgent';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

const Layout = ({ children, title, description, keywords }: LayoutProps) => {
  const { language } = useAppStore();
  const isEn = language === 'en';

  const defaultTitle = isEn
    ? 'Herbiva — Leading Herbs Suppliers, Coriander & Fennel Exporters in Egypt'
    : 'هيربيفا — مورد ومصدر الأعشاب والتوابل والكزبرة والشمر في مصر';

  const defaultDescription = isEn
    ? 'Herbiva is a certified Egyptian grower & exporter of premium dried herbs, spices, and seeds. Reliable bulk supplier of Egyptian Chamomile, Coriander, Fennel, Basil & Hibiscus to 50+ countries. ISO 22000 & HACCP certified.'
    : 'هيربيفا شركة مصرية رائدة في زراعة وتجهيز وتصدير الأعشاب الطبية والعطرية والتوابل والبذور. مصدر رئيسي للبابونج والكزبرة والشمر والريحان والكركديه لأكثر من 50 دولة حول العالم بمعايير ISO 22000 و HACCP.';

  const defaultKeywords =
    'herbs suppliers in Egypt, coriander exporters in Egypt, fennel exporters in Egypt, Egyptian chamomile suppliers, dried herbs Egypt, coriander seeds Egypt, fennel seeds Egypt, basil exporters Egypt, hibiscus flowers exporter, cumin seeds Egypt, anise seeds exporter, Egyptian agricultural exporter, bulk botanicals Egypt, private label herbs Egypt, HACCP certified herbs Egypt';

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Herbiva',
    legalName: 'Herbiva for Agricultural Crops & Export',
    url: 'https://herbiva.com',
    logo: 'https://herbiva.com/images/logo-circle.png',
    description: defaultDescription,
    telephone: '+201107762512',
    email: 'export@herbiva.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kafr Bani Ali, Samasta',
      addressLocality: 'Beni Suef',
      addressRegion: 'Nile Valley',
      addressCountry: 'EG',
    },
    areaServed: 'Worldwide',
    knowsAbout: [
      'Herbs Suppliers in Egypt',
      'Coriander Exporters in Egypt',
      'Fennel Exporters in Egypt',
      'Egyptian Chamomile Export',
      'Dried Herbs and Spices Bulk Export',
    ],
  };

  return (
    <>
      <Head>
        <title>{title ? `${title} | Herbiva` : defaultTitle}</title>
        <meta name="description" content={description || defaultDescription} />
        <meta name="keywords" content={keywords || defaultKeywords} />
        <meta name="author" content="Herbiva" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Official Circular Logo Favicons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logo-circle.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logo-circle.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo-circle.png" />
        <link rel="shortcut icon" href="/images/logo-circle.png" />

        {/* OpenGraph & Social Cards (WhatsApp, Facebook, LinkedIn, Telegram) */}
        <meta property="og:title" content={title ? `${title} | Herbiva` : defaultTitle} />
        <meta property="og:description" content={description || defaultDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Herbiva" />
        <meta property="og:url" content="https://herbs-mossad-v2.vercel.app" />
        <meta property="og:image" content="https://herbs-mossad-v2.vercel.app/images/logo-circle.png" />
        <meta property="og:image:secure_url" content="https://herbs-mossad-v2.vercel.app/images/logo-circle.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:alt" content="Herbiva - Premium Egyptian Botanicals" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title ? `${title} | Herbiva` : defaultTitle} />
        <meta name="twitter:description" content={description || defaultDescription} />
        <meta name="twitter:image" content="https://herbs-mossad-v2.vercel.app/images/logo-circle.png" />

        {/* Structured SEO Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <div
        dir={language === 'ar' ? 'rtl' : 'ltr'}
        lang={language}
        className="flex min-h-screen flex-col bg-white font-sans text-[#272320] dark:bg-[#0A0F0E] dark:text-white/85"
      >
        <Navbar />
        <main className="flex-grow">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <FloatingWhatsApp />
        <GoToTop />
        {/* <ChatAgent /> */}
      </div>
    </>
  );
};

export default Layout;
