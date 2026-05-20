import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MessageSquareText,
  User,
  Send,
  MapPin,
  Phone,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const contentRef = useRef(null);

  // ================= GSAP CINEMATIC ENTRANCE =================
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Container Masuk dari bawah dengan blur
      gsap.from(cardRef.current, {
        y: 150,
        opacity: 0,
        scale: 0.9,
        filter: "blur(20px)",
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });

      // 2. Content di dalam kartu muncul berurutan (Stagger)
      gsap.from(contentRef.current.children, {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "back.out(1.5)",
        delay: 0.5, // Tunggu kartu sedikit
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ================= LOGIC SEND EMAIL =================
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    // Format Email Content
    const subject = `New Message from Portfolio - ${name}`;
    const body = `From: ${name} (${email})%0D%0A%0D%0A${message}`;

    // Buka Email Client (mailto:)
    window.location.href = `mailto:fawwaz1511@student.abudzar.sch.id?subject=${subject}&body=${body}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= 3D TILT LOGIC =================
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Maks 10 derajat
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power1.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex justify-center items-center bg-slate-950 py-24 md:py-32 w-full min-h-screen overflow-hidden font-jakarta">
      {/* Ambient "Breathing" Light Effect */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="top-1/2 left-1/2 absolute bg-utama blur-[150px] rounded-full w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />

      <div className="z-10 relative mx-auto px-6 md:pr-8 md:pl-28 w-full max-w-5xl">
        {/* The "Monolith" Card - 3D Floating */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative bg-slate-900/30 shadow-2xl backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}>
          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')] opacity-30 pointer-events-none"></div>

          <div ref={contentRef} className="gap-0 grid md:grid-cols-5">
            {/* === LEFT SIDE: INFO (Legendary Typography) === */}
            <div className="flex flex-col justify-between col-span-2 p-8 md:p-12 border-white/5 md:border-r border-b md:border-b-0">
              <div>
                <span className="block mb-4 font-bold text-[10px] text-utama uppercase tracking-[4px]">
                  Connect
                </span>
                <h2 className="mb-4 font-black text-white text-4xl md:text-5xl leading-tight">
                  Let's Create
                  <br />
                  <span className="bg-clip-text bg-linear-to-r from-slate-400 to-slate-500 text-transparent">
                    Impact.
                  </span>
                </h2>
                <p className="mb-8 text-slate-400 text-sm leading-relaxed">
                  Ready to start your next project? Drop me a message. I'm
                  currently available for freelance work and collaborations.
                </p>
              </div>

              <div className="hidden md:block space-y-4">
                <div className="group flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-colors cursor-pointer">
                  <div className="bg-white/5 group-hover:bg-utama p-2 rounded-lg group-hover:text-white transition-colors">
                    <Mail size={16} />
                  </div>
                  <span>fawwaz1511@student.abudzar.sch.id</span>
                </div>
                <div className="group flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-colors cursor-pointer">
                  <div className="bg-white/5 group-hover:bg-utama p-2 rounded-lg group-hover:text-white transition-colors">
                    <MapPin size={16} />
                  </div>
                  <span>Indonesia</span>
                </div>
              </div>
            </div>

            {/* === RIGHT SIDE: THE FORM === */}
            <div className="col-span-3 p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Input: Name */}
                <div className="group relative">
                  <User
                    className="top-4 left-4 absolute text-slate-600 group-focus-within:text-utama transition-colors"
                    size={18}
                  />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    onChange={handleChange}
                    className="bg-slate-800/30 py-4 pr-4 pl-12 border border-white/10 focus:border-utama/50 rounded-xl outline-none focus:ring-1 focus:ring-utama/20 w-full text-white placeholder:text-slate-600 text-sm transition-all"
                  />
                </div>

                {/* Input: Email */}
                <div className="group relative">
                  <Mail
                    className="top-4 left-4 absolute text-slate-600 group-focus-within:text-utama transition-colors"
                    size={18}
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Your Email"
                    onChange={handleChange}
                    className="bg-slate-800/30 py-4 pr-4 pl-12 border border-white/10 focus:border-utama/50 rounded-xl outline-none focus:ring-1 focus:ring-utama/20 w-full text-white placeholder:text-slate-600 text-sm transition-all"
                  />
                </div>

                {/* Textarea: Message */}
                <div className="group relative">
                  <MessageSquareText
                    className="top-4 left-4 absolute text-slate-600 group-focus-within:text-utama transition-colors"
                    size={18}
                  />
                  <textarea
                    name="message"
                    required
                    placeholder="Tell me about your project..."
                    onChange={handleChange}
                    rows={4}
                    className="bg-slate-800/30 py-4 pr-4 pl-12 border border-white/10 focus:border-utama/50 rounded-xl outline-none focus:ring-1 focus:ring-utama/20 w-full text-white placeholder:text-slate-600 text-sm transition-all resize-none"></textarea>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(16, 185, 129, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative flex justify-center items-center gap-2 bg-utama shadow-lg shadow-utama/10 px-8 py-4 rounded-xl w-full overflow-hidden font-bold text-white transition-all duration-300">
                  <span className="z-10 relative flex items-center gap-2">
                    Send Message
                    <Send
                      size={18}
                      className="group-hover:rotate-12 transition-transform"
                    />
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full duration-700" />
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Footer Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-slate-700 text-xs text-center uppercase tracking-widest">
          Designed & Built with Passion • 2024
        </motion.p>
      </div>
    </section>
  );
}
