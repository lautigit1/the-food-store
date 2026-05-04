import { motion } from "motion/react";
import { Instagram, Twitter, Facebook, Mail, MapPin, Phone } from "lucide-react";

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" }
];

const footerLinks = {
  Menu: ["Burgers", "Drinks", "Desserts", "Specials"],
  About: ["Our Story", "Team", "Careers", "Press"],
  Support: ["Contact", "FAQ", "Delivery", "Catering"]
};

export function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] border-t border-white/10 overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF5A00] via-[#FFD500] to-[#8B5CF6]"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: "200% 100%"
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,90,0,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,213,0,0.1),transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-5xl font-black mb-4">
                <span className="bg-gradient-to-r from-[#FF5A00] to-[#FFD500] bg-clip-text text-transparent">
                  THE FOOD
                </span>
              </h3>
              <h3 className="text-5xl font-black text-white mb-6">STORE</h3>
              <p className="text-white/70 text-lg mb-6 max-w-md">
                Creating extraordinary food experiences, one bite at a time.
              </p>

              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="group relative w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:border-[#FF5A00] transition-all duration-300"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <social.icon className="w-5 h-5 text-white/70 group-hover:text-[#FF5A00] transition-colors" />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF5A00] to-[#FFD500] opacity-0 group-hover:opacity-20 transition-opacity"
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {Object.entries(footerLinks).map(([category, links], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
            >
              <h4 className="text-xl font-bold text-white mb-6">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      className="text-white/60 hover:text-[#FF5A00] transition-colors duration-300 inline-block"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="border-t border-white/10 pt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF5A00] to-[#FFD500] flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white/50 text-sm">Location</p>
                <p className="text-white">123 Food Street, NY 10001</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FFD500] to-[#FF5A00] flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white/50 text-sm">Call Us</p>
                <p className="text-white">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF5A00] to-[#8B5CF6] flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white/50 text-sm">Email</p>
                <p className="text-white">hello@thefoodstore.com</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/50">
            <p>© 2026 THE FOOD STORE. All rights reserved.</p>
            <div className="flex gap-6">
              <motion.a href="#" className="hover:text-[#FF5A00] transition-colors" whileHover={{ y: -2 }}>
                Privacy Policy
              </motion.a>
              <motion.a href="#" className="hover:text-[#FF5A00] transition-colors" whileHover={{ y: -2 }}>
                Terms of Service
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5A00] to-transparent"
        animate={{
          opacity: [0.3, 1, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </footer>
  );
}
