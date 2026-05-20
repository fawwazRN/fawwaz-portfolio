import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, X, ArrowUpRight } from "lucide-react";
import { project as myProject } from "./asset";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MyProject() {
  const [showArchive, setShowArchive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const sectionRef = useRef(null);

  // ================= LOGIC DATA TOP 3 =================
  // Nama project yang lu mau (case insensitive)
  const targetNames = ["quran.me", "growsmart!", "undangannikah"];

  // Cari project yang namanya cocok
  const matchedProjects = targetNames
    .map((name) =>
      myProject.find((p) => p.nama.toLowerCase() === name.toLowerCase()),
    )
    .filter(Boolean);

  // PENTING: Paksa tampil 3 project. Kalau yang cocok < 3, ambil dari data lainnya
  let featuredProjects = [...matchedProjects];
  if (featuredProjects.length < 3) {
    const remaining = myProject.filter((p) => !featuredProjects.includes(p));
    featuredProjects = [...featuredProjects, ...remaining].slice(0, 3);
  }

  // Filter untuk Archive
  const filteredArchive = myProject.filter(
    (p) =>
      p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slogan.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // ================= LOCK SCROLL WHEN ARCHIVE OPEN =================
  useEffect(() => {
    if (showArchive) {
      document.body.style.overflow = "hidden"; // Lock scroll body utama
    } else {
      document.body.style.overflow = "auto"; // Unlock scroll
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showArchive]);

  // ================= GSAP ANIMATION =================
  useEffect(() => {
    if (!showArchive) {
      const ctx = gsap.context(() => {
        gsap.utils.toArray(".featured-project").forEach((project) => {
          gsap.from(project, {
            opacity: 0,
            y: 80,
            scale: 0.95,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: project, start: "top 85%" },
          });
        });
      }, sectionRef);
      return () => ctx.revert();
    }
  }, [showArchive]);

  return (
    <section
      ref={sectionRef}
      id="myProject"
      className="relative bg-slate-950 w-full min-h-screen overflow-hidden font-jakarta">
      {/* ==================== MAIN SHOWCASE (FRONT) ==================== */}
      <div className="z-10 relative mx-auto px-6 py-24 md:pr-8 md:pl-28 max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="block mb-2 font-bold text-utama text-xs uppercase tracking-[4px]">
              Portfolio
            </span>
            <h2 className="font-black text-white text-4xl md:text-6xl leading-tight">
              Selected
              <br />
              Works
            </h2>
          </div>

          <motion.button
            onClick={() => setShowArchive(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group hidden md:flex items-center gap-3 bg-white/5 hover:bg-utama/10 px-6 py-3 border border-white/10 hover:border-utama/50 rounded-full transition-all duration-300">
            <span className="font-semibold text-white text-sm">
              View All Projects
            </span>
            <ArrowRight
              size={16}
              className="text-utama transition-transform group-hover:translate-x-1"
            />
          </motion.button>
        </div>

        {/* Featured Projects List (Pasti 3 Item) */}
        <div className="space-y-16 md:space-y-24">
          {featuredProjects.map((project, index) => (
            <FeaturedItem
              key={project.nama}
              project={project}
              index={index + 1}
            />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="md:hidden flex justify-center mt-16">
          <button
            onClick={() => setShowArchive(true)}
            className="flex items-center gap-2 font-semibold text-utama">
            View All Projects <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* ==================== ARCHIVE OVERLAY (FULLSCREEN FIXED) ==================== */}
      <AnimatePresence>
        {showArchive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="z-999 fixed inset-0 flex flex-col bg-slate-950 overflow-hidden">
            {/* Container dengan Padding (Responsif) */}
            <div className="flex flex-col mx-auto px-6 md:px-8 py-8 w-full max-w-6xl h-full overflow-hidden">
              {/* Archive Header (Fixed di atas) */}
              <div className="flex justify-between items-center mb-8 pb-4 border-white/10 border-b shrink-0">
                <div>
                  <h3 className="font-bold text-white text-xl md:text-2xl">
                    All Projects
                  </h3>
                  <p className="text-slate-500 text-sm">Archive Collection</p>
                </div>

                <button
                  onClick={() => setShowArchive(false)}
                  className="group bg-white/5 hover:bg-red-500/20 p-3 border border-white/10 hover:border-red-500 rounded-full transition-colors">
                  <X
                    size={20}
                    className="text-white group-hover:text-red-500"
                  />
                </button>
              </div>

              {/* Search Bar */}
              <div className="group relative mb-6 shrink-0">
                <div className="absolute inset-0 bg-utama/20 opacity-0 group-focus-within:opacity-100 blur-xl rounded-full transition-opacity"></div>
                <div className="relative flex items-center bg-slate-900 px-6 py-3 border border-white/10 group-focus-within:border-utama/50 rounded-full transition-colors">
                  <Search size={18} className="mr-3 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search project by name..."
                    className="bg-transparent outline-none w-full text-white placeholder:text-slate-600 text-sm"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Scrollable Grid Area */}
              <div className="flex-1 -mx-2 px-2 pb-4 overflow-y-auto scrollbar-hide custom-scrollbar-dark">
                <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {filteredArchive.length > 0 ? (
                    filteredArchive.map((project) => (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        key={project.nama}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="group block relative bg-slate-900/50 border border-white/5 hover:border-utama/30 rounded-xl overflow-hidden transition-all duration-300">
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={project.img}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-5">
                          <h4 className="mb-1 font-bold text-white group-hover:text-utama text-lg transition-colors">
                            {project.nama}
                          </h4>
                          <p className="text-slate-400 text-sm line-clamp-2">
                            {project.slogan}
                          </p>
                        </div>
                      </motion.a>
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-slate-500 text-center">
                      Project not found.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ================= SUB COMPONENT: FEATURED ITEM =================
function FeaturedItem({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef(null);

  // Magnetic Effect for the "View" button
  const handleMagnetic = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn.querySelector(".magnetic-inner"), {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.2,
    });
  };

  const resetMagnetic = (e) => {
    gsap.to(e.currentTarget.querySelector(".magnetic-inner"), {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <div
      ref={itemRef}
      className="items-center gap-8 grid md:grid-cols-12 featured-project">
      {/* Left: Number & Text */}
      <div className="z-10 relative order-2 md:order-1 md:col-span-5">
        <span className="-top-10 left-0 absolute font-black text-[100px] text-white/5 md:text-[150px] leading-none pointer-events-none select-none">
          0{index}
        </span>

        <div className="relative mt-10 md:mt-16">
          <span className="block mb-2 font-bold text-utama text-xs uppercase tracking-[4px]">
            Featured Project
          </span>
          <h3 className="mb-4 font-black text-white text-3xl md:text-5xl leading-tight">
            {project.nama}
          </h3>
          <p className="mb-6 max-w-md text-slate-400 text-sm md:text-base leading-relaxed">
            {project.slogan}
          </p>

          {/* Tech Stack / Tags bisa ditambahin di sini kalau ada datanya */}

          <motion.a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            onMouseMove={handleMagnetic}
            onMouseLeave={resetMagnetic}
            className="group inline-flex relative items-center gap-3 bg-white shadow-white/10 shadow-xl hover:shadow-white/20 px-8 py-4 rounded-full overflow-hidden font-bold text-slate-950 text-sm transition-shadow">
            <span className="z-10 relative flex items-center gap-3 magnetic-inner">
              View Project
              <ArrowUpRight
                size={18}
                className="group-hover:rotate-45 transition-transform"
              />
            </span>
          </motion.a>
        </div>
      </div>

      {/* Right: Image */}
      <div
        className="group relative order-1 md:order-2 md:col-span-7"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <div className="relative shadow-2xl border border-white/10 rounded-2xl w-full md:h-[400px] aspect-4/3 md:aspect-auto overflow-hidden">
          <img
            src={project.img}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
          />
          {/* Overlay */}
          <motion.div
            animate={{ opacity: isHovered ? 0.2 : 0 }}
            className="absolute inset-0 bg-utama pointer-events-none"
          />
        </div>

        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bottom-8 -left-4 md:-left-8 absolute flex items-center gap-2 bg-slate-900 backdrop-blur-md px-4 py-2 border border-white/10 rounded-xl text-white text-xs">
          <span className="bg-green-400 rounded-full w-2 h-2 animate-pulse"></span>
          Completed
        </motion.div>
      </div>
    </div>
  );
}
