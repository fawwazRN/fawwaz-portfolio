import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Cpu,
  Layout,
  Server,
  Video,
  PenTool,
  Sparkles,
  Layers,
  Database,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skill as mySkill } from "./asset";

gsap.registerPlugin(ScrollTrigger);

export default function MySkills() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);
  const progressRefs = useRef([]);
  const countRefs = useRef([]);

  // Mapping Icon Spesifik
  const iconMap = {
    Frontend: Layout,
    Backend: Server,
    "Video Editing": Video,
    "Creative Writing": PenTool,
    "UI/UX": Layers,
    Database: Database,
    default: Code2,
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animasi Header
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        filter: "blur(10px)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      // 2. Animasi Kartu (3D Entrance)
      cardRefs.current.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 100,
          rotateX: -20, // Efek datang dari jauh
          scale: 0.9,
          duration: 0.8,
          ease: "back.out(1.4)",
          delay: index * 0.1,
          scrollTrigger: { trigger: card, start: "top 85%" },
          onStart: () => animateProgress(index),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const animateProgress = (index) => {
    const item = mySkill[index];
    if (!item || !progressRefs.current[index]) return;

    gsap.to(progressRefs.current[index], {
      width: `${item.persent}%`,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
    });
    gsap.to(countRefs.current[index], {
      innerText: item.persent,
      duration: 1.5,
      snap: { innerText: 1 },
    });
  };

  // ================= LOGIC 3D TILT =================
  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Hitung Rotasi (Max 15 derajat)
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    // Terapkan via GSAP biar smooth
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power1.out",
    });

    // Set CSS variable untuk efek Glare (Cahaya)
    card.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = (index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="mySkills"
      className="relative bg-slate-950 py-24 md:py-32 w-full min-h-screen overflow-hidden font-jakarta">
      {/* Ambient Background */}
      <div className="z-0 absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[40px_40px]"></div>
        {/* Moving Glow */}
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="top-1/3 left-1/4 absolute bg-utama/10 blur-[150px] rounded-full w-[600px] h-[600px]"></motion.div>
      </div>

      <div className="z-10 relative mx-auto px-6 md:pr-8 md:pl-28 max-w-6xl h-full">
        {/* Header */}
        <div ref={titleRef} className="flex items-center gap-4 mb-16">
          <div className="bg-utama shadow-lg shadow-utama/30 p-2 rounded-lg">
            <Cpu size={18} className="text-white" />
          </div>
          <h2 className="font-bold text-white text-xl md:text-2xl tracking-tight">
            Tech Stack & Capabilities
          </h2>
          <div className="flex-1 bg-linear-to-r from-utama/50 to-transparent h-px"></div>
        </div>

        {/* Grid Layout: 2 Kolom di Tablet, 4 Kolom di Desktop */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {mySkill.map((item, index) => {
            const IconComponent = iconMap[item.name] || iconMap["default"];

            return (
              <div
                key={item.name}
                ref={(el) => (cardRefs.current[index] = el)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                // Preserve 3D penting biar anak-anaknya ngaruh
                className="group relative bg-slate-900/50 p-6 border border-white/5 rounded-2xl overflow-hidden cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}>
                {/* --- EFEK GLARE (Cahaya Mengikuti Mouse) --- */}
                <div
                  className="z-10 absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16, 185, 129, 0.3), transparent 50%)`,
                  }}></div>

                {/* --- CONTENT --- */}
                <div className="z-20 relative flex flex-col justify-between h-full min-h-60">
                  {/* Top: Icon & Percentage */}
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className="bg-utama/10 group-hover:bg-utama p-3 rounded-xl text-utama group-hover:text-white transition-colors duration-300"
                      style={{ transform: "translateZ(40px)" }} // Efek Z-axis
                    >
                      <IconComponent size={24} />
                    </div>

                    <div className="text-right">
                      <span
                        ref={(el) => (countRefs.current[index] = el)}
                        className="font-black text-white text-3xl">
                        0
                      </span>
                      <span className="text-slate-500 text-lg">%</span>
                    </div>
                  </div>

                  {/* Bottom: Name & Progress */}
                  <div>
                    <h3 className="mb-4 font-bold text-white text-lg uppercase tracking-wider">
                      {item.name}
                    </h3>

                    {/* Progress Track */}
                    <div className="bg-slate-800 rounded-full w-full h-2 overflow-hidden">
                      <div
                        ref={(el) => (progressRefs.current[index] = el)}
                        className="relative bg-utama shadow-[0_0_10px_rgba(16,185,129,0.5)] rounded-full w-0 h-full">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Background Gradient */}
                <div className="z-0 absolute inset-0 bg-linear-to-br from-utama/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
}
