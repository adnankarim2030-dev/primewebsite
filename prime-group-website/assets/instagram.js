/* Prime Group — Instagram showcase (@primeestateenterprises)
   Each item is one Instagram post. Media (photos, carousels, reels) is shown with
   Instagram's official embed, so videos play on the site and nothing needs re-uploading.
   To add a post: copy its link code (the part after /p/ or /reel/) into `sc` and fill in the rest.
   tags: ph6 = Bukhari Commercial, DHA Phase 6 · ph8 = Al-Murtaza / Sahil Commercial, DHA Phase 8 · plots · insight */
(function () {
  const IG_HANDLE = "primeestateenterprises";
  const IMG_BASE = "../";
  const POSTS = [
    { sc: "DApzGZzv4SX", kind: "Reel", date: "Oct 2024", tags: ["ph6"], area: "Bukhari Commercial, DHA Phase 6", title: "The future of modern workspaces", points: ["Latest office design trends", "Modern amenities", "Prime commercial locations"], advisor: "Kashif", phone: "+92 300 8271187", wa: "923008271187", thumb: "karachi_corporate_tower.jpg" },
    { sc: "DAnFnMKv__Q", kind: "Reel", date: "Oct 2024", tags: ["ph6"], area: "Bukhari Commercial, DHA Phase 6", title: "Bukhari Commercial's facelift", points: ["Modern aesthetics for business", "Heart of DHA", "Viewings on request"], advisor: "Faraz", phone: "+92 333 2119066", wa: "923332119066", thumb: "karachi_highrise_build.jpg" },
    { sc: "DAkxMadv39Y", kind: "Reel", date: "Oct 2024", tags: ["ph6", "ph8", "insight"], area: "Al-Murtaza & Bukhari Commercial, DHA", title: "Why invest in commercial real estate", points: ["Tax benefits", "Long-term growth and high ROI", "Secure investment"], advisor: "Kashif", phone: "+92 300 8271187", wa: "923008271187", thumb: "karachi_corporate_tower.jpg" },
    { sc: "DAkuuy1tuxt", kind: "Photo", date: "Oct 2024", tags: ["ph8"], area: "Al-Murtaza & Sahil Commercial, DHA Phase 8", title: "Invest with ease in DHA Phase 8", points: ["Streamlined investment process", "Personal expert guidance", "High-growth locations"], advisor: "Faraz", phone: "+92 333 2119066", wa: "923332119066", thumb: "karachi_dha_villa.jpg" },
    { sc: "DAYZBX1PrHF", kind: "Reel", date: "Sep 2024", tags: ["ph8"], area: "Al-Murtaza & Sahil Commercial, DHA Phase 8", title: "Commercial opportunities in DHA Phase 8", points: ["Luxury with convenience", "Upscale retail options", "A vibrant community"], advisor: "Kashif", phone: "+92 300 8271187", wa: "923008271187", thumb: "karachi_highrise_build.jpg" },
    { sc: "DAVnIPQP73e", kind: "Reel", date: "Sep 2024", tags: ["insight"], area: "DHA, Karachi", title: "Timelapse: DHA commercial development", points: ["From open land to business hub", "Growth still underway", "Rising commercial values"], advisor: "Faraz", phone: "+92 333 2119066", wa: "923332119066", thumb: "karachi_construction_site.jpg" },
    { sc: "DATRL5FvA3m", kind: "Reel", date: "Sep 2024", tags: ["ph6", "ph8"], area: "Khayaban-e-Bukhari Ph 6 & Al-Murtaza Ph 8", title: "World-class amenities on your doorstep", points: ["Local amenities nearby", "Convenience and comfort", "Two prime DHA addresses"], advisor: "Kashif", phone: "+92 300 8271187", wa: "923008271187", thumb: "karachi_clifton_penthouse.jpg" },
    { sc: "DATPuSkvW6J", kind: "Reel", date: "Sep 2024", tags: ["insight"], area: "DHA Phase 6", title: "Location or aesthetics: what matters most?", points: ["Key factors for commercial investors", "Advice from our team"], advisor: "Faraz", phone: "+92 333 2119066", wa: "923332119066", thumb: "karachi_architectural_design.jpg" },
    { sc: "DAQHm9TtNiX", kind: "Photo", date: "Sep 2024", tags: ["ph6"], area: "Bukhari Commercial, DHA Phase 6", title: "Business spaces in Bukhari Commercial", points: ["High visibility, easy access", "Modern facilities", "Growing demand in Phase 6"], advisor: "Kashif", phone: "+92 300 8271187", wa: "923008271187", thumb: "karachi_corporate_tower.jpg" },
    { sc: "DAQAkTMvQjX", kind: "Reel", date: "Sep 2024", tags: ["ph8"], area: "Al-Murtaza Commercial, DHA Phase 8", title: "Prime commercial properties in Al-Murtaza", points: ["Customisable spaces", "Modern infrastructure", "High ROI potential"], advisor: "Faraz", phone: "+92 333 2119066", wa: "923332119066", thumb: "karachi_highrise_build.jpg" },
    { sc: "C_sj-5oI-Eu", kind: "Photo", date: "Sep 2024", tags: ["plots"], area: "Karachi", title: "Commercial & residential plots available", points: ["Busy or quiet neighbourhoods", "Plots for offices and homes", "Direct contact: Nadeem Anjum"], advisor: "Nadeem Anjum", phone: "+92 333 2127800", wa: "923332127800", thumb: "karachi_construction_site.jpg" }
  ];
  const FILTERS = [["all", "All posts"], ["ph6", "Bukhari Commercial · Phase 6"], ["ph8", "Al-Murtaza & Sahil · Phase 8"], ["plots", "Plots"], ["insight", "Market insights"]];

  const root = document.getElementById("ig");
  if (!root) return;
  const esc = PG.esc, I = PG.ic;
  const link = p => `https://www.instagram.com/${p.kind === "Reel" ? "reel" : "p"}/${p.sc}/`;
  const igIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/></svg>';

  const limit = +(root.dataset.limit || 0);
  const shown = limit > 0 ? POSTS.slice(0, limit) : POSTS;

  const handleEl = root.querySelector(".ig-handle");
  if (handleEl) handleEl.href = `https://www.instagram.com/${IG_HANDLE}/?hl=en`;
  const chips = root.querySelector(".ig-chips"), grid = root.querySelector(".ig-grid");
  if (chips) {
    chips.innerHTML = FILTERS.map(([k, l]) => `<button class="chip" type="button" data-f="${k}" aria-pressed="${k === "all"}">${l}<small>${k === "all" ? shown.length : shown.filter(p => p.tags.includes(k)).length}</small></button>`).join("");
  }

  const card = p => `<article class="igc rv" data-tags="${p.tags.join(" ")}">
      <div class="igc-hd">
        <div class="igc-meta"><span class="igc-kind">${p.kind === "Reel" ? "▶ Reel" : "Photo"}</span><span>${esc(p.date)}</span></div>
        <h3>${esc(p.title)}</h3>
        <p class="igc-area">${I.pin}${esc(p.area)}</p>
        <ul>${p.points.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      </div>
      <div class="igc-media" data-sc="${p.sc}" data-url="${link(p)}">
        <a class="igc-ph" href="${link(p)}" target="_blank" rel="noopener" style="background-image:linear-gradient(rgba(20,36,60,.58),rgba(20,36,60,.72)),url('${esc(IMG_BASE + p.thumb)}')">${igIcon}<b>${p.kind === "Reel" ? "Watch the reel" : "View the photos"}</b><span>Loading from Instagram · Tap to open</span></a>
      </div>
      <div class="igc-ft">
        <a class="btn btn-wa btn-sm" href="${PG.wa(`Hello ${p.advisor}, I saw Prime Estate Enterprises' post "${p.title}" (${p.area}) on Instagram and would like details.`, p.wa)}" target="_blank" rel="noopener">${I.wa}Ask ${esc(p.advisor)}</a>
        <a class="tlink" href="${link(p)}" target="_blank" rel="noopener">Open on Instagram</a>
      </div>
    </article>`;
  grid.innerHTML = shown.map(card).join("");

  /* Load Instagram's embed script once, then turn each placeholder into the real post when it scrolls near view */
  let loading = null;
  const loadScript = () => loading || (loading = new Promise((res, rej) => {
    if (window.instgrm) return res();
    const s = document.createElement("script"); s.async = true; s.src = "https://www.instagram.com/embed.js";
    s.onload = res; s.onerror = rej; document.body.appendChild(s);
  }));
  const embed = box => {
    if (box.dataset.done) return; box.dataset.done = 1;
    box.insertAdjacentHTML("beforeend", `<blockquote class="instagram-media" data-instgrm-permalink="${box.dataset.url}?utm_source=ig_embed" data-instgrm-version="14" style="background:#fff;border:0;margin:0;padding:0;width:100%;min-width:0;max-width:100%"></blockquote>`);
    loadScript().then(() => { window.instgrm && window.instgrm.Embeds.process(); box.classList.add("live"); })
      .catch(() => { const s = box.querySelector(".igc-ph span"); if (s) s.textContent = "Tap to open on Instagram"; box.querySelector("blockquote")?.remove(); });
  };
  const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { embed(e.target); io.unobserve(e.target); } }), { rootMargin: "400px" }) : null;
  grid.querySelectorAll(".igc-media").forEach(b => (io ? io.observe(b) : embed(b)));

  if (chips) {
    chips.addEventListener("click", e => {
      const b = e.target.closest(".chip"); if (!b) return;
      chips.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", c === b));
      const f = b.dataset.f;
      grid.querySelectorAll(".igc").forEach(c => { c.hidden = !(f === "all" || c.dataset.tags.split(" ").includes(f)); });
      window.ScrollTrigger && ScrollTrigger.refresh();
    });
  }

  if (PG.hasG) {
    gsap.set(grid.querySelectorAll(".rv"), { opacity: 0, y: 28 });
    ScrollTrigger.batch(grid.querySelectorAll(".rv"), { start: "top 90%", once: true, onEnter: els => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" }) });
  }
})();
