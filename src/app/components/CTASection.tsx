import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#FF5A00] via-[#FF1744] to-[#8B5CF6]"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: "200% 200%"
        }}
      />

      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(10,10,10,0.8)_100%)]"
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-8"
            animate={{
              boxShadow: [
                "0 0 20px rgba(255, 90, 0, 0.3)",
                "0 0 40px rgba(255, 213, 0, 0.5)",
                "0 0 20px rgba(255, 90, 0, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 text-[#FFD500]" />
            <span className="text-white">Limited Time Offer</span>
            <Sparkles className="w-5 h-5 text-[#FFD500]" />
          </motion.div>

          <motion.h2
            className="text-7xl md:text-9xl font-black text-white mb-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              textShadow: `
                0 0 30px rgba(255, 90, 0, 0.8),
                0 0 60px rgba(255, 90, 0, 0.6),
                0 10px 40px rgba(0, 0, 0, 0.5)
              `
            }}
          >
            Ready to taste
          </motion.h2>

          <motion.h2
            className="text-7xl md:text-9xl font-black bg-gradient-to-r from-[#FFD500] via-[#FF5A00] to-[#FFD500] bg-clip-text text-transparent mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.3 }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            style={{
              backgroundSize: "200% 200%",
              filter: "drop-shadow(0 0 40px rgba(255, 213, 0, 0.8))"
            }}
          >
            the future?
          </motion.h2>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button
              className="group relative px-16 py-6 bg-white rounded-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 0px rgba(255, 255, 255, 0)",
                  "0 0 60px rgba(255, 255, 255, 0.5)",
                  "0 0 0px rgba(255, 255, 255, 0)"
                ]
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity }
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#FF5A00] to-[#FFD500]"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 text-2xl font-bold text-[#0A0A0A] group-hover:text-white transition-colors duration-300 flex items-center gap-3">
                Order Now
                <ArrowRight className="w-6 h-6" />
              </span>
            </motion.button>

            <motion.button
              className="px-16 py-6 border-2 border-white rounded-full text-2xl font-bold text-white hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Menu
            </motion.button>
          </motion.div>

          <motion.p
            className="text-white/60 mt-8 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Join 10,000+ happy customers who've discovered the future of food
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD500] to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          x: ["-100%", "0%", "100%"]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
