import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Search,
  SearchX,
  Calendar,
  Star,
  Sparkles,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dicoding1 from "../assets/img/sertifikat/dicoding1.png";
import dicoding2 from "../assets/img/sertifikat/dicoding2.png";
import sololearn1 from "../assets/img/sertifikat/sololearn1.png";
import sololearn2 from "../assets/img/sertifikat/sololearn2.png";
import sololearn3 from "../assets/img/sertifikat/sololearn3.png";
import idn1 from "../assets/img/sertifikat/idn1.png";

gsap.registerPlugin(ScrollTrigger);

export default function Achievement() {
  const [searchTerm, setSearchTerm] = useState("");
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  const achievementData = [
    {
      id: 1,
      title: "Introduction to Financial Literacy",
      category: "Certification",
      date: "Mei 2026",
      image: dicoding1,
      desc: "Kelas Literasi Finansial Coding Camp DBS Foundation 2026: Kuasai prinsip dasar, keputusan keuangan harian, dan strategi jangka panjang.",
    },
    {
      id: 2,
      title: "Introduction to HTML",
      category: "Certification",
      date: "Nov 2025",
      image: sololearn1,
      desc: "Sertifikat resmi dari Sololearn atas penyelesaian kursus Introduction to HTML. Menunjukkan pemahaman teoretis dan praktis dalam membangun struktur dasar halaman web (fundamental web development).",
    },
    {
      id: 3,
      title: "Introduction to CSS",
      category: "Certification",
      date: "Nov 2025",
      image: sololearn2,
      desc: "Sertifikat resmi dari Sololearn atas penyelesaian kursus Introduction to CSS. Menunjukkan pemahaman teoretis dan praktis dalam merancang desain, tata letak (layout), serta aspek visual halaman web yang responsif.",
    },
    {
      id: 4,
      title: "Introduction to JavaScript",
      category: "Certification",
      date: "Nov 2025",
      image: sololearn3,
      desc: "Sertifikat resmi dari Sololearn atas penyelesaian kursus Introduction to JavaScript. Menunjukkan pemahaman teoretis dan praktis mengenai logika pemrograman, manipulasi elemen web, dan dasar pembuatan website yang interaktif.",
      highlight: true,
    },
    {
      id: 5, // Sesuaikan nomor urutnya
      title: "Peserta Lomba Web Dev - IDN IT FEST 2025",
      category: "Achievement",
      date: "Nov 2025",
      image: idn1,
      desc: "Sertifikat penghargaan atas partisipasi aktif sebagai peserta dalam kompetisi Web Development (Web Dev) yang diselenggarakan secara offline oleh IDN Boarding School pada ajang IDN IT Fest 2025.",
    },
    {
      id: 6, // Sesuaikan kembali nomor urutnya
      title: "Belajar Dasar Pemrograman Web",
      category: "Certification",
      date: "Okt 2024",
      image: dicoding2, // Sesuaikan dengan nama variabel/asset gambarmu
      desc: "Sertifikat kompetensi kelulusan resmi dari Dicoding Indonesia. Menunjukkan penguasaan materi fundamental pembuatan website standar global menggunakan HTML, CSS, serta teknik tata letak yang responsif.",
    },
  ];

  const filteredData = achievementData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // ================= GSAP "FILM REVEAL" ANIMATION =================
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animasi Header (Cinematic Fade)
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      // 2. Animasi Grid Reveal (Dari bawah dengan Masking)
      // Kita animasi children dari grid
      const cards = gridRef.current.querySelectorAll(".achievement-card");

      gsap.fromTo(
        cards,
        {
          y: 100,
          scale: 0.9,
          opacity: 0,
          filter: "grayscale(100%)", // Awal hitam putih
          borderRadius: "0px", // Awal kotak
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          filter: "grayscale(0%)", // Jadi berwarna
          borderRadius: "24px", // Jadi bulat
          duration: 1,
          ease: "power3.out",
          stagger: 0.15, // Jeda antar kartu
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [searchTerm]);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative bg-slate-950 py-24 md:py-32 w-full min-h-screen overflow-hidden font-jakarta">
      {/* Ambient Studio Lighting */}
      <div className="top-0 left-1/4 absolute bg-amber-500/10 blur-[150px] rounded-full w-[600px] h-[600px] pointer-events-none" />
      <div className="right-0 bottom-0 absolute bg-utama/10 blur-[100px] rounded-full w-[400px] h-[400px] pointer-events-none" />

      <div className="z-10 relative mx-auto px-6 md:pr-8 md:pl-28 max-w-6xl h-full">
        {/* Header */}
        <div
          ref={titleRef}
          className="flex md:flex-row flex-col justify-between items-start md:items-end gap-6 mb-16">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500 opacity-30 blur-xl animate-pulse"></div>
              <div className="relative bg-gradient-to-tr from-yellow-400 to-amber-500 shadow-lg p-3 rounded-xl">
                <Trophy size={24} className="text-slate-950" />
              </div>
            </div>
            <div>
              <h2 className="font-black text-white text-3xl md:text-5xl leading-tight tracking-tight">
                Achievements
              </h2>
              <p className="flex items-center gap-2 mt-1 text-slate-500 text-sm">
                <Star size={12} className="text-yellow-500" /> Collection of
                Milestones
              </p>
            </div>
          </div>

          {/* Search Bar - Minimalist */}
          <div className="group relative w-full md:w-64">
            <div className="absolute inset-0 bg-white/5 opacity-0 group-focus-within:opacity-100 blur-xl rounded-full transition-opacity"></div>
            <div className="relative flex items-center bg-slate-900/50 backdrop-blur-sm px-5 py-3 border border-white/10 group-focus-within:border-yellow-500/50 rounded-full transition-colors">
              <Search size={16} className="mr-3 text-slate-500" />
              <input
                type="text"
                placeholder="Search awards..."
                className="bg-transparent outline-none w-full text-white placeholder:text-slate-600 text-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div
          ref={gridRef}
          className="gap-6 grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(180px,auto)]">
          <AnimatePresence mode="popLayout">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  className={`achievement-card group relative overflow-hidden cursor-pointer ${
                    item.highlight
                      ? "md:col-span-2 md:row-span-2" // Kartu Utama Besar
                      : "col-span-1"
                  }`}
                  whileHover={{ scale: 1.01 }}>
                  {/* Card Container - Glassmorphism & Border Gradient */}
                  <div className="relative bg-slate-900/40 border border-white/5 group-hover:border-yellow-500/30 rounded-3xl w-full h-full overflow-hidden transition-all duration-500">
                    {/* Image Layer */}
                    <div className="z-0 absolute inset-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="opacity-80 group-hover:opacity-100 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Gradient Overlay - Heavy on text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent opacity-90 group-hover:opacity-70 transition-opacity"></div>
                    </div>

                    {/* Content Layer */}
                    <div className="z-10 relative flex flex-col justify-end p-6 md:p-8 h-full">
                      {/* Top Badges */}
                      <div className="top-4 right-4 absolute flex gap-2">
                        {item.highlight && (
                          <span className="bg-yellow-500 shadow-lg shadow-yellow-500/30 px-3 py-1 rounded-full font-bold text-[10px] text-slate-950 uppercase">
                            Best of the Best
                          </span>
                        )}
                        <span className="bg-white/10 backdrop-blur-md px-3 py-1 border border-white/10 rounded-full font-semibold text-[10px] text-white uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>

                      {/* Bottom Content */}
                      <div className="mt-auto">
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          className="space-y-2">
                          <h3
                            className={`font-bold text-white leading-tight ${
                              item.highlight
                                ? "text-2xl md:text-4xl"
                                : "text-lg md:text-xl"
                            }`}>
                            {item.title}
                          </h3>
                          <p className="hidden md:block text-slate-400 text-sm line-clamp-2">
                            {item.desc}
                          </p>

                          <div className="flex justify-between items-center mt-2 pt-2 border-white/10 border-t">
                            <div className="flex items-center gap-2 text-slate-500 text-xs">
                              <Calendar size={12} />
                              <span>{item.date}</span>
                            </div>
                            <motion.span
                              className="flex items-center gap-1 opacity-0 group-hover:opacity-100 font-semibold text-yellow-500 text-xs transition-opacity"
                              whileHover={{ x: 3 }}>
                              View <Sparkles size={12} />
                            </motion.span>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Shine Effect on Hover */}
                    <div className="z-20 absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full duration-1000"></div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col justify-center items-center col-span-full bg-slate-900/30 py-20 border border-white/5 rounded-3xl text-center">
                <div className="bg-slate-800 mb-4 p-4 border border-white/5 rounded-full">
                  <SearchX size={24} className="text-slate-600" />
                </div>
                <p className="font-semibold text-slate-500">Award not found</p>
                <p className="mt-1 text-slate-600 text-sm">
                  Try another keyword...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
