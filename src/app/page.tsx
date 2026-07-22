"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  Calendar,
  ChevronDown,
  Sparkles,
  Home,
  CalendarDays,
  MessageSquare,
  Mail,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


/* ═══════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════ */

const EVENT_DATE = new Date("2026-09-20T02:00:00Z"); // Sep 19, 9PM Bogota
const QUINCEANERA = "Johanny Chiquinquirá";
const PARENTS = ["Johanna Ocando", "Yoneldi Romero"];
const VENUE = 'Salón de fiestas "Blanco y Negro"';
const ADDRESS = "Entrando por Pipo a dos cuadras";
const MAP_URL = "https://maps.app.goo.gl/EaZkitxKtXjobwy46";
const CALENDAR_URL = `https://www.google.com/calendar/render?action=TEMPLATE&text=XV+Años+-+${encodeURIComponent(QUINCEANERA)}&dates=20260920T020000Z/20260920T050000Z&details=${encodeURIComponent("Mascarada Vampiresa\n\nCódigo de vestimenta: Formal")}&location=${encodeURIComponent(VENUE + ", " + ADDRESS)}&sf=true&output=xml`;

const DRESS_COLORS = [
  { name: "Negro", hex: "#1C1C1C" },
  { name: "Blanco", hex: "#F0EDED" },
  { name: "Marrón", hex: "#6B3A2A" },
  { name: "Verde Oliva", hex: "#556B2F" },
  { name: "Azul", hex: "#2C4A6E" },
];



/* ═══════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════ */

function OrnamentalDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 py-2 ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <Sparkles className="w-4 h-4 text-gold/70" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </div>
  );
}

function SectionTitle({
  children,
  subtitle,
}: {
  children: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7 }}
      className="text-center mb-10"
    >
      {subtitle && (
        <p className="text-gold/70 text-sm tracking-[0.3em] uppercase mb-3 font-[family-name:var(--font-cormorant)]">
          {subtitle}
        </p>
      )}
      <h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold gold-shimmer font-[family-name:var(--font-cinzel)]"
      >
        {children}
      </h2>
    </motion.div>
  );
}

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   FLOATING PARTICLES
   ═══════════════════════════════════════════ */

function FloatingParticles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const particles = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 4,
      duration: 10 + Math.random() * 15,
      delay: Math.random() * 10,
      drift: -40 + Math.random() * 80,
      spin: 180 + Math.random() * 360,
      opacity: 0.2 + Math.random() * 0.4,
      isGold: Math.random() > 0.4,
    }));
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.isGold
              ? "radial-gradient(circle, #C9A96E, transparent)"
              : "radial-gradient(circle, #722F37, transparent)",
            borderRadius: "50%",
            opacity: p.opacity,
            ["--duration" as string]: `${p.duration}s`,
            ["--delay" as string]: `${p.delay}s`,
            ["--drift" as string]: `${p.drift}px`,
            ["--spin" as string]: `${p.spin}deg`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAGICAL TEXT COMPONENTS
   ═══════════════════════════════════════════ */

type MagicVariant = "rise" | "dissolve" | "materialize";

function MagicalChar({
  char,
  index,
  delay,
  variant,
  active,
}: {
  char: string;
  index: number;
  delay: number;
  variant: MagicVariant;
  active: boolean;
}) {
  const pseudoRandom = Math.sin(index * 7.3) * 10;

  const configs: Record<
    MagicVariant,
    { initial: any; animate: any }
  > = {
    rise: {
      initial: {
        y: 50,
        opacity: 0,
        scale: 0.7,
        rotateZ: pseudoRandom,
        filter: "blur(4px)",
      },
      animate: {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateZ: 0,
        filter: "blur(0px)",
      },
    },
    dissolve: {
      initial: {
        opacity: 0,
        y: 20,
        scale: 1.3,
        filter: "blur(10px)",
      },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      },
    },
    materialize: {
      initial: { scale: 0, opacity: 0, rotateZ: pseudoRandom * 0.5 },
      animate: { scale: 1, opacity: 1, rotateZ: 0 },
    },
  };

  const config = configs[variant];
  const isSpring = variant === "materialize";

  return (
    <motion.span
      initial={config.initial}
      animate={active ? config.animate : config.initial}
      transition={{
        duration: isSpring ? 0.8 : 0.55,
        delay,
        type: isSpring ? ("spring" as const) : ("tween" as const),
        bounce: isSpring ? 0.6 : undefined,
        ease: isSpring ? undefined : [0.25, 0.46, 0.45, 0.94],
      }}
      className="inline-block"
      style={{ willChange: "transform, opacity, filter" }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

function LightSweep({
  active,
  delay,
}: {
  active: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ x: "-120%", opacity: 0 }}
      animate={
        active
          ? { x: "400%", opacity: [0, 0.8, 0.8, 0] }
          : { x: "-120%", opacity: 0 }
      }
      transition={{ duration: 1.2, delay, ease: "easeInOut" }}
      className="absolute inset-y-0 w-2/5 pointer-events-none z-20"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(201,169,110,0.2), rgba(255,255,255,0.35), rgba(201,169,110,0.2), transparent)",
        filter: "blur(12px)",
      }}
    />
  );
}

