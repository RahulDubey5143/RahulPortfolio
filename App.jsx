import { useEffect, useRef, useState } from "react";
import {
  Download,
  ArrowRight,
  Mail,
  Phone,
  Users,
  Wrench,
  ClipboardCheck,
  Code2,
  Database,
  Brain,
  Briefcase,
  Monitor,
  Send,
  MessageCircle,
  Smartphone,
  Menu,
  X,
  MapPin,
  Layers,
  Sparkles,
  Bug,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./App.css";

/* ------------------------------ DATA ------------------------------ */

const PROFILE = {
  firstName: "Rahul",
  lastName: "Dubey",
  role: "Android Developer",
  tagline:
    "Building fast, reliable, and user-friendly Android apps with clean code and a quality-first mindset.",
  about:
    "I am an Android developer focused on building reliable, user-friendly mobile applications. With hands-on experience testing production apps across Android and iOS, I write clean, maintainable code and catch issues early, so the apps I deliver are stable, polished, and ready for real users.",
  email: "rahuldubey5143@gmail.com",
  phone: "+91 9309579769",
  phoneRaw: "919309579769",
  linkedin: "https://www.linkedin.com/in/rahul-dubey-44b220281",
  github: "https://github.com/your-username",
  cv: "/Rahul_Dubey.Resume.pdf",
  photo: "/photo/profile.png",
  location: "Nashik, Maharashtra, India",
};

const NAV = [
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

const STATS = [
  { value: "2+", label: "Years of experience" },
  { value: "3", label: "Production apps shipped" },
  { value: "Kotlin", label: "Primary language" },
  { value: "KMP", label: "Cross-platform ready" },
];

const STACK = [
  {
    icon: Smartphone,
    title: "Android Development",
    items: ["Kotlin", "Java", "Android SDK", "Jetpack Compose", "XML", "MVVM", "Coroutines", "Flow", "LiveData"],
  },
  {
    icon: Code2,
    title: "Cross-Platform",
    items: ["Kotlin Multiplatform (KMP)", "Compose Multiplatform", "Ktor Client", "REST API Integration"],
  },
  {
    icon: Database,
    title: "Database & Storage",
    items: ["Room Database", "SQLite", "SQL", "DataStore", "JSON Serialization"],
  },
  {
    icon: Wrench,
    title: "Tools & Technologies",
    items: ["Android Studio", "IntelliJ IDEA", "Git", "GitHub", "Postman", "Jira", "Gradle"],
  },
  {
    icon: ClipboardCheck,
    title: "Testing & Debugging",
    items: ["Unit Testing", "UI Testing", "Manual Testing", "API Testing", "Firebase Crashlytics", "Performance Monitoring"],
  },
  {
    icon: Brain,
    title: "Architecture & Concepts",
    items: ["Clean Architecture", "Dependency Injection", "Repository Pattern", "Lifecycle Management", "OOP", "Design Patterns"],
  },
];

const SOFT_SKILLS = ["Communication", "Teamwork", "Problem Solving", "Analytical Thinking", "Adaptability"];

const EXPERIENCE = [
  {
    role: "Android Developer",
    company: "XPLOCC Technologies",
    period: "July 2025 – August 2026",
    points: [
      "Built and shipped production Android applications end-to-end using Kotlin and Java, from architecture through Play Store release",
      "Integrated RESTful APIs and Firebase (Authentication, Realtime Database, Firestore, Push Notifications, Crashlytics) to power core app features and real-time data sync",
      "Architected app modules using MVVM and Coroutines, replacing legacy patterns to make the codebase modular, testable, and easier to extend",
      "Improved UI responsiveness and reduced crash frequency by profiling and eliminating memory leaks and main-thread bottlenecks",
      "Partnered with backend engineers to design and ship scalable, user-facing features from API contract through production deployment",
      "Maintained code quality through peer code reviews, systematic debugging, and Git-based version control in a multi-developer team",
    ],
  },
  {
    role: "Android Developer",
    company: "Sidhman Technologies",
    period: "Jul 2024 – May 2025",
    points: [
      "Took ownership of feature development after transitioning from intern to full-time, extending MVVM architecture across new modules for consistency and maintainability",
      "Built and maintained UI components using Data Binding and Jetpack Compose, aligned with Material Design guidelines",
      "Collaborated with senior developers and designers to translate product requirements into functional Android screens",
      "Participated in code reviews and used Git for version control across a multi-developer codebase",
    ],
  },
  {
    role: "Android Developer Intern",
    company: "Sidhman Technologies",
    period: "May 2024 – Jul 2024",
    points: [
      "Worked with senior developers to build and improve Android screens in a production application.",
      "Learned and applied MVVM architecture and Data Binding while contributing to the team codebase.",
      "Used Git for version control and took part in code reviews.",
    ],
  },
];

// TODO: replace with your real projects
const PROJECTS = [
  {
    title: "Metrics App",
    icon: Layers,
    text: "Developed a real-time monitoring application for a Sugar Mill to track operational metrics. Implemented alert-based push notifications with custom sounds to notify engineers of critical issues. Used Product Flavors to manage multiple app configurations.",
    tags: ["Kotlin", "MVVM", "Firebase", "Retrofit", "WorkManager", "ProductFlavors"],
    link: "https://github.com/your-username/vtiger-crm-tests",
  },
  {
    title: "SAK Marathi",
    icon: Sparkles,
    text: "A matrimony application that connects families and individuals looking for the right match. I am actively working on this project, building features and integrating APIs.",
    tags: ["Java", "MVVM", "Firebase", "Retrofit", "REST APIs"],
    link: "https://play.google.com/store/apps/details?id=com.sak.marathiapplication&hl=en_IN",
  },
  {
    title: "Mitra Agro",
    icon: Bug,
    text: "Implemented Service Request Management module for handling customer requests and complaints with real-time push notifications, automated issue routing, and production performance tracking",
    tags: ["Kotlin", "MVVM", "Firebase", "Retrofit", "REST APIs"],
    link: "https://play.google.com/store/apps/details?id=com.applicationsquare.mitracustomer&hl=en",
  },
];

/* ------------------------ SCROLL ANIMATIONS ------------------------ */

function Reveal({ variant = "up", delay = 0, once = true, className = "", children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          if (once) io.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={`reveal reveal--${variant} ${shown ? "is-visible" : ""} ${className}`}
      style={{ "--d": `${shown ? delay : 0}ms` }}
      {...rest}
    >
      {children}
    </div>
  );
}

function ScrollProgress() {
  const barRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (barRef.current) barRef.current.style.transform = `scaleX(${pct})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="progress" ref={barRef} />;
}

/* --------------------------- COMPONENTS --------------------------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1));
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__inner">
        <a href="#top" className="logo">
          RAHUL<span>.</span>Dubey
        </a>
        <nav className="nav__links">
          {NAV.map((n) => (
            <a key={n.label} href={n.href} className={active === n.href.slice(1) ? "is-active" : ""}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="nav__cta">
          <a href={PROFILE.cv} download="Rahul-Dubey-Resume.pdf" className="btn btn--primary">
            <Download size={17} /> Download CV
          </a>
          <button
            className="nav__burger"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <nav className={`mobile-menu ${open ? "open" : ""}`}>
        {NAV.map((n) => (
          <a key={n.label} href={n.href} onClick={() => setOpen(false)}>
            {n.label}
          </a>
        ))}
        <a href={PROFILE.cv} download="Rahul-Dubey-Resume.pdf" onClick={() => setOpen(false)}>
          DOWNLOAD CV
        </a>
      </nav>
    </header>
  );
}

function SocialIcons({ size = 20 }) {
  return (
    <div className="socials">
      <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <FaLinkedin size={size} />
      </a>
      <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub">
        <FaGithub size={size} />
      </a>
      <a href={`mailto:${PROFILE.email}`} aria-label="Email">
        <Mail size={size} />
      </a>
      <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`} aria-label="Phone">
        <Phone size={size} />
      </a>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero__inner">
          <div className="hero__text">
            <span className="badge">
              <i /> Open to Android opportunities
            </span>
            <h1 className="hero__name">
              {PROFILE.firstName} <span className="grad-text">{PROFILE.lastName}</span>
            </h1>
            <h2 className="hero__role">
              <b>{PROFILE.role}</b> · Kotlin · Jetpack Compose
            </h2>
            <p className="hero__tagline">{PROFILE.tagline}</p>

            <div className="hero__actions">
              <a href="#projects" className="btn btn--primary">
                View My Work <ArrowRight size={18} />
              </a>
              <a href={PROFILE.cv} download="Rahul-Dubey-Resume.pdf" className="btn btn--ghost">
                <Download size={18} /> Download CV
              </a>
            </div>

            <SocialIcons />
          </div>

          <div className="hero__visual">
            <div className="glow" />
            <div className="avatar">
              <img src={PROFILE.photo} alt={`${PROFILE.firstName} ${PROFILE.lastName}`} />
            </div>
            <div className="float float--1">
              <Smartphone size={20} />
              <div>
                Kotlin
                <small>Android &amp; KMP</small>
              </div>
            </div>
            <div className="float float--2">
              <Code2 size={20} />
              <div>
                Jetpack Compose
                <small>Modern UI toolkit</small>
              </div>
            </div>
            <div className="float float--3">
              <Layers size={20} />
              <div>
                MVVM
                <small>Clean architecture</small>
              </div>
            </div>
          </div>
        </div>

        <div className="stats">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="stat">
                <strong className="grad-text">{s.value}</strong>
                <span>{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, children }) {
  return (
    <Reveal variant="left" className="section-title">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{children}</h2>
    </Reveal>
  );
}

function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionTitle eyebrow="About me">
          Crafting apps that feel <span className="grad-text">solid</span>
        </SectionTitle>
        <div className="about">
          <Reveal delay={100}>
            <div className="card about__text">{PROFILE.about}</div>
          </Reveal>
          <Reveal delay={200}>
            <div className="card about__facts">
              <div className="fact">
                <span className="icon-box">
                  <MapPin size={22} />
                </span>
                <div>
                  <strong>Location</strong>
                  <span>{PROFILE.location}</span>
                </div>
              </div>
              <div className="fact">
                <span className="icon-box">
                  <Briefcase size={22} />
                </span>
                <div>
                  <strong>Role</strong>
                  <span>{PROFILE.role}</span>
                </div>
              </div>
              <div className="fact">
                <span className="icon-box">
                  <Users size={22} />
                </span>
                <div>
                  <strong>Soft skills</strong>
                  <span>{SOFT_SKILLS.join(" · ")}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TechStack() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionTitle eyebrow="Tech stack">
          Tools I build <span className="grad-text">with</span>
        </SectionTitle>
        <div className="grid grid--3">
          {STACK.map(({ icon: Icon, title, items }, i) => (
            <Reveal key={title} delay={(i % 3) * 120}>
              <article className="card card--hover card--stack">
                <span className="icon-box">
                  <Icon size={24} />
                </span>
                <h3>{title}</h3>
                <div className="chips">
                  {items.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionTitle eyebrow="Experience & training">
          My professional <span className="grad-text">journey</span>
        </SectionTitle>
        <div className="timeline">
          {EXPERIENCE.map((e, i) => (
            <Reveal key={e.role + e.company} delay={i * 120} variant="right">
              <div style={{ position: "relative" }}>
                <span className="tl-dot" />
                <article className="card card--hover card--exp">
                  <div className="exp__head">
                    <div>
                      <h3>{e.role}</h3>
                      <p className="company">{e.company}</p>
                    </div>
                    <span className="period">{e.period}</span>
                  </div>
                  <ul>
                    {e.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionTitle eyebrow="Projects">
          Apps I've <span className="grad-text">built</span>
        </SectionTitle>
        <div className="grid grid--3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} variant="zoom" delay={i * 150}>
              <article className="card card--hover card--project">
                <div className="project__top">
                  <p.icon size={56} strokeWidth={1.5} />
                  <span className="project__no">0{i + 1}</span>
                </div>
                <div className="project__body">
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <div className="chips">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <a href={p.link} target="_blank" rel="noreferrer" className="link">
                    View project <ArrowRight size={16} />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${PROFILE.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _subject: `Portfolio: ${data.subject}` }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <SectionTitle eyebrow="Contact">
          Let's build something <span className="grad-text">great</span>
        </SectionTitle>
        <div className="contact">
          <Reveal variant="left">
            <div className="card contact__panel">
              <p className="contact__lead">
                Open to Android Developer opportunities, specializing in Kotlin, Java, Jetpack Compose, and Kotlin
                Multiplatform (KMP).
              </p>

              <div className="contact__row">
                <span className="icon-box">
                  <Mail size={22} />
                </span>
                <div>
                  <strong>Email</strong>
                  <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                </div>
              </div>
              <div className="contact__row">
                <span className="icon-box">
                  <Phone size={22} />
                </span>
                <div>
                  <strong>Phone</strong>
                  <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}>{PROFILE.phone}</a>
                </div>
              </div>

              <hr />
              <h4>Social links</h4>
              <div className="contact__links">
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                  <FaLinkedin size={18} /> LinkedIn
                </a>
                <a href={PROFILE.github} target="_blank" rel="noreferrer">
                  <FaGithub size={18} /> GitHub
                </a>
                <a href={`mailto:${PROFILE.email}`}>
                  <Mail size={18} /> Email
                </a>
                <a href={`https://wa.me/${PROFILE.phoneRaw}`} target="_blank" rel="noreferrer">
                  <MessageCircle size={18} /> WhatsApp
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal variant="right" delay={150}>
            <form className="card form" onSubmit={handleSubmit}>
              <div className="form__row">
                <label>
                  Name *
                  <input name="name" type="text" placeholder="Your name" required />
                </label>
                <label>
                  Email *
                  <input name="email" type="email" placeholder="you@email.com" required />
                </label>
              </div>

              <label>
                Subject *
                <select name="subject" required defaultValue="Job opportunity">
                  <option>Job opportunity</option>
                  <option>Freelance / Project</option>
                  <option>Collaboration</option>
                  <option>Other</option>
                </select>
              </label>

              <label>
                Message *
                <textarea name="message" rows="5" placeholder="Write your message..." required />
              </label>

              <button type="submit" className="btn btn--primary btn--fit" disabled={status === "sending"}>
                <Send size={18} /> {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && <p className="form__msg form__msg--ok">Thanks! Your message was sent.</p>}
              {status === "error" && (
                <p className="form__msg form__msg--err">
                  Something went wrong. Please email me directly at {PROFILE.email}.
                </p>
              )}
              {status === "idle" && (
                <p className="form__note">
                  Your message will be submitted through FormSubmit. You can also email me directly at{" "}
                  {PROFILE.email}.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="#top" className="logo logo--sm">
          Rahul<span>.</span>Dubey
        </a>
        <span className="footer__mid">Android Developer · {PROFILE.location}</span>
        <SocialIcons size={18} />
        <span className="footer__copy">© {new Date().getFullYear()} Rahul Dubey. All rights reserved.</span>
      </div>
    </footer>
  );
}

/* ------------------------------ APP ------------------------------ */

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
