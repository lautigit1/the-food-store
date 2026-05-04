import { motion, useAnimationControls } from "motion/react";
import { useEffect } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Food Blogger",
    avatar: "👨",
    comment: "This isn't just food, it's an absolute experience. Mind-blowing flavors!",
    rating: 5,
    gradient: "from-[#FF5A00] to-[#FF1744]"
  },
  {
    id: 2,
    name: "Maya Chen",
    role: "Chef",
    avatar: "👩‍🍳",
    comment: "As a professional chef, I'm impressed by the creativity and execution here.",
    rating: 5,
    gradient: "from-[#FFD500] to-[#F59E0B]"
  },
  {
    id: 3,
    name: "Jordan Smith",
    role: "Student",
    avatar: "🧑‍🎓",
    comment: "Best burgers in town, hands down. The vibes are immaculate!",
    rating: 5,
    gradient: "from-[#8B5CF6] to-[#EC4899]"
  },
  {
    id: 4,
    name: "Sam Lee",
    role: "Designer",
    avatar: "👨‍🎨",
    comment: "The presentation is art. The taste is heaven. Absolutely perfect.",
    rating: 5,
    gradient: "from-[#10B981] to-[#FFD500]"
  },
  {
    id: 5,
    name: "Emma Davis",
    role: "Entrepreneur",
    avatar: "👩‍💼",
    comment: "My team's favorite spot for lunch. Quality and innovation in every bite.",
    rating: 5,
    gradient: "from-[#FF5A00] to-[#8B5CF6]"
  },
  {
    id: 6,
    name: "Ryan Park",
    role: "Developer",
    avatar: "👨‍💻",
    comment: "The perfect fuel for coding sessions. This place gets it right.",
    rating: 5,
    gradient: "from-[#FFD500] to-[#10B981]"
  }
];

export function TestimonialsSection() {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      x: [0, -2400],
      transition: {
        duration: 40,
        repeat: Infinity,
        ease: "linear"
      }
    });
  }, [controls]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0A0A0A] py-32 overflow-hidden">
      <motion.div
        className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-[#FF5A00] rounded-full blur-[200px] opacity-10"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-7xl md:text-9xl font-black mb-6">
            <span className="text-white">What people</span>
            <br />
            <span className="bg-gradient-to-r from-[#FFD500] via-[#FF5A00] to-[#8B5CF6] bg-clip-text text-transparent">
              are saying
            </span>
          </h2>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />

        <motion.div
          className="flex gap-6"
          animate={controls}
        >
          {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
            <motion.div
              key={`${testimonial.id}-${index}`}
              className="flex-shrink-0 w-[400px]"
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-[#FF5A00]/50 transition-all duration-500 h-full">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 hover:opacity-20 transition-opacity duration-500 rounded-3xl`}
                  whileHover={{ scale: 1.1 }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF5A00] to-[#FFD500] flex items-center justify-center text-4xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{testimonial.name}</h4>
                      <p className="text-white/60">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#FFD500] text-[#FFD500]" />
                    ))}
                  </div>

                  <p className="text-white/80 text-lg leading-relaxed">
                    "{testimonial.comment}"
                  </p>
                </div>

                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#FF5A00] to-transparent rounded-full blur-3xl opacity-0 hover:opacity-40 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
