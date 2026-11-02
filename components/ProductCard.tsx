import { FC } from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { getAssetUrl } from '@/lib/api';
import { useAppStore } from '@/store';

interface ProductCardProps {
  id: number | string;
  name: string;
  category: string;
  description: string;
  image: string | null;
  isFeatured?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  name,
  category,
  description,
  image,
  isFeatured = false,
}) => {
  const { language } = useAppStore();
  const isEn = language === 'en';
  const imageUrl = image ? getAssetUrl(image) : null;

  return (
    <article className="card-organic group">
      <div className="img-frame relative m-3 h-[220px] rounded-[16px] bg-[#EEF2EE]">
        {isFeatured && (
          <span className="tag-sale ltr:!left-4 rtl:!right-4 !top-4">
            {isEn ? 'Featured' : 'مميز'}
          </span>
        )}

        <Link href={`/products/${id}`} className="block h-full w-full">
          {imageUrl ? (
            <img src={imageUrl} alt={name} />
          ) : (
            <span className="grid h-full w-full place-items-center bg-[#FAF8F5] text-5xl">🌿</span>
          )}
        </Link>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-2">
        <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#2D6A35] dark:text-[#C6A15B]">
          {category}
        </span>
        <h3 className="mt-2 font-display text-[18px] font-bold capitalize leading-snug text-[#0F221B] dark:text-white">
          <Link href={`/products/${id}`} className="transition hover:text-[#2D6A35] dark:hover:text-[#C6A15B]">
            {name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-grow text-[14px] leading-relaxed text-[#3B4D44] dark:text-white/80">
          {description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#E2E8E3] pt-4 dark:border-white/10">
          <Link
            href="/contact"
            className="rounded-[10px] bg-[#7E9E2C] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.06em] text-white shadow-sm transition duration-300 hover:bg-[#205338] whitespace-nowrap"
          >
            {isEn ? 'Request Quote' : 'طلب عرض سعر'}
          </Link>
          <Link
            href={`/products/${id}`}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] border border-[#E2E8E3] text-[#0F221B] transition duration-300 hover:border-[#7E9E2C] hover:bg-[#FAF8F5] dark:border-white/15 dark:text-white dark:hover:bg-white/10"
            aria-label={isEn ? 'View details' : 'عرض التفاصيل'}
          >
            <FiArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
