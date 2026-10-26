import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anybody:wght@400;500;600;700;800;900&family=Cairo:wght@400;500;600;700;800;900&family=Tajawal:wght@400;500;700;800&family=Manrope:wght@300;400;500;600;700;800&family=Kanit:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logo-circle.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logo-circle.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo-circle.png" />
        <link rel="shortcut icon" href="/images/logo-circle.png" />
      </Head>
      <body className="font-sans bg-white dark:bg-[#0A0F0E] text-[#272320] dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
