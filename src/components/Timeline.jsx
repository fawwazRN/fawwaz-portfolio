import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Rocket,
  GraduationCap,
  Code,
  Laptop,
  Award,
  ExternalLink,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const cardRefs = useRef([]);
  const titleRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null);

  // ================= DATA =================
  const timelineData = [
    {
      year: "2021",
      title: "Awal Minat IT",
      desc: "Mulai tertarik mendalami dunia teknologi informasi dan belajar pemrograman dasar secara mandiri.",
      icon: Laptop,
      color: "#10b981", // Emerald
    },
    {
      year: "2022",
      title: "Pendidikan Pesantren",
      desc: "Bergabung dengan Abudzar Tahfizh Plus IT. Menyeimbangkan hafalan Al-Qur'an dan fundamental IT bersama Ustadz Firman Azhary.",
      icon: GraduationCap,
      color: "#3b82f6", // Blue
    },
    {
      year: "2023",
      title: "Proyek Pertama",
      desc: "Mengerjakan proyek kolaboratif seperti Indotravel dan Webkita sebagai implementasi skill.",
      icon: Code,
      color: "#8b5cf6", // Purple
    },
    {
      year: "2024",
      title: "Pengembangan Diri",
      desc: "Membangun Portfolio pribadi, Eduverse, dan aktif dalam berbagai proyek IT kelas 10.",
      icon: Rocket,
      color: "#f59e0b", // Amber
    },
  ];

  const highlightData = [
    {
      name: "Abudzar Tahfizh Plus IT",
      link: "#",
      img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600",
      desc: "Pondok Pesantren unggulan.",
    },
    {
      name: "Ustadz Firman Azhary",
      link: "#",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600",
      desc: "Mentor IT & Tahfizh.",
    },
    {
      name: "Indotravel",
      link: "#",
      img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=600",
      desc: "Platform wisata Indonesia.",
    },
    {
      name: "Webkita",
      link: "#",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600",
      desc: "Komunitas developer.",
    },
    {
      name: "Eduverse",
      link: "#",
      img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=600",
      desc: "Platform edukasi meta.",
    },
  ];

  // ================= GSAP ANIMATIONS =================
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      // 2. Line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 50%",
            scrub: 0.5,
          },
        },
      );

      // 3. Cards
      cardRefs.current.forEach((card, index) => {
        const isLeft = index % 2 === 0;
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.8, y: 100, rotateY: isLeft ? 45 : -45 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotateY: 0,
            duration: 1.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
              onEnter: () => setActiveIndex(index),
            },
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Helper: Render Text
  const renderText = (text) => {
    const parts = text.split(
      /(\bAbudzar Tahfizh Plus IT\b|\bIndotravel\b|\bWebkita\b|\bEduverse\b|\bUstadz Firman Azhary\b)/g,
    );
    return parts.map((part, i) => {
      const found = highlightData.find((h) => h.name === part);
      if (found) {
        return (
          <span
            key={i}
            className="group/tooltip inline-block relative font-semibold text-utama hover:text-white transition-colors cursor-pointer"
            onMouseEnter={() => setActiveTooltip(found.name)}
            onMouseLeave={() => setActiveTooltip(null)}>
            {part}
            <span className="bottom-0 left-0 absolute bg-utama/50 w-full h-0.5 scale-x-0 group-hover/tooltip:scale-x-100 origin-left transition-transform"></span>

            {/* TOOLTIP */}
            {activeTooltip === found.name && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="top-full left-1/2 z-9999 absolute mt-3 w-64 -translate-x-1/2">
                <div className="bg-slate-900 shadow-2xl backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
                  <img src={found.img} className="w-full h-28 object-cover" />
                  <div className="p-3">
                    <h4 className="mb-1 font-bold text-white text-sm">
                      {found.name}
                    </h4>
                    <p className="mb-2 text-[10px] text-slate-400">
                      {found.desc}
                    </p>
                    <a
                      href={found.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex justify-center items-center gap-1 bg-utama/20 hover:bg-utama py-1.5 rounded w-full text-[10px] text-white transition-colors">
                      Visit <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
                <div className="-top-2 left-1/2 absolute border-transparent border-r-8 border-b-8 border-b-slate-900 border-l-8 w-0 h-0 -translate-x-1/2"></div>
              </motion.div>
            )}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative bg-slate-950 py-32 w-full overflow-hidden font-jakarta">
      {/* Ambient Light */}
      {timelineData.map((item, i) => (
        <div
          key={i}
          className="absolute inset-0 opacity-0 transition-opacity duration-1000 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${item.color}20, transparent 60%)`,
            opacity: activeIndex === i ? 1 : 0,
          }}
        />
      ))}

      {/* PENTING: lg:pl-80 biar gak ketutup sidebar expanded */}
      <div className="z-10 relative mx-auto px-6 md:pr-8 md:pl-28 lg:pl-80 max-w-6xl">
        {/* Header */}
        <div ref={titleRef} className="flex items-center gap-4 mb-20">
          <div className="bg-utama shadow-lg shadow-utama/30 p-3 rounded-xl">
            <Calendar size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-black text-white text-3xl md:text-4xl tracking-tight">
              My Journey
            </h2>
            <p className="mt-1 text-slate-500 text-sm">Timeline of growth</p>
          </div>
        </div>

        {/* Grid */}
        <div className="relative min-h-[150vh] md:min-h-screen">
          {/* Line */}
          <div className="top-0 bottom-0 left-6 md:left-1/2 absolute bg-slate-800 rounded-full w-1 overflow-hidden md:-translate-x-1/2 transform">
            <div
              ref={lineRef}
              className="bg-linear-to-b from-utama via-teal-400 to-purple-500 w-full h-full origin-top"
            />
          </div>

          {/* Cards */}
          <div className="space-y-32 md:space-y-40">
            {timelineData.map((item, index) => {
              const IconComponent = item.icon;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  // PENTING: class 'group' dipindah sini biar bisa kontrol anak2nya
                  className={`relative w-full md:w-1/2 ${isLeft ? "md:pr-12" : "md:pl-12 md:ml-auto"} group z-20`}
                  style={{ perspective: "1000px" }}>
                  {/* Icon/Logo (Hidden by default, show on hover) */}
                  <div
                    className="top-0 left-6 md:left-0 z-30 absolute flex justify-center items-center opacity-0 group-hover:opacity-100 rounded-full w-12 h-12 transition-all md:-translate-x-1/2 duration-500 transform"
                    style={{
                      backgroundColor:
                        activeIndex === index ? item.color : "#1e293b",
                      boxShadow:
                        activeIndex === index
                          ? `0 0 30px ${item.color}`
                          : "none",
                    }}>
                    <IconComponent size={20} className="text-white" />
                  </div>

                  {/* Card Content */}
                  <div
                    className="group/card relative bg-slate-900/80 backdrop-blur-md ml-20 md:ml-0 p-8 border border-white/10 hover:border-utama/30 rounded-3xl overflow-visible transition-all duration-500"
                    style={{
                      boxShadow:
                        activeIndex === index
                          ? `0 30px 60px -10px ${item.color}20`
                          : "none",
                    }}>
                    {/* Year (Hidden by default, show on hover) */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="opacity-0 group-hover:opacity-100 font-black text-white/10 group-hover:text-white/20 text-4xl transition-colors duration-300">
                        {item.year}
                      </span>
                    </div>

                    <h3 className="mb-4 font-bold text-white text-2xl">
                      {item.title}
                    </h3>

                    <p className="z-50 relative text-slate-400 text-sm leading-relaxed">
                      {renderText(item.desc)}
                    </p>

                    <div className="right-4 bottom-4 absolute opacity-10 group-hover/card:opacity-30 transition-opacity pointer-events-none">
                      <IconComponent size={60} className="text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="z-10 relative flex justify-center mt-40">
          <div className="flex items-center gap-3 bg-slate-900 px-6 py-3 border border-white/10 rounded-full">
            <Award size={16} className="text-utama animate-pulse" />
            <span className="font-semibold text-white text-sm">
              The Journey Continues...
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
