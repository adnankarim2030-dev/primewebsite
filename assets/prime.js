/* Prime Group — shared site script
   1. CONTACT: one source of truth for contact details (change here only)
   2. Renders header, mobile menu, footer and WhatsApp button on every page
   3. Shared motion (Lenis smooth scroll + GSAP reveals) and form helper */
(function () {
  const CONTACT = {
    address: "63-C, Commercial Area A, DHA Phase 2, Karachi",
    phoneDisplay: "(021) 111-111-800",
    phoneTel: "+922111111800",
    whatsapp: "922111111800",
    email: "primeestateenterprises@gmail.com",
    hours: "Mon–Sat, 9 AM – 7 PM",
    maps: "https://www.google.com/maps/search/?api=1&query=Commercial+Area+A+DHA+Phase+2+Karachi",
    advisors: [
      { name: "Kashif", role: "DHA Commercial", display: "+92 300 8271187", tel: "+923008271187", wa: "923008271187" },
      { name: "Faraz", role: "DHA Phase 6 & 8", display: "+92 333 2119066", tel: "+923332119066", wa: "923332119066" },
      { name: "Nadeem Anjum", role: "Plots & Advisory", display: "+92 333 2127800", tel: "+923332127800", wa: "923332127800" }
    ],
    social: { facebook: "#", instagram: "https://www.instagram.com/primeestateenterprises/?hl=en", linkedin: "#", youtube: "#" }
  };
  const LOGO = "assets/logo.png";

  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const wa = (t = "", num = CONTACT.whatsapp) => `https://wa.me/${num}${t ? "?text=" + encodeURIComponent(t) : ""}`;

  const ic = {
    arr: '<svg class="arr" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 8h12M9 3l5 5-5 5"/></svg>',
    car: '<svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M1 1l4 4 4-4"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z"/></svg>',
    call: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    ruler: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 17L17 3l4 4L7 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    handshake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 12l4-4 4 2 3-2 4 1 5 3"/><path d="M6 8v6l5 5 3-1 4-4"/><path d="M11 14l2 2M13 12l2 2"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>',
    crane: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 21V3M6 4h14M6 8l4-4M18 4v5M16 9h4v3h-4zM3 21h10"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 20V4M4 20h16"/><path d="M8 16l4-5 3 3 5-7"/></svg>',
    key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M15 8l2 2"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h7M9 16h7"/></svg>',
    bed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 18V7M3 13h18v5M21 13v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="10.5" r="1.8"/></svg>',
    bath: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 12h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5zM6 12V5a2 2 0 0 1 4 0M7 20l-1 2M17 20l1 2"/></svg>',
    area: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 4h16v16H4z"/><path d="M4 9h3M4 14h3M9 4v3M14 4v3"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14a6 6 0 0 1 3.5 6"/></svg>'
  };

  /* ---------- Header / menu / footer ---------- */
  const page = document.body.dataset.page || "";
  const cur = p => (p === page ? ' aria-current="page"' : "");
  const ddCur = list => (list.includes(page) ? " cur" : "");

  const header = document.getElementById("site-header");
  if (header) {
    const s = CONTACT.social;
    header.className = "hdr";
    header.innerHTML = `<div class="wrap">
      <a href="index.html" class="brand" aria-label="Prime Group home"><img src="${LOGO}" alt="Prime Group, Realtor and Developers" width="210" height="44"></a>
      <nav class="nav" aria-label="Main">
        <a href="index.html"${cur("home")}>Home</a>
        <a href="about.html"${cur("about")}>About</a>
        <div class="dd${ddCur(["construction", "listings", "calculator"])}">
          <button type="button" aria-haspopup="true">Real Estate &amp; Construction ${ic.car}</button>
          <div class="dd-menu">
            <a href="construction.html"${cur("construction")}><b>Construction &amp; Projects</b><span>Design, grey structure and finishing</span></a>
            <a href="property-listing.html"${cur("listings")}><b>All Listings</b><span>Verified homes, plots and commercial space</span></a>
            <a href="mortgage-calculator.html"${cur("calculator")}><b>Financial Calculator</b><span>Work out instalments before you commit</span></a>
          </div>
        </div>
        <a href="services.html"${cur("services")}>Services</a>
        <div class="dd${ddCur(["find", "list"])}">
          <button type="button" aria-haspopup="true">Find Properties ${ic.car}</button>
          <div class="dd-menu">
            <a href="find-property.html"${cur("find")}><b>Find Dream Property</b><span>Search by area, budget and size</span></a>
            <a href="list-property.html"${cur("list")}><b>List Your Properties</b><span>Sell or rent out through Prime Group</span></a>
          </div>
        </div>
        <a href="contact-us.html"${cur("contact")}>Contact Us</a>
      </nav>
      <div class="hdr-soc" aria-label="Social links">
        <a href="${s.facebook}" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21z"/></svg></a>
        <a href="${s.instagram}" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".7" fill="currentColor"/></svg></a>
        <a href="${s.linkedin}" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.9 8.8H3.8V20h3.1zM5.4 3.8a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM20.2 13.6c0-3-1.6-4.9-4.3-4.9-1.4 0-2.4.8-2.8 1.5V8.8H10V20h3.1v-5.6c0-1.5.3-2.9 2.1-2.9s1.9 1.7 1.9 3V20h3.1z"/></svg></a>
        <a href="${s.youtube}" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z"/></svg></a>
        <a href="${wa("Hello Prime Group, I'd like some information.")}" target="_blank" rel="noopener" aria-label="WhatsApp">${ic.wa}</a>
      </div>
      <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="mnav"><i></i><i></i><i></i></button>
    </div>`;
    header.insertAdjacentHTML("afterend", `<nav class="mnav" id="mnav" aria-label="Mobile">
      <a href="index.html">Home</a><a href="about.html">About</a>
      <a href="construction.html">Real Estate &amp; Construction</a>
      <a class="sub" href="construction.html">Construction &amp; Projects</a>
      <a class="sub" href="property-listing.html">All Listings</a>
      <a class="sub" href="mortgage-calculator.html">Financial Calculator</a>
      <a href="services.html">Services</a>
      <a href="find-property.html">Find Properties</a>
      <a class="sub" href="find-property.html">Find Dream Property</a>
      <a class="sub" href="list-property.html">List Your Properties</a>
      <a href="contact-us.html">Contact Us</a>
      <a class="sub" href="dashboard.html">Admin Dashboard</a>
      <div class="mfoot"><span>${esc(CONTACT.address)}</span><a href="tel:${CONTACT.phoneTel}">${esc(CONTACT.phoneDisplay)}</a><a href="${wa()}" target="_blank" rel="noopener">WhatsApp us</a></div>
    </nav>`);
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "ftr";
    const s = CONTACT.social;
    footer.innerHTML = `<div class="wrap">
      <div class="ftr-grid">
        <div class="about">
          <a href="index.html" class="brand"><img src="${LOGO}" alt="Prime Group" width="210" height="44" loading="lazy"></a>
          <p>Realtor &amp; Developers. Verified property, turnkey construction and clear advice in Karachi since 1986.</p>
          <div class="soc">
            <a href="${s.facebook}" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21z"/></svg></a>
            <a href="${s.instagram}" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/></svg></a>
            <a href="${s.linkedin}" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.9 8.8H3.8V20h3.1zM5.4 3.8a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM20.2 13.6c0-3-1.6-4.9-4.3-4.9-1.4 0-2.4.8-2.8 1.5V8.8H10V20h3.1v-5.6c0-1.5.3-2.9 2.1-2.9s1.9 1.7 1.9 3V20h3.1z"/></svg></a>
            <a href="${s.youtube}" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z"/></svg></a>
          </div>
        </div>
        <div><h4>Quick links</h4><ul><li><a href="index.html">Home</a></li><li><a href="about.html">About</a></li><li><a href="construction.html">Real Estate &amp; Construction</a></li><li><a href="services.html">Services</a></li></ul></div>
        <div><h4>Properties</h4><ul><li><a href="find-property.html">Find Dream Property</a></li><li><a href="list-property.html">List Your Properties</a></li><li><a href="property-listing.html">All Listings</a></li><li><a href="mortgage-calculator.html">Financial Calculator</a></li><li><a href="contact-us.html">Contact Us</a></li></ul></div>
        <div><h4>Contact</h4><ul>
          <li>${esc(CONTACT.address)}</li>
          <li><a href="tel:${CONTACT.phoneTel}">${esc(CONTACT.phoneDisplay)}</a></li>
          <li><a href="mailto:${CONTACT.email}">${esc(CONTACT.email)}</a></li>
          <li>${esc(CONTACT.hours)}</li></ul></div>
      </div>
      <div class="word" aria-hidden="true">Prime Group</div>
      <div class="legal"><span>© ${new Date().getFullYear()} Prime Group, Karachi, Pakistan</span><span>Realtor &amp; Developers since 1986</span></div>
    </div>`;
    footer.insertAdjacentHTML("afterend", `<a class="wa-float" href="${wa("Hello Prime Group, I'd like some information.")}" target="_blank" rel="noopener" aria-label="Chat with Prime Group on WhatsApp">${ic.wa.replace('fill="currentColor"', "")}</a>`);
  }

  /* Icons: any element with data-ic="name" */
  document.querySelectorAll("[data-ic]").forEach(el => { el.innerHTML = ic[el.dataset.ic] || ""; });

  /* Contact blocks: any element with data-contact="card|list" */
  document.querySelectorAll("[data-contact=card]").forEach(el => {
    const adv = (CONTACT.advisors || []).map(a =>
      `<a href="tel:${a.tel}"><b>${esc(a.name)}</b><span>${esc(a.display)}</span></a>`
    ).join("");
    el.innerHTML = `<dl>${[
      ["Office", esc(CONTACT.address)],
      ["UAN / Office", `<a href="tel:${CONTACT.phoneTel}">${esc(CONTACT.phoneDisplay)}</a>`],
      ["Email", `<a href="mailto:${CONTACT.email}">${esc(CONTACT.email)}</a>`],
      ["Office hours", esc(CONTACT.hours)]
    ].map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join("")}</dl>
    ${adv ? `<div class="adv-wrap"><span class="adv-lbl">Direct Property Advisors</span><div class="adv-list">${adv}</div></div>` : ""}
    <div class="qa">${[
      [wa("Hello Prime Group, I'd like some information."), ic.wa, "WhatsApp", ' target="_blank" rel="noopener"'],
      ["tel:" + CONTACT.phoneTel, ic.call, "Call UAN", ""],
      ["mailto:" + CONTACT.email, ic.mail, "Email", ""],
      [CONTACT.maps, ic.pin, "Get directions", ' target="_blank" rel="noopener"']
    ].map(([h, i, l, x]) => `<a href="${esc(h)}"${x}>${i}${l}</a>`).join("")}</div>`;
  });

  /* Header behaviour */
  const hdr = document.querySelector(".hdr");
  const onScroll = () => hdr && hdr.classList.toggle("solid", window.scrollY > 30);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const burger = document.getElementById("burger"), mnav = document.getElementById("mnav");
  const toggleMenu = open => {
    if (!mnav) return;
    mnav.classList.toggle("open", open); document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open); burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  burger && burger.addEventListener("click", () => toggleMenu(!mnav.classList.contains("open")));
  mnav && mnav.addEventListener("click", e => { if (e.target.closest("a")) toggleMenu(false); });
  addEventListener("keydown", e => { if (e.key === "Escape") toggleMenu(false); });

  /* ---------- Form helper ----------
     PG.form(formEl, {fieldId: validatorFn}, values => whatsappText, onDone?) */
  function form(el, rules, toText, onDone) {
    const $ = id => el.querySelector("#" + id);
    const check = id => {
      const f = $(id); if (!f) return true;
      const ok = rules[id](f.value, f);
      (f.closest(".f") || f.parentElement).classList.toggle("err", !ok);
      return ok;
    };
    Object.keys(rules).forEach(id => { const f = $(id); f && f.addEventListener("input", () => { if ((f.closest(".f") || f.parentElement).classList.contains("err")) check(id); }); });
    el.addEventListener("submit", e => {
      e.preventDefault();
      const bad = Object.keys(rules).filter(id => !check(id));
      if (bad.length) { $(bad[0]).focus(); return; }
      const v = Object.fromEntries(new FormData(el).entries());
      const link = el.querySelector("[data-wa-send]");
      if (link) link.href = wa(toText(v));
      el.classList.add("sent");
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      onDone && onDone(v);
      /* Connect the existing backend/email submission here if the live site posts forms somewhere. */
    });
    const again = el.querySelector("[data-again]");
    again && again.addEventListener("click", e => { e.preventDefault(); el.reset(); el.classList.remove("sent"); });
  }
  const V = {
    req: v => String(v).trim().length > 1,
    phone: v => String(v).replace(/\D/g, "").length >= 10,
    email: v => !String(v).trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim()),
    emailReq: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim()),
    sel: v => !!v,
    msg: v => String(v).trim().length > 4
  };

  /* ---------- Motion ---------- */
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasG = !!window.gsap && !reduce;
  let lenis = null;

  function drawSVG(svg, delay = 0) {
    if (!svg) return;
    const strokes = [...svg.querySelectorAll(".bp")].filter(p => !p.getAttribute("stroke-dasharray"));
    const fills = svg.querySelectorAll(".bp-fill,.bp-win");
    if (!hasG) { fills.forEach(f => (f.style.opacity = 1)); return; }
    strokes.forEach(p => { const L = p.getTotalLength ? p.getTotalLength() : 500; p.style.strokeDasharray = L; p.style.strokeDashoffset = L; });
    gsap.set(fills, { opacity: 0 });
    const tl = gsap.timeline({ delay });
    tl.to(strokes, { strokeDashoffset: 0, duration: 2, ease: "power2.inOut", stagger: 0.04 })
      .to(fills, { opacity: 1, duration: 0.9, stagger: 0.12 }, "-=1");
    return tl;
  }

  function counters(scope = document) {
    scope.querySelectorAll("[data-n]").forEach(b => {
      const n = +b.dataset.n, suf = b.dataset.suf ?? "+";
      if (!hasG) { b.textContent = n + suf; return; }
      const o = { v: 0 };
      gsap.to(o, { v: n, duration: 2, ease: "power3.out", scrollTrigger: { trigger: b, start: "top 90%" }, onUpdate: () => (b.textContent = Math.round(o.v) + suf) });
    });
  }

  if (hasG) {
    gsap.registerPlugin(ScrollTrigger);
    if (window.Lenis) {
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
      document.addEventListener("click", e => {
        const a = e.target.closest('a[href^="#"]'); if (!a) return;
        const id = a.getAttribute("href"); if (id.length > 1 && document.querySelector(id)) { e.preventDefault(); lenis.scrollTo(id, { offset: -80 }); }
      });
    }
    /* Page hero entrance */
    const ph = document.querySelector(".phero");
    if (ph) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(ph.querySelectorAll("h1 .line-mask>span"), { yPercent: 110, rotationX: 16, transformPerspective: 900, duration: 1, stagger: 0.1 })
        .to(ph.querySelectorAll(".rv"), { opacity: 1, y: 0, rotationX: 0, duration: 0.9, stagger: 0.08, clearProps: "transform" }, "-=.6");
      drawSVG(ph.querySelector(".art svg"), 0.2);
      const hp = ph.querySelector(".hero-photo img");
      if (hp) {
        gsap.fromTo(hp, { scale: 1.14 }, { scale: 1.02, duration: 1.4, ease: "power3.out" });
        gsap.to(hp, { yPercent: 8, ease: "none", scrollTrigger: { trigger: ph, start: "top top", end: "bottom top", scrub: true } });
      }
      const hc = ph.querySelector(".hero-cap");
      if (hc) gsap.from(hc, { y: 18, opacity: 0, duration: 0.8, delay: 0.45, ease: "power3.out" });
      const hs = ph.querySelector(".hero-stage");
      if (hs) {
        const mainImg = hs.querySelector(".hero-visual img");
        const inset = hs.querySelector(".hero-inset");
        const badge = hs.querySelector(".hero-badge");
        if (mainImg) {
          gsap.fromTo(mainImg, { scale: 1.16, opacity: 0 }, { scale: 1.02, opacity: 1, duration: 1.3, delay: 0.15, ease: "power3.out" });
          gsap.to(mainImg, { yPercent: 8, ease: "none", scrollTrigger: { trigger: ph, start: "top top", end: "bottom top", scrub: true } });
        }
        if (inset) {
          gsap.from(inset, { y: 28, opacity: 0, duration: 0.9, delay: 0.45, ease: "power3.out" });
          gsap.to(inset, { y: -22, ease: "none", scrollTrigger: { trigger: ph, start: "top top", end: "bottom top", scrub: true } });
        }
        if (badge) gsap.from(badge, { y: 18, opacity: 0, duration: 0.8, delay: 0.6, ease: "power3.out" });
      }
    }
    /* Smooth image reveal on scroll for photo panels */
    document.querySelectorAll(".panel.photo img").forEach(img => {
      gsap.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: img.closest(".panel"), start: "top 85%", once: true } });
    });
    /* Top scroll progress bar */
    const prog = document.createElement("div");
    prog.className = "pg-progress";
    document.body.appendChild(prog);
    gsap.to(prog, { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.2 } });

    /* Generic 3D translated reveals for text, headings & sections */
    ScrollTrigger.batch(document.querySelectorAll("main .rv:not(.phero .rv):not(#what .rv)"), {
      start: "top 88%", once: true,
      onEnter: els => gsap.fromTo(els,
        { opacity: 0, y: 38, rotationX: 11, transformPerspective: 1000, transformOrigin: "50% 100%" },
        { opacity: 1, y: 0, rotationX: 0, duration: 0.95, stagger: 0.08, ease: "power3.out", clearProps: "transform" })
    });
    /* 3D scroll reveal on hero & photo containers */
    document.querySelectorAll(".panel.photo, .hero-photo").forEach(box => {
      gsap.fromTo(box,
        { y: 34, rotationX: 8, scale: 0.96, transformPerspective: 1100 },
        { y: 0, rotationX: 0, scale: 1, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: box, start: "top 88%", once: true } });
    });
    /* Interactive 3D tilt with Z-depth parallax on fine pointers (desktop) */
    if (matchMedia("(pointer:fine)").matches) {
      const bindTilt = (el, max = 6) => {
        if (!el || el.dataset.tilt) return;
        el.dataset.tilt = "1";
        el.addEventListener("mousemove", e => {
          const r = el.getBoundingClientRect();
          const rx = ((e.clientY - r.top) / r.height - 0.5) * -max * 2;
          const ry = ((e.clientX - r.left) / r.width - 0.5) * max * 2;
          gsap.to(el, { rotationX: rx, rotationY: ry, transformPerspective: 1000, duration: 0.45, ease: "power2.out", overwrite: "auto" });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { rotationX: 0, rotationY: 0, duration: 0.75, ease: "elastic.out(1, 0.55)", overwrite: "auto" });
        });
      };
      document.querySelectorAll(".hero-stage, .draw-wrap, .hero-photo, .panel.photo").forEach(el => bindTilt(el, 5.5));
      document.querySelectorAll(".card, .area").forEach(el => bindTilt(el, 3.5));
      /* Also apply subtle 3D tilt to dynamically rendered property & highlight cards */
      document.addEventListener("mousemove", e => {
        const c = e.target.closest(".pc, .igc");
        if (!c) return;
        bindTilt(c, 3.2);
      }, { passive: true });
    }
    /* Panels draw as they enter */
    document.querySelectorAll(".panel svg,[data-draw]").forEach(svg => {
      ScrollTrigger.create({ trigger: svg, start: "top 80%", once: true, onEnter: () => drawSVG(svg) });
      [...svg.querySelectorAll(".bp")].forEach(p => { if (!p.getAttribute("stroke-dasharray")) { const L = p.getTotalLength ? p.getTotalLength() : 500; p.style.strokeDasharray = L; p.style.strokeDashoffset = L; } });
      gsap.set(svg.querySelectorAll(".bp-fill,.bp-win"), { opacity: 0 });
    });
    /* Process line fills on scroll */
    document.querySelectorAll(".steps").forEach(s => {
      const bar = document.createElement("i"); bar.className = "bar"; s.prepend(bar);
      gsap.to(bar, { width: "calc(100% - 46px)", ease: "none", scrollTrigger: { trigger: s, start: "top 75%", end: "bottom 55%", scrub: 0.6 } });
    });
    /* Magnetic primary buttons */
    if (matchMedia("(pointer:fine)").matches) document.querySelectorAll(".mag").forEach(b => {
      b.addEventListener("mousemove", e => { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.22, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4 }); });
      b.addEventListener("mouseleave", () => gsap.to(b, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,.5)" }));
    });
  } else {
    document.documentElement.classList.remove("js");
    document.querySelectorAll(".bp-fill,.bp-win").forEach(f => (f.style.opacity = 1));
  }
  counters();

  /* Logo fallback if image missing */
  document.querySelectorAll(".brand img").forEach(img => img.addEventListener("error", () => { img.replaceWith(Object.assign(document.createElement("b"), { textContent: "PRIME GROUP", style: "font-weight:800;font-size:20px;letter-spacing:-.02em" })); }));

  window.PG = { CONTACT, esc, wa, ic, form, V, drawSVG, counters, hasG, get lenis() { return lenis; } };
})();
