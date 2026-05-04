import { motion } from "motion/react";
import { useState } from "react";
import { ShoppingCart, Star } from "lucide-react";

const products = [
  {
    id: 1,
    name: "The Inferno Burger",
    price: "$18.99",
    category: "Burgers",
    rating: 4.9,
    image: "🍔",
    color: "from-[#FF5A00] to-[#FF1744]"
  },
  {
    id: 2,
    name: "Golden Latte Supreme",
    price: "$7.99",
    category: "Drinks",
    rating: 4.8,
    image: "☕",
    color: "from-[#FFD500] to-[#F59E0B]"
  },
  {
    id: 3,
    name: "Cosmic Ice Dream",
    price: "$12.99",
    category: "Desserts",
    rating: 5.0,
    image: "🍨",
    color: "from-[#8B5CF6] to-[#EC4899]"
  },
  {
    id: 4,
    name: "Dragon's Breath Wings",
    price: "$15.99",
    category: "Burgers",
    rating: 4.7,
    image: "🍗",
    color: "from-[#FF5A00] to-[#F59E0B]"
  },
  {
    id: 5,
    name: "Neon Mojito Blast",
    price: "$9.99",
    category: "Drinks",
    rating: 4.9,
    image: "🍹",
    color: "from-[#10B981] to-[#FFD500]"
  },
  {
    id: 6,
    name: "Velvet Chocolate Eruption",
    price: "$14.99",
    category: "Desserts",
    rating: 4.8,
    image: "🍰",
    color: "from-[#8B5CF6] to-[#FF1744]"
  }
];

export function FeaturedProducts() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#1a1a1a] py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsOTAsMCwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-7xl md:text-9xl font-black mb-4">
            <span className="bg-gradient-to-r from-[#FFD500] via-[#FF5A00] to-[#8B5CF6] bg-clip-text text-transparent">
              Featured
            </span>
          </h2>
          <p className="text-2xl text-white/70">Taste the extraordinary</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.6, 0.05, 0.01, 0.9]
              }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative"
            >
              <div className="relative p-6 rounded-3xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 hover:border-[#FF5A00] transition-all duration-500 h-full">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                  animate={hoveredId === product.id ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.5 }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="text-9xl text-center mb-6 filter drop-shadow-2xl"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {product.image}
                  </motion.div>

                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-[#FFD500] text-[#FFD500]"
                            : "text-white/30"
                        }`}
                      />
                    ))}
                    <span className="text-white/70 ml-2">{product.rating}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#FFD500] transition-colors duration-300">
                    {product.name}
                  </h3>

                  <p className="text-white/50 text-sm mb-4">{product.category}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold bg-gradient-to-r from-[#FF5A00] to-[#FFD500] bg-clip-text text-transparent">
                      {product.price}
                    </span>

                    <motion.button
                      className="relative px-6 py-3 bg-gradient-to-r from-[#FF5A00] to-[#FFD500] rounded-full overflow-hidden opacity-0 group-hover:opacity-100"
                      initial={{ x: 20 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      animate={hoveredId === product.id ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ShoppingCart className="w-5 h-5 text-white" />
                      <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
                        style={{
                          boxShadow: "0 0 20px rgba(255, 90, 0, 0.8)"
                        }}
                      />
                    </motion.button>
                  </div>
                </div>

                <motion.div
                  className={`absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-br ${product.color} rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
                  animate={hoveredId === product.id ? { scale: 1.2 } : { scale: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
