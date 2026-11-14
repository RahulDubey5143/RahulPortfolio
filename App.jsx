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
  cv: "/Rahul_Kumar_CV.pdf",
  photo: "/photo/profile.png",
  location: "Nashik, Maharashtra, India",
};

const NAV = [
  { label: "ABOUT", href: "#about" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

const STACK = [
  {
    icon: Smartphone,
    title: "Android Development",
    text: "Kotlin, Java, Android SDK, Jetpack Compose, XML, MVVM, Coroutines, Flow, LiveData",
  },
  {
    icon: Code2,
    title: "Cross-Platform Development",
    text: "Kotlin Multiplatform (KMP), Compose Multiplatform, Ktor Client, REST API Integration",
  },
  {
    icon: Database,
    title: "Database & Storage",
    text: "Room Database, SQLite, SQL, DataStore, JSON Serialization",
  },
  {
    icon: Wrench,
    title: "Tools & Technologies",
    text: "Android Studio, IntelliJ IDEA, Git, GitHub, Postman, Jira, Gradle",
  },
  {
    icon: ClipboardCheck,
    title: "Testing & Debugging",
    text: "Unit Testing, UI Testing, Manual Testing, API Testing, Firebase Crashlytics, Performance Monitoring",
  },
  {
    icon: Brain,
    title: "Architecture & Concepts",
    text: "Clean Architecture, Dependency Injection, Repository Pattern, Lifecycle Management, OOP, Design Patterns",
  },
  {
    icon: Users,
    title: "Soft Skills",
    text: "Communication, Teamwork, Problem Solving, Analytical Thinking, Adaptability",
  },
];

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
    text: "Developed a real-time monitoring application for a Sugar Mill to track operational metrics. Implemented alert-based push notifications with custom sounds to notify engineers of critical issues. Used Product Flavors to manage multiple app configurations.",
    tags: ["Kotlin", "Model-view-viewmodel (MVVM)", "Firebase", "Retrofit", "WorkManager", "ProductFlavors"],
    link: "https://github.com/your-username/vtiger-crm-tests",
  },
  {
    title: "SAK Marathi",
    text: "I working on this project and This application is basically used for matrimony",
    tags: ["Java", "Model-view-viewmodel (MVVM)", "Firebase", "Retrofit", "REST APIs"],
    link: "#",
  },
  {
    title: "Mitra Agro",
    text: "Implemented Service Request Management module for handling customer requests and complaints with real-time push notifications, automated issue routing, and production performance tracking",
    tags: ["Kotlin", "Model-view-viewmodel (MVVM)", "Firebase", "Retrofit", "REST APIs"],
    link: "#",
  },
];

/* ------------------------ SCROLL ANIMATIONS ------------------------ */

function Reveal({ variant = "up", delay = 0, once = false, className = "", children, ...rest }) {
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
          if (once) io.disconnect(); // pass `once` to animate only the first time
        } else if (!once) {
          setShown(false); // reset when it leaves, so it animates again next time
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
          RAHUL<span>Dubey</span>
        </a>
        <nav className="nav__links">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className={active === n.href.slice(1) ? "is-active" : ""}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a href={PROFILE.cv} download className="btn btn--primary">
          <Download size={18} /> Download CV
        </a>
      </div>
    </header>
  );
}

function SocialIcons({ size = 22 }) {
  return (
    <div className="socials">
      <a
        href={PROFILE.linkedin}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
      >
        <FaLinkedin size={size} />
      </a>

      <a
        href={PROFILE.github}
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
      >
        <FaGithub size={size} />
      </a>

      <a href={`mailto:${PROFILE.email}`} aria-label="Email">
        <Mail size={size} />
      </a>

      <a
        href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
        aria-label="Phone"
      >
        <Phone size={size} />
      </a>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="hero__hello">Hello, I'm</p>
          <h1 className="hero__name">
            {PROFILE.firstName} <span>{PROFILE.lastName}</span>
          </h1>
          <h2 className="hero__role">{PROFILE.role}</h2>
          <p className="hero__tagline">{PROFILE.tagline}</p>

          <div className="hero__actions">
            <a href={PROFILE.cv} download className="btn btn--primary">
              <Download size={18} /> Download CV
            </a>
            <a href="#projects" className="btn btn--outline">
              View My Work <ArrowRight size={18} />
            </a>
          </div>

          <SocialIcons />
        </div>

        <div className="hero__visual">
          <div className="ring ring--1" />
          <div className="ring ring--2" />
          <div className="avatar">
            <img src={PROFILE.photo} alt={`${PROFILE.firstName} ${PROFILE.lastName}`} />
          </div>
          <span className="dot" />
          <p className="quote">
            Quality
            <br />
            Builds
            <br />
            <strong>Trust.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ icon: Icon, children }) {
  return (
    <Reveal variant="left" className="section-title">
      <span className="section-title__icon">
        <Icon size={24} />
      </span>
      <h2>{children}</h2>
    </Reveal>
  );
}

function About() {
  return (
    <section className="section section--about" id="about">
      <div className="container">
        <SectionTitle icon={Users}>About Me</SectionTitle>
        <Reveal delay={100}>
          <p className="about__text">{PROFILE.about}</p>
        </Reveal>
      </div>
    </section>
  );
}

function TechStack() {
  return (
    <section className="section section--about section--tight" id="skills">
      <div className="container">
        <SectionTitle icon={Wrench}>Tech Stack</SectionTitle>
        <div className="grid grid--3">
          {STACK.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 120}>
              <article className="card card--stack">
                <span className="card__icon">
                  <Icon size={20} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
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
    <section className="section section--exp" id="experience">
      <div className="container">
        <SectionTitle icon={Briefcase}>Experience &amp; Training</SectionTitle>
        <div className="grid grid--3">
          {EXPERIENCE.map((e, i) => (
            <Reveal key={e.role + e.company} delay={i * 150}>
              <article className="card card--exp">
                <span className="card__bullet" />
                <div className="card--exp__body">
                  <h3>{e.role}</h3>
                  <p className="company">{e.company}</p>
                  <p className="period">{e.period}</p>
                  <ul>
                    {e.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section section--projects" id="projects">
      <div className="container">
        <SectionTitle icon={Monitor}>Projects</SectionTitle>
        <div className="grid grid--3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} variant="zoom" delay={i * 150}>
              <article className="card card--project">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <div className="tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <a href={p.link} target="_blank" rel="noreferrer" className="link">
                  View project <ArrowRight size={16} />
                </a>
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
    <section className="section section--contact" id="contact">
      <div className="container contact">
        <Reveal variant="left" className="contact__info">
          <SectionTitle icon={Mail}>Get In Touch</SectionTitle>
          <p className="contact__lead">
            Open to Android Developer opportunities, specializing in Kotlin, Java, Jetpack Compose, and Kotlin Multiplatform (KMP).
          </p>

          <div className="contact__row">
            <span className="card__icon">
              <Mail size={20} />
            </span>
            <div>
              <strong>Email</strong>
              <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            </div>
          </div>
          <div className="contact__row">
            <span className="card__icon">
              <Phone size={20} />
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
        </Reveal>

        <Reveal variant="right" delay={150}>
          <form className="form" onSubmit={handleSubmit}>
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
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="#top" className="logo logo--sm">
          Rahul<span>Dubey.</span>
        </a>
        <span className="footer__mid">Android Developer · {PROFILE.location}</span>
        <SocialIcons size={20} />
        <span className="footer__copy">
          © {new Date().getFullYear()} Rahul Dubey. All rights reserved.
        </span>
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
