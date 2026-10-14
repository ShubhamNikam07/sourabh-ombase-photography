import { useEffect, useState } from "react";
import { ArrowDown, ArrowDownRight, ArrowUpRight, Camera, ChevronLeft, ChevronRight, Instagram, Menu, Play, X } from "lucide-react";
import marriagePhoto from "../photo/marriage.jpg";
import ownerPhoto from "../photo/owner 1.webp";
import patlinPhoto from "../photo/patlin bai.webp";
import processionVideo from "../photo/procession 1.mp4";

type Photo = {
  src: string;
  title: string;
  category: "Weddings" | "Celebrations" | "Details";
  position?: string;
};

const photos: Photo[] = [
  { src: marriagePhoto, title: "A day to remember", category: "Weddings", position: "center" },
  { src: patlinPhoto, title: "A moment of tradition", category: "Celebrations", position: "center" },
  { src: ownerPhoto, title: "Behind the lens", category: "Details", position: "center" }
];

const filters = ["All stories", "Weddings", "Celebrations", "Details"] as const;
type Filter = typeof filters[number];

function App() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All stories");
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const filteredPhotos = activeFilter === "All stories"
    ? photos
    : photos.filter((photo) => photo.category === activeFilter);

  useEffect(() => {
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          reveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach((element) => reveal.observe(element));
    return () => reveal.disconnect();
  }, [activeFilter]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (activePhoto === null) return;
      if (event.key === "Escape") setActivePhoto(null);
      if (event.key === "ArrowRight") setActivePhoto((activePhoto + 1) % filteredPhotos.length);
      if (event.key === "ArrowLeft") setActivePhoto((activePhoto - 1 + filteredPhotos.length) % filteredPhotos.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activePhoto, filteredPhotos.length]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const currentPhoto = activePhoto === null ? null : filteredPhotos[activePhoto];

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#top" aria-label="Saurabh Ombase Photography home">
          <span className="brand-mark"><Camera size={17} strokeWidth={1.4} /></span>
          <span className="brand-name">SAURABH OMBASE <small>PHOTOGRAPHY</small></span>
        </a>
        <div className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
          <button onClick={() => scrollTo("stories")}>Portfolio</button>
          <button onClick={() => scrollTo("about")}>Our approach</button>
          <button onClick={() => scrollTo("film")}>Films</button>
          <button className="nav-contact" onClick={() => scrollTo("contact")}>Let’s talk <ArrowUpRight size={15} /></button>
        </div>
        <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <section className="hero" id="top">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow"><span /> PUNE · WEDDING & CANDID PHOTOGRAPHY</p>
          <h1>Some stories<br />deserve to be <em>felt.</em></h1>
          <p className="hero-copy">Honest emotions. Unscripted moments.<br className="desktop-break" /> Memories that become part of your story.</p>
          <div className="hero-actions">
            <button className="button button-light" onClick={() => scrollTo("stories")}>Explore the stories <ArrowDownRight size={17} /></button>
            <button className="text-button" onClick={() => scrollTo("contact")}>Plan your day <ArrowUpRight size={16} /></button>
          </div>
        </div>
        <div className="hero-bottom">
          <span>01 / 03 — SELECTED STORIES</span>
          <span className="scroll-hint">SCROLL TO FEEL <ArrowDown size={14} /></span>
        </div>
        <div className="hero-side-note">REAL MOMENTS. BEAUTIFULLY REMEMBERED.</div>
      </section>

      <section className="intro section-pad" id="about">
        <div className="intro-index reveal">01 <span>— THE PHILOSOPHY</span></div>
        <div className="intro-copy reveal">
          <p className="eyebrow dark-eyebrow">MORE THAN A PHOTOGRAPH</p>
          <h2>We don’t just capture how it <em>looked.</em><br />We capture how it <em>felt.</em></h2>
          <div className="intro-bottom">
            <p>From the nervous smiles before the ceremony to the happy tears no one planned, we look for the little moments that make your story entirely yours.</p>
            <button className="circle-link" onClick={() => scrollTo("stories")} aria-label="Explore portfolio"><ArrowDownRight /></button>
          </div>
        </div>
      </section>

      <section className="portfolio section-pad" id="stories">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow dark-eyebrow">PHOTOGRAPHS FROM OUR CAMERA</p>
            <h2>Real moments, <em>remembered.</em></h2>
          </div>
          <p className="section-note">A little romance, a little chaos,<br />and everything in between.</p>
        </div>
        <div className="filter-row" role="tablist" aria-label="Filter portfolio">
          {filters.map((filter) => (
            <button key={filter} className={activeFilter === filter ? "filter active" : "filter"} onClick={() => { setActiveFilter(filter); setActivePhoto(null); }} role="tab" aria-selected={activeFilter === filter}>
              {filter}<span>{filter === "All stories" ? String(photos.length).padStart(2, "0") : String(photos.filter((photo) => photo.category === filter).length).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        <div className="photo-grid">
          {filteredPhotos.map((photo, index) => (
            <button className={`photo-card photo-card-${index % 6} reveal`} key={photo.src} onClick={() => setActivePhoto(index)} aria-label={`Open ${photo.title}`}>
              <img src={photo.src} alt={photo.title} loading={index < 3 ? "eager" : "lazy"} style={{ objectPosition: photo.position }} />
              <span className="photo-overlay">
                <span className="photo-meta">{photo.category} <span>·</span> {String(index + 1).padStart(2, "0")}</span>
                <span className="photo-title">{photo.title}</span>
                <span className="photo-arrow"><ArrowUpRight size={18} /></span>
              </span>
            </button>
          ))}
        </div>
        <p className="portfolio-disclaimer">A small selection of moments from our celebrations. Follow along on Instagram for more.</p>
      </section>

      <section className="film-section section-pad" id="film">
        <div className="film-copy reveal">
          <p className="eyebrow dark-eyebrow">IN MOTION, JUST AS IT HAPPENED</p>
          <h2>Feel the day<br /><em>all over again.</em></h2>
          <p>Some moments are best remembered in motion. Take a little look inside the celebration.</p>
        </div>
        <div className="film-frame reveal">
          <video controls playsInline preload="metadata" poster={marriagePhoto} aria-label="Wedding celebration film">
            <source src={processionVideo} type="video/mp4" />
            Your browser does not support embedded video.
          </video>
          <span className="film-label"><Play size={14} fill="currentColor" /> A MOMENT IN MOTION</span>
        </div>
      </section>

      <section className="statement">
        <div className="statement-image" />
        <div className="statement-overlay" />
        <div className="statement-content reveal">
          <p className="eyebrow"><span /> THE MOMENTS BETWEEN THE MOMENTS</p>
          <h2>Because the best<br />memories are rarely <em>posed.</em></h2>
          <p>Let the day unfold. We’ll be there for the moments you planned — and the ones you didn’t.</p>
          <button className="button button-light" onClick={() => scrollTo("contact")}>Tell us your story <ArrowUpRight size={16} /></button>
        </div>
        <span className="statement-caption">CANDID BY NATURE · TIMELESS BY DESIGN</span>
      </section>

      <section className="services section-pad" id="services">
        <div className="services-head reveal">
          <p className="eyebrow dark-eyebrow">WHAT WE DOCUMENT</p>
          <h2>Your day, your people,<br /><em>your kind of magic.</em></h2>
        </div>
        <div className="service-list">
          <article className="service-item reveal">
            <span className="service-number">01</span>
            <div><h3>Wedding Stories</h3><p>The rituals, the reunions, the unfiltered joy and all the in-between moments.</p></div>
            <span className="service-tag">FULL DAY</span>
            <ArrowUpRight className="service-icon" />
          </article>
          <article className="service-item reveal">
            <span className="service-number">02</span>
            <div><h3>Pre-wedding</h3><p>A relaxed session built around your chemistry, your places and your story.</p></div>
            <span className="service-tag">ON LOCATION</span>
            <ArrowUpRight className="service-icon" />
          </article>
          <article className="service-item reveal">
            <span className="service-number">03</span>
            <div><h3>Cinematic Films</h3><p>Movement, sound and feeling — crafted into a film you’ll return to.</p></div>
            <span className="service-tag">PHOTO + FILM</span>
            <ArrowUpRight className="service-icon" />
          </article>
          <article className="service-item reveal">
            <span className="service-number">04</span>
            <div><h3>Life’s Little Chapters</h3><p>Engagements, maternity, family celebrations and new beginnings.</p></div>
            <span className="service-tag">LIFE MOMENTS</span>
            <ArrowUpRight className="service-icon" />
          </article>
        </div>
      </section>

      <section className="quote-section">
        <p className="eyebrow"><span /> KIND WORDS, KEPT CLOSE</p>
        <blockquote>“The photographs brought us right back to how the day felt. Every little moment was there.”</blockquote>
        <p className="quote-attribution">A COUPLE’S NOTE <span>·</span> SAMPLE TESTIMONIAL</p>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="contact-left reveal">
          <p className="eyebrow"><span /> YOUR STORY STARTS HERE</p>
          <h2>Let’s make something<br /><em>meaningful.</em></h2>
          <p>Tell us a little about your plans. We’ll get back to you to talk dates, details and the kind of memories you want to keep.</p>
          <div className="contact-details">
            <div><span>BASED IN</span><strong>Pune, Maharashtra</strong></div>
            <div><span>FOR ENQUIRIES</span><strong>Wedding · Pre-wedding · Films</strong></div>
          </div>
        </div>
        <form className="contact-form reveal" onSubmit={(event) => { event.preventDefault(); setFormSent(true); }}>
          <label>Your name<input required name="name" placeholder="How should we call you?" /></label>
          <label>Email or phone<input required name="contact" placeholder="Where can we reach you?" /></label>
          <div className="form-pair">
            <label>Event type<select name="eventType" defaultValue=""><option value="" disabled>Select an event</option><option>Wedding</option><option>Pre-wedding</option><option>Engagement</option><option>Other celebration</option></select></label>
            <label>Event date<input name="date" type="date" /></label>
          </div>
          <label>A little about your plans<textarea name="message" rows={3} placeholder="Venue, dates, what you’re imagining..." /></label>
          <button className="button button-gold" type="submit">{formSent ? "Enquiry noted in demo" : "Send an enquiry"} <ArrowUpRight size={16} /></button>
          <p className="form-note">{formSent ? "This is a frontend demo. No information has been sent or saved." : "Demo form only — connect a backend or email service to receive real enquiries."}</p>
        </form>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark"><Camera size={17} strokeWidth={1.4} /></span>
          <span className="brand-name">SAURABH OMBASE <small>PHOTOGRAPHY</small></span>
        </a>
        <span className="footer-copy">MADE TO REMEMBER · PUNE, INDIA</span>
        <div className="footer-links">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17} /></a>
          <button onClick={() => scrollTo("top")}>BACK TO TOP ↑</button>
        </div>
      </footer>

      {currentPhoto && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setActivePhoto(null)}>
          <button className="lightbox-close" onClick={() => setActivePhoto(null)} aria-label="Close photo"><X /></button>
          <button className="lightbox-prev" onClick={(event) => { event.stopPropagation(); setActivePhoto((activePhoto! - 1 + filteredPhotos.length) % filteredPhotos.length); }} aria-label="Previous photo"><ChevronLeft /></button>
          <img src={currentPhoto.src} alt={currentPhoto.title} onClick={(event) => event.stopPropagation()} />
          <button className="lightbox-next" onClick={(event) => { event.stopPropagation(); setActivePhoto((activePhoto! + 1) % filteredPhotos.length); }} aria-label="Next photo"><ChevronRight /></button>
          <div className="lightbox-caption">{currentPhoto.title}<span>{String(activePhoto! + 1).padStart(2, "0")} / {String(filteredPhotos.length).padStart(2, "0")}</span></div>
        </div>
      )}
    </main>
  );
}

export default App;
