"use client";
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight, Bone, CalendarDays, Check, ChevronDown, Clock3, ExternalLink,
  Camera, MapPin, Menu, Phone, ShieldCheck, Sparkles, X,
  Activity, HeartPulse, Footprints, Star
} from 'lucide-react';
import { Toaster, toast } from 'sonner';

const config = {
  hospital: 'SATYA HOSPITALS',
  clinic: 'ORTHOPAEDIC & PAIN CLINIC',
  address: ['Government Hospital Road', 'Ramanaidupeta', 'Machilipatnam, Andhra Pradesh – 521001'],
  phone: '+91 7207806099',
  phoneHref: 'tel:+917207806099',
  whatsapp: 'https://wa.me/917207806099',
  mapsUrl: 'https://maps.app.goo.gl/sHKrkJkcrnajF3yq8',
  instagramHandle: '@satyahospitalsmtm',
  instagramUrl: 'https://www.instagram.com/satyahospitalsmtm/',
  doctorHeroImage: '/doctor-hero.png',
  doctorProfileImage: '/doctor-profile.png',
  hospitalImages: {
    building: '/facility-building.png',
    pharmacy: '/facility-pharmacy.png',
    imaging: '/facility-imaging.png',
    rehabilitation: '/facility-rehab.png'
  },
  doctor: {
    name: 'Dr. Satya Phanindra Kurella',
    title: 'Orthopaedic & Joint Replacement Specialist',
    credentials: ['MBBS', 'D.Ortho', 'DNB Ortho', 'FIJR', 'FIRD'],
    focus: ['Orthopaedics', 'Joint Replacement', 'Spine Care'],
  },
  timings: {
    weekdays: 'Monday–Saturday · 9:00 AM – 1:00 PM · 5:00 PM – 8:00 PM',
    sunday: 'Sunday · 10:00 AM – 1:00 PM'
  },
};

const waMessage = 'Hello, I would like to book a consultation at Satya Hospitals. Please share the available appointment details.';
const waLink = `${config.whatsapp}?text=${encodeURIComponent(waMessage)}`;

const services = [
  ['Joint Replacement', 'Dedicated evaluation and treatment for patients considering knee or hip joint replacement.', Bone],
  ['Fracture & Trauma Care', 'Evaluation and treatment pathways for fractures, injuries and orthopaedic trauma.', ShieldCheck],
  ['Spine Care', 'Assessment and treatment pathways for common spine and back-related conditions.', Sparkles],
  ['Arthroscopy', 'Minimally invasive orthopaedic procedures where clinically appropriate.', Activity],
  ['Pain Management', 'Focused care for musculoskeletal and chronic pain conditions.', HeartPulse],
  ['Physiotherapy & Rehabilitation', 'Support for recovery, mobility and post-treatment rehabilitation.', Footprints],
];

const conditions = ['Knee pain', 'Joint pain', 'Sciatica', 'Frozen shoulder', 'Spine-related pain', 'Fractures', 'Mobility difficulties', 'Joint swelling'];

const patientReviews = [
  {
    name: "Barkathunnisa",
    location: "Gudivada",
    time: "3 months ago",
    text: "Suffering from severe spine problems for 8 years... Dr. Satya Phanindra performed my keyhole spine surgery successfully. On the second day itself I was able to wake up, sit, and walk with support. Satya Hospital is the best hospital in Machilipatnam for Orthopaedics and spine surgery.",
    rating: 5
  },
  {
    name: "Avinash Kala",
    location: "Rajahmundry",
    time: "6 months ago",
    text: "We admitted my wife's aunt (aged 80 years) at the hospital as she fell and broke her hip ball. We brought her from Rajahmundry for treatment. Dr Satya has shown great patience explaining us about the situation.",
    rating: 5
  },
  {
    name: "K. Vamsie",
    location: "Machilipatnam",
    time: "a month ago",
    text: "Dr. Satya Phanindra performed ball replacement surgery, and the results are excellent. He is a very patient and knowledgeable doctor. The staff is also very helpful. Highly recommended for Orthopaedic treatment.",
    rating: 5
  },
  {
    name: "Chandrasekhar Munagala",
    location: "Local Guide",
    time: "6 months ago",
    text: "Had a very good experience at Satya Hospital. Dr. Satya Phanindra performed my ankle fracture surgery, and the results are excellent. He is a very patient and knowledgeable doctor. The staff is also very helpful.",
    rating: 5
  }
];

