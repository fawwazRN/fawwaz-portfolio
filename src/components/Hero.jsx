import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ArrowDown, CircleDot, Sparkles } from "lucide-react";
import gsap from "gsap";
import indo from "../assets/indo-conv.webm";

export default function Hero() {
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // ===== GSAP ANIMATION ENGINE =====
    const ctx = gsap.context(() => {
      // 1. Text Reveal (Stagger Effect)
      // Kita ambil semua kata di dalam class .hero-word
      gsap.fromTo(
        ".hero-word",
        { y: 120, opacity: 0, rotateX: -80 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.1, // Jeda antar kata
          duration: 1.2,
          ease: "power4.out",
          delay: 0.5,
        },
      );

      // 2. Floating Elements (Parallax kecil)
      gsap.to(".floating-shape", {
        y: -20,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1, // Loop infinite
        yoyo: true, // Balik lagi
        stagger: 0.5, // Gerak beda waktu
      });

      // 3. Intro Line & Badge
      gsap.fromTo(
        ".intro-item",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: 0.2, duration: 0.8, delay: 0.3 },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Magnetic Effect (Fungsi helper)
  const magneticHover = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3 });
  };

  const magneticLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative bg-slate-950 w-full h-screen overflow-hidden font-jakarta">
      {/* --- BACKGROUND ASSETS (Layering) --- */}
      <div className="z-0 absolute inset-0">
        <motion.video
          src={indo}
          autoPlay
          loop
          muted
          playsInline
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="w-full h-full object-cover"
        />
        {/* Gradient Utama (60% Rule) */}
        <div className="absolute inset-0 bg-linear-to-tr from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-slate-950/90" />

        {/* Noise Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-[0.15]" />
      </div>

      {/* --- DECORATIVE FLOATING SHAPES (GSAP) --- */}
      <div className="top-1/4 right-1/4 z-0 absolute bg-utama/10 blur-3xl rounded-full w-72 h-72 floating-shape" />
      <div className="right-10 bottom-1/4 z-0 absolute bg-teal-500/10 blur-3xl rounded-full w-48 h-48 floating-shape" />

      {/* --- CONTENT SECTION --- */}
      <div className="z-10 relative flex flex-col justify-center px-8 lg:px-96 md:pr-16 md:pl-80 w-full h-full">
        {/* Top: Name Badge (Personal Branding) */}
        <div className="flex items-center gap-3 mb-8 intro-item">
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 border border-white/10 rounded-full">
            <CircleDot size={10} className="text-green-400 animate-pulse" />
            <span className="font-medium text-slate-300 text-xs">
              Fawwaz Romzi Nagib
            </span>
          </div>
        </div>

        {/* Main Typography (GSAP Text Reveal) */}
        <div ref={textRef} className="max-w-3xl overflow-hidden">
          <h1 className="font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight">
            {/* Kita pecah jadi kata per kata buat animasi GSAP */}
            <span className="inline-block mr-3 hero-word">Creative</span>
            <span className="inline-block bg-clip-text bg-linear-to-r from-utama to-teal-400 mr-3 text-transparent hero-word">
              Developer
            </span>
            <br />
            <span className="inline-block mr-3 hero-word">&</span>
            <span className="inline-block hero-word">Designer.</span>
          </h1>
        </div>

        {/* Description & Status (Clean Layout) */}
        <div className="flex md:flex-row flex-col md:justify-between md:items-end gap-6 mt-10 max-w-4xl intro-item">
          {/* Left: Bio */}
          <div className="max-w-md">
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              A 10th-grade student passionate about building functional and
              aesthetic digital solutions. Let's turn ideas into reality.
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-4 mt-8">
              <motion.a
                href="#myProject"
                onMouseMove={magneticHover}
                onMouseLeave={magneticLeave}
                className="group flex items-center gap-2 bg-utama shadow-lg shadow-utama/20 hover:shadow-utama/40 px-6 py-3 rounded-lg font-semibold text-white text-sm transition-shadow duration-300">
                View Projects
                <ChevronRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </motion.a>

              <a
                href="#contact"
                className="font-semibold text-slate-400 hover:text-white text-sm transition-colors duration-300">
                Contact Me
              </a>
            </div>
          </div>

          {/* Right: Mini Stats/Status (Portfolio Credibility) */}
          <div className="hidden md:block bg-white/5 backdrop-blur-sm p-6 border border-white/10 rounded-2xl">
            <div className="flex items-center gap-4 mb-3">
              <Sparkles size={16} className="text-utama" />
              <span className="font-bold text-white text-sm uppercase tracking-wider">
                Status
              </span>
            </div>
            <p className="text-slate-400 text-sm">
              Currently open for{" "}
              <span className="font-medium text-white">freelance</span> projects
              & collaborations.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="bottom-10 left-1/2 z-20 absolute flex flex-col items-center gap-3 text-slate-500 -translate-x-1/2">
        <span className="text-[10px] uppercase tracking-[4px]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={16} className="text-utama/80" />
        </motion.div>
      </motion.div>

      {/* Decorative Frame (Legacy) */}
      <div className="hidden md:block z-10 absolute inset-0 md:m-10 p-8 border border-white/5 rounded-3xl pointer-events-none" />
    </section>
  );
}
