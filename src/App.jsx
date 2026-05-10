import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import motherImage from './assets/mother_with_bouquet.PNG';

/* ─────────── Floating Watercolor Blobs ─────────── */
const blobs = [
  {
    id: 1,
    className: 'w-72 h-72 bg-lavender-light/40 top-[-5%] left-[-15%]',
    animate: { x: [0, 30, -10, 0], y: [0, 20, -15, 0], scale: [1, 1.12, 0.95, 1] },
    duration: 18,
  },
  {
    id: 2,
    className: 'w-80 h-80 bg-khaki-light/30 top-[15%] right-[-20%]',
    animate: { x: [0, -25, 15, 0], y: [0, -20, 25, 0], scale: [1, 0.93, 1.08, 1] },
    duration: 22,
  },
  {
    id: 3,
    className: 'w-64 h-64 bg-peach/25 top-[45%] left-[-10%]',
    animate: { x: [0, 20, -20, 0], y: [0, -30, 10, 0], scale: [1, 1.1, 0.9, 1] },
    duration: 20,
  },
  {
    id: 4,
    className: 'w-96 h-96 bg-lavender-pale/35 top-[65%] right-[-25%]',
    animate: { x: [0, -15, 25, 0], y: [0, 15, -20, 0], scale: [1, 0.95, 1.05, 1] },
    duration: 25,
  },
  {
    id: 5,
    className: 'w-56 h-56 bg-green-soft/20 top-[85%] left-[10%]',
    animate: { x: [0, 15, -10, 0], y: [0, -10, 20, 0], scale: [1, 1.08, 0.96, 1] },
    duration: 19,
  },
  {
    id: 6,
    className: 'w-48 h-48 bg-peach-dark/15 top-[30%] left-[60%]',
    animate: { x: [0, -20, 10, 0], y: [0, 15, -25, 0], scale: [1, 1.15, 0.92, 1] },
    duration: 23,
  },
];

function FloatingBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          className={`absolute rounded-full blur-3xl ${blob.className}`}
          animate={blob.animate}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─────────── Decorative Divider ─────────── */
function FlowerDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-lavender" />
      <span className="text-xl opacity-70 select-none">✿</span>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-lavender" />
    </div>
  );
}

/* ─────────── Motion Variants ─────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.88, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.6 },
  },
};

/* ─────────── Main App ─────────── */
export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Preload the image
    const img = new Image();
    img.src = motherImage;
    img.onload = () => {
      setIsLoaded(true);
      controls.start('visible');
    };
    // Fallback if already cached
    if (img.complete) {
      setIsLoaded(true);
      controls.start('visible');
    }
  }, [controls]);

  return (
    <div className="relative min-h-dvh bg-cream overflow-hidden">
      {/* Animated watercolor blobs */}
      <FloatingBlobs />

      {/* Main content card */}
      <motion.main
        className="relative z-10 flex flex-col items-center px-5 py-10 max-w-md mx-auto min-h-dvh"
        initial="hidden"
        animate={controls}
        variants={staggerContainer}
      >
        {/* ── Decorative top accent ── */}
        <motion.div variants={fadeUp} custom={0} className="mb-2">
          <span className="text-3xl select-none">💐</span>
        </motion.div>

        {/* ── Hero Heading ── */}
        <motion.h1
          variants={fadeUp}
          custom={1}
          className="font-heading text-3xl sm:text-4xl font-bold text-center leading-snug text-text-primary mb-1 tracking-tight"
        >
          Для найкращої мами
        </motion.h1>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="font-heading text-2xl sm:text-3xl font-semibold text-center text-coral mb-6 tracking-tight"
        >
          у світі!
        </motion.p>

        {/* ── Image Section ── */}
        <motion.div
          variants={imageReveal}
          className="relative w-full mb-8"
        >
          {/* Soft glow behind the image */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-lavender-light/40 via-peach/20 to-green-soft/20 blur-2xl scale-105 -z-10" />

          <div className="relative rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(200,168,216,0.3),0_2px_12px_rgba(0,0,0,0.06)]">
            {/* Shimmer placeholder */}
            {!isLoaded && (
              <div className="shimmer-bg w-full aspect-[3/4] rounded-2xl" />
            )}
            <img
              src={motherImage}
              alt="Акварельна ілюстрація дівчинки з букетом квітів для мами"
              className={`w-full h-auto rounded-2xl transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="eager"
            />
          </div>

          {/* Decorative corner petals */}
          <div className="absolute -top-2 -right-2 text-2xl opacity-50 rotate-12 select-none pointer-events-none">🌸</div>
          <div className="absolute -bottom-2 -left-2 text-2xl opacity-50 -rotate-12 select-none pointer-events-none">🌿</div>
        </motion.div>

        {/* ── Divider ── */}
        <motion.div variants={fadeUp} custom={4}>
          <FlowerDivider />
        </motion.div>

        {/* ── Message Section ── */}
        <motion.div
          variants={fadeUp}
          custom={5}
          className="w-full bg-white/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-lavender-pale/60 shadow-sm"
        >
          <p className="font-accent text-lg sm:text-xl leading-relaxed text-text-secondary text-center">
            Мамо, ти — як цей букет: така&nbsp;ж ніжна, яскрава і&nbsp;надихаюча.
          </p>
          <p className="font-accent text-lg sm:text-xl leading-relaxed text-text-secondary text-center mt-4">
            Твоя любов дарує нам тепло, а&nbsp;твоя посмішка освітлює все навколо.
          </p>
          <p className="font-accent text-xl sm:text-2xl font-semibold text-center mt-5 text-peach-dark">
            З Днем Матері, найдорожча!
          </p>
          <p className="font-accent text-lg text-center mt-2 text-text-muted">
            Ми тебе дуже любимо. 💕
          </p>
        </motion.div>

        {/* ── Download Button ── */}
        <motion.div variants={fadeUp} custom={6} className="w-full mb-10">
          <motion.a
            href="/image.png"
            download="Mothers_Day_Gift.png"
            className="group relative flex items-center justify-center gap-2.5 w-full py-4 px-6 rounded-2xl font-body font-semibold text-base text-white
                       bg-gradient-to-r from-peach-dark via-coral to-lavender
                       shadow-[0_4px_20px_rgba(232,150,124,0.35)] hover:shadow-[0_6px_28px_rgba(232,150,124,0.5)]
                       transition-shadow duration-300 no-underline select-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            id="download-button"
          >
            {/* Shimmer overlay */}
            <span className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </span>

            <svg className="w-5 h-5 shrink-0 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" />
            </svg>
            <span className="relative z-10">Завантажити цей малюнок</span>
          </motion.a>
        </motion.div>

        {/* ── Divider ── */}
        <motion.div variants={fadeUp} custom={7}>
          <FlowerDivider />
        </motion.div>

        {/* ── Footer ── */}
        <motion.footer
          variants={fadeUp}
          custom={8}
          className="text-center mt-4 mb-6"
        >
          <p className="font-heading text-xl text-text-secondary italic">
            З любов'ю,
          </p>
          <p className="font-heading text-3xl font-bold text-text-primary mt-1 tracking-tight">
            Ігор
          </p>
          <span className="inline-block mt-3 text-2xl select-none">❤️</span>
        </motion.footer>

        {/* Bottom padding for safe area */}
        <div className="h-8" />
      </motion.main>
    </div>
  );
}
