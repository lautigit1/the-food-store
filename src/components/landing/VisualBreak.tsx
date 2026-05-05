import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const CARDS = [
  {
    label: "01",
    title: "Arte",
    sub: "En cada detalle",
    accent: "#FF5A00",
    letter: "A",
    clip: "polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)",
    align: "left" as const,
    pos: { left: "0", top: "0", width: "44%", height: "480px" },
  },
  {
    label: "02",
    title: "Calidad",
    sub: "Nunca comprometida",
    accent: "#C1121F",
    letter: "C",
    clip: "polygon(0 0, 100% 0, 100% 100%, 12% 100%, 0 88%)",
    align: "right" as const,
    pos: { right: "0", top: "112px", width: "50%", height: "440px" },
  },
  {
    label: "03",
    title: "Pasión",
    sub: "En todo lo que hacemos",
    accent: "#D4A574",
    letter: "P",
    clip: "polygon(12% 0, 100% 0, 100% 100%, 0 100%, 0 12%)",
    align: "left" as const,
    pos: { left: "33%", bottom: "0", width: "38%", height: "380px" },
  },
];

export function VisualBreak() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-60, 80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [40, -120]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yValues = [y1, y2, y3];

  return (
    <div ref={containerRef} className="relative bg-[#0B0B0B] py-40 overflow-hidden">
      {/* Ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,90,0,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      <div className="max-w-7xl mx-auto px-8">
        <div className="relative h-[780px]">
          {CARDS.map((card, index) => (
            <motion.div
              key={card.label}
              style={{ y: yValues[index], ...card.pos, position: "absolute" }}
              className="overflow-hidden group cursor-none"
              data-cursor="explore"
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Clipped container */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: card.clip,
                  background: `linear-gradient(135deg, ${card.accent}12 0%, #0B0B0B 60%)`,
                  border: `1px solid ${card.accent}15`,
                }}
              />

              {/* Hover glow */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                style={{
                  clipPath: card.clip,
                  background: `radial-gradient(circle at 40% 60%, ${card.accent}20 0%, transparent 70%)`,
                }}
              />

              {/* Giant editorial letter */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
                style={{ clipPath: card.clip }}
              >
                <span
                  className="font-bold leading-none"
                  style={{
                    fontSize: "clamp(8rem, 18vw, 20rem)",
                    color: "transparent",
                    WebkitTextStroke: `1px ${card.accent}25`,
                    fontFamily: "'Playfair Display', serif",
                    transform: "translateY(10%)",
                  }}
                >
                  {card.letter}
                </span>
              </div>

              {/* Accent line */}
              {card.align === "left" ? (
                <motion.div
                  className="absolute top-0 left-0 w-[2px] h-full"
                  style={{ background: card.accent, transformOrigin: "top" }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.1 }}
                />
              ) : (
                <motion.div
                  className="absolute top-0 right-0 w-[2px] h-full"
                  style={{ background: card.accent, transformOrigin: "top" }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              )}

              {/* Text content */}
              <div
                className={`absolute bottom-8 ${card.align === "right" ? "right-8 text-right" : "left-8"}`}
              >
                <p
                  className="text-[10px] tracking-[0.4em] uppercase font-mono mb-2"
                  style={{ color: card.accent }}
                >
                  {card.label}
                </p>
                <h3
                  className="text-4xl font-bold text-[#F8F8F8] mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {card.title}
                </h3>
                <p className="text-[#F8F8F8]/40 text-sm font-mono">{card.sub}</p>
              </div>
            </motion.div>
          ))}

          {/* Central text overlay — letra a letra */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
            style={{ y: textY }}
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.2, delay: 0.6 }}
            >
              {"Cada".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block font-bold text-white/10 leading-none"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(5rem, 10vw, 8rem)",
                    mixBlendMode: "overlay",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.06 }}
                >
                  {letter}
                </motion.span>
              ))}
              <br />
              {"momento".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block font-light italic text-white/10 leading-none"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(3rem, 6vw, 5rem)",
                    mixBlendMode: "overlay",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.9 + i * 0.05 }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
