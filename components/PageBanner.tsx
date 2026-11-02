import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';
import { useAppStore } from '@/store';

interface PageBannerProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
}

const PageBanner = ({ title, subtitle, breadcrumb = [] }: PageBannerProps) => {
  const { language } = useAppStore();

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#F0F5ED] via-[#FAF8F5] to-[#E8F1E5] py-12 md:py-16 text-center border-b border-[#E2E8E3] dark:from-[#09120F] dark:via-[#0D1A15] dark:to-[#070E0B] dark:border-white/10">
      <div className="container relative z-10">
        <nav className="mb-3 flex flex-wrap items-center justify-center gap-2 text-[13px] font-semibold text-[#485D51] dark:text-white/60">
          <Link href="/" className="transition hover:text-[#2D6A35] dark:hover:text-[#C6A15B]">
            {language === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
          {breadcrumb.map((crumb) => (
            <span key={crumb.label} className="inline-flex items-center gap-2">
              <FiChevronRight className="h-3.5 w-3.5 text-[#7E9E2C] rtl:rotate-180" />
              {crumb.href ? (
                <Link href={crumb.href} className="transition hover:text-[#2D6A35] dark:hover:text-[#C6A15B]">
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-bold text-[#8C6D2D] dark:text-[#C6A15B]">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <h1 className="font-display text-[28px] font-bold capitalize leading-tight text-[#0E231B] md:text-[42px] dark:text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-[#3B4E44] md:text-base dark:text-white/70">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageBanner;
