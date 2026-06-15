"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [isSplash, setIsSplash] = useState(true);
  const [currentCard, setCurrentCard] = useState(0); // 0 to 8 index

  // Proposal sections
  const CARDS = [
    "cover",
    "challenge",
    "objective",
    "slides-outline",
    "process",
    "aesthetics",
    "copywriting",
    "deliverables",
    "investment"
  ];

  // Particle Canvas background logic (Golden dust effect)
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.8 + 0.5;
        this.color = Math.random() > 0.4 ? "rgba(201, 168, 76, 0.2)" : "rgba(255, 255, 255, 0.15)";
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };
    initParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Card Navigation helper
  const navigateTo = (index) => {
    if (index >= 0 && index < CARDS.length) {
      setCurrentCard(index);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (isSplash) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        if (e.key === "Space") e.preventDefault();
        navigateTo(currentCard + 1);
      } else if (e.key === "ArrowLeft") {
        navigateTo(currentCard - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentCard, isSplash]);

  // Challenge slider comparison
  const [challengeSlide, setChallengeSlide] = useState("generic");

  // Simplified Slide Map Modules
  const [activeSlideNum, setActiveSlideNum] = useState(1);
  const SLIDE_OUTLINE = [
    { num: 1, title: "Executive Foundations", desc: "Covers the Cover Page, Table of Contents, and Executive Summary to welcome investors and set the brand's premium tone." },
    { num: 2, title: "Corporate Mission & Challenge", desc: "Outlines Who We Are, our corporate values, and details the specific business barriers facing global firms in the UAE." },
    { num: 3, title: "The Advisory Solutions", desc: "Details how Ultron handles complex business setup, banking relationships, corporate taxation, and regulatory AML compliance." },
    { num: 4, title: "Operations & Market Advantage", desc: "Explains our seamless onboarding process flow, strategic Dubai/UAE benefits, and highlights our core competitive edge ('We handle what others won't')." },
    { num: 5, title: "Contact & Onboarding Call to Action", desc: "A clean, functional contact section highlighting communication pathways, locations, and direct next steps." }
  ];

  // Copywriting Transformer
  const [copyVariant, setCopyVariant] = useState(0);
  const COPY_TRANSFORMATIONS = [
    {
      before: "We help you set up companies in Dubai and get local licenses.",
      after: "Structuring High-Yield Corporate Vehicles in the UAE's Premier Economic Zones.",
      badge: "Business Setup"
    },
    {
      before: "We help people open bank accounts even if they have difficult cases.",
      after: "Unlocking Premium UAE Corporate Banking Facilities for Complex Global Profiles.",
      badge: "Banking Advisory"
    },
    {
      before: "We do compliance work and help with local tax rules.",
      after: "Fortifying Corporate Assets via Rigorous AML Architecture and Tax Optimization.",
      badge: "Compliance"
    }
  ];

  // Client Signing State
  const [clientName, setClientName] = useState("");
  const [contractSigned, setContractSigned] = useState(false);
  const [isSigning, setIsSigning] = useState(false);

  const handleAcceptProposal = () => {
    if (!clientName.trim()) {
      alert("Please enter your name first.");
      return;
    }
    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);
      setContractSigned(true);
    }, 1200);
  };

  return (
    <>
      <canvas id="particle-canvas" ref={canvasRef}></canvas>

      {/* PERSONALIZED SPLASH SCREEN */}
      {isSplash && (
        <div className="splash-overlay" style={{ background: "#0A0F1E" }}>
          <div className="glowing-orb bg-orb-1" style={{ background: "var(--primary)", opacity: 0.25 }}></div>
          <div className="glowing-orb bg-orb-2" style={{ background: "var(--accent)", opacity: 0.25 }}></div>
          <div className="splash-content">
            <span className="security-tag" style={{ border: "1px solid rgba(201, 168, 76, 0.3)", color: "#C9A84C", background: "rgba(201, 168, 76, 0.08)" }}>
              🔒 CONFIDENTIAL CREATIVE PROPOSAL
            </span>
            
            {/* Ultron styled Logo in Splash */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "32px", marginTop: "16px" }}>
              <span style={{ color: "#C9A84C", fontWeight: "900", fontSize: "3rem", tracking: "0.2em", textShadow: "0 0 15px rgba(201,168,76,0.4)" }}>U</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ color: "#FFF", fontWeight: "800", fontSize: "1.4rem", letterSpacing: "0.15em", lineHeight: "1" }}>ULTRON</div>
                <div style={{ color: "#C9A84C", fontWeight: "400", fontSize: "0.9rem", letterSpacing: "0.25em" }}>FINANCIALS</div>
              </div>
            </div>

            <h1 className="splash-title" style={{ background: "linear-gradient(135deg, #FFF, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Welcome, Kuldeep!
            </h1>
            <p className="splash-funny-text">
              <strong>Notice:</strong> This interactive presentation is exclusively prepared for <strong>Kuldeep Chauhan</strong> (Founder & Lead Advisor, Ultron Financials). 
              Inside, you will find the complete roadmap for creating an elite, investor-grade <strong>Company Profile</strong> that matches the premium visual identity of your website.
              <br /><br />
              Let's craft the brand narrative that shows global investors why you are the best at what you do.
            </p>
            <button className="btn btn-primary" onClick={() => setIsSplash(false)} style={{ background: "linear-gradient(135deg, #B8892A, #C9A84C)", border: "none", color: "#0A0F1E", fontWeight: "700" }}>
              Explore Design Proposal <span style={{ marginLeft: "6px" }}>→</span>
            </button>
          </div>
        </div>
      )}

      {!isSplash && (
        <>
          <nav className="proposal-nav" style={{ borderBottom: "1px solid rgba(201, 168, 76, 0.15)", background: "rgba(10, 15, 30, 0.85)" }}>
            <div className="nav-brand" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Gold Monogram Logo */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "#C9A84C", fontWeight: "900", fontSize: "1.6rem", letterSpacing: "0.05em" }}>U</span>
                <span className="tech-text" style={{ fontSize: "0.9rem", fontWeight: "800", letterSpacing: "1px", color: "#FFF" }}>
                  ULTRON <span style={{ color: "#C9A84C", fontWeight: "400" }}>FINANCIALS</span>
                </span>
              </div>
            </div>
            <div className="nav-client">
              <span className="badge" style={{ color: "#C9A84C", background: "rgba(201, 168, 76, 0.08)", border: "1px solid rgba(201, 168, 76, 0.25)" }}>Proposal For</span>
              <span className="client-name">Kuldeep Chauhan</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar" 
                style={{ width: `${((currentCard + 1) / CARDS.length) * 100}%`, background: "linear-gradient(90deg, #B8892A, #C9A84C)" }}
              ></div>
            </div>
          </nav>

          {/* Quick Navigation Sidebar Dots */}
          <div className="sidebar-nav">
            {CARDS.map((name, index) => (
              <button
                key={name}
                className={`nav-dot ${currentCard === index ? "active" : ""}`}
                onClick={() => navigateTo(index)}
                title={name.toUpperCase()}
                style={{
                  background: currentCard === index ? "#C9A84C" : "rgba(255, 255, 255, 0.2)",
                  boxShadow: currentCard === index ? "0 0 10px #C9A84C" : "none"
                }}
              ></button>
            ))}
          </div>

          <main className="proposal-container">
            
            {/* CARD 1: COVER */}
            <section className={`proposal-card ${currentCard === 0 ? "active" : ""}`}>
              <div className="card-content cover-layout">
                <div className="glowing-orb bg-orb-1" style={{ background: "#C9A84C" }}></div>
                <div className="glowing-orb bg-orb-2" style={{ background: "#B8892A" }}></div>
                
                <div className="cover-header">
                  <span className="pre-title animate-up" style={{ color: "#C9A84C", letterSpacing: "4px" }}>DESIGN PROPOSAL & OUTLINE</span>
                  <h1 className="main-title animate-up delay-1" style={{ fontSize: "3.2rem" }}>Company Profile Creation</h1>
                  <p className="subtitle animate-up delay-2">
                    Creating a High-Impact, Luxury-Grade Institutional Presentation for Ultron Financials
                  </p>
                </div>

                <div className="cover-footer animate-up delay-3">
                  <div className="meta-box client-box">
                    <span className="meta-label">PREPARED FOR</span>
                    <h3 className="meta-value">Kuldeep Chauhan</h3>
                    <p style={{ fontSize: "0.85rem", color: "#9CA3AF" }}>Founder & Lead Advisor | Ultron Financials</p>
                  </div>
                  <div className="meta-separator" style={{ background: "rgba(201, 168, 76, 0.2)" }}></div>
                  <div className="meta-box creator-box">
                    <span className="meta-label">CREATED BY</span>
                    <h3 className="meta-value" style={{ color: "#FFF" }}>Mutant Technologies</h3>
                    <p style={{ fontSize: "0.85rem", color: "#C9A84C" }}>Creative Studio & Growth Partners</p>
                  </div>
                </div>

                <div className="cta-container animate-up delay-4">
                  <button className="btn btn-primary start-btn" onClick={() => navigateTo(1)} style={{ background: "linear-gradient(135deg, #B8892A, #C9A84C)", border: "none", color: "#0A0F1E" }}>
                    <span>Explore Proposal</span> <span style={{ marginLeft: "6px" }}>→</span>
                  </button>
                </div>
              </div>
            </section>

            {/* CARD 2: THE CHALLENGE */}
            <section className={`proposal-card ${currentCard === 1 ? "active" : ""}`}>
              <div className="card-content">
                <span className="section-tag" style={{ color: "#C9A84C" }}>The Opportunity</span>
                <h2 className="section-title">Elevating First Impressions</h2>
                <p className="section-desc">
                  For high-net-worth clients, international corporations, and bank officials looking to set up in Dubai, trust and authority are established in seconds. A standard presentation costs you credibility.
                </p>

                <div className="opportunity-selector">
                  <button 
                    className={`opp-toggle ${challengeSlide === "generic" ? "active" : ""}`} 
                    onClick={() => setChallengeSlide("generic")}
                    style={{ borderColor: challengeSlide === "generic" ? "#C9A84C" : "rgba(255,255,255,0.1)" }}
                  >
                    ⚠️ Standard Financial Presentation
                  </button>
                  <button 
                    className={`opp-toggle ${challengeSlide === "mutant" ? "active" : ""}`} 
                    onClick={() => setChallengeSlide("mutant")}
                    style={{ borderColor: challengeSlide === "mutant" ? "#C9A84C" : "rgba(255,255,255,0.1)" }}
                  >
                    ✨ Ultron Luxury Corporate Profile
                  </button>
                </div>

                <div className="opportunity-panel">
                  {challengeSlide === "generic" ? (
                    <div className="interactive-search-mockup" style={{ borderColor: "#ef4444" }}>
                      <h4 style={{ color: "#ef4444", marginBottom: "8px" }}>✖ Standard Templates</h4>
                      <p className="text-secondary" style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                        - Default, boring typography that looks rushed and unprofessional.<br />
                        - Text-heavy slides that overwhelm international clients and partners.<br />
                        - Fails to match the high-end dark luxury theme of your main website.<br />
                        - Standard stock layouts that do not project institutional authority.
                      </p>
                    </div>
                  ) : (
                    <div className="interactive-search-mockup" style={{ borderColor: "#C9A84C" }}>
                      <h4 style={{ color: "#C9A84C", marginBottom: "8px" }}>✓ Mutant Crafted Authority Asset</h4>
                      <p className="text-secondary" style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                        - **Bespoke Slide Master**: Colors aligned directly with your website theme (Navy/Gold).<br />
                        - **High-Performance Copywriting**: Refining complex services into crisp value taglines.<br />
                        - **Clear Layout Hierarchy**: Maximizing white space and margins for premium scannability.<br />
                        - **Custom Vector Infographics**: Representing setup workflows and advisory structures clearly.
                      </p>
                    </div>
                  )}
                </div>

                <div className="navigation-controls">
                  <button className="btn btn-secondary prev-card" onClick={() => navigateTo(0)}>
                    ← Back
                  </button>
                  <button className="btn btn-primary next-card" onClick={() => navigateTo(2)} style={{ background: "linear-gradient(135deg, #B8892A, #C9A84C)", border: "none", color: "#0A0F1E" }}>
                    Project Objective →
                  </button>
                </div>
              </div>
            </section>

            {/* CARD 3: OBJECTIVE */}
            <section className={`proposal-card ${currentCard === 2 ? "active" : ""}`}>
              <div className="card-content">
                <span className="section-tag" style={{ color: "#C9A84C" }}>Scope Objectives</span>
                <h2 className="section-title">An Elite 14-Slide Portfolio</h2>
                <p className="section-desc">
                  We will design and write a complete, investor-ready Company Profile comprising up to 14 high-impact slides, structured to pitch Ultron's core strengths.
                </p>

                <div className="goals-grid">
                  <div className="goal-item" style={{ borderLeft: "3px solid #C9A84C" }}>
                    <div className="goal-icon" style={{ color: "#C9A84C" }}>🎨</div>
                    <h4>Luxury Design Master</h4>
                    <p>Custom backgrounds, geometric guidelines, and elegant gold borders fitting the brand.</p>
                  </div>
                  <div className="goal-item" style={{ borderLeft: "3px solid #C9A84C" }}>
                    <div className="goal-icon" style={{ color: "#C9A84C" }}>✍️</div>
                    <h4>Copy Hook Tuning</h4>
                    <p>Transforming complex UAE advisory, corporate taxation, and banking rules into readable hooks.</p>
                  </div>
                  <div className="goal-item" style={{ borderLeft: "3px solid #C9A84C" }}>
                    <div className="goal-icon" style={{ color: "#C9A84C" }}>📊</div>
                    <h4>Strategic Visuals</h4>
                    <p>Clean timelines, process flowcharts, and comparative tables replacing plain bulleted lists.</p>
                  </div>
                  <div className="goal-item" style={{ borderLeft: "3px solid #C9A84C" }}>
                    <div className="goal-icon" style={{ color: "#C9A84C" }}>📂</div>
                    <h4>Interactive PDF Format</h4>
                    <p>Delivered as a premium high-definition PDF designed for clear reading and digital shares.</p>
                  </div>
                </div>

                <div className="navigation-controls">
                  <button className="btn btn-secondary prev-card" onClick={() => navigateTo(1)}>
                    ← Back
                  </button>
                  <button className="btn btn-primary next-card" onClick={() => navigateTo(3)} style={{ background: "linear-gradient(135deg, #B8892A, #C9A84C)", border: "none", color: "#0A0F1E" }}>
                    View Structure →
                  </button>
                </div>
              </div>
            </section>

            {/* CARD 4: THE 14-SLIDE OUTLINE */}
            <section className={`proposal-card ${currentCard === 3 ? "active" : ""}`}>
              <div className="card-content">
                <span className="section-tag" style={{ color: "#C9A84C" }}>The Structure</span>
                <h2 className="section-title">Visual Storytelling Modules</h2>
                <p className="section-desc">
                  To ensure maximum flexibility before assets are finalized, we organize the company profile into high-level strategic modules rather than rigid layouts.
                </p>

                <div className="keywords-interactive-display">
                  <div className="keywords-list-side" style={{ maxHeight: "280px", overflowY: "auto", paddingRight: "10px" }}>
                    {SLIDE_OUTLINE.map((slide) => (
                      <div
                        key={slide.num}
                        className={`keyword-selector ${activeSlideNum === slide.num ? "active" : ""}`}
                        onClick={() => setActiveSlideNum(slide.num)}
                        style={{ 
                          padding: "10px 16px",
                          borderColor: activeSlideNum === slide.num ? "#C9A84C" : "rgba(255,255,255,0.05)"
                        }}
                      >
                        <span className="kw-text" style={{ fontSize: "0.85rem", color: activeSlideNum === slide.num ? "#FFF" : "#9CA3AF" }}>
                          Module: {slide.title}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="keyword-detail-display">
                    <div className="kd-glass-card" style={{ padding: "24px", border: "1px solid rgba(201, 168, 76, 0.2)", background: "rgba(13, 20, 38, 0.8)" }}>
                      <div className="kd-header" style={{ marginBottom: "16px", paddingBottom: "10px", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
                        <h3 style={{ color: "#FFF" }}>{SLIDE_OUTLINE[activeSlideNum - 1].title}</h3>
                        <span className="badge" style={{ color: "#C9A84C", background: "rgba(201, 168, 76, 0.08)", borderColor: "rgba(201,168,76,0.2)" }}>Strategy Focus</span>
                      </div>
                      <div className="kd-explanation">
                        <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#F5F5F0" }}>
                          {SLIDE_OUTLINE[activeSlideNum - 1].desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="navigation-controls">
                  <button className="btn btn-secondary prev-card" onClick={() => navigateTo(2)}>
                    ← Back
                  </button>
                  <button className="btn btn-primary next-card" onClick={() => navigateTo(4)} style={{ background: "linear-gradient(135deg, #B8892A, #C9A84C)", border: "none", color: "#0A0F1E" }}>
                    Our Process →
                  </button>
                </div>
              </div>
            </section>

            {/* CARD 5: THE PROCESS */}
            <section className={`proposal-card ${currentCard === 4 ? "active" : ""}`}>
              <div className="card-content">
                <span className="section-tag" style={{ color: "#C9A84C" }}>Collaboration Workflow</span>
                <h2 className="section-title">Discovery to Delivery</h2>
                <p className="section-desc">
                  We operate with structure and speed, requiring minimal time commitment from your end to produce elite-level results.
                </p>

                <div className="strategy-cards">
                  <div className="strat-card" style={{ background: "rgba(13, 20, 38, 0.65)" }}>
                    <div className="strat-num" style={{ color: "rgba(201, 168, 76, 0.15)" }}>01</div>
                    <h3>1. Onboarding & Assets</h3>
                    <p>Collecting brand briefs, compliance values, and current case studies from your desk.</p>
                  </div>
                  <div className="strat-card" style={{ background: "rgba(13, 20, 38, 0.65)" }}>
                    <div className="strat-num" style={{ color: "rgba(201, 168, 76, 0.15)" }}>02</div>
                    <h3>2. Copywriting Draft</h3>
                    <p>Structuring the verbal flow, slide headers, and taglines for your conceptual sign-off.</p>
                  </div>
                  <div className="strat-card" style={{ background: "rgba(13, 20, 38, 0.65)" }}>
                    <div className="strat-num" style={{ color: "rgba(201, 168, 76, 0.15)" }}>03</div>
                    <h3>3. Master Design Build</h3>
                    <p>Executing high-fidelity layouts, customized gold UI elements, and custom typography.</p>
                  </div>
                  <div className="strat-card" style={{ background: "rgba(13, 20, 38, 0.65)" }}>
                    <div className="strat-num" style={{ color: "rgba(201, 168, 76, 0.15)" }}>04</div>
                    <h3>4. Revisions & Export</h3>
                    <p>Refining through feedback loops and exporting the final print-ready and digital vector PDF formats.</p>
                  </div>
                </div>

                <div className="navigation-controls">
                  <button className="btn btn-secondary prev-card" onClick={() => navigateTo(3)}>
                    ← Back
                  </button>
                  <button className="btn btn-primary next-card" onClick={() => navigateTo(5)} style={{ background: "linear-gradient(135deg, #B8892A, #C9A84C)", border: "none", color: "#0A0F1E" }}>
                    Visual Style →
                  </button>
                </div>
              </div>
            </section>

            {/* CARD 6: VISUAL AESTHETICS */}
            <section className={`proposal-card ${currentCard === 5 ? "active" : ""}`}>
              <div className="card-content">
                <span className="section-tag" style={{ color: "#C9A84C" }}>Design Language</span>
                <h2 className="section-title">Corporate Luxury Aesthetic</h2>
                <p className="section-desc">
                  By matching your website’s high-contrast theme, we establish instant visual association, reinforcing your position as an elite UAE boutique consultancy.
                </p>

                <div className="deliverables-layout">
                  <div className="deliv-main-grid">
                    <div className="deliv-metric-card" style={{ background: "linear-gradient(135deg, #0A0F1E, #070B16)", border: "1px solid rgba(201, 168, 76, 0.2)" }}>
                      <span className="metric-label" style={{ color: "#C9A84C" }}>Base Canvas</span>
                      <span className="metric-num" style={{ fontSize: "1.6rem" }}>Midnight Navy (#0A0F1E)</span>
                      <p style={{ fontSize: "0.8rem", color: "#9CA3AF" }}>Deep, stable tones projecting regulatory trust and institutional capacity.</p>
                    </div>
                    <div className="deliv-metric-card" style={{ background: "linear-gradient(135deg, rgba(201, 168, 76, 0.05), rgba(201, 168, 76, 0.15))", border: "1px solid rgba(201, 168, 76, 0.3)" }}>
                      <span className="metric-label" style={{ color: "#FFF" }}>Primary Accent</span>
                      <span className="metric-num" style={{ fontSize: "1.6rem", color: "#C9A84C" }}>UAE Desert Gold (#C9A84C)</span>
                      <p style={{ fontSize: "0.8rem", color: "#F5F5F0" }}>Symbolizing premium advisory, wealth curation, and elite setups.</p>
                    </div>
                  </div>

                  <div className="deliv-checklist">
                    <div className="check-item">
                      <div className="check-icon" style={{ color: "#C9A84C" }}>✓</div>
                      <div>
                        <h5>Geometric Grid Balance</h5>
                        <p>Perfect grid alignment to prevent layout clutter and ensure readability on all viewports.</p>
                      </div>
                    </div>
                    <div className="check-item">
                      <div className="check-icon" style={{ color: "#C9A84C" }}>✓</div>
                      <div>
                        <h5>DM Sans Typography</h5>
                        <p>Modern geometric sans-serif headings paired with clean, highly readable body lines.</p>
                      </div>
                    </div>
                    <div className="check-item">
                      <div className="check-icon" style={{ color: "#C9A84C" }}>✓</div>
                      <div>
                        <h5>Minimalistic Corporate Graphics</h5>
                        <p>Avoiding standard stock photos in favor of neat icons, abstract gold lines, and premium maps.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="navigation-controls">
                  <button className="btn btn-secondary prev-card" onClick={() => navigateTo(4)}>
                    ← Back
                  </button>
                  <button className="btn btn-primary next-card" onClick={() => navigateTo(6)} style={{ background: "linear-gradient(135deg, #B8892A, #C9A84C)", border: "none", color: "#0A0F1E" }}>
                    Copywriting Style →
                  </button>
                </div>
              </div>
            </section>

            {/* CARD 7: COPYWRITING TRANSFORMER */}
            <section className={`proposal-card ${currentCard === 6 ? "active" : ""}`}>
              <div className="card-content">
                <span className="section-tag" style={{ color: "#C9A84C" }}>Persuasive Copy</span>
                <h2 className="section-title">Strategic Translation Engine</h2>
                <p className="section-desc">
                  We refine standard, flat explanations into high-converting copywriting tailored for family offices, investors, and startup founders. Click below to preview:
                </p>

                <div className="feed-layout">
                  <div className="feed-categories">
                    {COPY_TRANSFORMATIONS.map((variant, index) => (
                      <button 
                        key={variant.badge}
                        className={`category-btn ${copyVariant === index ? "active" : ""}`}
                        onClick={() => setCopyVariant(index)}
                        style={{
                          borderColor: copyVariant === index ? "#C9A84C" : "rgba(255,255,255,0.05)",
                          background: copyVariant === index ? "rgba(201, 168, 76, 0.1)" : "transparent",
                          color: copyVariant === index ? "#C9A84C" : "#9CA3AF"
                        }}
                      >
                        🎯 {variant.badge}
                      </button>
                    ))}
                  </div>

                  <div className="kd-glass-card" style={{ display: "flex", flexDirection: "column", justifyContent: "center", border: "1px solid rgba(201, 168, 76, 0.2)", background: "rgba(13, 20, 38, 0.7)" }}>
                    <div style={{ marginBottom: "16px" }}>
                      <span className="party-title" style={{ color: "#ef4444", fontSize: "0.8rem", letterSpacing: "1px" }}>STANDARD COPY (BORING)</span>
                      <p style={{ fontSize: "0.95rem", color: "#9CA3AF", fontStyle: "italic", background: "rgba(239, 68, 68, 0.03)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(239, 68, 68, 0.1)" }}>
                        "{COPY_TRANSFORMATIONS[copyVariant].before}"
                      </p>
                    </div>
                    <div>
                      <span className="party-title" style={{ color: "#C9A84C", fontSize: "0.8rem", letterSpacing: "1px" }}>MUTANT COPY HOOK (ELITE)</span>
                      <p style={{ fontSize: "1.1rem", color: "#FFF", fontWeight: "600", background: "rgba(201, 168, 76, 0.05)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(201, 168, 76, 0.15)" }}>
                        "{COPY_TRANSFORMATIONS[copyVariant].after}"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="navigation-controls">
                  <button className="btn btn-secondary prev-card" onClick={() => navigateTo(5)}>
                    ← Back
                  </button>
                  <button className="btn btn-primary next-card" onClick={() => navigateTo(7)} style={{ background: "linear-gradient(135deg, #B8892A, #C9A84C)", border: "none", color: "#0A0F1E" }}>
                    Deliverables →
                  </button>
                </div>
              </div>
            </section>

            {/* CARD 8: DELIVERABLES */}
            <section className={`proposal-card ${currentCard === 7 ? "active" : ""}`}>
              <div className="card-content">
                <span className="section-tag" style={{ color: "#C9A84C" }}>What You Get</span>
                <h2 className="section-title">Premium Deliverable Formats</h2>
                <p className="section-desc">
                  We supply clean, high-resolution formats configured specifically for modern digital reading, email attachments, and web integration.
                </p>

                <div className="goals-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                  <div className="goal-item" style={{ borderLeft: "3px solid #C9A84C", padding: "20px" }}>
                    <div className="goal-icon" style={{ color: "#C9A84C" }}>📄</div>
                    <h4>High-Definition Interactive PDF</h4>
                    <p>Designed for digital shares, including fully active hyperlinked communication channels pointing to your website, phone line, or WhatsApp direct chat.</p>
                  </div>
                  <div className="goal-item" style={{ borderLeft: "3px solid #C9A84C", padding: "20px" }}>
                    <div className="goal-icon" style={{ color: "#C9A84C" }}>🖼️</div>
                    <h4>Lossless High-Res PNG Panels</h4>
                    <p>Individual image assets of every slide panel, ideal for embedding directly onto your web pages or digital marketing collateral.</p>
                  </div>
                </div>

                <div className="navigation-controls" style={{ marginTop: "40px" }}>
                  <button className="btn btn-secondary prev-card" onClick={() => navigateTo(6)}>
                    ← Back
                  </button>
                  <button className="btn btn-primary next-card" onClick={() => navigateTo(8)} style={{ background: "linear-gradient(135deg, #B8892A, #C9A84C)", border: "none", color: "#0A0F1E" }}>
                    Investment Details →
                  </button>
                </div>
              </div>
            </section>

            {/* CARD 9: INVESTMENT & TERMS */}
            <section className={`proposal-card ${currentCard === 8 ? "active" : ""}`}>
              <div className="card-content">
                <span className="section-tag" style={{ color: "#C9A84C" }}>Project Investment</span>
                <h2 className="section-title">Commercial Agreement</h2>
                
                <div className="investment-pricing-container">
                  <div className="price-cards-row" style={{ display: "flex", justifyContent: "center" }}>
                    <div className="price-tier-card" style={{ width: "100%", maxWidth: "480px", border: "1.5px solid #C9A84C", background: "rgba(13, 20, 38, 0.85)" }}>
                      <div className="hot-badge" style={{ background: "#C9A84C", color: "#0A0F1E", fontWeight: "700" }}>PROJECT RATES</div>
                      <h3 style={{ marginTop: "10px", color: "#FFF" }}>Company Profile Package</h3>
                      <div className="tier-cost" style={{ color: "#C9A84C" }}>₹12,000<span style={{ fontSize: "1rem", color: "#9CA3AF" }}> / Flat Fee</span></div>
                      
                      <ul className="tier-features" style={{ margin: "20px 0", color: "#9CA3AF" }}>
                        <li style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}><span style={{ color: "#C9A84C" }}>✓</span> Up to 14 Premium Visual Slides</li>
                        <li style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}><span style={{ color: "#C9A84C" }}>✓</span> Complete Content Strategy & Copywriting</li>
                        <li style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}><span style={{ color: "#C9A84C" }}>✓</span> Professional Vector PDF Formats</li>
                        <li style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}><span style={{ color: "#C9A84C" }}>✓</span> **50% Advance Payment (₹6,000) to Initiate**</li>
                        <li style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}><span style={{ color: "#C9A84C" }}>✓</span> Remaining 50% (₹6,000) upon final sign-off</li>
                        <li style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}><span style={{ color: "#C9A84C" }}>✓</span> 3 Rounds of Project Revisions</li>
                      </ul>
                    </div>
                  </div>

                  {/* Accept proposal card */}
                  <div className="combo-glow-box" style={{ maxWidth: "700px", margin: "16px auto 0 auto", border: "1px solid rgba(201, 168, 76, 0.2)", background: "rgba(13, 20, 38, 0.75)" }}>
                    <div className="acceptance-box" style={{ border: "none", paddingTop: "0" }}>
                      <div className="interactive-sign-box">
                        <label style={{ color: "#FFF", display: "block", marginBottom: "8px", fontWeight: "600" }}>Ready to launch this Company Profile project, Kuldeep?</label>
                        {contractSigned ? (
                          <div className="acceptance-status text-success" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "1rem", color: "#10b981" }}>
                            <span>🎉 **Accepted & Signed!** Thank you, Kuldeep. We will initiate the project with the 50% advance setup. Let's make this profile extraordinary.</span>
                          </div>
                        ) : (
                          <div className="sign-input-wrapper">
                            <input 
                              type="text" 
                              placeholder="Enter your name (e.g. Kuldeep Chauhan) to accept"
                              value={clientName}
                              onChange={(e) => setClientName(e.target.value)}
                              style={{ 
                                background: "rgba(7, 11, 22, 0.6)", 
                                border: "1px solid rgba(201,168,76,0.3)",
                                color: "#FFF",
                                padding: "10px 14px",
                                borderRadius: "6px",
                                flexGrow: "1"
                              }}
                            />
                            <button 
                              className="btn btn-primary"
                              onClick={handleAcceptProposal}
                              disabled={isSigning}
                              style={{ background: "linear-gradient(135deg, #B8892A, #C9A84C)", border: "none", color: "#0A0F1E", fontWeight: "700", padding: "10px 20px" }}
                            >
                              {isSigning ? "Signing..." : "Accept Proposal"}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="navigation-controls">
                  <button className="btn btn-secondary prev-card" onClick={() => navigateTo(7)}>
                    ← Back
                  </button>
                  <button className="btn btn-accent reset-deck-btn" onClick={() => navigateTo(0)} style={{ border: "1px solid rgba(201, 168, 76, 0.3)", background: "transparent", color: "#C9A84C" }}>
                    ↻ Restart View
                  </button>
                </div>
              </div>
            </section>
          </main>

          <footer className="proposal-footer" style={{ borderTop: "1px solid rgba(201, 168, 76, 0.1)", background: "rgba(7, 11, 22, 0.95)" }}>
            <p>&copy; 2026 Mutant Technologies. Confidentially prepared for Ultron Financials. All Rights Reserved.</p>
          </footer>
        </>
      )}
    </>
  );
}
