import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useRef, useEffect } from "react";

function AmbientOrb({ color, x, y, size }: { color: string; x: string; y: string; size: string }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: color,
        filter: "blur(120px)",
        opacity: 0.15,
      }}
    />
  );
}

const TICKER_ITEMS = [
  "THE FOOD STORE",
  "EST. 2026",
  "NUEVA YORK",
  "ARTESANAL",
  "SABOR",
  "PRECISIÓN",
  "EXPERIENCIA",
  "OFICIO",
];

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 overflow-hidden border-t border-[#F8F8F8]/[0.05] py-3 bg-[#0B0B0B]/60 backdrop-blur-sm">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-12 flex-shrink-0">
            <span className="text-[10px] tracking-[0.5em] text-[#F8F8F8]/25 uppercase font-mono">
              {item}
            </span>
            <span className="text-[#FF5A00] text-[6px]">◆</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function EditorialHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);

  const springX = useSpring(mouseX, { stiffness: 30, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 30 });

  const orbX = useTransform(springX, [-0.5, 0.5], ["-3%", "3%"]);
  const orbY = useTransform(springY, [-0.5, 0.5], ["-3%", "3%"]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative h-screen bg-[#0B0B0B] overflow-hidden pt-7">
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Ambient orbs */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ x: orbX, y: orbY }}>
        <AmbientOrb color="#FF5A00" x="15%" y="20%" size="600px" />
        <AmbientOrb color="#C1121F" x="60%" y="50%" size="500px" />
        <AmbientOrb color="#D4A574" x="80%" y="10%" size="300px" />
      </motion.div>

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(248,248,248,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(248,248,248,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Year watermark */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none z-[2] select-none"
        initial={{ opacity: 0, filter: "blur(40px)" }}
        animate={{ opacity: 0.04, filter: "blur(0px)" }}
        transition={{ duration: 2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <span
          className="text-[22vw] font-bold leading-none text-[#F8F8F8]"
          style={{ fontFamily: "'Space Mono', monospace", letterSpacing: "0.15em" }}
        >
          2026
        </span>
      </motion.div>

      {/* GPS Coordinates */}
      <motion.div
        className="absolute top-24 right-8 z-30 text-right"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.2 }}
      >
        <p className="text-[9px] tracking-[0.3em] text-[#F8F8F8]/20 font-mono uppercase">40°44′54″N</p>
        <p className="text-[9px] tracking-[0.3em] text-[#F8F8F8]/20 font-mono uppercase">73°59′08″W</p>
        <p className="text-[9px] tracking-[0.3em] text-[#FF5A00]/40 font-mono uppercase mt-1">● En vivo</p>
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ opacity, y, scale }}
        className="relative z-20 h-full flex flex-col justify-center"
      >
        <div className="max-w-7xl mx-auto px-8 w-full">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-12"
          >
            <motion.span
              className="inline-block w-16 h-[1px] bg-[#FF5A00]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ transformOrigin: "left" }}
            />
            <span className="text-xs tracking-[0.4em] text-[#FF5A00] uppercase font-mono">
              Est. 2026 · Nueva York
            </span>
          </motion.div>

          {/* Headline — overflow-hidden on wrapper div, NOT on each span */}
          <div className="relative">
            <motion.div
              className="absolute -left-6 top-0 w-[3px] h-full bg-gradient-to-b from-[#FF5A00] to-transparent"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              style={{ transformOrigin: "top" }}
            />

            <h1
              className="text-[5.5rem] md:text-[9rem] lg:text-[12rem] leading-[0.88] font-bold text-[#F8F8F8] tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {/* Line 1 */}
              <div className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
                >
                  Esto no es
                </motion.span>
              </div>
              {/* Line 2 */}
              <div className="overflow-hidden">
                <motion.span
                  className="block italic font-light text-[#F8F8F8]/70"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 0.75, ease: [0.76, 0, 0.24, 1] }}
                >
                  solo comida.
                </motion.span>
              </div>
              {/* Line 3 */}
              <div className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 1, ease: [0.76, 0, 0.24, 1] }}
                >
                  Es arte.
                  <span className="text-[#FF5A00]">_</span>
                </motion.span>
              </div>
            </h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="absolute bottom-20 right-8 text-right text-[#F8F8F8]/50 text-base max-w-xs leading-loose tracking-wide"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Una experiencia editorial
            <br />
            <span className="text-[#F8F8F8]/30">sobre arte, pasión y sabor.</span>
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <span className="text-[10px] tracking-[0.4em] text-[#F8F8F8]/30 uppercase font-mono">Desplazá</span>
        <motion.div
          className="w-[1px] h-12 bg-gradient-to-b from-[#FF5A00] to-transparent"
          animate={{ scaleY: [1, 0.3, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>

      {/* Animated ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
      >
        <Ticker />
      </motion.div>
    </div>
  );
}
