import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '@/store';
import { FiCheckCircle } from 'react-icons/fi';

export default function GlobalPreloader() {
  const { language } = useAppStore();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user has already seen the preloader in this tab/session
    try {
      const hasLoaded = sessionStorage.getItem('herbiva_loaded_session');
      if (hasLoaded) {
        setLoading(false);
        return;
      }
    } catch {
      // Ignore storage restrictions
    }

    // Lock scroll during preloader
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    const duration = 1200; // 1.2s fast, responsive, luxury load

    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const raw = Math.min(elapsed / duration, 1);
      // Smooth cubic ease-out
      const eased = Math.round((1 - Math.pow(1 - raw, 3)) * 100);
      setProgress(eased);

      if (raw < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = '';
          try {
            sessionStorage.setItem('herbiva_loaded_session', 'true');
          } catch {
            // Ignore storage restrictions
          }
        }, 220);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    // Hard fallback timeout: guarantees preloader dismisses within 1.5s no matter what
    const fallbackTimeout = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = '';
    }, 1500);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(fallbackTimeout);
      document.body.style.overflow = '';
    };
  }, []);

  const getStatusText = () => {
    if (language === 'ar') {
      if (progress < 45) return 'انتقاء وتوثيق نقاء المحاصيل المصرية...';
      if (progress < 85) return 'مطابقة معايير التصدير الدولي والفرز...';
      return 'مرحباً بكم في هيربيفا العالمية';
    }
    if (language === 'de') {
      if (progress < 45) return 'Auswahl ägyptischer Heilkräuter...';
      if (progress < 85) return 'Zertifizierung nach EU-Standards...';
      return 'Willkommen bei Herbiva';
    }
    if (language === 'fr') {
      if (progress < 45) return 'Sélection des herbes égyptiennes...';
      if (progress < 85) return 'Vérification des normes export...';
      return 'Bienvenue chez Herbiva';
    }
    if (language === 'es') {
      if (progress < 45) return 'Seleccionando botánicos egipcios...';
      if (progress < 85) return 'Verificando estándares de exportación...';
      return 'Bienvenidos a Herbiva';
    }
    // English default
    if (progress < 45) return 'Sourcing Nile Valley Botanicals...';
    if (progress < 85) return 'Verifying Sortex Purity & Export Standards...';
    return 'Welcome to Herbiva Global';
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="herbiva-global-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.98,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#FAF8F5] to-[#EEF5EB] text-[#0E231B] selection:bg-[#7E9E2C] selection:text-white dark:from-[#09120F] dark:via-[#0D1615] dark:to-[#070D0B] dark:text-white"
          role="status"
          aria-live="polite"
          aria-label="Loading Herbiva"
        >
          {/* Ambient Lighting Orbs */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-[#7E9E2C]/15 blur-[120px] dark:bg-[#A5C232]/15" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-[#C6A15B]/15 blur-[130px]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(126,158,44,0.06)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(198,161,91,0.06)_0%,transparent_70%)]" />

          {/* Luxury background texture grid */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#0E231B_1px,transparent_1px),linear-gradient(to_bottom,#0E231B_1px,transparent_1px)] dark:opacity-[0.04] dark:bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            {/* Center Emblem with Pulsing Golden Ring */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-6"
            >
              {/* Soft ambient halo */}
              <div className="absolute -inset-2.5 rounded-full bg-gradient-to-tr from-[#7E9E2C]/25 via-[#C6A15B]/30 to-[#7E9E2C]/20 blur-md animate-pulse" />

              <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full border border-[#C6A15B]/40 bg-white p-3.5 shadow-[0_15px_40px_rgba(14,34,27,0.12)] backdrop-blur-xl dark:border-[#C6A15B]/40 dark:bg-[#0A100F]/90 dark:shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
                <img
                  src="/images/logo-circle.png"
                  alt="Herbiva Logo"
                  className="h-full w-full object-contain filter drop-shadow-[0_4px_14px_rgba(198,161,91,0.4)]"
                />
              </div>

              {/* Orbiting Golden Star */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-1 rounded-full"
              >
                <div className="h-2 w-2 rounded-full bg-[#C6A15B] shadow-[0_0_8px_#C6A15B]" />
              </motion.div>
            </motion.div>

            {/* Brand Title & Tagline */}
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-7"
            >
              <h1 className="font-display text-2xl font-bold tracking-[0.25em] text-[#0E231B] sm:text-3xl dark:text-white">
                HERBIVA
              </h1>
              <p className="mt-1 text-xs font-bold tracking-[0.2em] uppercase text-[#8C6D2D] dark:text-[#C6A15B]">
                {language === 'ar'
                  ? 'الأعشاب والتوابل المصرية • تصدير عالمي'
                  : 'Egyptian Botanicals • Export Excellence'}
              </p>
            </motion.div>

            {/* Sleek Slim Progress Line */}
            <motion.div
              initial={{ scaleX: 0.9, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="w-64 max-w-full sm:w-72"
            >
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-[#E2EAE0] ring-1 ring-[#D0DDD0] dark:bg-white/10 dark:ring-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#8C6D2D] via-[#7E9E2C] to-[#558220] shadow-[0_0_12px_rgba(126,158,44,0.6)] dark:from-[#C6A15B] dark:via-[#A5C232] dark:to-[#D1F349] dark:shadow-[0_0_12px_rgba(165,194,50,0.9)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Progress Percentage & Status */}
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 text-[#4A5B53] dark:text-white/60 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7E9E2C] dark:bg-[#A5C232] animate-ping" />
                  <span className="truncate max-w-[190px]">{getStatusText()}</span>
                </span>
                <span className="font-mono text-xs font-bold text-[#2D6A35] dark:text-[#C6A15B]">
                  {progress}%
                </span>
              </div>
            </motion.div>

            {/* Trust Certifications Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-8 flex items-center gap-2 rounded-full border border-[#D5DFD7] bg-white/80 px-4 py-1.5 text-[11px] font-semibold tracking-wider text-[#4A5B53] shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-white/60"
            >
              <FiCheckCircle className="h-3.5 w-3.5 text-[#2D6A35] dark:text-[#A5C232]" />
              <span>ISO 22000 • HACCP • GLOBAL G.A.P. • ORGANIC</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