const faqs = [
  ['Where is Satya Hospitals located?', 'Government Hospital Road, Ramanaidupeta, Machilipatnam, Andhra Pradesh – 521001.'],
  ['What does Satya Hospitals specialize in?', 'Orthopaedic and pain-related care, including joint replacement, spine care, trauma and rehabilitation.'],
  ['Who is the lead doctor?', 'Dr. Satya Phanindra Kurella (MBBS, D.Ortho, DNB Ortho, FIJR, FIRD) – Orthopaedic & Joint Replacement Specialist.'],
  ['What are the OPD timings?', 'Monday–Saturday: 9:00 AM–1:00 PM and 5:00 PM–8:00 PM. Sunday: 10:00 AM–1:00 PM.'],
  ['How can I book an appointment?', 'Call or WhatsApp +91 7207806099. The appointment form on this page opens a prefilled WhatsApp message.'],
  ['How can I reach the hospital?', 'Use the "Get Directions" button in the Location section to open the hospital location in Google Maps.'],
];

const journey = [
  ['01', 'Call or WhatsApp', 'Start by sharing your concern or asking about an appointment.'],
  ['02', 'Discuss your concern', 'Tell the hospital what you would like help with and your preferred visit time.'],
  ['03', 'Visit Satya Hospitals', 'Come to Government Hospital Road, Ramanaidupeta, Machilipatnam.'],
  ['04', 'Meet the specialist', 'Discuss your orthopaedic care with Dr. Satya Phanindra Kurella.']
];

const facilities = [
  ['Hospital Building', 'Dedicated orthopaedic facility located on Government Hospital Road.', 'building'],
  ['In-House Pharmacy', 'On-site medical store for immediate prescription and care access.', 'pharmacy'],
  ['X-Ray / Diagnostic Support', 'Diagnostic support listed among the hospital services.', 'imaging'],
  ['Physiotherapy', 'Support for recovery, mobility and rehabilitation.', 'rehabilitation']
];

function DoctorPortrait({ type = 'hero' }) {
  const isHero = type === 'hero';
  const imageSrc = isHero ? config.doctorHeroImage : config.doctorProfileImage;

  return (
    <div className={`doctor-portrait ${isHero ? 'doctor-portrait-small' : ''}`} data-testid={`doctor-portrait-${type}`}>
      {imageSrc ? (
        <img src={imageSrc} alt={config.doctor.name} />
      ) : (
        <>
          <div className="portrait-glow" />
          <div className="portrait-silhouette">
            <div className="silhouette-head" />
            <div className="silhouette-body" />
          </div>
          <span>Professional Portrait</span>
        </>
      )}
    </div>
  );
}

