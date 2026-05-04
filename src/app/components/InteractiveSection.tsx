import { motion, useMotionValue } from "motion/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const burgerIngredients = [
  { id: 1, name: "Classic Bun", emoji: "🍔", color: "#FFD500" },
  { id: 2, name: "Brioche Bun", emoji: "🥯", color: "#FF5A00" },
  { id: 3, name: "Beef Patty", emoji: "🥩", color: "#FF1744" },
  { id: 4, name: "Chicken Patty", emoji: "🍗", color: "#F59E0B" },
  { id: 5, name: "Veggie Patty", emoji: "🥬", color: "#10B981" },
  { id: 6, name: "Cheese", emoji: "🧀", color: "#FFD500" },
  { id: 7, name: "Lettuce", emoji: "🥬", color: "#10B981" },
  { id: 8, name: "Tomato", emoji: "🍅", color: "#FF1744" },
  { id: 9, name: "Bacon", emoji: "🥓", color: "#FF5A00" },
  { id: 10, name: "Avocado", emoji: "🥑", color: "#10B981" }
];

export function InteractiveSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  const x = useMotionValue(0);
  void x; // kept for potential drag interactions

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % burgerIngredients.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + burgerIngredients.length) % burgerIngredients.length);
  };

  const toggleIngredient = (id: number) => {
    setSelectedIngredients((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const visibleItems = [
    burgerIngredients[(currentIndex - 1 + burgerIngredients.length) % burgerIngredients.length],
    burgerIngredients[currentIndex],
    burgerIngredients[(currentIndex + 1) % burgerIngredients.length]
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] py-32 px-6 overflow-hidden">
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#FF5A00] via-[#FFD500] to-[#8B5CF6] rounded-full blur-[250px] opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-7xl md:text-9xl font-black mb-6">
            <span className="text-white">Build your</span>
            <br />
            <span className="bg-gradient-to-r from-[#FF5A00] via-[#FFD500] to-[#FF5A00] bg-clip-text text-transparent">
              Perfect Burger
            </span>
          </h2>
          <p className="text-2xl text-white/70">Drag, select, create magic</p>
        </motion.div>

        <div className="relative h-[500px] flex items-center justify-center mb-12">
          <button
            onClick={prevSlide}
            className="absolute left-0 z-20 p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-[#FF5A00]/20 hover:border-[#FF5A00] transition-all duration-300 group"
          >
            <ChevronLeft className="w-8 h-8 text-white group-hover:text-[#FFD500]" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 z-20 p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-[#FF5A00]/20 hover:border-[#FF5A00] transition-all duration-300 group"
          >
            <ChevronRight className="w-8 h-8 text-white group-hover:text-[#FFD500]" />
          </button>

          <div className="flex items-center justify-center gap-8">
            {visibleItems.map((item, index) => {
              const isCenter = index === 1;
              const scale = isCenter ? 1.2 : 0.7;
              const opacity = isCenter ? 1 : 0.4;
              const zIndex = isCenter ? 20 : 10;

              return (
                <motion.div
                  key={`${item.id}-${index}`}
                  className="relative cursor-pointer"
                  style={{
                    x: index === 0 ? -100 : index === 2 ? 100 : 0,
                    zIndex
                  }}
                  animate={{
                    scale,
                    opacity
                  }}
                  whileHover={isCenter ? { scale: 1.3, rotate: 5 } : {}}
                  onClick={() => isCenter && toggleIngredient(item.id)}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="relative w-64 h-64 rounded-3xl backdrop-blur-xl bg-white/5 border-2 flex items-center justify-center overflow-hidden"
                    style={{
                      borderColor: selectedIngredients.includes(item.id) ? item.color : "rgba(255,255,255,0.2)",
                      boxShadow: selectedIngredients.includes(item.id)
                        ? `0 0 60px ${item.color}80`
                        : "none"
                    }}
                  >
                    {selectedIngredients.includes(item.id) && (
                      <motion.div
                        className="absolute inset-0 opacity-20"
                        style={{ backgroundColor: item.color }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      />
                    )}

                    <div className="relative z-10 text-center">
                      <div className="text-9xl mb-4 filter drop-shadow-2xl">
                        {item.emoji}
                      </div>
                      {isCenter && (
                        <motion.p
                          className="text-2xl font-bold text-white"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {item.name}
                        </motion.p>
                      )}
                    </div>

                    {selectedIngredients.includes(item.id) && (
                      <motion.div
                        className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: item.color }}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="text-white text-xl">✓</span>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          className="flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.3 }}
        >
          {selectedIngredients.map((id) => {
            const ingredient = burgerIngredients.find((i) => i.id === id);
            return ingredient ? (
              <motion.div
                key={id}
                className="px-4 py-2 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center gap-2"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                style={{
                  borderColor: ingredient.color,
                  boxShadow: `0 0 20px ${ingredient.color}40`
                }}
              >
                <span className="text-2xl">{ingredient.emoji}</span>
                <span className="text-white">{ingredient.name}</span>
              </motion.div>
            ) : null;
          })}
        </motion.div>

        {selectedIngredients.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.button
              className="px-12 py-5 bg-gradient-to-r from-[#FF5A00] to-[#FFD500] rounded-full text-white text-xl font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: "0 0 40px rgba(255, 90, 0, 0.6)"
              }}
            >
              Create My Burger ({selectedIngredients.length} ingredients)
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
