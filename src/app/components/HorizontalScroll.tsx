import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const menuItems = [
  {
    id: 1,
    title: "Morning",
    time: "06:00 — 11:00",
    items: ["Artisan Pastries", "Specialty Coffee", "Fresh Juices"],
    image: "🥐"
  },
  {
    id: 2,
    title: "Midday",
    time: "11:00 — 16:00",
    items: ["Signature Burgers", "Seasonal Salads", "Craft Sandwiches"],
    image: "🍔"
  },
  {
    id: 3,
    title: "Evening",
    time: "16:00 — 22:00",
    items: ["Premium Steaks", "Fresh Pasta", "Wine Selection"],
    image: "🥩"
  },
  {
    id: 4,
    title: "Late Night",
    time: "22:00 — 02:00",
    items: ["Small Plates", "Cocktails", "Desserts"],
    image: "🍸"
  }
];

export function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <div ref={containerRef} className="relative bg-[#F8F8F8] py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="relative">
            <motion.div
              className="absolute -left-4 top-0 w-1 h-24 bg-[#C1121F]"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ transformOrigin: "top" }}
            />
            <h2 className="text-[5rem] md:text-[8rem] leading-[0.9] font-bold text-[#0B0B0B] tracking-tight">
              By the hour
            </h2>
            <p className="text-2xl text-[#0B0B0B]/50 italic mt-4">Curated for every moment</p>
          </div>
        </motion.div>
      </div>

      <div className="relative h-[600px]">
        <motion.div
          style={{ x }}
          className="absolute flex gap-8 px-8"
        >
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="flex-shrink-0 w-[500px] h-[600px] bg-[#0B0B0B] relative group cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="absolute inset-0 text-[18rem] flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity duration-700"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.8 }}
              >
                {item.image}
              </motion.div>

              <div className="relative z-10 p-12 h-full flex flex-col justify-between">
                <div>
                  <motion.p
                    className="text-sm tracking-[0.3em] text-[#F8F8F8]/40 mb-4 uppercase"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {item.time}
                  </motion.p>

                  <motion.h3
                    className="text-[4rem] leading-[0.9] font-bold text-[#F8F8F8] tracking-tight mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    {item.title}
                  </motion.h3>
                </div>

                <div className="space-y-3">
                  {item.items.map((menuItem, idx) => (
                    <motion.div
                      key={idx}
                      className="text-lg text-[#F8F8F8]/70 border-l border-[#F8F8F8]/20 pl-4 group-hover:border-[#FF5A00] group-hover:text-[#F8F8F8] transition-all duration-500"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                    >
                      {menuItem}
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF5A00]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.6 }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>
          ))}

          <motion.div
            className="flex-shrink-0 w-[500px] h-[600px] bg-[#FF5A00] relative flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-center">
              <h3 className="text-[4rem] leading-[0.9] font-bold text-[#F8F8F8] tracking-tight mb-6">
                Full Menu
              </h3>
              <button className="px-8 py-4 border-2 border-[#F8F8F8] text-[#F8F8F8] text-sm tracking-widest uppercase hover:bg-[#F8F8F8] hover:text-[#FF5A00] transition-all duration-500">
                Explore All
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="mt-16 text-center text-[#0B0B0B]/40 text-sm tracking-widest uppercase"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        Scroll to explore →
      </motion.div>
    </div>
  );
}
