import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Flame, Coffee, IceCream } from "lucide-react";

const categories = [
  {
    icon: Flame,
    title: "Burgers",
    description: "Gourmet creations that redefine comfort food",
    gradient: "from-[#FF5A00] to-[#FF1744]"
  },
  {
    icon: Coffee,
    title: "Drinks",
    description: "Handcrafted beverages for every mood",
    gradient: "from-[#FFD500] to-[#F59E0B]"
  },
  {
    icon: IceCream,
    title: "Desserts",
    description: "Sweet endings that become new beginnings",
    gradient: "from-[#8B5CF6] to-[#EC4899]"
  }
];

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0A0A0A] py-32 px-6 overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-[#FF5A00] rounded-full blur-[200px] opacity-20"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]) }}
        className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-[#FFD500] rounded-full blur-[200px] opacity-20"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-black text-white mb-6">
            We don't sell food.
          </h2>
          <h2 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-[#FF5A00] via-[#FFD500] to-[#FF5A00] bg-clip-text text-transparent">
            We create moments.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 100, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.6, 0.05, 0.01, 0.9]
              }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="group relative"
            >
              <div className="relative p-8 rounded-3xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 hover:border-[#FF5A00]/50 transition-all duration-500">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <motion.div
                  className="relative z-10"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-6 group-hover:shadow-[0_0_40px_rgba(255,90,0,0.6)] transition-shadow duration-500`}>
                    <category.icon className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-[#FFD500] transition-colors duration-300">
                    {category.title}
                  </h3>

                  <p className="text-white/70 text-lg">
                    {category.description}
                  </p>
                </motion.div>

                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#FF5A00] to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
