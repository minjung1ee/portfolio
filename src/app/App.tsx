import { useState, useEffect } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import heroPhoto from "@/imports/image-1.png";

const NAV_ITEMS = ["Home", "Skills", "Projects", "Contact"] as const;

const SKILLS = [
  {
    category: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Styling",
    items: ["SCSS", "CSS Animation", "Responsive Design", "Figma"],
  },
  { category: "Tools", items: ["Git", "GitHub", "Vercel", "Netlify"] },
];

const PROJECTS = [
  {
    title: "Iloom Renewal",
    description:
      "일룸 공식 홈페이지 리뉴얼 프로젝트. 사용자 경험을 중심으로 전체 UI/UX를 재설계했습니다.",
    url: "https://iloom-dev.netlify.app/",
    tags: ["React", "SCSS", "Responsive"],
    bg: "#dce8f2",
  },
  {
    title: "Netflix Renewal",
    description:
      "넷플릭스 홈페이지 리뉴얼 프로젝트. 인터랙티브 UI와 콘텐츠 탐색 경험을 개선했습니다.",
    url: "https://tiny-churros-778d0f.netlify.app/",
    tags: ["React", "TypeScript", "CSS"],
    bg: "#f0dfe0",
  },
];

function useScrollSpy() {
  const [active, setActive] = useState("Home");
  useEffect(() => {
    const ids = ["home", "skills", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.id;
            setActive(id.charAt(0).toUpperCase() + id.slice(1));
          }
        });
      },
      { threshold: 0.35 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

function smoothScroll(id: string) {
  document
    .getElementById(id.toLowerCase())
    ?.scrollIntoView({ behavior: "smooth" });
}

export default function App() {
  const active = useScrollSpy();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <div
      className="portfolio-shell min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Fixed Nav ── */}
      <nav className="site-nav fixed top-0 left-0 right-0 z-50 flex justify-center">
        <ul
          className="nav-list flex rounded-full"
          style={{
            background: "rgba(245,246,248,0.75)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(28,33,48,0.08)",
            listStyle: "none",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <button
                className="nav-button"
                onClick={() => smoothScroll(item)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: active === item ? 500 : 300,
                  color: active === item ? "#1c2130" : "#7a8499",
                  transition: "color 0.3s, font-weight 0.3s",
                }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Hero ── */}
      <section
        id="home"
        className="hero-section"
      >
        {/* Framed image card */}
        <div
          className="hero-card"
          style={{
            position: "relative",
            width: "100%",
            margin: "0 auto",
            overflow: "hidden",
            boxShadow: "0 8px 48px rgba(28,33,48,0.14)",
          }}
        >
          <ImageWithFallback
            src={heroPhoto}
            alt="Calm ocean surface with shimmering light — romantic hero photo"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 40%" }}
          />
          {/* dark overlay for legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(28,33,48,0.35) 0%, rgba(28,33,48,0.1) 60%, rgba(28,33,48,0.22) 100%)",
            }}
          />
          {/* PORTFOLIO title */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1
              className="hero-title"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                color: "#ffffff",
                textShadow: "0 2px 32px rgba(28,33,48,0.3)",
                userSelect: "none",
                margin: 0,
              }}
            >
              PORTFOLIO
            </h1>
          </div>
        </div>
        {/* scroll cue below the card */}
        <div
          className="scroll-cue"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "2rem",
            opacity: 0.45,
          }}
        >
          <div
            style={{ width: 1, height: 28, background: "rgba(28,33,48,0.4)" }}
          />
          <span
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#1c2130",
              fontWeight: 300,
            }}
          >
            scroll
          </span>
        </div>
      </section>

      {/* ── Skills ── */}
      <section
        id="skills"
        className="content-section"
        style={{ maxWidth: 880, margin: "0 auto" }}
      >
        <p
          className="section-label"
          style={{
            textTransform: "uppercase",
            color: "#8fa8c8",
          }}
        >
          what I work with
        </p>
        <h2
          className="section-heading"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            color: "#1c2130",
          }}
        >
          Skills
        </h2>
        <div
          className="skills-grid"
          style={{
            display: "grid",
          }}
        >
          {SKILLS.map((group) => (
            <div key={group.category}>
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#7a8499",
                  fontWeight: 500,
                  marginBottom: "1.25rem",
                }}
              >
                {group.category}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      fontSize: "0.875rem",
                      color: "#1c2130",
                      fontWeight: 300,
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "#8fa8c8",
                        flexShrink: 0,
                      }}
                    />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div
        className="section-divider"
        style={{
          margin: "0 auto",
          height: 1,
          background: "rgba(28,33,48,0.08)",
        }}
      />

      {/* ── Projects ── */}
      <section
        id="projects"
        className="content-section"
        style={{ maxWidth: 880, margin: "0 auto" }}
      >
        <p
          className="section-label"
          style={{
            textTransform: "uppercase",
            color: "#8fa8c8",
          }}
        >
          selected work
        </p>
        <h2
          className="section-heading"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            color: "#1c2130",
          }}
        >
          Projects
        </h2>
        <div className="project-list">
          {PROJECTS.map((project, i) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
              style={{
                display: "block",
                textDecoration: "none",
                overflow: "hidden",
                background: project.bg,
                transform:
                  hoveredProject === project.title
                    ? "translateY(-4px)"
                    : "translateY(0)",
                boxShadow:
                  hoveredProject === project.title
                    ? "0 20px 56px rgba(28,33,48,0.13)"
                    : "0 2px 16px rgba(28,33,48,0.06)",
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
              }}
              onMouseEnter={() => setHoveredProject(project.title)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div
                className="project-card-inner"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="project-copy" style={{ flex: 1 }}>
                  <div
                    className="project-index"
                    style={{
                      color: "#7a8499",
                      textTransform: "uppercase",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3
                    className="project-title"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 400,
                      color: "#1c2130",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="project-description"
                    style={{
                      color: "#4a5568",
                      fontWeight: 300,
                      lineHeight: 1.7,
                    }}
                  >
                    {project.description}
                  </p>
                  <div className="tag-list">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="project-tag"
                        style={{
                          background: "rgba(28,33,48,0.08)",
                          color: "#1c2130",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* arrow */}
                <div
                  className="project-visit"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#1c2130",
                    opacity: hoveredProject === project.title ? 1 : 0.3,
                    transition: "opacity 0.4s",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    Visit
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    style={{
                      transform:
                        hoveredProject === project.title
                          ? "translate(2px,-2px)"
                          : "none",
                      transition: "transform 0.4s",
                    }}
                  >
                    <path
                      d="M3 13L13 3M13 3H7M13 3V9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <div
        className="section-divider"
        style={{
          margin: "0 auto",
          height: 1,
          background: "rgba(28,33,48,0.08)",
        }}
      />

      {/* ── Contact ── */}
      <section
        id="contact"
        className="content-section"
        style={{ maxWidth: 880, margin: "0 auto" }}
      >
        <p
          className="section-label"
          style={{
            textTransform: "uppercase",
            color: "#8fa8c8",
          }}
        >
          get in touch
        </p>
        <h2
          className="section-heading contact-heading"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            color: "#1c2130",
          }}
        >
          Contact
        </h2>
        <p
          className="contact-copy"
          style={{
            color: "#7a8499",
            fontWeight: 300,
            lineHeight: 1.8,
          }}
        >
          언제든지 편하게 연락 주세요.
          <br />
          새로운 기회나 협업에 열려 있습니다.
        </p>
        <a
          href="https://github.com/minjung1ee"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
          style={{
            display: "inline-flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "#1c2130",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#1c2130",
              }}
            >
              github.com/minjung1ee
            </div>
            <div
              style={{ fontSize: "0.75rem", color: "#7a8499", fontWeight: 300 }}
            >
              GitHub Profile
            </div>
          </div>
        </a>
      </section>

      {/* ── Footer ── */}
      <footer
        className="site-footer"
        style={{
          textAlign: "center",
          color: "#b0b8cc",
          fontWeight: 300,
        }}
      >
        © 2024 minjung1ee — All rights reserved
      </footer>
    </div>
  );
}