function SectionIntro({ eyebrow, title, copy, light = false }) {
  return (
    <div className={`section-intro ${light ? 'light' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function WhatsAppIcon({ size = 16, className = "" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);
  const [form, setForm] = useState({ name: '', phone: '', reason: '', date: '' });

  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value });

  const submit = (event) => {
    event.preventDefault();
    if (!form.name || !form.phone) return toast.error('Please add your name and phone number.');
    const msg = `Hello, I would like to book a consultation at Satya Hospitals.\nName: ${form.name}\nPhone: ${form.phone}\nReason: ${form.reason || 'Not specified'}\nPreferred date: ${form.date || 'Not specified'}`;
    window.open(`${config.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    setBookingOpen(false);
  };

  return (
    <div className="site-shell">
      <Toaster position="top-center" richColors />
      <div className="notice-bar" data-testid="notice-bar">
        <span>Orthopaedic & Pain Clinic</span>
        <span className="notice-location"><MapPin size={14} /> Machilipatnam, Andhra Pradesh</span>
        <a href={config.phoneHref} data-testid="notice-call-link"><Phone size={14} /> {config.phone}</a>
      </div>

      <header className="nav" data-testid="main-header">
        <a className="brand" href="#home" data-testid="brand-link">
          <span className="brand-mark">SH</span>
          <span><strong>{config.hospital}</strong><small>{config.clinic}</small></span>
        </a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {[
            ['doctor', 'Doctor'],
            ['services', 'Services'],
            ['reviews', 'Patient Reviews'],
            ['journey', 'Your Visit'],
            ['location', 'Location'],
            ['faq', 'FAQs']
          ].map(([id, label]) => (
            <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)} data-testid={`nav-${id}-link`}>{label}</a>
          ))}
          <a className="nav-whatsapp" href={waLink} target="_blank" rel="noreferrer" data-testid="nav-whatsapp-link">
            <WhatsAppIcon size={16} /> WhatsApp
          </a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" data-testid="mobile-menu-button">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        <section className="hero" id="home" data-testid="hero-section">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="container hero-grid">
            <motion.div className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
              <span className="eyebrow light"><span className="eyebrow-dot" /> Satya Hospitals · Machilipatnam</span>
              <h1>Specialized orthopaedic care in Machilipatnam.<em> Closer to home.</em></h1>
              <p>Focused orthopaedic, joint replacement, pain and trauma care for patients and families in Machilipatnam.</p>
              <div className="hero-trust-bar">
                <div className="hero-trust-doctor">
                  <img src={config.doctorHeroImage} alt={config.doctor.name} className="hero-trust-avatar" />
                  <div>
                    <strong>{config.doctor.name}</strong>
                    <span>{config.doctor.credentials.join(' · ')}</span>
                  </div>
                </div>
                <a href="https://maps.app.goo.gl/sHKrkJkcrnajF3yq8" target="_blank" rel="noreferrer" className="hero-trust-rating">
                  <span className="hero-trust-stars">★★★★★</span>
                  <span>4.8 · Google Reviews</span>
                </a>
              </div>
              <div className="hero-actions">
                <button className="button button-accent" onClick={() => setBookingOpen(true)} data-testid="hero-book-button">
                  <CalendarDays size={18} /> Book an appointment
                </button>
                <a className="button button-ghost" href={config.phoneHref} data-testid="hero-call-link">
                  <Phone size={18} /> Talk to the hospital
                </a>
              </div>
              <div className="hero-quick-links">
                <a href={waLink} target="_blank" rel="noreferrer" data-testid="hero-whatsapp-link"><WhatsAppIcon size={17} /> WhatsApp</a>
                <a href={config.mapsUrl} target="_blank" rel="noreferrer" data-testid="hero-directions-link"><MapPin size={17} /> Directions</a>
              </div>
            </motion.div>

            <motion.div className="hero-doctor-card" initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .6, delay: .15 }}>
              <div className="doctor-card-label">Meet your specialist</div>
              <DoctorPortrait type="profile" />
              <div className="hero-doctor-info">
                <h2>{config.doctor.name}</h2>
                <p>{config.doctor.title}</p>
                <div className="credential-pills">
                  {config.doctor.credentials.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
              <a href="#doctor" className="text-link" data-testid="hero-doctor-profile-link">
                View doctor profile <ArrowRight size={15} />
              </a>
            </motion.div>
          </div>
        </section>

        <section className="credential-strip" data-testid="credential-strip">
          <div className="container credential-inner">
            <div>
              <span className="strip-label">Credentials</span>
              <strong>{config.doctor.credentials.join(' · ')}</strong>
            </div>
            <div className="strip-divider" />
            <div>
              <span className="strip-label">Focused care</span>
              <strong>Orthopaedics · Joint Replacement · Spine Care</strong>
            </div>
            <div className="strip-divider" />
            <div>
              <span className="strip-label">OPD hours</span>
              <strong>Mon–Sat · 9 AM–1 PM & 5 PM–8 PM</strong>
            </div>
          </div>
        </section>

        <section className="section doctor-section" id="doctor" data-testid="doctor-section">
          <div className="container">
            <div className="doctor-profile doctor-profile-standalone">
              <SectionIntro
                eyebrow="Meet your orthopaedic specialist"
                title="Clear guidance for your next step."
                copy="Dr. Satya Phanindra Kurella is associated with Satya Hospitals as the lead doctor, with specialized expertise in orthopaedics, joint replacement, and complex spine care."
              />
              <div className="credential-list">
                {config.doctor.credentials.map((item) => (
                  <div key={item}><Check size={16} /> <strong>{item}</strong></div>
                ))}
              </div>
              <p className="body-copy">
                Satya Hospitals brings focused orthopaedic and pain care closer to patients in Machilipatnam. Speak with the hospital to understand the right consultation pathway for your concern.
              </p>
              <div className="action-row">
                <button className="button button-navy" onClick={() => setBookingOpen(true)} data-testid="doctor-book-button">
                  Book a consultation <ArrowRight size={17} />
                </button>
                <a className="text-link" href={config.phoneHref} data-testid="doctor-call-link">
                  <Phone size={16} /> Call {config.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section services-section" id="services" data-testid="services-section">
          <div className="container">
            <SectionIntro eyebrow="What we focus on" title="Comprehensive orthopaedic care" copy="A focused set of services for joints, bones, spine, pain, injury and recovery." />
            <div className="service-grid">
              {services.map(([title, copy, Icon], index) => (
                <motion.article className="service-card" key={title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }} data-testid={`service-card-${index}`}>
                  <span className="service-number">0{index + 1}</span>
                  <div className="icon-box"><Icon size={23} /></div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <button onClick={() => setBookingOpen(true)} data-testid={`service-book-${index}`}>
                    Talk to the hospital <ArrowRight size={15} />
                  </button>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Real Patient Reviews Section */}
        <section className="section reviews-section" id="reviews" data-testid="reviews-section">
          <div className="container">
            <SectionIntro eyebrow="Patient Experiences" title="Trusted by families across Andhra Pradesh" copy="Real stories from verified Google reviews of patients treated at Satya Hospitals." />
          </div>
          <div className="reviews-track">
            <div className="reviews-inner">
              {/* Original set */}
              {patientReviews.map((rev, index) => (
                <article className="review-card" key={`a-${index}`}>
                  <div className="review-stars">
                    {[...Array(rev.rating)].map((_, i) => <Star key={i} size={16} fill="#00a896" />)}
                  </div>
                  <p className="review-text">"{rev.text}"</p>
                  <div className="review-author">
                    <strong className="review-name">{rev.name}</strong>
                    <span className="review-meta">{rev.location} · {rev.time}</span>
                  </div>
                </article>
              ))}
              {/* Duplicate set for seamless loop */}
              {patientReviews.map((rev, index) => (
                <article className="review-card" key={`b-${index}`} aria-hidden="true">
                  <div className="review-stars">
                    {[...Array(rev.rating)].map((_, i) => <Star key={i} size={16} fill="#00a896" />)}
                  </div>
                  <p className="review-text">"{rev.text}"</p>
                  <div className="review-author">
                    <strong className="review-name">{rev.name}</strong>
                    <span className="review-meta">{rev.location} · {rev.time}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section conditions-section" id="conditions" data-testid="conditions-section">
          <div className="container conditions-grid">
            <div>
              <SectionIntro light eyebrow="Patient-friendly guidance" title="Understand your orthopaedic problem." copy="These are common concerns people discuss with an orthopaedic specialist. They are not a diagnosis tool." />
              <a className="button button-accent" href={waLink} target="_blank" rel="noreferrer" data-testid="conditions-whatsapp-link">
                <WhatsAppIcon size={17} /> Talk to the hospital
              </a>
            </div>
            <div className="condition-cloud">
              {conditions.map((item, index) => (
                <a href={waLink} target="_blank" rel="noreferrer" key={item} data-testid={`condition-link-${index}`}>
                  <span>0{index + 1}</span>{item}<ArrowRight size={15} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section journey-section" id="journey" data-testid="journey-section">
          <div className="container">
            <SectionIntro eyebrow="A simple next step" title="Your visit, made simple" copy="A clear path from your first message to meeting your specialist." />
            <div className="journey-grid">
              {journey.map(([number, title, copy]) => (
                <article key={number} data-testid={`journey-step-${number}`}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section facilities-section" id="facilities" data-testid="facilities-section">
          <div className="container">
            <SectionIntro eyebrow="Designed around your recovery" title="A hospital experience you can understand" copy="Explore our physical infrastructure in Machilipatnam." />
            <div className="facility-grid">
              {facilities.map(([title, copy, key], index) => (
                <article className="facility-card" key={title} data-testid={`facility-card-${index}`}>
                  <div className="facility-image">
                    {config.hospitalImages[key] ? (
                      <img src={config.hospitalImages[key]} alt={title} loading="lazy" />
                    ) : (
                      <>
                        <span className="facility-scan" />
                        <span className="placeholder-label">Photo placeholder</span>
                      </>
                    )}
                    <span className="facility-index">0{index + 1}</span>
                  </div>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section insights-section" data-testid="insights-section">
          <div className="container insight-layout">
            <div>
              <SectionIntro eyebrow="Orthopaedic health insights" title="Useful conversations start here." copy="A space for Satya Hospitals to share simple, factual orthopaedic education." />
              <a className="text-link" href={waLink} target="_blank" rel="noreferrer" data-testid="insights-whatsapp-link">
                Ask about your concern <ArrowRight size={15} />
              </a>
            </div>
            <div className="insight-list">
              {['Sciatica', 'Frozen shoulder', 'Knee pain', 'Joint swelling', 'Spine care', 'Fracture recovery'].map((item, index) => (
                <a href={waLink} target="_blank" rel="noreferrer" key={item} data-testid={`insight-link-${index}`}>
                  <span>{item}</span><ArrowRight size={17} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section appointment-section" id="appointment" data-testid="appointment-section">
          <div className="container appointment-grid">
            <div className="appointment-copy">
              <span className="eyebrow">Book your consultation</span>
              <h2>Let’s make your next step clear.</h2>
              <p>Share a few details and WhatsApp will open with a prefilled message for the hospital.</p>
              <div className="timing-card">
                <Clock3 size={20} />
                <div>
                  <strong>OPD timings</strong>
                  <span>{config.timings.weekdays}</span>
                  <span>{config.timings.sunday}</span>
                </div>
              </div>
              <a className="text-link" href={config.phoneHref} data-testid="appointment-call-link"><Phone size={16} /> Call {config.phone}</a>
            </div>
            <form className="appointment-form" onSubmit={submit} data-testid="appointment-form">
              <div className="form-heading">
                <span>01</span>
                <h3>Send an enquiry on WhatsApp</h3>
              </div>
              <label>Your name<input value={form.name} onChange={update('name')} required placeholder="Enter your name" data-testid="appointment-name-input" /></label>
              <label>Phone number<input value={form.phone} onChange={update('phone')} required type="tel" placeholder="Enter your phone number" data-testid="appointment-phone-input" /></label>
              <label>Reason for visit<input value={form.reason} onChange={update('reason')} placeholder="Knee pain, fracture, consultation…" data-testid="appointment-reason-input" /></label>
              <label>Preferred date<input value={form.date} onChange={update('date')} type="date" data-testid="appointment-date-input" /></label>
              <button className="button button-whatsapp" type="submit" data-testid="appointment-submit-button">
                <WhatsAppIcon size={18} /> Continue on WhatsApp
              </button>
              <small>No information is stored here. WhatsApp will open with your message ready to send.</small>
            </form>
          </div>
        </section>

        <section className="section location-section" id="location" data-testid="location-section">
          <div className="container location-grid">
            <div>
              <SectionIntro eyebrow="Find Satya Hospitals" title="Care, right here in Machilipatnam." copy="Use the verified address below to plan your visit." />
              <div className="address-card">
                <MapPin size={22} />
                <div>{config.address.map((line) => <span key={line}>{line}</span>)}</div>
              </div>
              <div className="location-actions">
                <a className="button button-navy" href={config.mapsUrl} target="_blank" rel="noreferrer" data-testid="directions-link"><MapPin size={17} /> Get directions</a>
                <a className="text-link" href={config.phoneHref} data-testid="location-call-link"><Phone size={16} /> Call the hospital</a>
              </div>
            </div>
            <div className="map-placeholder" data-testid="map-placeholder" style={{ position: 'relative', overflow: 'hidden', padding: 0, border: '1px solid var(--line)', background: '#e0f2f1' }}>
              <iframe
                title="Satya Hospitals Google Maps Location"
                src="https://maps.google.com/maps?q=SATYA%20HOSPITALS%20Government%20Hospital%20Road%20Machilipatnam&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '340px', width: '100%', height: '100%' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        <section className="urgent-section" data-testid="urgent-section">
          <div className="container urgent-inner">
            <div>
              <span className="eyebrow light">Urgent orthopaedic attention?</span>
              <h2>For accident, fracture or trauma-related concerns, contact the hospital directly.</h2>
            </div>
            <a className="button button-light" href={config.phoneHref} data-testid="urgent-call-link"><Phone size={17} /> Call the hospital</a>
          </div>
        </section>

        <section className="section faq-section" id="faq" data-testid="faq-section">
          <div className="container faq-layout">
            <SectionIntro eyebrow="Answers, at a glance" title="Frequently asked questions" copy="Simple information for planning your visit." />
            <div className="faq-list">
              {faqs.map(([question, answer], index) => (
                <div className={`faq-item ${faqOpen === index ? 'active' : ''}`} key={question} data-testid={`faq-item-${index}`}>
                  <button onClick={() => setFaqOpen(faqOpen === index ? -1 : index)} data-testid={`faq-toggle-${index}`}>
                    <span>{question}</span>
                    <ChevronDown size={18} />
                  </button>
                  <AnimatePresence>
                    {faqOpen === index && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                        {answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="social-strip" id="instagram" data-testid="social-section">
          <div className="container social-inner">
            <div>
              <span className="eyebrow light">Follow Satya Hospitals</span>
              <h2>Orthopaedic care, beyond the consultation.</h2>
              <p>Find {config.instagramHandle} on Instagram.</p>
            </div>
            <a className="button button-light" href={config.instagramUrl} data-testid="instagram-link"><Camera size={17} /> View on Instagram <ExternalLink size={15} /></a>
          </div>
        </section>

        <section className="final-cta" data-testid="final-cta-section">
          <div className="container">
            <span className="eyebrow">Your next step starts here</span>
            <h2>Take the first step toward better orthopaedic care.</h2>
            <p>Speak with Satya Hospitals to discuss your consultation.</p>
            <div className="hero-actions">
              <button className="button button-navy" onClick={() => setBookingOpen(true)} data-testid="final-book-button">
                <CalendarDays size={18} /> Book an appointment
              </button>
              <a className="button button-outline" href={config.phoneHref} data-testid="final-call-link">
                <Phone size={18} /> Call the hospital
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" data-testid="main-footer">
        <div className="container footer-grid">
          <div>
            <a className="brand footer-brand" href="#home" data-testid="footer-brand-link">
              <span className="brand-mark">SH</span>
              <span><strong>{config.hospital}</strong><small>{config.clinic}</small></span>
            </a>
            <p>Focused orthopaedic and pain care for Machilipatnam.</p>
          </div>
          <div>
            <h3>Explore</h3>
            <a href="#doctor" data-testid="footer-doctor-link">Doctor</a>
            <a href="#services" data-testid="footer-services-link">Services</a>
            <a href="#reviews" data-testid="footer-reviews-link">Patient Reviews</a>
            <a href="#appointment" data-testid="footer-appointment-link">Appointment</a>
            <a href="#faq" data-testid="footer-faq-link">FAQs</a>
          </div>
          <div>
            <h3>Contact</h3>
            <span>{config.address.join(', ')}</span>
            <a href={config.phoneHref} data-testid="footer-call-link">{config.phone}</a>
            <a href={config.instagramUrl} data-testid="footer-instagram-link">{config.instagramHandle}</a>
          </div>
        </div>
        <div className="footer-bottom container">
          <span>Satya Hospitals · Machilipatnam, Andhra Pradesh</span>
          <span>© {new Date().getFullYear()} Satya Hospitals. All rights reserved.</span>
        </div>
      </footer>

      <div className="mobile-cta" data-testid="sticky-mobile-cta">
        <a href={config.phoneHref} data-testid="sticky-call-link"><Phone size={16} /> Call</a>
        <a href={waLink} target="_blank" rel="noreferrer" data-testid="sticky-whatsapp-link"><WhatsAppIcon size={16} /> WhatsApp</a>
        <button onClick={() => setBookingOpen(true)} data-testid="sticky-book-button"><CalendarDays size={16} /> Book</button>
      </div>

      <AnimatePresence>
        {bookingOpen && (
          <div className="modal-backdrop" data-testid="booking-modal" onClick={() => setBookingOpen(false)}>
            <motion.div className="booking-modal" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setBookingOpen(false)} aria-label="Close booking form" data-testid="booking-modal-close"><X /></button>
              <span className="eyebrow">Appointment enquiry</span>
              <h2>Start with WhatsApp</h2>
              <p>Share your details in the quick form, or open a ready message now.</p>
              <a className="button button-whatsapp full" href={waLink} target="_blank" rel="noreferrer" data-testid="modal-direct-whatsapp">
                <WhatsAppIcon size={18} /> WhatsApp the hospital
              </a>
              <button className="modal-form-link" onClick={() => { setBookingOpen(false); document.querySelector('#appointment')?.scrollIntoView({ behavior: 'smooth' }); }} data-testid="modal-form-link">
                Use the enquiry form instead <ArrowRight size={15} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;