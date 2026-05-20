import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Code,
  Briefcase,
  Mail,
  Route,
  Award,
  Menu,
  X,
} from "lucide-react";
import gsap from "gsap";

// Pindahkan menuItems ke luar komponen agar tidak re-render berulang kali
const menuItems = [
  { name: "Home", icon: Home, link: "#hero" }, // Diubah dari "#" menjadi "#hero"
  { name: "About", icon: User, link: "#aboutMe" },
  { name: "Skills", icon: Code, link: "#mySkills" },
  { name: "Projects", icon: Briefcase, link: "#myProject" },
  { name: "Journey", icon: Route, link: "#timeline" },
  { name: "Awards", icon: Award, link: "#achievements" },
  { name: "Contact", icon: Mail, link: "#contact" },
];

export default function Header() {
  const [activeLink, setActiveLink] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // ================= LOGIC SCROLL SPY (PERBAIKAN UTAMA) =================
  useEffect(() => {
    const handleScroll = () => {
      // Ambil posisi scroll saat ini + offset (misal 150px dari atas)
      const scrollPosition = window.scrollY + 200;

      // Loop melalui semua menu items untuk menemukan section yang aktif
      for (let i = 0; i < menuItems.length; i++) {
        const item = menuItems[i];

        // Ambil ID section dari link (contoh: #aboutMe -> aboutMe)
        const sectionId = item.link.substring(1);
        const section = document.getElementById(sectionId);

        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          // Cek apakah posisi scroll ada di dalam range section ini
          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveLink(item.name);
            break; // Hentikan loop jika sudah ketemu
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Animation untuk Ambient Light di Mobile Menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.to(".ambient-orb", {
        x: 50,
        y: -30,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* ==================== DESKTOP SIDEBAR (Fixed Left) ==================== */}
      <header className="hidden top-0 left-0 z-50 fixed md:flex flex-col justify-between bg-slate-950/80 backdrop-blur-xl border-white/5 border-r w-20 lg:w-50 h-screen font-jakarta">
        <div className="flex flex-col items-center lg:items-start p-6 border-white/5 border-b">
          <a href="#" className="group flex items-center gap-3">
            <div className="flex justify-center items-center bg-utama rounded-xl w-10 h-10 font-black text-white text-lg group-hover:rotate-6 transition-transform">
              F
            </div>
            <div className="hidden lg:block">
              <h1 className="font-bold text-white text-sm tracking-wide">
                Fawwaz
              </h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                Portfolio
              </p>
            </div>
          </a>
        </div>

        <nav className="flex-1 py-8 overflow-y-auto scrollbar-hide">
          <ul className="flex flex-col items-center lg:items-stretch gap-2 px-4">
            {menuItems.map((item, index) => (
              <li key={item.name} className="w-full">
                <a
                  href={item.link}
                  onClick={() => setActiveLink(item.name)} // Tetap pertahankan onClick untuk instant feedback
                  className={`group relative flex items-center justify-center lg:justify-start gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeLink === item.name
                      ? "text-white"
                      : "text-slate-500 hover:text-slate-200"
                  }`}>
                  {activeLink === item.name && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="left-0 absolute inset-y-2 bg-utama rounded-r-full w-1"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  <item.icon
                    size={20}
                    strokeWidth={1.5}
                    className="z-10 relative"
                  />

                  <span className="hidden lg:block z-10 relative font-medium text-xs uppercase tracking-wider">
                    {item.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-6 border-white/5 border-t">
          <div className="hidden lg:flex flex-col gap-2 text-slate-400">
            <p className="text-[10px]">© 2024 Fawwaz</p>
            <p className="text-[10px]">Built with Passion</p>
          </div>
          <div className="lg:hidden flex justify-center">
            <div className="bg-utama rounded-full w-2 h-2 animate-pulse"></div>
          </div>
        </div>
      </header>

      {/* ==================== MOBILE NAVIGATION (Floating Bottom) ==================== */}
      <div className="md:hidden right-0 bottom-0 left-0 z-50 fixed px-4 pb-4 font-jakarta">
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex justify-around items-center bg-slate-900/80 shadow-2xl shadow-black/20 backdrop-blur-xl px-4 py-3 border border-white/10 rounded-2xl">
          {menuItems.slice(0, 5).map((item) => (
            <a
              key={item.name}
              href={item.link}
              onClick={() => setActiveLink(item.name)}
              className={`relative flex flex-col items-center gap-1 p-2 rounded-xl transition-colors duration-300 ${
                activeLink === item.name ? "text-utama" : "text-slate-400"
              }`}>
              <item.icon size={20} strokeWidth={1.5} />

              {activeLink === item.name && (
                <motion.div
                  layoutId="mobileIndicator"
                  className="-bottom-1 absolute bg-utama rounded-full w-1 h-1"
                />
              )}
            </a>
          ))}

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-slate-400 hover:text-utama transition-colors">
            <Menu size={20} />
          </button>
        </motion.nav>
      </div>

      {/* ==================== MOBILE OVERLAY MENU ==================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ clipPath: "circle(0% at 92% 92%)", opacity: 0 }}
            animate={{ clipPath: "circle(150% at 92% 92%)", opacity: 1 }}
            exit={{ clipPath: "circle(0% at 92% 92%)", opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden z-[60] fixed inset-0 flex flex-col justify-center items-center bg-slate-950/95 backdrop-blur-xl p-8 font-jakarta">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="top-6 right-6 z-50 absolute bg-white/5 hover:bg-white/10 p-3 border border-white/10 rounded-full text-white transition-colors">
              <X size={24} />
            </button>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="top-1/4 left-1/4 absolute bg-utama/10 blur-[100px] rounded-full w-64 h-64 ambient-orb"></div>
              <div className="right-1/4 bottom-1/4 absolute bg-teal-500/10 blur-[80px] rounded-full w-48 h-48 ambient-orb"></div>
            </div>

            <div className="z-10 relative flex flex-col gap-4 mt-[-40px] w-full max-w-sm">
              {menuItems.map((item, i) => (
                <motion.a
                  href={item.link}
                  key={item.name}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.07, ease: "easeOut" }}
                  onClick={() => {
                    setActiveLink(item.name);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`group flex items-center gap-5 p-4 rounded-2xl border transition-all duration-300 ${
                    activeLink === item.name
                      ? "bg-utama/10 border-utama/30 text-utama"
                      : "bg-white/5 border-white/5 text-white hover:bg-white/10"
                  }`}>
                  <div
                    className={`flex items-center justify-center p-2 rounded-xl transition-colors ${
                      activeLink === item.name
                        ? "bg-utama text-white"
                        : "bg-white/5 group-hover:bg-white/10"
                    }`}>
                    <item.icon size={22} strokeWidth={1.5} />
                  </div>

                  <div className="flex-1">
                    <span className="font-bold text-lg tracking-wide">
                      {item.name}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
