import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-to-br from-[#FF5A00] via-[#FF1744] to-[#8B5CF6] animate-gradient"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,90,0,0.3),transparent_50%)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,213,0,0.2),transparent_40%)]" />
      </motion.div>

      <motion.div
        style={{ scale }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="absolute w-[500px] h-[500px] bg-[#FF5A00] rounded-full blur-[150px] opacity-30 animate-pulse" />
      </motion.div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          <motion.h1
            className="text-[8rem] md:text-[12rem] font-black tracking-tighter text-white mb-4"
            initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.2, ease: [0.6, 0.05, 0.01, 0.9] }}
            style={{
              textShadow: `
                0 0 20px rgba(255, 90, 0, 0.8),
                0 0 40px rgba(255, 90, 0, 0.6),
                0 0 80px rgba(255, 90, 0, 0.4),
                0 10px 30px rgba(0, 0, 0, 0.5)
              `,
              WebkitTextStroke: "2px rgba(255, 213, 0, 0.3)"
            }}
          >
            THE FOOD
          </motion.h1>

          <motion.h1
            className="text-[8rem] md:text-[12rem] font-black tracking-tighter bg-gradient-to-r from-[#FFD500] via-[#FF5A00] to-[#FFD500] bg-clip-text text-transparent mb-8"
            initial={{ opacity: 0, scale: 0.8, rotateX: 30 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.6, 0.05, 0.01, 0.9] }}
            style={{
              filter: "drop-shadow(0 0 30px rgba(255, 213, 0, 0.8))"
            }}
          >
            STORE
          </motion.h1>

          <motion.p
            className="text-xl md:text-3xl text-white/90 mb-12 font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)"
            }}
          >
            Food. But make it an experience.
          </motion.p>

          <motion.button
            className="group relative px-12 py-5 bg-gradient-to-r from-[#FF5A00] to-[#FFD500] rounded-full overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#FFD500] to-[#FF5A00]"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 text-xl font-semibold text-white tracking-wide">
              Explore Menu
            </span>
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow: "0 0 30px rgba(255, 90, 0, 0.8), 0 0 60px rgba(255, 213, 0, 0.6)"
              }}
            />
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute bottom-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5
          }}
        >
          <ChevronDown className="w-10 h-10 text-white/70" />
        </motion.div>
      </div>
    </div>
  );
}
