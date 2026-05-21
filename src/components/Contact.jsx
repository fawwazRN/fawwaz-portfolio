import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MessageSquareText,
  User,
  Send,
  MapPin,
  CheckCircle,
  Loader2,
  Sparkles,
  X,
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

  // State untuk handle loading dan notifikasi
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const notificationRef = useRef(null); // Ref untuk Toast Notification

  // ================= GSAP CINEMATIC ENTRANCE =================
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Container Masuk dari bawah
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

      // 2. Content Stagger
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: "back.out(1.5)",
          delay: 0.5,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ================= GSAP NOTIFICATION ANIMATION =================
  useEffect(() => {
    if (showNotification && notificationRef.current) {
      // Animasi Muncul (Slide in dari kanan + Glow)
      gsap.fromTo(
        notificationRef.current,
        { x: 100, opacity: 0, scale: 0.8, filter: "blur(10px)" },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        },
      );

      // Animasi Icon Check (Menggambar garis)
      gsap.fromTo(
        ".check-icon-path",
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 0.6, delay: 0.3, ease: "power2.out" },
      );

      // Animasi Sparkle (Bintang)
      gsap.fromTo(
        ".sparkle-icon",
        { scale: 0, rotation: -45 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          delay: 0.6,
          stagger: 0.1,
          ease: "elastic.out(1, 0.5)",
        },
      );

      // Auto-hide setelah 5 detik
      const timer = setTimeout(() => {
        closeNotification();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const closeNotification = () => {
    if (notificationRef.current) {
      gsap.to(notificationRef.current, {
        x: 100,
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => setShowNotification(false),
      });
    }
  };

  // ================= LOGIC SEND TO WHATSAPP =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi network delay sedikit untuk efek loading yang smooth
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { name, email, message } = formData;

    // Format Nomor WA (Hapus angka 0 didepan, ganti dengan 62)
    // Nomor: 08170900160 -> 628170900160
    const phoneNumber = "628170900160";

    // Susun teks pesan
    const text = `Halo, saya *${name}*.\n\nEmail: ${email}\n\nPesan:\n${message}`;

    // Encode agar URL valid
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    // Buka tab baru
    window.open(waUrl, "_blank");

    // Reset form & tampilkan notifikasi
    setFormData({ name: "", email: "", message: "" });
    setIsLoading(false);
    setShowNotification(true);
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

    const rotateX = ((y - centerY) / centerY) * -10;
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
    if (!cardRef.current) return;
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
      {/* Ambient Light */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="top-1/2 left-1/2 absolute bg-utama blur-[150px] rounded-full w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />

      <div className="z-10 relative mx-auto px-6 md:pr-8 md:pl-28 w-full max-w-5xl">
        {/* Card Utama */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative bg-slate-900/30 shadow-2xl backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}>
          {/* Noise Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')] opacity-30 pointer-events-none"></div>

          {/* FORM CONTENT - Selalu Tampil (Tidak ada conditional rendering yang merusak layout) */}
          <div ref={contentRef} className="gap-0 grid md:grid-cols-5">
            {/* LEFT SIDE: INFO */}
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
                  Ready to start your next project? Drop me a message via
                  WhatsApp. I'm currently available for freelance work.
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

            {/* RIGHT SIDE: THE FORM */}
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
                    value={formData.name}
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
                    value={formData.email}
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
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="bg-slate-800/30 py-4 pr-4 pl-12 border border-white/10 focus:border-utama/50 rounded-xl outline-none focus:ring-1 focus:ring-utama/20 w-full text-white placeholder:text-slate-600 text-sm transition-all resize-none"></textarea>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(16, 185, 129, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative flex justify-center items-center gap-2 bg-utama disabled:opacity-70 shadow-lg shadow-utama/10 px-8 py-4 rounded-xl w-full overflow-hidden font-bold text-white transition-all duration-300 disabled:cursor-wait">
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Preparing...
                    </>
                  ) : (
                    <>
                      <span className="z-10 relative flex items-center gap-2">
                        Send via WhatsApp
                        <Send
                          size={18}
                          className="group-hover:rotate-12 transition-transform"
                        />
                      </span>
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full duration-700" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-slate-700 text-xs text-center uppercase tracking-widest">
          Designed & Built with Passion • 2026
        </motion.p>
      </div>

      {/* ================= NOTIFICATION COMPONENT (TOAST) ================= */}
      {showNotification && (
        <div
          ref={notificationRef}
          className="right-8 bottom-8 z-50 fixed w-full max-w-sm pointer-events-none">
          <div className="relative bg-slate-900/90 shadow-2xl backdrop-blur-xl p-4 border border-white/10 rounded-2xl overflow-hidden pointer-events-auto">
            {/* Glow Effect di belakang */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-50" />

            <div className="z-10 relative flex items-start gap-3">
              {/* Icon Container */}
              <div className="relative mt-1">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1.5 }}
                  className="absolute inset-0 bg-emerald-500 blur-xl rounded-full"
                />
                <div className="z-10 relative bg-emerald-500/20 p-2 border border-emerald-400/30 rounded-full">
                  <CheckCircle
                    className="w-5 h-5 text-emerald-400 check-icon-path"
                    strokeWidth={2.5}
                    style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
                  />
                </div>
                <Sparkles className="-top-1 -right-1 absolute w-3 h-3 text-yellow-400 sparkle-icon" />
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <h4 className="font-bold text-white text-sm">
                  Pesan Siap Kirim!
                </h4>
                <p className="mt-1 text-slate-400 text-xs">
                  Tab WhatsApp baru telah terbuka. Silakan kirim pesan Anda di
                  sana.
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={closeNotification}
                className="text-slate-500 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Progress Bar Auto Close */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 5, ease: "linear" }}
              className="bottom-0 left-0 absolute bg-emerald-500/50 w-full h-1 origin-left"
            />
          </div>
        </div>
      )}
    </section>
  );
}
