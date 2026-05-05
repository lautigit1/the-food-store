import { motion } from "motion/react";
import { useState } from "react";

export function ReservationsPage() {
  const [focused, setFocused] = useState<string | null>(null);

  const inputClasses = "w-full bg-transparent border-b border-[#F8F8F8]/20 py-3 text-[#F8F8F8] font-mono text-sm focus:outline-none focus:border-[#FF5A00] transition-colors duration-300 placeholder:text-[#F8F8F8]/20";

  return (
    <div className="relative min-h-screen bg-[#0B0B0B] text-[#F8F8F8] overflow-hidden flex items-center pt-32 pb-24">
      {/* Background Noise */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            <p className="text-xs tracking-[0.4em] text-[#FF5A00] uppercase font-mono mb-6">
              — Tu Mesa
            </p>
            <h1
              className="text-[4rem] md:text-[6rem] font-bold leading-[0.9] tracking-tight mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Reservá <br />
              <span className="italic font-light text-[#F8F8F8]/40">una velada.</span>
            </h1>
            <p className="text-[#F8F8F8]/50 leading-relaxed font-light text-lg mb-12 max-w-md" style={{ fontFamily: "'Inter', sans-serif" }}>
              Nuestra capacidad es limitada a 40 comensales por noche para garantizar una atención exquisita. Las reservas se abren con 30 días de anticipación.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="bg-white/[0.02] border border-white/[0.05] p-10 md:p-14 backdrop-blur-xl relative overflow-hidden"
          >
            {/* Form glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5A00]/10 rounded-full blur-[100px] pointer-events-none" />

            <form className="relative z-10 space-y-8" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] tracking-widest font-mono text-[#F8F8F8]/40 uppercase mb-2">Nombre completo</label>
                  <input type="text" placeholder="Ej. Ana García" className={inputClasses} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest font-mono text-[#F8F8F8]/40 uppercase mb-2">Comensales</label>
                  <select className={`${inputClasses} appearance-none bg-[#0B0B0B]`} onFocus={() => setFocused('guests')} onBlur={() => setFocused(null)}>
                    <option>2 Personas</option>
                    <option>3 Personas</option>
                    <option>4 Personas</option>
                    <option>5+ Personas (Requiere seña)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] tracking-widest font-mono text-[#F8F8F8]/40 uppercase mb-2">Fecha</label>
                  <input type="date" className={`${inputClasses} [color-scheme:dark]`} onFocus={() => setFocused('date')} onBlur={() => setFocused(null)} />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest font-mono text-[#F8F8F8]/40 uppercase mb-2">Hora</label>
                  <select className={`${inputClasses} appearance-none bg-[#0B0B0B]`} onFocus={() => setFocused('time')} onBlur={() => setFocused(null)}>
                    <option>19:00</option>
                    <option>20:00</option>
                    <option>21:00</option>
                    <option>22:00</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-widest font-mono text-[#F8F8F8]/40 uppercase mb-2">Notas Especiales / Alergias</label>
                <textarea rows={2} className={`${inputClasses} resize-none`} placeholder="Opcional..." onFocus={() => setFocused('notes')} onBlur={() => setFocused(null)} />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#F8F8F8] text-[#0B0B0B] py-4 font-mono text-sm tracking-widest uppercase font-bold mt-4 hover:bg-[#FF5A00] hover:text-white transition-colors duration-500"
              >
                Solicitar Reserva
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
