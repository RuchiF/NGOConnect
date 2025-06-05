import React, { useState } from "react";
import { Link } from "react-router-dom";

// Carousel data (features or testimonials)
const carouselItems = [
  {
    title: "Connect with NGOs & Volunteers",
    desc: "Build your network with passionate changemakers and organizations.",
    icon: "🤝",
  },
  {
    title: "Organize Impactful Events",
    desc: "Create, manage, and promote events for maximum social impact.",
    icon: "📅",
  },
  {
    title: "Inspire & Get Inspired",
    desc: "Share stories, testimonials, and inspire others to join your cause.",
    icon: "🌟",
  },
];

// A relevant, subtle hero image (Unsplash, free to use)
const HERO_IMG =
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80";

const Home = () => {
  const [carouselIdx, setCarouselIdx] = useState(0);

  const next = () => setCarouselIdx((carouselIdx + 1) % carouselItems.length);
  const prev = () =>
    setCarouselIdx(
      (carouselIdx - 1 + carouselItems.length) % carouselItems.length
    );

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "#f3f6f9",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HERO SECTION */}
      <section
        style={{
          width: "100vw",
          minHeight: 440,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(90deg, #eaf1fb 60%, #f3f6f9 100%)",
          overflow: "hidden",
        }}
      >
        {/* Hero image with gradient overlay */}
        <img
          src={HERO_IMG}
          alt="NGOConnect - Community"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            width: "60vw",
            minWidth: 350,
            objectFit: "cover",
            zIndex: 1,
            opacity: 0.85,
            filter: "brightness(0.97) contrast(1.04)",
            border: "none",
            borderRadius: 0,
            boxShadow: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            width: "60vw",
            background:
              "linear-gradient(90deg, rgba(234,241,251,0.7) 0%, #f3f6f9 100%)",
            zIndex: 2,
          }}
        />
        <div
          style={{
            flex: 1,
            minWidth: 320,
            maxWidth: 600,
            padding: "48px 32px 48px 6vw",
            zIndex: 3,
            position: "relative",
          }}
        >
          <h1
            style={{
              fontSize: "2.8rem",
              color: "#0a66c2",
              fontWeight: 800,
              marginBottom: 18,
              letterSpacing: "-1px",
              lineHeight: 1.15,
            }}
          >
            Welcome to <span style={{ color: "#0a66c2" }}>NGOConnect</span>
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#374151",
              marginBottom: 32,
              maxWidth: 520,
              lineHeight: 1.5,
            }}
          >
            Empowering NGOs to organize impactful events and enabling volunteers
            to make a difference.
            <br />
            <span style={{ color: "#0a66c2", fontWeight: 600 }}>
              Inspired by LinkedIn, built for changemakers.
            </span>
          </p>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <Link
              to="/auth"
              style={{
                background: "#0a66c2",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "12px 32px",
                fontSize: "1.1rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "background 0.2s",
              }}
            >
              Get Started
            </Link>
            <Link
              to="/ngo"
              style={{
                background: "#fff",
                color: "#0a66c2",
                border: "2px solid #0a66c2",
                borderRadius: 6,
                padding: "12px 32px",
                fontSize: "1.1rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              NGO Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* CAROUSEL SECTION */}
      <section
        style={{
          width: "100vw",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "48px 0 32px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            maxWidth: "100vw",
            position: "relative",
          }}
        >
          <button
            style={{
              background: "#0a66c2",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: 40,
              height: 40,
              fontSize: "1.5rem",
              cursor: "pointer",
              transition: "background 0.2s",
              marginRight: 16,
              position: "absolute",
              left: 32,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
            }}
            onClick={prev}
            aria-label="Previous"
          >
            &#8592;
          </button>
          <div
            style={{
              width: "100%",
              maxWidth: 900,
              minHeight: 220,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "visible",
            }}
          >
            <div
              style={{
                background: "#f3f6f9",
                borderRadius: 16,
                boxShadow: "0 4px 24px rgba(10,102,194,0.13)",
                padding: "32px 28px",
                minWidth: 260,
                maxWidth: 540,
                width: "100%",
                textAlign: "center",
                fontSize: "1.1rem",
                color: "#22223b",
                position: "relative",
                opacity: 1,
                animation: "slideIn 0.5s cubic-bezier(.4,2,.6,1)",
                margin: "0 80px",
              }}
              key={carouselIdx}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>
                {carouselItems[carouselIdx].icon}
              </div>
              <h3
                style={{
                  color: "#0a66c2",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  marginBottom: 8,
                }}
              >
                {carouselItems[carouselIdx].title}
              </h3>
              <p style={{ color: "#444", fontSize: "1.1rem" }}>
                {carouselItems[carouselIdx].desc}
              </p>
            </div>
          </div>
          <button
            style={{
              background: "#0a66c2",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: 40,
              height: 40,
              fontSize: "1.5rem",
              cursor: "pointer",
              transition: "background 0.2s",
              marginLeft: 16,
              position: "absolute",
              right: 32,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
            }}
            onClick={next}
            aria-label="Next"
          >
            &#8594;
          </button>
        </div>
        {/* Carousel dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 18,
            gap: 8,
          }}
        >
          {carouselItems.map((_, idx) => (
            <span
              key={idx}
              style={{
                display: "inline-block",
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: idx === carouselIdx ? "#0a66c2" : "#cfd8dc",
                transition: "background 0.2s",
                margin: "0 2px",
                cursor: "pointer",
              }}
              onClick={() => setCarouselIdx(idx)}
            />
          ))}
        </div>
        {/* Animation keyframes */}
        <style>
          {`
            @keyframes slideIn {
              from { opacity: 0; transform: translateY(40px);}
              to { opacity: 1; transform: none;}
            }
          `}
        </style>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#fff",
          borderTop: "1px solid #e5e7eb",
          padding: "24px 0 12px 0",
          textAlign: "center",
          color: "#444",
          marginTop: 48,
          width: "100%",
        }}
      >
        <div>
          <span style={{ color: "#0a66c2", fontWeight: 700 }}>NGOConnect</span>{" "}
          &copy; {new Date().getFullYear()} &mdash; Inspired by LinkedIn
        </div>
        <div
          style={{
            marginTop: 8,
            display: "flex",
            justifyContent: "center",
            gap: 24,
          }}
        >
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#0a66c2",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            GitHub
          </a>
          <a
            href="mailto:support@ngoconnect.com"
            style={{
              color: "#0a66c2",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Contact
          </a>
          <a
            href="#"
            style={{
              color: "#0a66c2",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
