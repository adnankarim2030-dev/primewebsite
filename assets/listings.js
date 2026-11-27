/* Prime Group — property data and card/detail rendering.
   Data taken from the live All Listings page. Add or edit properties here.
   IMG_BASE: folder where the property photos live on the live site (change if they sit in e.g. "images/"). */
(function () {
  const IMG_BASE = "";
  const P = [
    { id: 1, title: "Crescent Bay Sea-View Suite", type: "Apartment", cr: 12.15, beds: "3", baths: "4", area: "2,850 Sq. Ft.", loc: "DHA Phase 8, Karachi", hood: "DHA", img: "karachi_clifton_apt.jpg" },
    { id: 2, title: "DHA Phase 8 Corner Bungalow", type: "House", cr: 14.5, beds: "5", baths: "6", area: "500 Sq. Yd.", loc: "DHA Phase 8, Zone B, Karachi", hood: "DHA", img: "karachi_dha_villa.jpg" },
    { id: 3, title: "Bahria Precinct 10-A Villa", type: "Villa", cr: 3.9, beds: "4", baths: "4", area: "250 Sq. Yd.", loc: "Bahria Town, Karachi", hood: "Bahria Town", img: "karachi_bahria_villa.jpg" },
    { id: 4, title: "PECHS Block 6 Sky Residence", type: "Apartment", cr: 3.25, beds: "3", baths: "3", area: "1,850 Sq. Ft.", loc: "PECHS Block 6, Karachi", hood: "PECHS", img: "karachi_pechs_tower.jpg" },
    { id: 5, title: "Khayaban-e-Ittehad Mansion", type: "Bungalow", cr: 32, beds: "6", baths: "7", area: "1,000 Sq. Yd.", loc: "DHA Phase 6, Karachi", hood: "DHA", img: "karachi_dha6_mansion.jpg" },
    { id: 6, title: "Clifton Marine Corporate Floor", type: "Commercial", cr: 28, beds: "Grade-A", baths: "4", area: "3,200 Sq. Ft.", loc: "Clifton Block 4, Karachi", hood: "Clifton", img: "karachi_corporate_tower.jpg" },
    { id: 7, title: "Clifton Sea-View Penthouse", type: "Penthouse", cr: 18.75, beds: "4", baths: "5", area: "4,200 Sq. Ft.", loc: "Clifton Block 2, Karachi", hood: "Clifton", img: "karachi_clifton_penthouse.jpg" },
    { id: 8, title: "DHA Phase 7 Designer Villa", type: "Bungalow", cr: 11.2, beds: "5", baths: "5", area: "500 Sq. Yd.", loc: "DHA Phase 7, Karachi", hood: "DHA", img: "karachi_turnkey_bungalow.jpg" },
    { id: 9, title: "DHA Phase 5 Executive Home", type: "House", cr: 16.5, beds: "5", baths: "6", area: "500 Sq. Yd.", loc: "DHA Phase 5, Karachi", hood: "DHA", img: "karachi_dha_villa.jpg" },
    { id: 10, title: "Bahadurabad Luxury Flat", type: "Apartment", cr: 4.1, beds: "4", baths: "4", area: "2,400 Sq. Ft.", loc: "Bahadurabad, Karachi", hood: "Bahadurabad", img: "karachi_pechs_tower.jpg" },
    { id: 11, title: "North Nazimabad Block H Home", type: "House", cr: 7.8, beds: "5", baths: "5", area: "400 Sq. Yd.", loc: "North Nazimabad, Karachi", hood: "North Nazimabad", img: "karachi_bahria_villa.jpg" },
    { id: 12, title: "Shahrah-e-Faisal Corporate Hub", type: "Commercial", cr: 19.5, beds: "Full Floor", baths: "4", area: "4,800 Sq. Ft.", loc: "Shahrah-e-Faisal, Karachi", hood: "Shahrah-e-Faisal", img: "karachi_corporate_tower.jpg" },
    { id: 13, title: "KDA Scheme 1 Courtyard Villa", type: "Bungalow", cr: 24, beds: "6", baths: "6", area: "600 Sq. Yd.", loc: "KDA Scheme 1, Karachi", hood: "KDA Scheme 1", img: "karachi_dha6_mansion.jpg" },
    { id: 14, title: "Gulshan Block 7 Modern Flat", type: "Apartment", cr: 2.65, beds: "3", baths: "3", area: "1,650 Sq. Ft.", loc: "Gulshan-e-Iqbal, Karachi", hood: "Gulshan-e-Iqbal", img: "karachi_clifton_apt.jpg" },
    { id: 15, title: "DHA Phase 8 Prime Plot", type: "Plot", cr: 8.75, beds: "", baths: "", area: "500 Sq. Yd.", loc: "Avenue 4, 60 ft Road, DHA Phase 8, Karachi", hood: "DHA", img: "karachi_construction_site.jpg" },
    { id: 16, title: "Bukhari Commercial Modern Workspace", type: "Commercial", cr: 16.5, beds: "Office / Showroom", baths: "2", area: "2,400 Sq. Ft.", loc: "Khayaban-e-Bukhari, DHA Phase 6, Karachi", hood: "DHA", img: "karachi_corporate_tower.jpg", advisor: "Kashif", advisorPhone: "+92 300 8271187", advisorWa: "923008271187", ig: "https://www.instagram.com/reel/DApzGZzv4SX/", featured: true },
    { id: 17, title: "Al-Murtaza Commercial Prime Space", type: "Commercial", cr: 22, beds: "Customisable Floor", baths: "3", area: "3,000 Sq. Ft.", loc: "Al-Murtaza Commercial, DHA Phase 8, Karachi", hood: "DHA", img: "karachi_highrise_build.jpg", advisor: "Faraz", advisorPhone: "+92 333 2119066", advisorWa: "923332119066", ig: "https://www.instagram.com/reel/DAQAkTMvQjX/", featured: true },
    { id: 18, title: "Sahil Commercial Investment Plot", type: "Plot", cr: 13.75, beds: "", baths: "", area: "200 Sq. Yd.", loc: "Sahil Commercial, DHA Phase 8, Karachi", hood: "DHA", img: "karachi_construction_site.jpg", advisor: "Nadeem Anjum", advisorPhone: "+92 333 2127800", advisorWa: "923332127800", ig: "https://www.instagram.com/p/C_sj-5oI-Eu/", plotKind: "Commercial plot", featured: true }
  ];
  const CAT = t => ({ House: "houses", Bungalow: "houses", Villa: "houses", Apartment: "apartments", Penthouse: "apartments", Commercial: "commercial", Plot: "plots" }[t]);
  P.forEach(p => { p.cat = CAT(p.type); p.purpose = "sale"; p.pkr = Math.round(p.cr * 1e7); });

  const fmt = p => `PKR ${p.cr.toFixed(2)} Crore`;
  const ILL = {
    houses: '<svg viewBox="0 0 200 140"><path class="bp" d="M10 130h180M30 130V70h110v60M22 70h126v-8H22zM60 62V30h70v32M54 30h82v-6H54z"/><rect class="bp-win" x="72" y="38" width="46" height="18"/><path class="bp" d="M72 38h46v18H72z"/><rect class="bp-win" x="42" y="82" width="54" height="48"/><path class="bp" d="M42 82h54v48H42zM69 82v48"/><rect class="bp-win" x="108" y="94" width="22" height="36"/><path class="bp" d="M108 94h22v36h-22zM160 130v-26M152 108a9 9 0 1 1 16 0 10 10 0 1 1-16 0"/></svg>',
    apartments: '<svg viewBox="0 0 200 140"><path class="bp" d="M10 130h180M60 130V14h80v116M54 14h92"/><path class="bp thin" d="M60 34h80M60 54h80M60 74h80M60 94h80M60 114h80M87 14v116M113 14v116"/><rect class="bp-win" x="88" y="35" width="24" height="18"/><rect class="bp-win" x="61" y="75" width="25" height="18"/><rect class="bp-win" x="114" y="95" width="25" height="18"/><path class="bp" d="M150 130V80h30v50"/></svg>',
    commercial: '<svg viewBox="0 0 200 140"><path class="bp" d="M10 130h180M50 130V8h60v122M110 130V40h44v90"/><path class="bp thin" d="M50 24h60M50 40h60M50 56h60M50 72h60M50 88h60M50 104h60M70 8v122M90 8v122M110 56h44M110 72h44M110 88h44M110 104h44M132 40v90"/><rect class="bp-win" x="71" y="57" width="18" height="14"/><rect class="bp-win" x="51" y="89" width="18" height="14"/></svg>',
    plots: '<svg viewBox="0 0 200 140"><path class="bp" d="M30 110l40-70h110l-40 70z" stroke-dasharray="5 5"/><path class="bp thin" d="M10 124h180M30 116v16M140 116v16"/><text class="anno" x="85" y="138" text-anchor="middle">500 Sq. Yd.</text><path class="bp" d="M104 60v-28l14 7-14 7"/></svg>'
  };
  const I = window.PG ? PG.ic : {};
  const defs = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="pgGlow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7E6C1"/><stop offset="1" stop-color="#E2BC7A"/></linearGradient></defs></svg>';
  if (!document.getElementById("pgGlow")) document.body.insertAdjacentHTML("afterbegin", defs);

  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const photo = p => `<div class="ph"><img src="${esc(IMG_BASE + p.img)}" alt="${esc(p.title)}" loading="lazy" onerror="this.parentElement.classList.add('noimg')"><div class="ill">${ILL[p.cat]}</div><span class="badge">${p.purpose === "rent" ? "For rent" : "For sale"} · ${esc(p.type)}</span></div>`;
  const specs = p => `<div class="specs">${p.cat === "plots" ? "" : `<span>${I.bed}${esc(p.beds)}${/^\d/.test(p.beds) ? " beds" : ""}</span><span>${I.bath}${esc(p.baths)} baths</span>`}<span>${I.area}${esc(p.area)}</span></div>`;
  const card = p => `<button class="pc rv" type="button" data-id="${p.id}" aria-label="View details: ${esc(p.title)}">${photo(p)}<div class="bd"><div class="price">${fmt(p)}</div><h3>${esc(p.title)}</h3><div class="loc">${I.pin}${esc(p.loc)}</div>${specs(p)}</div></button>`;

  function render(el, list) {
    el.innerHTML = list.length ? list.map(card).join("") :
      `<div class="empty"><h3>No properties match these filters</h3><p class="muted">Widen the budget or choose another area. You can also send us your requirement and we will look for you.</p><a class="btn btn-p btn-sm" href="find-property.html#brief">Send my requirement</a></div>`;
    if (window.gsap && window.PG && PG.hasG) gsap.fromTo(el.querySelectorAll(".pc"),
      { opacity: 0, y: 40, rotationX: 10, scale: 0.96, transformPerspective: 1000 },
      { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 0.8, stagger: 0.06, ease: "power3.out", clearProps: "transform" });
    else el.querySelectorAll(".pc").forEach(c => { c.style.opacity = 1; c.style.transform = "none"; });
  }

  /* Detail modal */
  let modal;
  function open(id, opener) {
    const p = P.find(x => x.id === +id); if (!p) return;
    if (!modal) { modal = document.createElement("div"); modal.className = "modal"; modal.setAttribute("role", "dialog"); modal.setAttribute("aria-modal", "true"); document.body.appendChild(modal); }
    const msg = `Hello Prime Group${p.advisor ? " (" + p.advisor + ")" : ""}, I'm interested in "${p.title}" (${fmt(p)}, ${p.loc}). Please share details.`;
    const waHref = PG.wa(msg, p.advisorWa || PG.CONTACT.whatsapp);
    const telHref = "tel:" + (p.advisorPhone ? p.advisorPhone.replace(/\s+/g, "") : PG.CONTACT.phoneTel);
    modal.innerHTML = `<div class="scrim" data-close></div><div class="box">
      <button class="x" data-close aria-label="Close">×</button>
      ${photo(p)}
      <div class="info">
        <p class="kicker">${esc(p.type)} for ${p.purpose}${p.ig ? " · Instagram Featured" : ""}</p>
        <h3 style="font-size:clamp(22px,2.2vw,30px)">${esc(p.title)}</h3>
        <div class="price" style="font-weight:800;font-size:26px;color:var(--navy);margin-top:10px">${fmt(p)}</div>
        <dl class="kv">
          <div><dt>Location</dt><dd>${esc(p.loc)}</dd></div>
          <div><dt>Area</dt><dd>${esc(p.area)}</dd></div>
          ${p.cat === "plots" ? `<div><dt>Category</dt><dd>${esc(p.plotKind || "Residential plot")}</dd></div><div><dt>Status</dt><dd>Title-verified</dd></div>` : `<div><dt>${/^\d/.test(p.beds) ? "Bedrooms" : "Layout"}</dt><dd>${esc(p.beds)}</dd></div><div><dt>Bathrooms</dt><dd>${esc(p.baths)}</dd></div>`}
          ${p.advisor ? `<div><dt>Direct Advisor</dt><dd>${esc(p.advisor)}</dd></div><div><dt>Advisor Contact</dt><dd><a href="${telHref}">${esc(p.advisorPhone)}</a></dd></div>` : ""}
        </dl>
        <p class="muted" style="font-size:15px">Every Prime Group listing is title-checked before it goes live. Ask us for photos, a video walkthrough or a site visit.</p>
        <div class="ctas" style="margin-top:18px">
          <a class="btn btn-wa" href="${waHref}" target="_blank" rel="noopener">${I.wa}${p.advisor ? "WhatsApp " + esc(p.advisor) : "Ask on WhatsApp"}</a>
          <a class="btn btn-o" href="${telHref}">${I.call}${p.advisor ? "Call " + esc(p.advisor) : "Call"}</a>
        </div>
        ${p.ig ? `<p style="margin:18px 0 0"><a class="tlink" href="${esc(p.ig)}" target="_blank" rel="noopener">View on Instagram ${I.arr}</a></p>` : ""}
      </div></div>`;
    modal.classList.add("open"); document.body.style.overflow = "hidden";
    PG.lenis && PG.lenis.stop();
    const close = () => { modal.classList.remove("open"); document.body.style.overflow = ""; PG.lenis && PG.lenis.start(); opener && opener.focus(); };
    modal.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", close));
    modal.onkeydown = e => { if (e.key === "Escape") close(); };
    modal.querySelector(".x").focus();
  }
  document.addEventListener("click", e => { const c = e.target.closest(".pc[data-id]"); if (c) open(c.dataset.id, c); });

  window.PGL = { data: P, render, open, fmt, ILL };
})();
