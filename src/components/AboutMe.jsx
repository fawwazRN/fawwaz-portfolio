import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Briefcase,
  GraduationCap,
  Download,
  ExternalLink,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import fawwaz from "../assets/img/fawwaz.png";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const nameRef = useRef(null);
  const contentRef = useRef(null);
  const [activeTooltip, setActiveTooltip] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.2, opacity: 0, filter: "grayscale(100%)" },
        {
          scale: 1,
          opacity: 1,
          filter: "grayscale(0%)",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        },
      );

      if (nameRef.current) {
        const text = "Fawwaz Romzi Nagib";
        nameRef.current.innerHTML = "";
        text.split("").forEach((char) => {
          nameRef.current.innerHTML +=
            char === " "
              ? `<span class="inline-block w-4"></span>`
              : `<span class="inline-block opacity-0 translate-y-10 char">${char}</span>`;
        });
        gsap.to(".char", {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: nameRef.current, start: "top 80%" },
        });
      }

      gsap.fromTo(
        ".anim-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: contentRef.current, start: "top 70%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const infoData = [
    {
      icon: GraduationCap,
      label: "Education",
      value: "10th Grade, Abudzar IT",
    },
    { icon: MapPin, label: "Location", value: "Indonesia" },
    { icon: Briefcase, label: "Focus", value: "Fullstack Dev" },
    { icon: User, label: "Experience", value: "2+ Years Coding" },
  ];

  const projectHighlights = [
    {
      name: "Indotravel",
      desc: "A comprehensive travel platform showcasing the beauty of Indonesia.",
      link: "https://indotravel.com",
      img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=500&auto=format&fit=crop",
    },
    {
      name: "Eduverse",
      desc: "An innovative educational metaverse platform for immersive learning.",
      link: "https://eduverse.com",
      img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=500&auto=format&fit=crop",
    },
  ];

  const handleCardMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      ref={sectionRef}
      id="aboutMe"
      className="relative bg-slate-950 py-24 md:py-32 w-full min-h-screen font-jakarta">
      <div className="top-1/3 left-1/4 absolute bg-utama/5 blur-[150px] rounded-full w-96 h-96 pointer-events-none"></div>

      <div className="z-10 relative mx-auto px-6 md:pr-8 md:pl-28 max-w-6xl h-full">
        <div className="flex items-center gap-4 mb-16 anim-item">
          <div className="bg-utama/10 p-2 border border-utama/30 rounded-lg">
            <User size={18} className="text-utama" />
          </div>
          <h2 className="font-bold text-white text-xl md:text-2xl tracking-tight">
            About Me
          </h2>
          <div className="flex-1 bg-linear-to-r from-slate-700 to-transparent h-px"></div>
        </div>

        <div className="items-center gap-12 md:gap-16 grid md:grid-cols-5">
          {/* Image Column */}
          <div className="flex justify-center md:col-span-2 anim-item">
            <div className="group relative w-64 md:w-72 h-80 md:h-96">
              <div className="absolute -inset-2 bg-utama/20 opacity-0 group-hover:opacity-60 blur-xl rounded-3xl transition-opacity duration-500"></div>
              <div className="z-10 absolute inset-0 border-2 border-utama/20 rounded-3xl rotate-3 group-hover:rotate-0 transition-transform duration-500 transform"></div>
              <div className="z-0 relative shadow-2xl rounded-3xl w-full h-full overflow-hidden">
                <img
                  ref={imageRef}
                  src={fawwaz}
                  alt="Fawwaz"
                  className="grayscale group-hover:grayscale-0 w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent"></div>
              </div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="-right-4 -bottom-4 z-20 absolute flex items-center gap-2 bg-white shadow-lg px-4 py-2 rounded-xl font-bold text-slate-900 text-xs">
                <span className="bg-green-500 rounded-full w-2 h-2 animate-pulse"></span>
                Open to Work
              </motion.div>
            </div>
          </div>

          {/* Content Column */}
          <div ref={contentRef} className="space-y-8 md:col-span-3">
            <div className="space-y-3">
              <p className="text-slate-400 text-lg anim-item">Hello! I am</p>
              <h2
                ref={nameRef}
                className="font-black text-white text-4xl md:text-5xl leading-tight tracking-tight"></h2>
              <div className="bg-utama rounded-full w-24 h-1.5 anim-item"></div>
            </div>

            {/* Bio Text - FIXED LOGIC */}
            <p className="z-40 relative pl-4 border-utama/30 border-l-2 text-slate-300 text-base md:text-lg leading-relaxed anim-item">
              I am a 10th-grade student at{" "}
              <span className="font-semibold text-white">
                Abudzar Tahfizh Plus IT
              </span>{" "}
              combining tech passion with discipline. I specialize in scalable
              web apps and have contributed to{" "}
              {projectHighlights.map((project, index) => (
                <span key={project.name}>
                  {index > 0 && <span className="text-slate-300"> and </span>}

                  {/* Container Hover Area - SATU AREA UNTUK TEKS & TOOLTIP */}
                  <span
                    className="inline-block relative"
                    onMouseEnter={() => setActiveTooltip(project.name)}
                    onMouseLeave={() => setActiveTooltip(null)}>
                    <span className="relative font-semibold text-utama hover:text-white transition-colors cursor-pointer">
                      {project.name}
                      <span className="bottom-0 left-0 absolute bg-utama/50 w-full h-0.5 scale-x-0 hover:scale-x-100 origin-left transition-transform"></span>
                    </span>

                    {/* TOOLTIP - Z-INDEX PALING TINGGI */}
                    {activeTooltip === project.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="top-full left-0 z-999 absolute pt-2" // pt-2 jembatan biar gk ilang
                      >
                        <div className="bg-slate-900 shadow-2xl backdrop-blur-md border border-white/10 rounded-xl w-72 overflow-hidden">
                          <img
                            src={project.img}
                            alt={project.name}
                            className="w-full h-32 object-cover"
                          />
                          <div className="p-4">
                            <h4 className="mb-1 font-bold text-white text-lg">
                              {project.name}
                            </h4>
                            <p className="mb-3 text-slate-400 text-xs leading-relaxed">
                              {project.desc}
                            </p>
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noreferrer"
                              className="flex justify-center items-center gap-2 bg-utama hover:bg-utama/80 py-2 rounded-lg w-full font-semibold text-white text-xs transition-colors">
                              Visit Site <ExternalLink size={12} />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </span>
                </span>
              ))}
              .
            </p>

            {/* Cards Grid */}
            <div className="gap-4 grid grid-cols-2 pt-4">
              {infoData.map((item, index) => (
                <div
                  key={index}
                  onMouseMove={handleCardMove}
                  className="group relative bg-slate-900/50 p-4 border border-white/5 hover:border-utama/30 rounded-xl overflow-hidden transition-all duration-300 anim-item"
                  style={{
                    background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16, 185, 129, 0.15), transparent 40%)`,
                  }}>
                  <div className="relative flex items-center gap-3">
                    <div className="bg-utama/10 group-hover:bg-utama p-2 rounded-lg text-utama group-hover:text-white transition-colors duration-300">
                      <item.icon size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-[10px] text-slate-500 uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="font-bold text-white text-sm">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 bg-utama shadow-lg shadow-utama/20 hover:shadow-utama/40 mt-4 px-8 py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-300 anim-item">
              Let's Collaborate <Download size={18} />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
