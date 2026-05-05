import { motion } from "motion/react";

export function ContactPage() {
  const inputClasses = "w-full bg-transparent border-b border-[#F8F8F8]/20 py-3 text-[#F8F8F8] font-mono text-sm focus:outline-none focus:border-[#C1121F] transition-colors duration-300 placeholder:text-[#F8F8F8]/20";

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col justify-center"
          >
            <p className="text-xs tracking-[0.4em] text-[#C1121F] uppercase font-mono mb-6">
              — Diálogo
            </p>
            <h1
              className="text-[4rem] md:text-[6rem] font-bold leading-[0.9] tracking-tight mb-12"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Hablemos <br />
              <span className="italic font-light text-[#F8F8F8]/40">de comida.</span>
            </h1>
            
            <div className="space-y-8 font-mono text-sm tracking-widest text-[#F8F8F8]/60 uppercase">
              <div>
                <p className="text-[#F8F8F8] mb-2 font-bold">Ubicación</p>
                <p>Palermo Soho, Buenos Aires</p>
                <p>Argentina</p>
              </div>
              <div>
                <p className="text-[#F8F8F8] mb-2 font-bold">Horarios</p>
                <p>Mar - Sab: 19:00 - 01:00</p>
                <p>Dom - Lun: Cerrado</p>
              </div>
              <div>
                <p className="text-[#F8F8F8] mb-2 font-bold">Contacto Directo</p>
                <p>hola@thefoodstore.com</p>
                <p>+54 9 11 1234 5678</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="bg-white/[0.02] border border-white/[0.05] p-10 md:p-14 backdrop-blur-xl relative overflow-hidden"
          >
            {/* Form glow */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C1121F]/10 rounded-full blur-[100px] pointer-events-none" />

            <form className="relative z-10 space-y-8" onSubmit={e => e.preventDefault()}>
              <div>
                <label className="block text-[10px] tracking-widest font-mono text-[#F8F8F8]/40 uppercase mb-2">Nombre</label>
                <input type="text" placeholder="Ej. Carlos Gardel" className={inputClasses} />
              </div>

              <div>
                <label className="block text-[10px] tracking-widest font-mono text-[#F8F8F8]/40 uppercase mb-2">Email</label>
                <input type="email" placeholder="hola@ejemplo.com" className={inputClasses} />
              </div>

              <div>
                <label className="block text-[10px] tracking-widest font-mono text-[#F8F8F8]/40 uppercase mb-2">Asunto</label>
                <select className={`${inputClasses} appearance-none bg-[#0B0B0B]`}>
                  <option>Consulta General</option>
                  <option>Eventos Privados</option>
                  <option>Prensa</option>
                  <option>Oportunidades Laborales</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] tracking-widest font-mono text-[#F8F8F8]/40 uppercase mb-2">Mensaje</label>
                <textarea rows={4} className={`${inputClasses} resize-none`} placeholder="Escribí acá tu mensaje..." />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#F8F8F8] text-[#0B0B0B] py-4 font-mono text-sm tracking-widest uppercase font-bold mt-4 hover:bg-[#C1121F] hover:text-white transition-colors duration-500"
              >
                Enviar Mensaje
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
