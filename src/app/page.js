"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [isSplash, setIsSplash] = useState(true);
  const [currentCard, setCurrentCard] = useState(0); // 0 to 9 index

  // Cards definitions
  const CARDS = [
    "cover",
    "opportunity",
    "strategy",
    "deliverables",
    "content",
    "organic",
    "seo",
    "keywords",
    "pixel",
    "investment"
  ];

  // Particle Canvas background logic
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
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 0.5;
        this.color = Math.random() > 0.5 ? "rgba(252, 98, 3, 0.15)" : "rgba(255, 255, 255, 0.15)";
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
      const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 15000));
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

  // Card 2: Opportunity toggle & auto-type simulation
  const [oppType, setOppType] = useState("employers");
  const [typingText, setTypingText] = useState("");
  useEffect(() => {
    if (isSplash) return;
    const targetText = oppType === "employers" 
      ? "best placement agency for hiring staff in India..." 
      : "verified career consulting partners in Ahmedabad...";
    
    let index = 0;
    setTypingText("");
    
    const interval = setInterval(() => {
      if (index < targetText.length) {
        setTypingText((prev) => prev + targetText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [oppType, isSplash]);

  // Card 5: Content Category Feed Simulator
  const [contentCategory, setContentCategory] = useState("employer-tips");
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(1240);

  const getPostContent = () => {
    switch (contentCategory) {
      case "employer-tips":
        return {
          title: "Struggling to hire the right Talent?",
          body: "Average cost of a bad hire is 30% of their first-year earnings. Let us take care of the vetting process.",
          cta: "Tap to Hire Now",
          caption: "We make recruitment seamless. Leave the heavy lifting to us.",
          gradient: "linear-gradient(135deg, #FC6203, #e85b02)",
          likesCount: 1240
        };
      case "success-stories":
        return {
          title: "From Resume to Hired in 7 Days!",
          body: "How we placed 45 premium engineers for Fintech giants in Mumbai last quarter. Scaled matching tech.",
          cta: "Read Success Story",
          caption: "Connecting dream teams with top scaleups. That's Rojgari Placements.",
          gradient: "linear-gradient(135deg, #10b981, #3b82f6)",
          likesCount: 3820
        };
      case "hiring-insights":
        return {
          title: "What 90% of HRs Look For",
          body: "Insights: Soft skills and growth-mindsets beat static resumes in 2026. Spot candidates that last.",
          cta: "Download Report",
          caption: "Smarter metrics for modern placement strategies.",
          gradient: "linear-gradient(135deg, #f59e0b, #e11d48)",
          likesCount: 1980
        };
      case "job-updates":
        return {
          title: "We are Hiring: 15+ Senior Roles",
          body: "Top consulting firm looking for Operations Managers. CTC: ₹18 - 25 LPA. Fast-track screening.",
          cta: "Apply Instantly",
          caption: "Ready for your next leap? Contact Rojgari Placements.",
          gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
          likesCount: 4500
        };
      default:
        return {};
    }
  };
  const activePost = getPostContent();

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikes((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikes((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setLikes(activePost.likesCount);
    setIsLiked(false);
  }, [contentCategory]);

  // Card 6: Organic Growth Simulator bars height
  const [barsTriggered, setBarsTriggered] = useState(false);
  useEffect(() => {
    if (currentCard === 5) {
      setBarsTriggered(true);
    } else {
      setBarsTriggered(false);
    }
  }, [currentCard]);

  // Card 7: SEO search engine input typing simulator
  const [seoSearchVal, setSeoSearchVal] = useState("");
  useEffect(() => {
    if (currentCard === 6) {
      let phrase = "best placement agency near me";
      let idx = 0;
      setSeoSearchVal("");
      const timer = setInterval(() => {
        if (idx < phrase.length) {
          setSeoSearchVal((prev) => prev + phrase.charAt(idx));
          idx++;
        } else {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [currentCard]);

  // Card 8: Keyword Campaign detailed selectors
  const KEYWORD_DATA = [
    {
      title: "Placement Agency",
      vol: "12,500",
      diff: "Medium",
      value: "High",
      exp: "Ranking for this keyword ensures that corporate clients looking to outsource hiring see Rojgari Placements before finding competitors. Leads from this channel have a highly qualified conversion rate."
    },
    {
      title: "Recruitment Agency",
      vol: "8,900",
      diff: "Medium",
      value: "High",
      exp: "Employers search for this specifically when seeking agency partners for long-term contract staffing. Ranking on page 1 here ensures organic inbound requests from corporate companies."
    },
    {
      title: "Job Consultancy",
      vol: "15,000",
      diff: "High",
      value: "Extreme",
      exp: "One of the highest-volume search terms. Drives huge branding authority and is excellent for job seekers as well as mid-sized companies seeking instant placement consultants."
    },
    {
      title: "Staffing Services",
      vol: "4,200",
      diff: "Low",
      value: "Very High",
      exp: "Low-hanging fruit keyword. High business value because employers searching for staffing services are actively looking to sign contracts immediately. Excellent ROI potential."
    },
    {
      title: "HR Consultancy",
      vol: "6,800",
      diff: "Medium",
      value: "High",
      exp: "Positions Rojgari Placements as a professional advisory consultant for organizational audits and corporate structuring, expanding beyond simple placements."
    },
    {
      title: "Recruitment Partner",
      vol: "3,100",
      diff: "Low",
      value: "Extreme",
      exp: "Highly targeted. This represents companies seeking strategic, long-term talent acquisition consultants rather than transaction recruiters."
    }
  ];
  const [selectedKw, setSelectedKw] = useState(0);

  // Card 9: Mutant Pixel Tracker Sandbox
  const sandboxRef = useRef(null);
  const [pixelLogs, setPixelLogs] = useState([
    "[SYSTEM] Pixel loaded successfully.",
    "[SYSTEM] Awaiting user activity inside Sandbox..."
  ]);
  const [interactionCount, setInteractionCount] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, visible: false });

  const handleSandboxMouseMove = (e) => {
    const sandbox = sandboxRef.current;
    if (!sandbox) return;
    const rect = sandbox.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    setCursorPos({ x, y, visible: true });

    if (Math.random() < 0.04) {
      setInteractionCount((prev) => prev + 1);
      const newLog = `[TRACKED] Cursor coordinates: X: ${x}px, Y: ${y}px`;
      setPixelLogs((prev) => [newLog, ...prev.slice(0, 10)]);
    }
  };

  const handleSandboxClick = (e) => {
    const sandbox = sandboxRef.current;
    if (!sandbox) return;
    const rect = sandbox.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    setInteractionCount((prev) => prev + 5);
    const newLog = `[CLICK DETECTED] Element click at X: ${x}px, Y: ${y}px - Triggered Conversions`;
    setPixelLogs((prev) => [newLog, ...prev.slice(0, 10)]);
  };

  const handleSandboxLeave = () => {
    setCursorPos((prev) => ({ ...prev, visible: false }));
    setPixelLogs((prev) => [" [OUT] Cursor left workspace.", ...prev.slice(0, 10)]);
  };

  const getEngagementLevel = () => {
    if (interactionCount === 0) return "Awaiting Activity";
    if (interactionCount < 10) return "Low";
    if (interactionCount < 30) return "Medium";
    return "Extreme";
  };

  // Card 10: Client Contract Signing Simulation
  const [clientName, setClientName] = useState("");
  const [contractSigned, setContractSigned] = useState(false);
  const [isSigning, setIsSigning] = useState(false);

  const handleAcceptProposal = () => {
    if (!clientName.trim()) {
      alert("Please enter your name or agency name first.");
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

      {/* FUNNY GREETING OVERLAY ADDRESSING KHUSHI */}
      {isSplash && (
        <div className="splash-overlay">
          <div className="glowing-orb bg-orb-1" style={{ opacity: 0.3 }}></div>
          <div className="glowing-orb bg-orb-2" style={{ opacity: 0.3 }}></div>
          <div className="splash-content">
            <span className="security-tag">🕵️‍♀️ TOP SECRET CLASSIFIED DIGITAL STRATEGY</span>
            <div className="splash-logo-container" style={{ width: "200px", height: "200px", margin: "0 auto 24px auto", borderRadius: "24px", overflow: "hidden", background: "white", padding: "12px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 25px rgba(252, 98, 3, 0.4)" }}>
              <img src="/logo.png" alt="Mutant Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <h1 className="splash-title">Hello Khushi!</h1>
            <p className="splash-funny-text">
              <strong>Confidential Warning:</strong> If you are not <strong>Khushi</strong> from Rojgari Placements, we politely request you close this tab. 
              The following proposal contains proprietary growth frameworks, top-tier search domination plans, and digital strategies so effective they might keep your competitors awake at night.
              <br /><br />
              If you <i>are</i> Khushi... proceed at your own discretion.
            </p>
            <button className="btn btn-primary" onClick={() => setIsSplash(false)}>
              Click here to view your proposal <i className="fa-solid fa-rocket animate-bounce"></i>
            </button>
          </div>
        </div>
      )}

      {!isSplash && (
        <>
          <nav className="proposal-nav">
            <div className="nav-brand" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "36px", height: "36px", background: "white", borderRadius: "8px", padding: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src="/logo.png" alt="Mutant Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <span className="tech-text" style={{ fontSize: "1.3rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                MUTANT <span style={{ fontWeight: "300" }}>TECHNOLOGIES</span>
              </span>
            </div>
            <div className="nav-client">
              <span className="badge">Proposal For</span>
              <span className="client-name">Rojgari Placements</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar" 
                style={{ width: `${((currentCard + 1) / CARDS.length) * 100}%` }}
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
              ></button>
            ))}
          </div>

          <main className="proposal-container">
            {/* CARD 1: COVER */}
            <section className={`proposal-card ${currentCard === 0 ? "active" : ""}`}>
              <div className="card-content cover-layout">
                <div className="glowing-orb bg-orb-1"></div>
                <div className="glowing-orb bg-orb-2"></div>
                
                <div className="cover-header">
                  <span className="pre-title animate-up">Exclusive Digital Growth Initiative</span>
                  <h1 className="main-title animate-up delay-1">Digital Growth Proposal</h1>
                  <p className="subtitle animate-up delay-2">
                    Grow Your Brand, Generate More Leads & Dominate Google Search
                  </p>
                </div>

                <div className="cover-footer animate-up delay-3">
                  <div className="meta-box client-box">
                    <span className="meta-label">PREPARED FOR</span>
                    <h3 className="meta-value">Khushi | Rojgari Placements</h3>
                  </div>
                  <div className="meta-separator"></div>
                  <div className="meta-box creator-box">
                    <span className="meta-label">PRESENTED BY</span>
                    <h3 className="meta-value mutant-glow">Mutant Technologies</h3>
                  </div>
                </div>

                <div className="cta-container animate-up delay-4">
                  <button className="btn btn-primary start-btn" onClick={() => navigateTo(1)}>
                    <span>Begin Journey</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </section>

            {/* CARD 2: THE OPPORTUNITY */}
            <section className={`proposal-card ${currentCard === 1 ? "active" : ""}`}>
              <div className="card-content">
                <span className="section-tag">The Opportunity</span>
                <h2 className="section-title">Your Next Client Is Already Online</h2>
                
                <div className="opportunity-selector">
                  <button 
                    className={`opp-toggle ${oppType === "employers" ? "active" : ""}`} 
                    onClick={() => setOppType("employers")}
                  >
                    <i className="fa-solid fa-briefcase"></i> For Employers
                  </button>
                  <button 
                    className={`opp-toggle ${oppType === "seekers" ? "active" : ""}`} 
                    onClick={() => setOppType("seekers")}
                  >
                    <i className="fa-solid fa-user-graduate"></i> For Job Seekers
                  </button>
                </div>

                <div className="opportunity-panel">
                  <div className="interactive-search-mockup">
                    <div className="search-bar">
                      <i className="fa-solid fa-magnifying-glass text-muted"></i>
                      <span className="typing-text">{typingText}</span>
                    </div>
                    <div className="search-results-preview">
                      <div className="result-card blurred">
                        <div className="shimmer-line title-line"></div>
                        <div className="shimmer-line desc-line"></div>
                      </div>
                      <div className="alert-overlay">
                        <i className="fa-solid fa-circle-question question-pulse"></i>
                        <h3>Are they finding Rojgari Placements or your competitors?</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="goals-grid">
                  <div className="goal-item">
                    <div className="goal-icon"><i className="fa-solid fa-eye"></i></div>
                    <h4>Increase Visibility</h4>
                    <p>Be seen by high-intent clients and active seekers.</p>
                  </div>
                  <div className="goal-item">
                    <div className="goal-icon"><i className="fa-solid fa-shield-halved"></i></div>
                    <h4>Build Trust</h4>
                    <p>Establish a commanding brand reputation in HR & recruitment.</p>
                  </div>
                  <div className="goal-item">
                    <div className="goal-icon"><i className="fa-solid fa-bullseye"></i></div>
                    <h4>Generate Leads</h4>
                    <p>Get qualified inquiries instead of random calls.</p>
                  </div>
                  <div className="goal-item">
                    <div className="goal-icon"><i className="fa-solid fa-chart-line"></i></div>
                    <h4>Grow Organically</h4>
                    <p>Build lasting digital assets that drive free traffic.</p>
                  </div>
                </div>

                <div className="navigation-controls">
                  <button className="btn btn-secondary prev-card" onClick={() => navigateTo(0)}>
                    <i className="fa-solid fa-chevron-left"></i> Back
                  </button>
                  <button className="btn btn-primary next-card" onClick={() => navigateTo(2)}>
                    Next Strategy <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </section>

            {/* CARD 3: SOCIAL MEDIA STRATEGY */}
            <section className={`proposal-card ${currentCard === 2 ? "active" : ""}`}>
              <div className="card-content">
                <span className="section-tag">Brand Strategy</span>
                <h2 className="section-title">Build A Brand People Trust</h2>
                <p className="section-desc">
                  Most placement agencies only post job openings. We help you build a reputable authority.
                </p>

                <div className="strategy-cards">
                  <div className="strat-card">
                    <div className="strat-num">01</div>
                    <div className="strat-icon"><i className="fa-solid fa-award"></i></div>
                    <h3>Industry Expert</h3>
                    <p>Educate employers on hiring best practices, trends, and retention strategies.</p>
                  </div>
                  <div className="strat-card">
                    <div className="strat-num">02</div>
                    <div className="strat-icon"><i className="fa-solid fa-handshake"></i></div>
                    <h3>Trusted HR Partner</h3>
                    <p>Highlight process clarity, screening methods, and client success stories.</p>
                  </div>
                  <div className="strat-card">
                    <div className="strat-num">03</div>
                    <div className="strat-icon"><i className="fa-solid fa-compass"></i></div>
                    <h3>Career Guide</h3>
                    <p>Give job seekers interview preparation tips, resume advice, and market updates.</p>
                  </div>
                  <div className="strat-card">
                    <div className="strat-num">04</div>
                    <div className="strat-icon"><i className="fa-solid fa-star"></i></div>
                    <h3>Preferred Consultant</h3>
                    <p>Position Rojgari Placements as the first choice through strong social proof.</p>
                  </div>
                </div>

                <div className="brand-impact-statement">
                  <i className="fa-solid fa-quote-left"></i>
                  A stronger brand creates more inbound employer inquiries and yields a 3x higher lead conversion rate.
                </div>

                <div className="navigation-controls">
                  <button className="btn btn-secondary prev-card" onClick={() => navigateTo(1)}>
                    <i className="fa-solid fa-chevron-left"></i> Back
                  </button>
                  <button className="btn btn-primary next-card" onClick={() => navigateTo(3)}>
                    See Deliverables <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </section>

            {/* CARD 4: SOCIAL MEDIA DELIVERABLES */}
            <section className={`proposal-card ${currentCard === 3 ? "active" : ""}`}>
              <div className="card-content">
                <span className="section-tag">Execution Plan</span>
                <h2 className="section-title">Everything Included. Every Month.</h2>
                <p className="section-desc">
                  A complete hands-off social media machine managed by our creative marketing experts.
                </p>

                <div className="deliverables-layout">
                  <div className="deliv-main-grid">
                    <div className="deliv-metric-card">
                      <span className="metric-num">12</span>
                      <span className="metric-label">Professional Posts / Mo</span>
                      <div className="metric-progress-track">
                        <div className="metric-progress-bar" style={{ width: "100%" }}></div>
                      </div>
                    </div>
                    <div className="deliv-metric-card">
                      <span className="metric-num">4</span>
                      <span className="metric-label">High-Engagement Reels / Mo</span>
                      <div className="metric-progress-track">
                        <div className="metric-progress-bar" style={{ width: "100%" }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="deliv-checklist">
                    <div className="check-item">
                      <div className="check-icon"><i className="fa-solid fa-circle-check"></i></div>
                      <div>
                        <h5>Content Strategy Development</h5>
                        <p>Custom roadmap aligned with hiring seasons and market demands.</p>
                      </div>
                    </div>
                    <div className="check-item">
                      <div className="check-icon"><i className="fa-solid fa-circle-check"></i></div>
                      <div>
                        <h5>Copywriting & Hook Creation</h5>
                        <p>Persuasive writing to retain attention and drive user actions.</p>
                      </div>
                    </div>
                    <div className="check-item">
                      <div className="check-icon"><i className="fa-solid fa-circle-check"></i></div>
                      <div>
                        <h5>Premium Creative Design</h5>
                        <p>Custom brand templates, infographics, and scroll-stopping visuals.</p>
                      </div>
                    </div>
                    <div className="check-item">
                      <div className="check-icon"><i className="fa-solid fa-circle-check"></i></div>
                      <div>
                        <h5>Posting & Queue Scheduling</h5>
                        <p>Optimized timing for maximum reach across LinkedIn, Instagram & FB.</p>
                      </div>
                    </div>
                    <div className="check-item">
                      <div className="check-icon"><i className="fa-solid fa-circle-check"></i></div>
                      <div>
                        <h5>Account & Page Optimization</h5>
                        <p>Bio setup, story highlight design, and messenger setup.</p>
                      </div>
                    </div>
                    <div className="check-item">
                      <div className="check-icon"><i className="fa-solid fa-circle-check"></i></div>
                      <div>
                        <h5>Organic Outreach & Engagement</h5>
                        <p>Interacting with prospective business accounts and HR circles.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="navigation-controls">
                  <button className="btn btn-secondary prev-card" onClick={() => navigateTo(2)}>
                    <i className="fa-solid fa-chevron-left"></i> Back
                  </button>
                  <button className="btn btn-primary next-card" onClick={() => navigateTo(4)}>
                    View Content Types <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </section>

            {/* CARD 5: CONTENT THAT GENERATES LEADS */}
            <section className={`proposal-card ${currentCard === 4 ? "active" : ""}`}>
              <div className="card-content">
                <span className="section-tag">Value Proposition</span>
                <h2 className="section-title">We Don't Post For Likes. We Post For Leads.</h2>
                <p className="section-desc">
                  Every graphic, carousel, and video is designed with intent: to attract premium clients.
                </p>

                <div className="feed-layout">
                  <div className="feed-categories">
                    <button 
                      className={`category-btn ${contentCategory === "employer-tips" ? "active" : ""}`}
                      onClick={() => setContentCategory("employer-tips")}
                    >
                      <i className="fa-solid fa-building-user"></i> Employer Education
                    </button>
                    <button 
                      className={`category-btn ${contentCategory === "success-stories" ? "active" : ""}`}
                      onClick={() => setContentCategory("success-stories")}
                    >
                      <i className="fa-solid fa-trophy"></i> Success Stories
                    </button>
                    <button 
                      className={`category-btn ${contentCategory === "hiring-insights" ? "active" : ""}`}
                      onClick={() => setContentCategory("hiring-insights")}
                    >
                      <i className="fa-solid fa-magnifying-glass-chart"></i> Hiring Insights
                    </button>
                    <button 
                      className={`category-btn ${contentCategory === "job-updates" ? "active" : ""}`}
                      onClick={() => setContentCategory("job-updates")}
                    >
                      <i className="fa-solid fa-bullhorn"></i> Hot Jobs
                    </button>
                  </div>

                  <div className="interactive-phone-container">
                    <div className="phone-mockup">
                      <div className="phone-notch"></div>
                      <div className="phone-screen">
                        <div className="mock-instagram-header">
                          <div className="ig-user">
                            <div className="ig-avatar">RP</div>
                            <div>
                              <span className="ig-username">rojgari_placements</span>
                              <span className="ig-location">Sponsored</span>
                            </div>
                          </div>
                          <i className="fa-solid fa-ellipsis"></i>
                        </div>
                        <div className="mock-instagram-content">
                          <div className="post-creative" style={{ background: activePost.gradient }}>
                            <h3>{activePost.title}</h3>
                            <p>{activePost.body}</p>
                            <span className="post-cta">{activePost.cta}</span>
                          </div>
                        </div>
                        <div className="mock-instagram-footer">
                          <div className="ig-actions">
                            <div>
                              <i 
                                className={`fa-heart ig-heart ${isLiked ? "fa-solid liked" : "fa-regular"}`}
                                onClick={handleLike}
                              ></i>
                              <i className="fa-regular fa-comment"></i>
                              <i className="fa-regular fa-paper-plane"></i>
                            </div>
                            <i className="fa-regular fa-bookmark"></i>
                          </div>
                          <div className="ig-likes">
                            {likes.toLocaleString()} likes
                          </div>
                          <div className="ig-caption">
                            <strong>rojgari_placements</strong> {activePost.caption}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="navigation-controls">
                  <button className="btn btn-secondary prev-card" onClick={() => navigateTo(3)}>
                    <i className="fa-solid fa-chevron-left"></i> Back
                  </button>
                  <button className="btn btn-primary next-card" onClick={() => navigateTo(5)}>
                    Organic Strategy <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </section>

            {/* CARD 6: ORGANIC GROWTH ACTIVITIES */}
            <section className={`proposal-card ${currentCard === 5 ? "active" : ""}`}>
              <div className="card-content">
                <span className="section-tag">Audience Building</span>
                <h2 className="section-title">Growing Your Audience Consistently</h2>
                <p className="section-desc">
                  Behind-the-scenes community cultivation to ensure your agency expands its reach day-by-day.
                </p>

                <div className="organic-dashboard">
                  <div className="dashboard-graph">
                    <div className="graph-header">
                      <span>Reach Metrics Growth Simulator</span>
                      <span className="percentage-badge"><i className="fa-solid fa-arrow-trend-up"></i> +240%</span>
                    </div>
                    <div className="sim-bars">
                      <div className="sim-bar-col">
                        <div className="sim-bar-fill" style={{ height: barsTriggered ? "20%" : "0%" }}></div>
                        <span>Wk 1</span>
                      </div>
                      <div className="sim-bar-col">
                        <div className="sim-bar-fill" style={{ height: barsTriggered ? "35%" : "0%" }}></div>
                        <span>Wk 2</span>
                      </div>
                      <div className="sim-bar-col">
                        <div className="sim-bar-fill" style={{ height: barsTriggered ? "55%" : "0%" }}></div>
                        <span>Wk 3</span>
                      </div>
                      <div className="sim-bar-col">
                        <div className="sim-bar-fill" style={{ height: barsTriggered ? "90%" : "0%" }}></div>
                        <span>Wk 4</span>
                      </div>
                    </div>
                  </div>

                  <div className="activities-grid">
                    <div className="activity-card">
                      <i className="fa-solid fa-hashtag text-accent"></i>
                      <h4>Hashtag Auditing</h4>
                      <p>Targeting exact industry-specific tags to capture business queries.</p>
                    </div>
                    <div className="activity-card">
                      <i className="fa-solid fa-comments text-accent"></i>
                      <h4>HR Engagement</h4>
                      <p>Commenting on and engaging with key decision-makers & companies.</p>
                    </div>
                    <div className="activity-card">
                      <i className="fa-solid fa-magnifying-glass-chart"></i>
                      <h4>Competitor Insights</h4>
                      <p>Analyzing competitor growth channels and redirecting traffic to you.</p>
                    </div>
                    <div className="activity-card">
                      <i className="fa-solid fa-wand-magic-sparkles"></i>
                      <h4>Profile Optimization</h4>
                      <p>Crafting high-converting profile hooks, call-to-actions, and link pages.</p>
                    </div>
                  </div>
                </div>

                <div className="navigation-controls">
                  <button className="btn btn-secondary prev-card" onClick={() => navigateTo(4)}>
                    <i className="fa-solid fa-chevron-left"></i> Back
                  </button>
                  <button className="btn btn-primary next-card" onClick={() => navigateTo(6)}>
                    SEO Search Strategy <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </section>

            {/* CARD 7: SEO GROWTH PACKAGE */}
            <section className={`proposal-card ${currentCard === 6 ? "active" : ""}`}>
              <div className="card-content">
                <span className="section-tag">Search Domination</span>
                <h2 className="section-title">Be Found When People Search</h2>
                <p className="section-desc">
                  93% of online experiences begin with a search engine. We put you right where your clients look.
                </p>

                <div className="seo-interactive-workspace">
                  <div className="search-engine-simulator">
                    <div className="sim-browser-head">
                      <div className="window-dot red"></div>
                      <div className="window-dot yellow"></div>
                      <div className="window-dot green"></div>
                      <div className="sim-address">google.com/search</div>
                    </div>
                    <div className="sim-browser-body">
                      <div className="search-input-box">
                        <i className="fa-solid fa-magnifying-glass text-muted"></i>
                        <input type="text" value={seoSearchVal} readOnly />
                        <button className="search-action-btn">Search</button>
                      </div>
                      <div className="search-results-list">
                        <div className="google-ad-result">
                          <span className="ad-badge">Ad</span>
                          <h3>Competitor Placements - Expensive Pay-Per-Click</h3>
                          <p>Paying Google for every click. Costs add up fast with minimal organic credibility.</p>
                        </div>
                        <div className="google-organic-result ranking-highlight">
                          <span className="rank-pos">#1 Organic Rank</span>
                          <h3>Rojgari Placements | Top Recruitment Consultant</h3>
                          <p>Find the best jobs and staff recruitment services in India. 100% verified placement solutions. Contact today!</p>
                        </div>
                        <div className="google-organic-result">
                          <h3>Random Job Consultancy Group</h3>
                          <p>Providing generic human resources recruiting agency and search services...</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="seo-pillars">
                    <div className="pillar-box">
                      <div className="pillar-icon"><i className="fa-solid fa-gears"></i></div>
                      <div>
                        <h4>Technical SEO</h4>
                        <p>Speed, mobile responsiveness, and clean architecture.</p>
                      </div>
                    </div>
                    <div className="pillar-box">
                      <div className="pillar-icon"><i className="fa-solid fa-file-pen"></i></div>
                      <div>
                        <h4>On-Page SEO</h4>
                        <p>Targeted keywords, structure, internal linking, and content.</p>
                      </div>
                    </div>
                    <div className="pillar-box">
                      <div className="pillar-icon"><i className="fa-solid fa-link"></i></div>
                      <div>
                        <h4>Off-Page SEO</h4>
                        <p>Authority backlinks, citation syndication, and brand mentions.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="navigation-controls">
                  <button className="btn btn-secondary prev-card" onClick={() => navigateTo(5)}>
                    <i className="fa-solid fa-chevron-left"></i> Back
                  </button>
                  <button className="btn btn-primary next-card" onClick={() => navigateTo(7)}>
                    Keyword Targeting <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </section>

            {/* CARD 8: 10 KEYWORD RANKING CAMPAIGN */}
            <section className={`proposal-card ${currentCard === 7 ? "active" : ""}`}>
              <div className="card-content">
                <span className="section-tag">Targeted Traffic</span>
                <h2 className="section-title">10 Keyword Ranking Campaign</h2>
                <p className="section-desc">
                  We target buying-intent keywords that employers and job seekers type when ready to hire or apply.
                </p>

                <div className="keywords-interactive-display">
                  <div className="keywords-list-side">
                    {KEYWORD_DATA.map((kw, index) => (
                      <div
                        key={kw.title}
                        className={`keyword-selector ${selectedKw === index ? "active" : ""}`}
                        onClick={() => setSelectedKw(index)}
                      >
                        <span className="kw-text">{kw.title}</span>
                        <span className="kw-arrow"><i className="fa-solid fa-angle-right"></i></span>
                      </div>
                    ))}
                  </div>

                  <div className="keyword-detail-display">
                    <div className="kd-glass-card">
                      <div className="kd-header">
                        <h3>{KEYWORD_DATA[selectedKw].title}</h3>
                        <span className="badge badge-accent">Targeted Keyword</span>
                      </div>
                      <div className="kd-metrics-row">
                        <div className="kd-metric">
                          <span className="kd-label">Est. Searches / Mo</span>
                          <span className="kd-val">{KEYWORD_DATA[selectedKw].vol}</span>
                        </div>
                        <div className="kd-metric">
                          <span className="kd-label">Ranking Difficulty</span>
                          <span className="kd-val">{KEYWORD_DATA[selectedKw].diff}</span>
                        </div>
                        <div className="kd-metric">
                          <span className="kd-label">Business Value</span>
                          <span className="kd-val text-success">{KEYWORD_DATA[selectedKw].value}</span>
                        </div>
                      </div>
                      <div className="kd-explanation">
                        <p>{KEYWORD_DATA[selectedKw].exp}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="navigation-controls">
                  <button className="btn btn-secondary prev-card" onClick={() => navigateTo(6)}>
                    <i className="fa-solid fa-chevron-left"></i> Back
                  </button>
                  <button className="btn btn-primary next-card" onClick={() => navigateTo(8)}>
                    See Free Technology <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </section>

            {/* CARD 9: FREE MUTANT PIXEL */}
            <section className={`proposal-card ${currentCard === 8 ? "active" : ""}`}>
              <div className="card-content">
                <span className="section-tag">Proprietary Technology</span>
                <h2 className="section-title">FREE Mutant Pixel™ Integration</h2>
                <p className="section-desc">
                  Know exactly who visits your site, how they behave, and what channels bring in clients.
                </p>

                <div className="pixel-interactive-demo">
                  <div className="pixel-left-pane">
                    <div className="pixel-status-badge">
                      <span className="pulse-indicator"></span>
                      <span>Mutant Pixel™: Active & Tracking</span>
                    </div>
                    <h3>Live Visitor Behavior Simulator</h3>
                    <p className="demo-instructions">
                      Move your cursor or tap inside the sandbox below. Watch the Mutant Pixel dashboard interpret actions in real-time!
                    </p>
                    
                    <div 
                      className="tracking-sandbox" 
                      ref={sandboxRef}
                      onMouseMove={handleSandboxMouseMove}
                      onClick={handleSandboxClick}
                      onMouseLeave={handleSandboxLeave}
                    >
                      <span className="sandbox-label">INTERACTIVE TRACKING ZONE (Move Mouse / Tap Here)</span>
                      {cursorPos.visible && (
                        <div 
                          className="trail-cursor" 
                          style={{ left: cursorPos.x, top: cursorPos.y, display: "block" }}
                        ></div>
                      )}
                    </div>
                  </div>

                  <div className="pixel-right-pane">
                    <div className="dashboard-mock">
                      <div className="db-title-row">
                        <span><i className="fa-solid fa-chart-bar"></i> MutantPixel Live Console</span>
                        <span className="db-timer">Real-time</span>
                      </div>
                      <div className="db-logs">
                        {pixelLogs.map((log, index) => {
                          let logClass = "log-entry";
                          if (log.includes("[SYSTEM]")) logClass += " system";
                          if (log.includes("[CLICK")) logClass += " event";
                          return (
                            <div key={index} className={logClass}>
                              {log}
                            </div>
                          );
                        })}
                      </div>
                      <div className="pixel-summary-numbers">
                        <div className="summary-num-box">
                          <span>{interactionCount}</span>
                          <label>Interactions Captured</label>
                        </div>
                        <div className="summary-num-box">
                          <span>{getEngagementLevel()}</span>
                          <label>Engagement Level</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="navigation-controls">
                  <button className="btn btn-secondary prev-card" onClick={() => navigateTo(7)}>
                    <i className="fa-solid fa-chevron-left"></i> Back
                  </button>
                  <button className="btn btn-primary next-card" onClick={() => navigateTo(9)}>
                    Review Packages <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </section>

            {/* CARD 10: INVESTMENT & SPECIAL OFFER */}
            <section className={`proposal-card ${currentCard === 9 ? "active" : ""}`}>
              <div className="card-content">
                <span className="section-tag">Investment & Pricing</span>
                <h2 className="section-title">Complete Brand & Search Domination</h2>
                
                <div className="investment-pricing-container">
                  <div className="price-cards-row">
                    <div className="price-tier-card">
                      <h3>Social Media Growth</h3>
                      <div className="tier-cost">₹14,999<span>/ month</span></div>
                      <ul className="tier-features">
                        <li><i className="fa-solid fa-circle-check"></i> 12 Posts & 4 Reels</li>
                        <li><i className="fa-solid fa-circle-check"></i> Creative Design & Writing</li>
                        <li><i className="fa-solid fa-circle-check"></i> Account Management</li>
                      </ul>
                    </div>
                    
                    <div className="pricing-plus"><i className="fa-solid fa-plus"></i></div>

                    <div className="price-tier-card">
                      <h3>SEO Dominator</h3>
                      <div className="tier-cost">₹18,000<span>/ month</span></div>
                      <ul className="tier-features">
                        <li><i className="fa-solid fa-circle-check"></i> 10 Keyword Ranking Campaign</li>
                        <li><i className="fa-solid fa-circle-check"></i> Complete Tech & On-Page SEO</li>
                        <li><i className="fa-solid fa-circle-check"></i> Competitor Analysis & Reporting</li>
                      </ul>
                    </div>
                  </div>

                  {/* Combo Special Card */}
                  <div className="combo-glow-box">
                    <div className="hot-badge">Highly Recommended Package</div>
                    <div className="combo-head">
                      <h3>Combined Growth Strategy</h3>
                      <p>Full Social Media + Full Search Engine Domination</p>
                    </div>
                    <div className="combo-price-grid">
                      <div className="old-price">
                        <span>Regular Price</span>
                        <del>₹32,999/mo</del>
                      </div>
                      <div className="discount-pill">SAVE ₹2,999 EVERY MONTH</div>
                      <div className="new-price">
                        <span>Special Combined Deal</span>
                        <h2 className="glowing-accent">₹30,000 <span>/ month</span></h2>
                      </div>
                    </div>
                    
                    <div className="combo-deliverables-bullets">
                      <span><i className="fa-solid fa-square-check"></i> 12 Custom Posts</span>
                      <span><i className="fa-solid fa-square-check"></i> 4 High Hook Reels</span>
                      <span><i className="fa-solid fa-square-check"></i> 10 Target Keywords Ranked</span>
                      <span><i className="fa-solid fa-square-check"></i> Complete Local & Tech SEO</span>
                      <span><i className="fa-solid fa-square-check"></i> Mutant Pixel™ Installed FREE</span>
                      <span><i className="fa-solid fa-square-check"></i> Detailed Monthly Reporting</span>
                    </div>

                    <div className="acceptance-box">
                      <div className="interactive-sign-box">
                        <label>Ready to scale Rojgari Placements, Khushi?</label>
                        {contractSigned ? (
                          <div className="acceptance-status text-success" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "1.1rem" }}>
                            <i className="fa-solid fa-circle-check" style={{ fontSize: "1.5rem" }}></i>
                            <span>Congratulations Khushi! The digital growth campaign registration has been initiated. Mutant Technologies will reach out to you shortly!</span>
                          </div>
                        ) : (
                          <div className="sign-input-wrapper">
                            <input 
                              type="text" 
                              placeholder="Enter your name to sign"
                              value={clientName}
                              onChange={(e) => setClientName(e.target.value)}
                            />
                            <button 
                              className="btn btn-primary"
                              onClick={handleAcceptProposal}
                              disabled={isSigning}
                            >
                              {isSigning ? "Processing..." : "Let's Partner Up"} <i className="fa-solid fa-rocket"></i>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </section>
          </main>

          <footer className="proposal-footer">
            <p>&copy; 2026 Mutant Technologies. Confidentially prepared for Rojgari Placements.</p>
          </footer>
        </>
      )}
    </>
  );
}
