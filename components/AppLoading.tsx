import { motion, AnimatePresence } from 'motion/react';

interface AppLoadingProps {
  show: boolean;
}

export default function AppLoading({ show }: AppLoadingProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-0 top-0 z-[100] h-[3px] overflow-hidden bg-[#7E9E2C]/20 dark:bg-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-hidden="true"
        >
          <motion.div
            className="h-full w-1/3 rounded-full bg-gradient-to-r from-[#7E9E2C] via-[#C6A15B] to-[#205338] shadow-[0_0_8px_rgba(126,158,44,0.6)]"
            initial={{ x: '-100%' }}
            animate={{ x: '400%' }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
