import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';

export function LoadingAnimation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-100 to-pink-100 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <BookOpen className="h-20 w-20 text-pink-600 mx-auto mb-4" />
        </motion.div>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-pink-600 text-xl"
        >
          Loading your adventure...
        </motion.p>
      </motion.div>
    </div>
  );
}