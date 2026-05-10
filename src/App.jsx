import { useEffect, useState, useRef, useCallback } from 'react';
import {
  motion,
  useAnimation,
  useInView,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import motherImage from './assets/mother_with_bouquet.PNG';

/* ═══════════════════════════════════════════════
   FALLING PETALS
═══════════════════════════════════════════════ */
const PETAL_EMOJIS = ['🌸', '🌺', '🌼', '🌷', '✿', '❀', '🍃', '🌿'];
const PETAL_COUNT = 18;

function generatePetal(id) {
  return {
    id,
    emoji: PETAL_EMOJIS[Math.floor(Math.random() * PETAL_EMOJIS.length)],
    left: `${Math.random() * 100}%`,
    size: `${0.8 + Math.random() * 1.2}rem`,
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 10,
    drift: (Math.random() - 0.5) * 120,
    rotate: Math.random() * 720 - 360,
    opacity: 0.25 + Math.random() * 0.45,
  };
}

const petals = Array.from({ length: PETAL_COUNT }, (_, i) => generatePetal(i));

function FallingPetals() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]" aria-hidden="true">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          style={{ left: p.left, fontSize: p.size, opacity: p.opacity, top: '-5%' }}
          className="absolute select-none"
          animate={{
            y: ['0vh', '110vh'],
            x: [0, p.drift * 0.5, p.drift, p.drift * 0.7, 0],
            rotate: [0, p.rotate],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SPARKLE PARTICLES
═══════════════════════════════════════════════ */
function Sparkle({ x, y, size, color, delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1.5, 0],
        opacity: [0, 1, 0],
        y: [0, -24, -40],
        x: [0, (Math.random() - 0.5) * 30],
      }}
      transition={{ duration: 1.8, delay, ease: 'easeOut', repeat: Infinity, repeatDelay: 3 + Math.random() * 4 }}
    />
  );
}

const sparkleData = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: `${10 + Math.random() * 80}%`,
  y: `${10 + Math.random() * 80}%`,
  size: `${4 + Math.random() * 6}px`,
  color: ['#F2C4A0', '#C8A8D8', '#8AAE78', '#D4A855', '#E8967C', '#DFC8EB'][Math.floor(Math.random() * 6)],
  delay: Math.random() * 5,
}));