function MagicSparkles({
  active,
  delay,
}: {
  active: boolean;
  delay: number;
}) {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        angle: (i / 16) * 360 + (i % 3) * 15,
        distance: 50 + Math.sin(i * 3.7) * 50,
        size: 2 + (i % 4) * 1.5,
        sparkleDelay: delay + (i % 5) * 0.08,
        isGold: i % 3 !== 0,
      })),
    [delay]
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
          animate={
            active
              ? {
                  scale: [0, 1.8, 0],
                  opacity: [0, 1, 0],
                  x: Math.cos((s.angle * Math.PI) / 180) * s.distance,
                  y: Math.sin((s.angle * Math.PI) / 180) * s.distance,
                }
              : {}
          }
          transition={{
            duration: 0.9,
            delay: s.sparkleDelay,
            ease: "easeOut",
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: s.isGold ? "#C9A96E" : "#E8D5A3",
            boxShadow: `0 0 ${s.size * 3}px ${s.isGold ? "rgba(201,169,110,0.9)" : "rgba(232,213,163,0.9)"}`,
          }}
        />
      ))}
    </div>
  );
}

function MagicalText({
  text,
  active,
  baseDelay,
  stagger,
  variant,
  className,
}: {
  text: string;
  active: boolean;
  baseDelay: number;
  stagger: number;
  variant: MagicVariant;
  className: string;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <MagicalChar
          key={`${variant}-${i}`}
          char={char}
          index={i}
          delay={baseDelay + i * stagger}
          variant={variant}
          active={active}
        />
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════ */

function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Fallback loading trigger to ensure animation starts even if video onCanPlay fails
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover ken-burns"
        />
      </div>

      {/* Animated overlays — gradient shift + breathing */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/90 pointer-events-none gradient-shift overlay-breathe"
      />
      <div className="absolute inset-0 vignette pointer-events-none" />
      {/* Subtle wine tint pulse */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: [0, 0.08, 0.04, 0.08, 0] } : {}}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-wine pointer-events-none"
      />

      {/* Content Container (Avoids covering the face: Bottom on Mobile, Right-aligned on Desktop) */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-end pb-32 md:justify-center md:pb-0 px-6 sm:px-12 md:px-24 text-center md:text-right md:items-end">
        <div className="max-w-4xl space-y-5 sm:space-y-7 flex flex-col items-center md:items-end">
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={loaded ? { opacity: 0.9, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-gold text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.35em] uppercase font-[family-name:var(--font-cormorant)] font-semibold"
          >
            Mis Quince Años
          </motion.p>

          {/* Main Name + Sparkles */}
          <div className="relative inline-block">
            {/* Sparkle dots — CSS-driven, no JS random to avoid hydration issues */}
            {[
              { top: "-14%", left: "5%",  ss: "7px",  sd: "1.4s", sdel: "0s",    sx: "-15px", sy: "-35px" },
              { top: "-8%",  left: "25%", ss: "5px",  sd: "1.8s", sdel: "0.3s",  sx: "10px",  sy: "-45px" },
              { top: "-18%", left: "50%", ss: "9px",  sd: "1.2s", sdel: "0.6s",  sx: "5px",   sy: "-50px" },
              { top: "-10%", left: "72%", ss: "6px",  sd: "1.6s", sdel: "0.9s",  sx: "20px",  sy: "-40px" },
              { top: "-5%",  left: "88%", ss: "8px",  sd: "1.3s", sdel: "0.2s",  sx: "25px",  sy: "-30px" },
              { top: "30%",  left: "98%", ss: "5px",  sd: "1.9s", sdel: "0.5s",  sx: "30px",  sy: "-20px" },
              { top: "70%",  left: "95%", ss: "7px",  sd: "1.5s", sdel: "0.8s",  sx: "20px",  sy: "15px"  },
              { top: "90%",  left: "75%", ss: "6px",  sd: "1.7s", sdel: "0.1s",  sx: "5px",   sy: "30px"  },
              { top: "95%",  left: "45%", ss: "8px",  sd: "1.1s", sdel: "0.7s",  sx: "-10px", sy: "40px"  },
              { top: "88%",  left: "18%", ss: "5px",  sd: "2.0s", sdel: "0.4s",  sx: "-20px", sy: "35px"  },
              { top: "60%",  left: "2%",  ss: "7px",  sd: "1.4s", sdel: "1.0s",  sx: "-28px", sy: "10px"  },
              { top: "20%",  left: "0%",  ss: "6px",  sd: "1.6s", sdel: "0.15s", sx: "-25px", sy: "-15px" },
            ].map((s, i) => (
              <span
                key={i}
                className="sparkle-dot"
                style={{
                  top: s.top, left: s.left,
                  ["--ss" as string]: s.ss,
                  ["--sd" as string]: s.sd,
                  ["--sdel" as string]: s.sdel,
                  ["--sx" as string]: s.sx,
                  ["--sy" as string]: s.sy,
                }}
              />
            ))}
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={loaded ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 1.0, duration: 1.2, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-bold tracking-wide font-[family-name:var(--font-cinzel)] leading-tight gold-shimmer hero-title-glow select-none"
            >
              {QUINCEANERA}
            </motion.h1>
          </div>

          {/* Theme border container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={loaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="inline-block pt-1 pb-1"
          >
            <p className="text-wine-light font-[family-name:var(--font-cinzel)] text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-[0.3em] border-y border-gold/30 py-3 uppercase">
              MASCARA DE VAMPIRO
            </p>
          </motion.div>

          {/* Invitation phrase */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={loaded ? { opacity: 0.8, y: 0 } : {}}
            transition={{ delay: 2.8, duration: 0.8 }}
            className="text-cream text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-cormorant)] italic leading-relaxed max-w-lg md:max-w-2xl mx-auto md:mr-0 md:ml-auto text-center md:text-right"
          >
            "El velo de la noche se levanta para celebrar la vida, el misterio y la elegancia. Acompáñame a cruzar el umbral en una velada inolvidable."
          </motion.p>

          {/* Action button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 3.4, duration: 0.8 }}
            className="pt-2 sm:pt-4"
          >
            <a href="#rsvp">
              <Button className="bg-wine hover:bg-wine-light text-cream border border-wine-light/30 font-[family-name:var(--font-cormorant)] text-sm sm:text-base px-8 py-4.5 rounded-lg tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(114,47,55,0.6)] cursor-pointer">
                Confirmar Asistencia
              </Button>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 4.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <a
          href="#cuenta-regresiva"
          aria-label="Desplazar hacia abajo"
          className="flex flex-col items-center gap-1.5 text-gold/60 hover:text-gold transition-colors"
        >
          <span className="text-[10px] tracking-widest uppercase font-[family-name:var(--font-cormorant)]">
            Descubre
          </span>
          <ChevronDown className="w-4 h-4 bounce-slow" />
        </a>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   COUNTDOWN SECTION — 3D REDESIGN
   ═══════════════════════════════════════════ */

function CountdownUnit({
  value,
  label,
  delay,
}: {
  value: number;
  label: string;
  delay: number;
}) {
  const padded = String(value).padStart(2, "0");
  const [displayed, setDisplayed] = useState(padded);
  const [flipping, setFlipping] = useState(false);
  const [nextVal, setNextVal] = useState(padded);

  // Detect change and trigger 3D flip
  if (padded !== nextVal) {
    setNextVal(padded);
    setFlipping(true);
  }

  useEffect(() => {
    if (flipping) {
      const t = setTimeout(() => {
        setDisplayed(nextVal);
        setFlipping(false);
      }, 350);
      return () => clearTimeout(t);
    }
  }, [flipping, nextVal]);

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -90 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
      className="flex flex-col items-center gap-3 sm:gap-4"
    >
      {/* 3D Card */}
      <div
        className="relative"
        style={{ perspective: "600px" }}
      >
        <div
          className={`relative transition-transform duration-[350ms] ease-in-out ${flipping ? "countdown-flip" : ""}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front face — displays current value */}
          <div className="countdown-face countdown-front">
            <span suppressHydrationWarning>{displayed}</span>
          </div>
          {/* Back face — shows incoming value */}
          <div className="countdown-face countdown-back">
            <span suppressHydrationWarning>{nextVal}</span>
          </div>
        </div>

        {/* Glow ring */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none countdown-glow" />
      </div>

      {/* Label */}
      <span className="text-gold/70 text-[10px] sm:text-xs md:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-cinzel)]">
        {label}
      </span>
    </motion.div>
  );
}

function CountdownSection() {
  const calculateTime = useCallback(() => {
    const now = new Date().getTime();
    const distance = EVENT_DATE.getTime() - now;
    if (distance < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  }, []);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setTimeLeft(calculateTime());
    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [calculateTime]);

  const units = [
    { label: "Días",  value: timeLeft.days,    key: "d", delay: 0.1 },
    { label: "Horas", value: timeLeft.hours,   key: "h", delay: 0.25 },
    { label: "Min",   value: timeLeft.minutes, key: "m", delay: 0.4 },
    { label: "Seg",   value: timeLeft.seconds, key: "s", delay: 0.55 },
  ];

  return (
    <section
      id="cuenta-regresiva"
      className="relative py-24 sm:py-32 noise-overlay overflow-hidden section-bg"
    >
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <SectionTitle subtitle="La espera casi termina">Faltan</SectionTitle>

        {/* Separator dots between cards */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-7 mt-12">
          {units.map((unit, i) => (
            <div key={unit.key} className="flex items-center gap-3 sm:gap-5 md:gap-7">
              <CountdownUnit value={unit.value} label={unit.label} delay={unit.delay} />
              {i < units.length - 1 && (
                <div className="flex flex-col gap-2 mb-8 opacity-60">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/70 shadow-[0_0_6px_#C9A96E]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/70 shadow-[0_0_6px_#C9A96E]" />
                </div>
              )}
            </div>
          ))}
        </div>

        <AnimatedSection delay={0.9} className="mt-10">
          <p className="text-cream/40 text-sm font-[family-name:var(--font-cormorant)] tracking-wider italic">
            19 de Septiembre de 2026 &middot; 9:00 PM
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════
   EVENT DETAILS SECTION
   ═══════════════════════════════════════════ */

function EventDetailsSection() {
  return (
    <section id="evento" className="relative py-20 sm:py-28 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <SectionTitle subtitle="Los esperamos">La Fiesta</SectionTitle>

        <div className="space-y-6 mt-8">
          <AnimatedSection>
            <div className="bg-vampire-card/80 backdrop-blur-sm border border-vampire-border rounded-xl p-6 sm:p-8 space-y-6">
              {/* Date */}
              <div className="flex items-center justify-center gap-3">
                <Calendar className="w-5 h-5 text-gold flex-shrink-0" />
                <div>
                  <p className="text-cream/60 text-xs tracking-widest uppercase font-[family-name:var(--font-cormorant)]">
                    Fecha
                  </p>
                  <p className="text-cream text-lg sm:text-xl font-[family-name:var(--font-cormorant)] font-semibold">
                    19 de Septiembre de 2026
                  </p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-vampire-border to-transparent" />

              {/* Time */}
              <div className="flex items-center justify-center gap-3">
                <Clock className="w-5 h-5 text-gold flex-shrink-0" />
                <div>
                  <p className="text-cream/60 text-xs tracking-widest uppercase font-[family-name:var(--font-cormorant)]">
                    Hora
                  </p>
                  <p className="text-cream text-lg sm:text-xl font-[family-name:var(--font-cormorant)] font-semibold">
                    9:00 PM
                  </p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-vampire-border to-transparent" />

              {/* Venue */}
              <div className="flex items-start justify-center gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="text-cream/60 text-xs tracking-widest uppercase font-[family-name:var(--font-cormorant)]">
                    Lugar
                  </p>
                  <p className="text-cream text-lg sm:text-xl font-[family-name:var(--font-cormorant)] font-semibold">
                    {VENUE}
                  </p>
                  <p className="text-cream/50 text-sm font-[family-name:var(--font-cormorant)] mt-1">
                    {ADDRESS}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Action Buttons */}
          <AnimatedSection delay={0.3}>
            <div className="flex justify-center">
              <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button
                  className="w-full sm:w-auto bg-wine hover:bg-wine-light text-cream border border-wine-light/30 font-[family-name:var(--font-cormorant)] text-base px-8 py-5 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(114,47,55,0.4)] cursor-pointer"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Ver Ubicación
                </Button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   DRESS CODE SECTION
   ═══════════════════════════════════════════ */

function DressCodeSection() {
  return (
    <section
      id="vestimenta"
      className="relative py-20 sm:py-28 noise-overlay overflow-hidden section-bg"
    >
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <SectionTitle subtitle="Tu presencia es importante">
          Código de Vestimenta
        </SectionTitle>

        <AnimatedSection>
          <p className="text-gold text-2xl sm:text-3xl font-[family-name:var(--font-cinzel)] mb-10 tracking-wider">
            FORMAL
          </p>
        </AnimatedSection>

        {/* Dress Colors */}
        <AnimatedSection delay={0.2}>
          <div className="mb-10">
            <p className="text-cream/50 text-xs tracking-[0.2em] uppercase mb-5 font-[family-name:var(--font-cormorant)]">
              Colores Permitidos
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {DRESS_COLORS.map((color, i) => (
                <motion.div
                  key={color.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  className="flex flex-col items-center gap-2 cursor-default"
                >
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-cream/20 shadow-lg transition-shadow duration-300 hover:shadow-[0_0_15px_rgba(201,169,110,0.3)]"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-cream/70 text-[11px] sm:text-xs font-[family-name:var(--font-cormorant)]">
                    {color.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>


      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PARENTS SECTION
   ═══════════════════════════════════════════ */

function ParentsSection() {
  return (
    <section className="relative py-20 sm:py-28 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <SectionTitle subtitle="Con todo su amor">Sus Padres</SectionTitle>

        {/* Parents Names */}
        <AnimatedSection className="mt-8">
          <div className="space-y-2">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-cream text-2xl sm:text-3xl font-[family-name:var(--font-cormorant)] font-light"
            >
              {PARENTS[0]}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="text-gold text-xl">&</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-cream text-2xl sm:text-3xl font-[family-name:var(--font-cormorant)] font-light"
            >
              {PARENTS[1]}
            </motion.p>
          </div>
        </AnimatedSection>

        {/* Emotional Message */}
        <AnimatedSection className="mt-10">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="relative px-6 py-8 sm:px-10 sm:py-10"
            >
              {/* Decorative quotes */}
              <span className="absolute top-2 left-2 text-wine/40 text-6xl sm:text-7xl font-serif leading-none select-none">&ldquo;</span>
              <span className="absolute bottom-2 right-2 text-wine/40 text-6xl sm:text-7xl font-serif leading-none select-none">&rdquo;</span>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.9 }}
                className="relative z-10 text-cream/90 text-base sm:text-lg md:text-xl font-[family-name:var(--font-cormorant)] leading-relaxed italic text-center"
              >
                Nuestra hijita, hoy miramos hacia atrás y no podemos creer lo rápido que voló el tiempo. 
                Desde que abriste los ojos por primera vez, supimos que nuestras vidas tenían un propósito mayor. 
                Verte convertirte en esta joven hermosa, fuerte y llena de luz llena nuestro corazón de una 
                felicidad que las palabras no alcanzan a describir.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 1.2 }}
                className="relative z-10 text-cream/90 text-base sm:text-lg md:text-xl font-[family-name:var(--font-cormorant)] leading-relaxed italic text-center mt-4"
              >
                Quince años de verte crecer, de sostenerte cuando tropezabas, de celebrar cada uno de 
                tus logros. Cada risa tuya fue nuestra melodía, cada lágrima nuestro dolor, cada sueño 
                tuyo nuestra mayor ilusión.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 1.5 }}
                className="relative z-10 text-cream/90 text-base sm:text-lg md:text-xl font-[family-name:var(--font-cormorant)] leading-relaxed italic text-center mt-4"
              >
                Hoy, en tu Mascarada Vampiresa, quieres que el mundo vea a la mujer increíble que eres. 
                Brilla con esa luz que llevas dentro, que es más poderosa que cualquier noche oscura. 
                Somos tus padres más orgullosos, y siempre, siempre seremos tu refugio, tu fuerza y 
                tu hogar incondicional.
              </motion.p>

              {/* Gold divider line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1.8 }}
                className="mx-auto mt-8 h-px w-32 bg-gradient-to-r from-transparent via-gold/60 to-transparent origin-center"
              />

              {/* Closing */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 2 }}
                className="relative z-10 text-gold text-lg sm:text-xl font-[family-name:var(--font-cormorant)] font-semibold text-center mt-5"
              >
                Con amor eterno, para siempre tus padres
              </motion.p>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   GIFTS AND NOTES SECTION
   ═══════════════════════════════════════════ */

function GiftsAndNotesSection() {
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-2xl mx-auto text-center space-y-16">
        <AnimatedSection>
          <div className="flex flex-col items-center gap-5">
            <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center bg-vampire-card/50 shadow-[0_0_15px_rgba(201,169,110,0.15)]">
              <Mail className="w-8 h-8 text-gold" />
            </div>
            <h3 className="text-xl sm:text-2xl font-[family-name:var(--font-cinzel)] text-cream">Lluvia de Sobres</h3>
            <p className="text-cream/70 text-base font-[family-name:var(--font-cormorant)] italic max-w-sm mx-auto leading-relaxed">
              El mejor regalo es tu presencia. Si deseas tener un detalle adicional, agradecemos que sea en efectivo (lluvia de sobres).
            </p>
          </div>
        </AnimatedSection>
        
        <AnimatedSection delay={0.2}>
          <div className="flex flex-col items-center gap-5">
            <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center bg-vampire-card/50 shadow-[0_0_15px_rgba(201,169,110,0.15)]">
              <Moon className="w-8 h-8 text-gold" />
            </div>
            <h3 className="text-xl sm:text-2xl font-[family-name:var(--font-cinzel)] text-cream">Niños Dulces Sueños</h3>
            <p className="text-cream/70 text-base font-[family-name:var(--font-cormorant)] italic max-w-sm mx-auto leading-relaxed">
              Para disfrutar plenamente de esta velada mágica, agradecemos que la celebración sea exclusiva para adultos y jóvenes.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   RSVP SECTION — WHATSAPP
   ═══════════════════════════════════════════ */

const WHATSAPP_NUMBER = "584246262168";

function RSVPSection() {
  const [formData, setFormData] = useState({
    name: "",
    companions: "0",
    attending: true,
    message: "",
  });

  const buildWhatsAppMessage = () => {
    const attending = formData.attending;
    const companions = parseInt(formData.companions) || 0;
    const total = companions + 1;

    const lines: string[] = [
      "*CONFIRMACION DE ASISTENCIA*",
      "----------------------------",
      "*XV Anos - Mascarada Vampiresa*",
      "*Johanny Chiquinquira*",
      "19 de Septiembre de 2026 - 9:00 PM",
      "----------------------------",
      "",
      `*Nombre:* ${formData.name.trim()}`,
      `*Asistencia:* ${attending ? "Si asistire con gusto" : "Lamentablemente no podre asistir"}`,
    ];

    if (attending && companions > 0) {
      lines.push(`*Acompanantes:* ${companions} persona${companions > 1 ? "s" : ""} (${total} en total)`);
    }

    if (formData.message.trim()) {
      lines.push("");
      lines.push(`*Mensaje:* ${formData.message.trim()}`);
    }

    lines.push("");
    lines.push("----------------------------");
    lines.push(attending
      ? "Nos vemos en la Mascarada. Que la noche sea memorable."
      : "Gracias por avisar. Te extranamos esa noche.");

    return lines.join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const text = encodeURIComponent(buildWhatsAppMessage());
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="rsvp"
      className="relative py-20 sm:py-28 noise-overlay overflow-hidden section-bg"
    >
      <div className="relative z-10 max-w-lg mx-auto px-6 text-center">
        <SectionTitle subtitle="Tu presencia es nuestro regalo">
          Confirma tu Asistencia
        </SectionTitle>

        {/* Elegant invitation text */}
        <AnimatedSection className="mb-10">
          <div className="relative px-6 py-8 rounded-2xl bg-vampire-card/60 border border-gold/15 backdrop-blur-sm">
            {/* Decorative corner ornaments */}
            <span className="absolute top-3 left-3 text-gold/30 text-2xl select-none leading-none">✦</span>
            <span className="absolute top-3 right-3 text-gold/30 text-2xl select-none leading-none">✦</span>
            <span className="absolute bottom-3 left-3 text-gold/30 text-2xl select-none leading-none">✦</span>
            <span className="absolute bottom-3 right-3 text-gold/30 text-2xl select-none leading-none">✦</span>

            <p className="text-gold/60 text-[10px] tracking-[0.3em] uppercase font-[family-name:var(--font-cormorant)] mb-4">
              — Invitación —
            </p>
            <p className="text-cream/90 text-base sm:text-lg font-[family-name:var(--font-cormorant)] italic leading-relaxed">
              Bajo el manto de la noche más misteriosa, te invitamos a ser parte de esta velada única. Tu confirmación nos honra y asegura tu lugar en la magia de esta celebración.
            </p>
            <div className="mt-5 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            <p className="mt-4 text-gold/70 text-sm font-[family-name:var(--font-cinzel)] tracking-widest">
              19 · IX · MMXXVI
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="text-left">
              <label className="text-cream/60 text-xs tracking-widest uppercase mb-2 block font-[family-name:var(--font-cormorant)]">
                Tu Nombre *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: María García"
                className="bg-vampire-card border-vampire-border text-cream placeholder:text-cream/30 focus:border-wine focus:ring-wine/30 font-[family-name:var(--font-cormorant)] text-base h-12 rounded-lg"
                required
              />
            </div>

            {/* Attending toggle */}
            <div className="text-left">
              <label className="text-cream/60 text-xs tracking-widest uppercase mb-3 block font-[family-name:var(--font-cormorant)]">
                ¿Asistirás?
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: true })}
                  className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all duration-300 font-[family-name:var(--font-cormorant)] ${
                    formData.attending
                      ? "bg-wine border-wine text-cream shadow-[0_0_15px_rgba(114,47,55,0.3)]"
                      : "bg-vampire-card border-vampire-border text-cream/50 hover:border-cream/20"
                  }`}
                >
                  ✅ Sí, asistiré
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: false })}
                  className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all duration-300 font-[family-name:var(--font-cormorant)] ${
                    !formData.attending
                      ? "bg-wine border-wine text-cream shadow-[0_0_15px_rgba(114,47,55,0.3)]"
                      : "bg-vampire-card border-vampire-border text-cream/50 hover:border-cream/20"
                  }`}
                >
                  ❌ No podré
                </button>
              </div>
            </div>

            {/* Companions */}
            {formData.attending && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-left"
              >
                <label className="text-cream/60 text-xs tracking-widest uppercase mb-2 block font-[family-name:var(--font-cormorant)]">
                  Número de Acompañantes
                </label>
                <Input
                  type="number"
                  min="0"
                  max="5"
                  value={formData.companions}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      companions: Math.max(0, Math.min(5, parseInt(e.target.value) || 0)).toString(),
                    })
                  }
                  className="bg-vampire-card border-vampire-border text-cream placeholder:text-cream/30 focus:border-wine focus:ring-wine/30 font-[family-name:var(--font-cormorant)] text-base h-12 rounded-lg"
                />
              </motion.div>
            )}

            {/* Message */}
            <div className="text-left">
              <label className="text-cream/60 text-xs tracking-widest uppercase mb-2 block font-[family-name:var(--font-cormorant)]">
                Mensaje para Johanny (opcional)
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Déjale un mensaje especial a Johanny..."
                rows={3}
                className="bg-vampire-card border-vampire-border text-cream placeholder:text-cream/30 focus:border-wine focus:ring-wine/30 font-[family-name:var(--font-cormorant)] text-base rounded-lg resize-none"
              />
            </div>

            {/* Submit — WhatsApp */}
            <Button
              type="submit"
              disabled={!formData.name.trim()}
              className="w-full bg-[#075e54] hover:bg-[#128c7e] text-white font-bold text-base h-14 rounded-xl transition-all duration-300 font-[family-name:var(--font-cinzel)] tracking-wider hover:shadow-[0_0_30px_rgba(18,140,126,0.4)] disabled:opacity-40 flex items-center justify-center gap-3"
            >
              {/* WhatsApp icon SVG */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.49"/>
              </svg>
              ENVIAR POR WHATSAPP
            </Button>

            <p className="text-cream/30 text-xs font-[family-name:var(--font-cormorant)] italic mt-2">
              Al hacer clic serás redirigido a WhatsApp con tu confirmación lista para enviar.
            </p>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */

function FooterSection() {
  return (
    <footer className="relative py-16 sm:py-20 px-6 text-center border-t border-vampire-border/50">
      <div className="max-w-lg mx-auto">
        <OrnamentalDivider className="mb-8" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gold text-xl sm:text-2xl font-[family-name:var(--font-cormorant)] font-light mb-2">
            ¡Te esperamos!
          </p>
          <p className="text-cream/40 text-sm font-[family-name:var(--font-cormorant)] mb-6">
            Será una noche inolvidable
          </p>
          <p className="gold-shimmer text-lg font-[family-name:var(--font-cinzel)] font-bold">
            MASCARA DE VAMPIRO
          </p>
          <p className="text-cream/60 text-base font-[family-name:var(--font-cormorant)] mt-1">
            {QUINCEANERA}
          </p>
          <p className="text-gold/50 text-sm font-[family-name:var(--font-cormorant)] tracking-wider mt-1">
            XV Años
          </p>
        </motion.div>
        <OrnamentalDivider className="mt-8 mb-6" />
        
        {/* Developer Credit */}
        <p className="text-cream/30 text-xs font-[family-name:var(--font-cormorant)] tracking-wide">
          Desarrollo Armando Ovalle |{" "}
          <a
            href="https://www.jacomeovalle.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors"
          >
            www.jacomeovalle.com
          </a>
        </p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   VAMPIRE AUDIO PLAYER
   ═══════════════════════════════════════════ */

function VampireAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [showVolume, setShowVolume] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); } else { audio.play().catch(() => {}); }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration);
    audio.volume = volume;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const val = parseFloat(e.target.value);
    audio.currentTime = (val / 100) * audio.duration;
    setProgress(val);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const currentTime = duration ? (progress / 100) * duration : 0;

  // Equalizer bars config: [animation-delay, height-multiplier]
  const eqBars = [
    { delay: "0s",     minH: 3,  maxH: 14 },
    { delay: "0.15s",  minH: 5,  maxH: 20 },
    { delay: "0.3s",   minH: 2,  maxH: 16 },
    { delay: "0.08s",  minH: 6,  maxH: 22 },
    { delay: "0.22s",  minH: 3,  maxH: 12 },
  ];

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio.mp4"
        loop
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setPlaying(false)}
      />

      {/* Fixed bottom-right player */}
      <div
        className={`fixed bottom-24 sm:bottom-6 right-4 sm:right-6 z-50 transition-all duration-500 ease-in-out ${
          expanded ? "w-72" : "w-auto"
        }`}
      >
        <div className="relative bg-gradient-to-br from-[#1c0b0e] via-[#120608] to-[#0d0407] border border-gold/25 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.85),0_0_35px_rgba(114,47,55,0.2)] overflow-hidden backdrop-blur-md">

          {/* Top glow bar */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

          {/* ── COLLAPSED VIEW ── */}
          {!expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer group"
              aria-label="Abrir reproductor"
            >
              {/* play.png icon */}
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/play.png"
                  alt="Reproductor"
                  fill
                  className="object-contain drop-shadow-[0_0_6px_rgba(201,169,110,0.7)] group-hover:drop-shadow-[0_0_10px_rgba(201,169,110,1)] transition-all duration-300"
                />
              </div>

              {/* Equalizer or label */}
              {playing ? (
                <div className="flex items-end gap-[3px] h-5">
                  {eqBars.map((bar, i) => (
                    <div
                      key={i}
                      className="w-[3px] rounded-full bg-gold eq-bar"
                      style={{
                        animationDelay: bar.delay,
                        ["--eq-min" as string]: `${bar.minH}px`,
                        ["--eq-max" as string]: `${bar.maxH}px`,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <span className="text-xs font-[family-name:var(--font-cinzel)] tracking-widest text-gold/70 uppercase">
                  Música
                </span>
              )}
            </button>
          )}

          {/* ── EXPANDED VIEW ── */}
          {expanded && (
            <div className="p-4 space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* play.png icon */}
                  <div className="relative w-9 h-9 flex-shrink-0">
                    <Image
                      src="/play.png"
                      alt="Reproductor"
                      fill
                      className={`object-contain transition-all duration-300 ${
                        playing
                          ? "drop-shadow-[0_0_10px_rgba(201,169,110,0.9)]"
                          : "drop-shadow-[0_0_4px_rgba(201,169,110,0.4)]"
                      }`}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-gold text-xs font-[family-name:var(--font-cinzel)] tracking-widest leading-none">
                        MASCARADA
                      </p>
                      {/* Mini equalizer next to title when playing */}
                      {playing && (
                        <div className="flex items-end gap-[2px] h-3">
                          {eqBars.slice(0, 3).map((bar, i) => (
                            <div
                              key={i}
                              className="w-[2px] rounded-full bg-gold/70 eq-bar"
                              style={{
                                animationDelay: bar.delay,
                                ["--eq-min" as string]: `${Math.round(bar.minH * 0.5)}px`,
                                ["--eq-max" as string]: `${Math.round(bar.maxH * 0.5)}px`,
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-cream/40 text-[10px] font-[family-name:var(--font-cormorant)] italic mt-0.5">
                      Johanny Chiquinquirá · XV Años
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setExpanded(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-cream/5 hover:bg-cream/20 text-cream/60 hover:text-white transition-all duration-300 text-lg ml-2 cursor-pointer"
                  aria-label="Cerrar reproductor"
                >
                  ×
                </button>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={0.1}
                  value={progress}
                  onChange={handleSeek}
                  className="w-full h-1 appearance-none rounded-full cursor-pointer audio-range"
                  style={{
                    background: `linear-gradient(to right, #C9A96E ${progress}%, rgba(255,255,255,0.08) ${progress}%)`,
                  }}
                />
                <div className="flex justify-between text-[10px] text-cream/30 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls row */}
              <div className="flex items-center justify-between">
                {/* Play/Pause */}
                <button
                  onClick={toggle}
                  className="w-10 h-10 rounded-full bg-wine/80 hover:bg-wine border border-gold/20 flex items-center justify-center transition-all duration-200 hover:shadow-[0_0_18px_rgba(114,47,55,0.6)] cursor-pointer"
                  aria-label={playing ? "Pausar" : "Reproducir"}
                >
                  {playing ? (
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-cream">
                      <rect x="6" y="4" width="4" height="16" rx="1"/>
                      <rect x="14" y="4" width="4" height="16" rx="1"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-cream ml-0.5">
                      <polygon points="5,3 19,12 5,21"/>
                    </svg>
                  )}
                </button>

                {/* Equalizer bars (larger, center) when playing */}
                {playing && (
                  <div className="flex items-end gap-[3px] h-6">
                    {eqBars.map((bar, i) => (
                      <div
                        key={i}
                        className="w-[3px] rounded-full bg-gold/60 eq-bar"
                        style={{
                          animationDelay: bar.delay,
                          ["--eq-min" as string]: `${bar.minH}px`,
                          ["--eq-max" as string]: `${bar.maxH}px`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Volume */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowVolume(!showVolume)}
                    className="text-cream/40 hover:text-gold transition-colors cursor-pointer"
                    aria-label="Volumen"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      {volume === 0
                        ? <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"/>
                        : volume < 0.5
                        ? <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
                        : <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                      }
                    </svg>
                  </button>
                  {showVolume && (
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={volume}
                      onChange={handleVolume}
                      className="w-20 h-1 appearance-none rounded-full cursor-pointer audio-range"
                      style={{
                        background: `linear-gradient(to right, #C9A96E ${volume * 100}%, rgba(255,255,255,0.08) ${volume * 100}%)`,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Bottom glow */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-wine/50 to-transparent" />
        </div>
      </div>
    </>
  );
}


/* ═══════════════════════════════════════════
   MOBILE APP NAV (FLOATING)
   ═══════════════════════════════════════════ */

function MobileAppNav() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 sm:hidden w-max">
      <div className="flex items-center gap-8 px-8 py-3.5 bg-gradient-to-t from-[#120508] to-vampire-card/90 backdrop-blur-xl rounded-full border border-gold/30 shadow-[0_8px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(201,169,110,0.15)]">
        <a href="#" aria-label="Inicio" className="flex flex-col items-center gap-1.5 text-cream/40 hover:text-gold transition-colors">
          <Home className="w-5 h-5 drop-shadow-[0_0_8px_rgba(201,169,110,0)] hover:drop-shadow-[0_0_8px_rgba(201,169,110,0.5)]" />
          <span className="text-[10px] font-mono tracking-wider font-semibold">INICIO</span>
        </a>
        <a href="#evento" aria-label="Evento" className="flex flex-col items-center gap-1.5 text-cream/40 hover:text-gold transition-colors">
          <CalendarDays className="w-5 h-5 drop-shadow-[0_0_8px_rgba(201,169,110,0)] hover:drop-shadow-[0_0_8px_rgba(201,169,110,0.5)]" />
          <span className="text-[10px] font-mono tracking-wider font-semibold">EVENTO</span>
        </a>
        <a href="#asistencia" aria-label="Asistencia" className="flex flex-col items-center gap-1.5 text-cream/40 hover:text-gold transition-colors">
          <MessageSquare className="w-5 h-5 drop-shadow-[0_0_8px_rgba(201,169,110,0)] hover:drop-shadow-[0_0_8px_rgba(201,169,110,0.5)]" />
          <span className="text-[10px] font-mono tracking-wider font-semibold">RSVP</span>
        </a>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */

export default function QuinceaneraInvitation() {
  return (
    <main className="min-h-screen bg-vampire-dark relative">
      <FloatingParticles />
      <VampireAudioPlayer />
      <MobileAppNav />
      <HeroSection />
      <CountdownSection />
      <OrnamentalDivider />
      <EventDetailsSection />
      <OrnamentalDivider />
      <DressCodeSection />
      <OrnamentalDivider />
      <ParentsSection />
      <OrnamentalDivider />
      <GiftsAndNotesSection />
      <OrnamentalDivider />
      <RSVPSection />
      <FooterSection />
    </main>
  );
}