function SparkleField() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[2]" aria-hidden="true">
      {sparkleData.map((s) => (
        <Sparkle key={s.id} {...s} />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   FLOATING WATERCOLOR BLOBS
═══════════════════════════════════════════════ */
const blobs = [
  { id: 1, className: 'w-80 h-80 top-[-8%] left-[-18%]', color: 'rgba(200,168,216,0.35)', dur: 18 },
  { id: 2, className: 'w-96 h-96 top-[12%] right-[-22%]',  color: 'rgba(212,200,164,0.28)', dur: 22 },
  { id: 3, className: 'w-72 h-72 top-[42%] left-[-12%]',   color: 'rgba(242,196,160,0.25)', dur: 20 },
  { id: 4, className: 'w-[26rem] h-[26rem] top-[60%] right-[-28%]', color: 'rgba(223,200,235,0.32)', dur: 25 },
  { id: 5, className: 'w-64 h-64 top-[82%] left-[8%]',     color: 'rgba(138,174,120,0.2)',  dur: 19 },
  { id: 6, className: 'w-56 h-56 top-[28%] left-[55%]',    color: 'rgba(212,168,85,0.18)',  dur: 23 },
];

function FloatingBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {blobs.map((b, i) => (
        <motion.div
          key={b.id}
          className={`absolute rounded-full blur-3xl ${b.className}`}
          style={{ background: b.color }}
          animate={{
            x: [0, 30 * (i % 2 === 0 ? 1 : -1), -15 * (i % 2 === 0 ? 1 : -1), 0],
            y: [0, -25 * (i % 3 === 0 ? 1 : -1), 18 * (i % 3 === 0 ? 1 : -1), 0],
            scale: [1, 1.12, 0.93, 1],
          }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   DECORATIVE DIVIDER
═══════════════════════════════════════════════ */
function FlowerDivider() {
  return (
    <motion.div
      className="flex items-center justify-center gap-3 py-4 w-full"
      initial={{ opacity: 0, scaleX: 0.4 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-[#C8A8D8]" />
      <motion.span
        className="text-xl select-none"
        animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        ✿
      </motion.span>
      <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-[#C8A8D8]" />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   SHIMMER TEXT HEADING
═══════════════════════════════════════════════ */
function ShimmerHeading({ children, className }) {
  return (
    <motion.h1
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
    >
      {children}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        style={{ mixBlendMode: 'overlay' }}
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 2.5, delay: 1.5, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
      />
    </motion.h1>
  );
}

/* ═══════════════════════════════════════════════
   ANIMATED MESSAGE — word-by-word reveal
═══════════════════════════════════════════════ */
function AnimatedParagraph({ text, className, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const words = text.split(' ');

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.5, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}


/* ═══════════════════════════════════════════════
   PULSING HEART
═══════════════════════════════════════════════ */
function HeartBeat({ children }) {
  return (
    <motion.span
      className="inline-block select-none"
      animate={{ scale: [1, 1.35, 1, 1.15, 1] }}
      transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
    >
      {children}
    </motion.span>
  );
}

/* ═══════════════════════════════════════════════
   GLOWING AURA (behind image)
═══════════════════════════════════════════════ */
function GlowAura() {
  return (
    <motion.div
      className="absolute -inset-4 rounded-3xl -z-10"
      style={{
        background: 'conic-gradient(from 0deg, #F2C4A0, #C8A8D8, #8AAE78, #D4A855, #E8967C, #DFC8EB, #F2C4A0)',
        filter: 'blur(24px)',
        opacity: 0.45,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
    />
  );
}

/* ═══════════════════════════════════════════════
   MOTION VARIANTS
═══════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.75, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.5 } },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.85, filter: 'blur(16px)', y: 20 },
  visible: {
    opacity: 1, scale: 1, filter: 'blur(0px)', y: 0,
    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
};

/* ═══════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════ */
export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const controls = useAnimation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-150, 150], [6, -6]);
  const rotateY = useTransform(mouseX, [-150, 150], [-6, 6]);
  const imageRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = motherImage;
    const start = () => { setIsLoaded(true); controls.start('visible'); };
    img.onload = start;
    if (img.complete) start();
  }, [controls]);

  const handleMouseMove = useCallback((e) => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div className="relative min-h-dvh bg-cream overflow-hidden">
      {/* Layer 0: blobs */}
      <FloatingBlobs />
      {/* Layer 1: falling petals */}
      <FallingPetals />
      {/* Layer 2: sparkles */}
      <SparkleField />

      {/* Main content */}
      <motion.main
        className="relative z-10 flex flex-col items-center px-5 py-10 max-w-md mx-auto min-h-dvh"
        initial="hidden"
        animate={controls}
        variants={staggerContainer}
      >

        {/* ── Animated bouquet icon ── */}
        <motion.div
          variants={fadeUp}
          custom={0}
          className="mb-3"
        >
          <motion.span
            className="text-4xl select-none inline-block"
            animate={{ y: [0, -8, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            💐
          </motion.span>
        </motion.div>

        {/* ── Hero Heading ── */}
        <ShimmerHeading className="font-heading text-3xl sm:text-4xl font-bold text-center leading-snug text-text-primary mb-1 tracking-tight">
          Для найкращої мами
        </ShimmerHeading>

        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-2xl sm:text-3xl font-semibold text-center text-coral mb-8 tracking-tight"
        >
          у&nbsp;світі!
        </motion.p>

        {/* ── Image with 3-D tilt + glow ── */}
        <motion.div
          ref={imageRef}
          variants={imageReveal}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full mb-8 cursor-pointer"
          style={{ perspective: 900, rotateX, rotateY }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        >
          {/* Rotating conic glow aura */}
          <GlowAura />

          <div className="relative rounded-2xl overflow-hidden shadow-[0_12px_50px_rgba(200,168,216,0.35),0_4px_16px_rgba(0,0,0,0.08)]">
            {!isLoaded && <div className="shimmer-bg w-full aspect-[3/4] rounded-2xl" />}
            <img
              src={motherImage}
              alt="Акварельна ілюстрація дівчинки з букетом квітів для мами"
              className={`w-full h-auto rounded-2xl transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="eager"
            />
            {/* Rainbow shimmer overlay on hover */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(242,196,160,0.15) 0%, rgba(200,168,216,0.15) 50%, rgba(138,174,120,0.15) 100%)',
              }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Animated corner decorations */}
          <motion.div
            className="absolute -top-3 -right-3 text-2xl select-none pointer-events-none"
            animate={{ rotate: [0, 20, -10, 0], scale: [1, 1.2, 0.9, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >🌸</motion.div>
          <motion.div
            className="absolute -bottom-3 -left-3 text-2xl select-none pointer-events-none"
            animate={{ rotate: [0, -15, 10, 0], scale: [1, 1.15, 0.95, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >🌿</motion.div>
          <motion.div
            className="absolute -top-3 -left-3 text-xl select-none pointer-events-none opacity-70"
            animate={{ rotate: [0, -20, 10, 0], scale: [1, 1.25, 0.9, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
          >✨</motion.div>
          <motion.div
            className="absolute -bottom-3 -right-3 text-xl select-none pointer-events-none opacity-70"
            animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.2, 0.95, 1] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          >🌺</motion.div>
        </motion.div>

        {/* ── Divider ── */}
        <FlowerDivider />

        {/* ── Message Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full relative mb-8"
        >
          {/* Card glow */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-lavender-light/30 via-peach/20 to-green-soft/20 blur-lg -z-10" />

          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-lavender-pale/50 shadow-sm">
            <AnimatedParagraph
              text="Мамо, ти — як цей букет: така ж ніжна, яскрава і надихаюча."
              className="font-accent text-lg sm:text-xl leading-relaxed text-text-secondary text-center"
              delay={0.1}
            />
            <AnimatedParagraph
              text="Твоя любов дарує нам тепло, а твоя посмішка освітлює все навколо."
              className="font-accent text-lg sm:text-xl leading-relaxed text-text-secondary text-center mt-4"
              delay={0.5}
            />

            <motion.p
              className="font-accent text-xl sm:text-2xl font-semibold text-center mt-6 text-peach-dark"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              З Днем Матері, найдорожча!
            </motion.p>

            <motion.p
              className="font-accent text-lg text-center mt-2 text-text-muted"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              Ми тебе дуже любимо.&nbsp;<HeartBeat>💕</HeartBeat>
            </motion.p>
          </div>
        </motion.div>


        {/* ── Divider ── */}
        <FlowerDivider />

        {/* ── Footer ── */}
        <motion.footer
          className="text-center mt-4 mb-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="font-heading text-xl text-text-secondary italic"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            З любов'ю,
          </motion.p>

          <motion.p
            className="font-heading text-4xl font-bold text-text-primary mt-1 tracking-tight"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            Ігор
          </motion.p>

          <div className="mt-3 flex justify-center gap-2">
            <HeartBeat>❤️</HeartBeat>
            <motion.span
              className="inline-block text-2xl select-none"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            >🌸</motion.span>
            <motion.span
              className="inline-block text-2xl select-none"
              animate={{ scale: [1, 1.2, 1], rotate: [0, -8, 8, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            >💐</motion.span>
          </div>
        </motion.footer>

        <div className="h-8" />
      </motion.main>
    </div>
  );
}
