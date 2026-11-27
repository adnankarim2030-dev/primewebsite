// Prime Group — Shared Visitor Tracking, Gmail Auth, Listing & Email Dispatch Engine
(function() {
  const KEYS = {
    VISITORS: 'pg_visitors',
    CUSTOMERS: 'pg_customers',
    LISTINGS: 'pg_listings',
    EMAILS: 'pg_emails',
    CURRENT_USER: 'pg_current_gmail_user'
  };

  // 12 Pre-populated Customer & Featured Listings (Images + Video Clips + Full Sale Details)
  const DEFAULT_LISTINGS = [
    {
      id: 'PG-104821',
      purpose: 'Sell',
      category: 'Home',
      subtype: 'Flat',
      city: 'Karachi',
      location: 'Emaar Crescent Bay, DHA Phase 8',
      area: '2850',
      areaUnit: 'Sq. Ft.',
      price: '12.15 Crore',
      beds: '3',
      baths: '4',
      title: 'Emaar Tower Sea-Facing Luxury Apartment',
      description: '8th Floor full sea-view apartment with private balcony, modern kitchen, and 24/7 security.',
      images: ['karachi_clifton_apt.jpg', 'karachi_pechs_tower.jpg', 'karachi_corporate_tower.jpg'],
      videoClip: 'building%20animation.mp4',
      customerName: 'Kamran Siddiqui',
      customerEmail: 'kamran.siddiqui@gmail.com',
      mobile: '+92 300 8241901',
      status: 'Confirmed & Live',
      isDefault: true
    },
    {
      id: 'PG-104822',
      purpose: 'Sell',
      category: 'Home',
      subtype: 'House',
      city: 'Karachi',
      location: 'DHA Phase 8, Zone B',
      area: '500',
      areaUnit: 'Sq. Yd.',
      price: '14.50 Crore',
      beds: '5',
      baths: '6',
      title: 'Modern Designer Corner Villa',
      description: 'Brand new 500 Sq. Yd. corner bungalow with swimming pool, basement theater, and solar backup.',
      images: ['karachi_dha_villa.jpg', 'karachi_dha6_mansion.jpg', 'karachi_bahria_villa.jpg'],
      videoClip: 'website%20header%20animation.mp4',
      customerName: 'Tariq Mahmood',
      customerEmail: 'tariq.mahmood@gmail.com',
      mobile: '+92 321 2198432',
      status: 'Confirmed & Live',
      isDefault: true
    },
    {
      id: 'PG-104823',
      purpose: 'Sell',
      category: 'Home',
      subtype: 'House',
      city: 'Karachi',
      location: 'Bahria Town Precinct 10-A',
      area: '250',
      areaUnit: 'Sq. Yd.',
      price: '3.90 Crore',
      beds: '4',
      baths: '4',
      title: 'Smart Town Contemporary Villa',
      description: 'Ready for possession smart villa with automated lighting, wide street, and park facing.',
      images: ['karachi_bahria_villa.jpg', 'karachi_dha_villa.jpg', 'karachi_dha6_mansion.jpg'],
      videoClip: '3d%20animated%20building.mp4',
      customerName: 'Sanaullah Khan',
      customerEmail: 'sanaullah.k@gmail.com',
      mobile: '+92 333 3412098',
      status: 'Confirmed & Live',
      isDefault: true
    },
    {
      id: 'PG-104824',
      purpose: 'Rent',
      category: 'Home',
      subtype: 'Flat',
      city: 'Karachi',
      location: 'Clifton Block 2',
      area: '2100',
      areaUnit: 'Sq. Ft.',
      price: '2.40 Lac / mo',
      beds: '3',
      baths: '3',
      title: 'Clifton Sea-View Luxury Suite',
      description: 'Fully furnished 3-bed apartment near Sea View with dedicated parking and standby generator.',
      images: ['karachi_clifton_apt.jpg', 'karachi_pechs_tower.jpg'],
      videoClip: '',
      customerName: 'Ayesha Farooq',
      customerEmail: 'ayesha.farooq@gmail.com',
      mobile: '+92 345 2019384',
      status: 'Confirmed & Live',
      isDefault: true
    },
    {
      id: 'PG-104825',
      purpose: 'Sell',
      category: 'Home',
      subtype: 'House',
      city: 'Karachi',
      location: 'DHA Phase 6, Khayaban-e-Ittehad',
      area: '1000',
      areaUnit: 'Sq. Yd.',
      price: '32.00 Crore',
      beds: '6',
      baths: '7',
      title: 'Khayaban-e-Ittehad Courtyard Mansion',
      description: '1000 Sq. Yd. lush green courtyard bungalow with Italian marble flooring and servant quarters.',
      images: ['karachi_dha6_mansion.jpg'],
      videoClip: 'building%20animation.mp4',
      customerName: 'Zainab Raza',
      customerEmail: 'zainab.raza@gmail.com',
      mobile: '+92 301 8291045',
      status: 'Confirmed & Live',
      isDefault: true
    },
    {
      id: 'PG-104826',
      purpose: 'Sell',
      category: 'Home',
      subtype: 'Flat',
      city: 'Karachi',
      location: 'PECHS Block 6',
      area: '1850',
      areaUnit: 'Sq. Ft.',
      price: '3.25 Crore',
      beds: '3',
      baths: '3',
      title: 'PECHS Sky Residences 3-Bed Flat',
      description: 'West-open corner apartment on main Shahrah-e-Faisal corridor with rooftop lounge.',
      images: ['karachi_pechs_tower.jpg'],
      videoClip: '',
      customerName: 'Bilal Ahmed',
      customerEmail: 'bilal.ahmed@gmail.com',
      mobile: '+92 312 2938471',
      status: 'Confirmed & Live',
      isDefault: true
    },
    {
      id: 'PG-104827',
      purpose: 'Sell',
      category: 'Home',
      subtype: 'House',
      city: 'Karachi',
      location: 'North Nazimabad Block H',
      area: '400',
      areaUnit: 'Sq. Yd.',
      price: '7.80 Crore',
      beds: '5',
      baths: '5',
      title: 'North Nazimabad Classic Family Home',
      description: 'Double-unit 400 Sq. Yd. house near main boulevard, ideal for joint families.',
      images: ['karachi_dha_villa.jpg'],
      videoClip: '',
      customerName: 'Farhan Qureshi',
      customerEmail: 'farhan.q@gmail.com',
      mobile: '+92 334 9012384',
      status: 'Confirmed & Live',
      isDefault: true
    },
    {
      id: 'PG-104828',
      purpose: 'Sell',
      category: 'Home',
      subtype: 'House',
      city: 'Karachi',
      location: 'DHA Phase 7 Ext',
      area: '300',
      areaUnit: 'Sq. Yd.',
      price: '6.50 Crore',
      beds: '4',
      baths: '5',
      title: 'Smart Automated Eco Residence',
      description: 'Solar-ready smart home with CCTV automation, modular kitchen, and landscaped terrace.',
      images: ['smart_house.png'],
      videoClip: '3d%20animated%20building.mp4',
      customerName: 'Hassan Javed',
      customerEmail: 'hassan.javed@gmail.com',
      mobile: '+92 300 9128374',
      status: 'Confirmed & Live',
      isDefault: true
    },
    {
      id: 'PG-104829',
      purpose: 'Rent',
      category: 'Commercial',
      subtype: 'Office',
      city: 'Karachi',
      location: 'Clifton Block 4, Marine Drive',
      area: '3200',
      areaUnit: 'Sq. Ft.',
      price: '5.50 Lac / mo',
      beds: '',
      baths: '3',
      title: 'Clifton Marine Executive Corporate Floor',
      description: 'Grade-A corporate office space with high-speed elevators, central HVAC, and valet parking.',
      images: ['karachi_corporate_tower.jpg'],
      videoClip: 'website%20header%20animation.mp4',
      customerName: 'Noman Enterprises',
      customerEmail: 'noman.corp@gmail.com',
      mobile: '+92 322 8192034',
      status: 'Confirmed & Live',
      isDefault: true
    },
    {
      id: 'PG-104830',
      purpose: 'Sell',
      category: 'Commercial',
      subtype: 'Building',
      city: 'Karachi',
      location: 'I.I. Chundrigar Road',
      area: '6500',
      areaUnit: 'Sq. Ft.',
      price: '28.00 Crore',
      beds: '',
      baths: '6',
      title: 'Prime Landmark Commercial Plaza',
      description: 'High-yield commercial building with ground + 4 floors, ideal for banks & corporate HQs.',
      images: ['dev_landmark.png'],
      videoClip: '',
      customerName: 'Imran Merchant',
      customerEmail: 'imran.m@gmail.com',
      mobile: '+92 302 7182930',
      status: 'Confirmed & Live',
      isDefault: true
    },
    {
      id: 'PG-104831',
      purpose: 'Sell',
      category: 'Plots',
      subtype: 'Residential Plot',
      city: 'Karachi',
      location: 'DHA Phase 8, Avenue 4',
      area: '500',
      areaUnit: 'Sq. Yd.',
      price: '8.75 Crore',
      beds: '',
      baths: '',
      title: '500 Sq. Yd. Prime Residential Plot',
      description: 'Levelled, possession-ready residential plot on 60ft wide street with clear documentation.',
      images: ['brokerage_villa.png'],
      videoClip: '',
      customerName: 'Adnan Karim',
      customerEmail: 'adnan.karim@gmail.com',
      mobile: '+92 331 8291022',
      status: 'Confirmed & Live',
      isDefault: true
    },
    {
      id: 'PG-104832',
      purpose: 'Sell',
      category: 'Plots',
      subtype: 'Commercial Plot',
      city: 'Karachi',
      location: 'Scheme 33, Main Super Highway',
      area: '400',
      areaUnit: 'Sq. Yd.',
      price: '5.40 Crore',
      beds: '',
      baths: '',
      title: 'Main Boulevard Commercial Plot',
      description: 'Ideal for showroom, medical center, or mixed-use tower with high footfall.',
      images: ['karachi_construction_site.jpg'],
      videoClip: '',
      customerName: 'Saad Builders',
      customerEmail: 'saad.builders@gmail.com',
      mobile: '+92 345 9182736',
      status: 'Confirmed & Live',
      isDefault: true
    },
    {
      id: 'PG-104833',
      purpose: 'Sell',
      category: 'Home',
      subtype: 'Penthouse',
      city: 'Karachi',
      location: 'Clifton Block 2, Sea View',
      area: '4200',
      areaUnit: 'Sq. Ft.',
      price: '18.75 Crore',
      beds: '4',
      baths: '5',
      title: 'Clifton Sea-View Penthouse',
      description: 'Ultra-luxury rooftop terrace penthouse overlooking the Arabian Sea.',
      images: ['karachi_clifton_penthouse.jpg', 'karachi_clifton_apt.jpg'],
      videoClip: '',
      customerName: 'Usman Tariq',
      customerEmail: 'usman.tariq@gmail.com',
      mobile: '+92 300 5541290',
      status: 'Confirmed & Live',
      isDefault: true
    },
    {
      id: 'PG-104834',
      purpose: 'Sell',
      category: 'Home',
      subtype: 'House',
      city: 'Karachi',
      location: 'DHA Phase 5, Khayaban-e-Muhafiz',
      area: '500',
      areaUnit: 'Sq. Yd.',
      price: '16.50 Crore',
      beds: '5',
      baths: '6',
      title: 'DHA Phase 5 Executive Bungalow',
      description: 'Turnkey designer bungalow with travertine elevation and basement lounge.',
      images: ['karachi_turnkey_bungalow.jpg', 'karachi_dha_villa.jpg'],
      videoClip: '',
      customerName: 'Salman Zubairi',
      customerEmail: 'salman.z@gmail.com',
      mobile: '+92 321 8201144',
      status: 'Confirmed & Live',
      isDefault: true
    },
    {
      id: 'PG-104835',
      purpose: 'Sell',
      category: 'Home',
      subtype: 'Flat',
      city: 'Karachi',
      location: 'Bahadurabad, Alamgir Road',
      area: '2400',
      areaUnit: 'Sq. Ft.',
      price: '4.10 Crore',
      beds: '4',
      baths: '4',
      title: 'Bahadurabad Luxury 4-Bed Flat',
      description: 'Corner west-open luxury apartment with standby generator and lift.',
      images: ['karachi_pechs_tower.jpg'],
      videoClip: '',
      customerName: 'Hamza Memon',
      customerEmail: 'hamza.memon@gmail.com',
      mobile: '+92 333 2190876',
      status: 'Confirmed & Live',
      isDefault: true
    },
    {
      id: 'PG-104836',
      purpose: 'Sell',
      category: 'Home',
      subtype: 'House',
      city: 'Karachi',
      location: 'KDA Scheme 1, Main Stadium Rd',
      area: '600',
      areaUnit: 'Sq. Yd.',
      price: '24.00 Crore',
      beds: '6',
      baths: '6',
      title: 'KDA Scheme 1 Courtyard Villa',
      description: 'Gated luxury residence with landscaped lawn and modern kitchen.',
      images: ['karachi_dha6_mansion.jpg'],
      videoClip: '',
      customerName: 'Faisal Lakhani',
      customerEmail: 'faisal.l@gmail.com',
      mobile: '+92 300 9241880',
      status: 'Confirmed & Live',
      isDefault: true
    },
    {
      id: 'PG-104837',
      purpose: 'Rent',
      category: 'Commercial',
      subtype: 'Office',
      city: 'Karachi',
      location: 'Shahrah-e-Faisal, Nursery',
      area: '4800',
      areaUnit: 'Sq. Ft.',
      price: '8.50 Lac / mo',
      beds: '',
      baths: '4',
      title: 'Shahrah-e-Faisal Corporate Hub',
      description: 'Full-floor corporate headquarters with glass facade and parking.',
      images: ['karachi_highrise_build.jpg', 'karachi_corporate_tower.jpg'],
      videoClip: '',
      customerName: 'Raza Holdings',
      customerEmail: 'raza.holdings@gmail.com',
      mobile: '+92 322 4401928',
      status: 'Confirmed & Live',
      isDefault: true
    },
    {
      id: 'PG-104838',
      purpose: 'Sell',
      category: 'Home',
      subtype: 'Flat',
      city: 'Karachi',
      location: 'Gulshan-e-Iqbal Block 7',
      area: '1650',
      areaUnit: 'Sq. Ft.',
      price: '2.65 Crore',
      beds: '3',
      baths: '3',
      title: 'Gulshan Block 7 Modern Flat',
      description: 'Brand new 3-bed family apartment near University Road.',
      images: ['karachi_bahria_villa.jpg'],
      videoClip: '',
      customerName: 'Omer Siddiqui',
      customerEmail: 'omer.s@gmail.com',
      mobile: '+92 334 7812093',
      status: 'Confirmed & Live',
      isDefault: true
    }
  ];

  // Runtime memory cache for large uploaded video object URLs in current session
  const sessionVideoCache = {};

  function readStore(key, fallback = []) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeStore(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  }

  // 1. Track Visitor automatically on every page load
  function trackVisitor() {
    const visitors = readStore(KEYS.VISITORS, []);
    const page = window.location.pathname.split('/').pop() || 'index.html';
    const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
    const now = new Date().toISOString();

    let sessionId = sessionStorage.getItem('pg_session_id');
    if (!sessionId) {
      sessionId = 'VIS-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      sessionStorage.setItem('pg_session_id', sessionId);
      visitors.unshift({
        id: sessionId,
        device: isMobile ? 'Mobile' : 'Desktop',
        firstPage: page,
        lastPage: page,
        pageViews: 1,
        firstVisit: now,
        lastVisit: now
      });
    } else {
      const existing = visitors.find(v => v.id === sessionId);
      if (existing) {
        existing.lastPage = page;
        existing.pageViews = (existing.pageViews || 1) + 1;
        existing.lastVisit = now;
      }
    }
    writeStore(KEYS.VISITORS, visitors.slice(0, 100));
  }

  // 2. Register / Login Gmail Customer
  function loginGmailCustomer(email, name, phone) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const customers = readStore(KEYS.CUSTOMERS, []);
    const now = new Date().toISOString();

    let cust = customers.find(c => c.email === cleanEmail);
    if (!cust) {
      cust = {
        id: 'CUST-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
        email: cleanEmail,
        name: name || cleanEmail.split('@')[0],
        phone: phone || '',
        verifiedAt: now,
        listingsCount: 0
      };
      customers.unshift(cust);
    } else {
      if (name) cust.name = name;
      if (phone) cust.phone = phone;
      cust.lastLogin = now;
    }

    writeStore(KEYS.CUSTOMERS, customers);
    writeStore(KEYS.CURRENT_USER, cust);
    return cust;
  }

  // 3. Save Listing + Dispatch Dual Emails (Customer + Prime Group)
  async function submitListingWithConfirmation(listingData, customer) {
    const listings = readStore(KEYS.LISTINGS, []);
    const emails = readStore(KEYS.EMAILS, []);
    const now = new Date().toISOString();
    const refId = 'PG-' + Math.floor(100000 + Math.random() * 900000);

    // Keep uploaded video blob URL in session cache if too big for localStorage
    const sessionVideoUrl = listingData.videoObjectUrl || '';
    if (sessionVideoUrl) {
      sessionVideoCache[refId] = sessionVideoUrl;
    }

    const recordToSave = {
      id: refId,
      ...listingData,
      videoObjectUrl: undefined,
      videoClip: listingData.videoDataUrl || (sessionVideoUrl ? '__SESSION_VIDEO__' : ''),
      customerEmail: customer.email,
      customerName: customer.name,
      status: 'Confirmed & Live',
      customerEmailSent: true,
      primeEmailSent: true,
      createdAt: now
    };

    listings.unshift(recordToSave);
    writeStore(KEYS.LISTINGS, listings);

    const customers = readStore(KEYS.CUSTOMERS, []);
    const cust = customers.find(c => c.email === customer.email);
    if (cust) {
      cust.listingsCount = (cust.listingsCount || 0) + 1;
      writeStore(KEYS.CUSTOMERS, customers);
    }

    emails.unshift({
      id: 'EM-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
      to: customer.email,
      recipientType: 'Customer / Client',
      subject: `[Prime Group] Property Listing Confirmed — ${recordToSave.title} (${refId})`,
      body: `Dear ${customer.name},\n\nYour property "${recordToSave.title}" (${recordToSave.purpose} • ${recordToSave.subtype}, ${recordToSave.area} ${recordToSave.areaUnit} in ${recordToSave.location}, ${recordToSave.city} for PKR ${recordToSave.price}) is verified and live.\n\nReference ID: ${refId}`,
      sentAt: now,
      status: 'Delivered'
    });

    emails.unshift({
      id: 'EM-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
      to: 'primeestateenterprises@gmail.com',
      recipientType: 'Prime Group Admin',
      subject: `[New Property Lead] ${recordToSave.purpose}: ${recordToSave.title} (${refId})`,
      body: `New verified property submitted by ${customer.name} (${customer.email}, ${recordToSave.mobile}):\n\nTitle: ${recordToSave.title}\nType: ${recordToSave.category} / ${recordToSave.subtype}\nLocation: ${recordToSave.location}, ${recordToSave.city}\nArea: ${recordToSave.area} ${recordToSave.areaUnit}\nPrice: PKR ${recordToSave.price}\nReference: ${refId}`,
      sentAt: now,
      status: 'Delivered'
    });
    writeStore(KEYS.EMAILS, emails.slice(0, 100));

    try {
      fetch('https://formsubmit.co/ajax/primeestateenterprises@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `New Prime Group Listing: ${recordToSave.title} (${refId})`,
          _cc: customer.email,
          Reference_ID: refId,
          Customer_Gmail: customer.email,
          Mobile: recordToSave.mobile,
          Purpose: recordToSave.purpose,
          Property_Type: `${recordToSave.category} - ${recordToSave.subtype}`,
          Location: `${recordToSave.location}, ${recordToSave.city}`,
          Area: `${recordToSave.area} ${recordToSave.areaUnit}`,
          Price_PKR: recordToSave.price,
          Title: recordToSave.title,
          Description: recordToSave.description
        })
      }).catch(() => {});
    } catch (e) {}

    return recordToSave;
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, s => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[s]));
  }

  let activeListingFilter = 'All';
  let activeSearchQuery = '';

  // 4. Render All Confirmed Customer + Default 12 Listings in #listing
  function renderConfirmedListings(filterChip, searchQuery) {
    if (typeof filterChip === 'string') activeListingFilter = filterChip;
    if (typeof searchQuery === 'string') activeSearchQuery = searchQuery.trim().toLowerCase();
    const grid = document.querySelector('#listing .listing-grid');
    if (!grid) return;

    const userListings = readStore(KEYS.LISTINGS, []).filter(l => l.status === 'Confirmed & Live');
    const allListings = [...userListings, ...DEFAULT_LISTINGS];

    const filtered = allListings.filter(item => {
      let chipOk = true;
      if (activeListingFilter === 'For Sale') chipOk = item.purpose === 'Sell';
      else if (activeListingFilter === 'For Rent') chipOk = item.purpose === 'Rent';
      else if (activeListingFilter === 'Houses') chipOk = item.category === 'Home' && item.subtype !== 'Flat';
      else if (activeListingFilter === 'Apartments') chipOk = item.subtype === 'Flat';
      else if (activeListingFilter === 'Plots') chipOk = item.category === 'Plots';
      else if (activeListingFilter === 'Commercial') chipOk = item.category === 'Commercial';

      if (!chipOk) return false;
      if (!activeSearchQuery) return true;

      const haystack = `${item.title} ${item.location} ${item.city} ${item.subtype} ${item.price} ${item.customerName}`.toLowerCase();
      return haystack.includes(activeSearchQuery);
    });

    const countBadge = document.getElementById('inventoryCountBadge');
    if (countBadge) {
      countBadge.textContent = `Showing ${filtered.length} ${filtered.length === 1 ? 'Property' : 'Properties'}`;
    }

    // Inject carousel & dark-card + list-view CSS once
    if (!document.getElementById('pgCarouselStyles')) {
      const style = document.createElement('style');
      style.id = 'pgCarouselStyles';
      style.textContent = `
        /* 6-Column Compact Desktop & 2-Column Compact Mobile Grid */
        #listing .listing-grid:not(.list-view) {
          display: grid !important;
          grid-template-columns: repeat(6, 1fr) !important;
          gap: 14px !important;
        }
        @media (max-width: 1359px) {
          #listing .listing-grid:not(.list-view) {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 1023px) {
          #listing .listing-grid:not(.list-view) {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 14px !important;
          }
        }
        @media (max-width: 640px) {
          #listing .listing-grid:not(.list-view) {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
        }

        .pg-carousel { position: relative; height: 155px; overflow: hidden; background: #0E1A2B; }
        .pg-carousel-track { display: flex; height: 100%; width: 100%; transition: transform 0.65s cubic-bezier(.22,1,.36,1); }
        .pg-carousel-slide { flex: 0 0 100%; width: 100%; height: 100%; position: relative; }
        .pg-carousel-slide img, .pg-carousel-slide video { width: 100%; height: 100%; object-fit: cover; display: block; }
        .pg-carousel::after { content: ""; position: absolute; inset: 0; background: linear-gradient(0deg, rgba(20,36,60,0.72) 0%, transparent 55%); pointer-events: none; z-index: 1; }
        .pg-c-nav { position: absolute; top: 50%; transform: translateY(-50%); z-index: 3; width: 24px; height: 24px; border-radius: 50%; border: none; background: rgba(20,36,60,0.82); color: #F3F1EA; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.25s ease; }
        .pg-carousel:hover .pg-c-nav { opacity: 1; }
        @media (hover: none), (max-width: 900px) { .pg-c-nav { opacity: 0.85; } }
        .pg-c-prev { left: 6px; }
        .pg-c-next { right: 6px; }
        .pg-c-dots { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); z-index: 3; display: flex; gap: 4px; }
        .pg-c-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(243,241,234,0.45); border: none; padding: 0; cursor: pointer; transition: all 0.25s ease; }
        .pg-c-dot.active { background: #F3F1EA; width: 12px; border-radius: 999px; }
        .pg-c-count { position: absolute; top: 8px; right: 8px; z-index: 3; background: rgba(20,36,60,0.86); color: #F3F1EA; font-size: 10px; font-weight: 700; padding: 3px 7px; border-radius: 999px; border: 1px solid rgba(243,241,234,0.22); }

        /* Dark Blue Compact Card Theme */
        #listing .pcard {
          background: #14243C !important;
          color: #F3F1EA !important;
          border: 1px solid rgba(243,241,234,0.16) !important;
          border-radius: 14px !important;
          display: flex;
          flex-direction: column;
          box-shadow: 0 14px 32px -18px rgba(20,36,60,0.45);
          transition: transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        #listing .pcard:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 44px -18px rgba(20,36,60,0.62);
          border-color: rgba(243,241,234,0.34) !important;
        }
        #listing .pcard-body { padding: 13px 13px 14px; display: flex; flex-direction: column; flex: 1; }
        #listing .pcard-body h4 { font-size: 13.5px; color: #FFFFFF !important; line-height: 1.3; margin-bottom: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        #listing .pcard-body .price { color: #F3F1EA !important; font-size: 14.5px; font-weight: 800; margin: 2px 0 8px; }
        #listing .pcard-body ul { color: #D6D2C7 !important; font-size: 11px !important; gap: 8px !important; margin-bottom: 8px !important; }
        #listing .pcard-body ul li::before { width: 4px !important; height: 4px !important; background: #F3F1EA !important; }
        #listing .pcard-loc { color: #D6D2C7 !important; font-size: 11px !important; margin-bottom: 10px !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        #listing .pcard-seller-box {
          background: rgba(243,241,234,0.08);
          border-radius: 8px;
          padding: 7px 9px;
          font-size: 10.5px;
          color: #F3F1EA;
          margin-bottom: 10px;
          border: 1px solid rgba(243,241,234,0.16);
          line-height: 1.4;
        }
        #listing .pcard-inquire-btn {
          display: inline-flex; align-items: center; gap: 4px;
          background: #F3F1EA; color: #14243C !important;
          padding: 6px 11px; border-radius: 999px;
          font-weight: 700; font-size: 11px;
          transition: background 0.25s ease, transform 0.25s ease;
        }
        #listing .pcard-inquire-btn:hover { background: #FFFFFF; transform: translateX(2px); }
        #listing .pcard-id { font-size: 9.5px; color: #B8B4A8; }
        #listing .pcard .tag { padding: 3px 8px !important; font-size: 9.5px !important; bottom: 8px !important; left: 8px !important; }
        #listing .pcard .pcard-video-btn { padding: 3px 8px !important; font-size: 9.5px !important; bottom: 8px !important; right: 8px !important; }

        @media (max-width: 640px) {
          .pg-carousel { height: 118px; }
          #listing .pcard-body { padding: 10px; }
          #listing .pcard-body h4 { font-size: 12px; }
          #listing .pcard-body .price { font-size: 13px; margin: 2px 0 6px; }
          #listing .pcard-body ul { font-size: 10px !important; gap: 6px !important; margin-bottom: 6px !important; }
          #listing .pcard-loc { font-size: 10px !important; margin-bottom: 8px !important; }
          #listing .pcard-seller-box { padding: 6px 7px; font-size: 9.5px; margin-bottom: 8px; }
          #listing .pcard-inquire-btn { padding: 5px 9px; font-size: 10px; }
          #listing .pcard-id { display: none; }
          #listing .pcard .pcard-video-btn { display: none; }
        }

        /* Horizontal List View Mode */
        #listing .listing-grid.list-view {
          grid-template-columns: 1fr !important;
          gap: 16px !important;
        }
        #listing .listing-grid.list-view .pcard {
          display: grid;
          grid-template-columns: 300px 1fr;
          align-items: stretch;
        }
        #listing .listing-grid.list-view .pg-carousel {
          height: 100%;
          min-height: 200px;
        }
        #listing .listing-grid.list-view .pcard-body { padding: 18px 22px; }
        #listing .listing-grid.list-view .pcard-body h4 { font-size: 17px; }
        #listing .listing-grid.list-view .pcard-body .price { font-size: 18px; }
        @media (max-width: 720px) {
          #listing .listing-grid.list-view .pcard { grid-template-columns: 1fr; }
          #listing .listing-grid.list-view .pg-carousel { min-height: 180px; height: 180px; }
        }
      `;
      document.head.appendChild(style);
    }

    // Clear previous auto-scroll intervals
    if (window._pgCarouselTimers) {
      window._pgCarouselTimers.forEach(t => clearInterval(t));
    }
    window._pgCarouselTimers = [];

    grid.innerHTML = filtered.map((item, cardIdx) => {
      const imgs = (item.images && item.images.length > 0) ? item.images : ['modern_villa.png'];
      const resolvedVideo = item.videoClip === '__SESSION_VIDEO__' ? (sessionVideoCache[item.id] || '') : item.videoClip;
      const hasVideo = Boolean(resolvedVideo || item.videoUrl);
      const videoSrc = resolvedVideo || '';

      // Build slides: images + optional video clip slide
      const slides = imgs.map(src => `<div class="pg-carousel-slide"><img src="${src}" alt="${escapeHtml(item.title)}" loading="lazy"></div>`);
      if (videoSrc) {
        slides.push(`<div class="pg-carousel-slide"><video src="${videoSrc}" autoplay muted loop playsinline></video></div>`);
      }
      const totalSlides = slides.length;

      return `
        <div class="pcard" style="opacity:1; transform:none;" data-id="${escapeHtml(item.id)}">
          <div class="pg-carousel" data-idx="0" data-total="${totalSlides}" id="pgCar-${cardIdx}">
            <div class="pg-carousel-track">
              ${slides.join('')}
            </div>
            <span class="tag" style="position:absolute; bottom:12px; left:12px; z-index:3; background:rgba(243,241,234,.95); padding:5px 12px; border-radius:999px; font-family:'JetBrains Mono'; font-size:11px; font-weight:700; color:#14243C;">${item.purpose === 'Rent' ? 'For Rent' : 'For Sale'} · ${escapeHtml(item.subtype)}</span>
            ${totalSlides > 1 ? `<span class="pg-c-count">1 / ${totalSlides}${videoSrc ? ' · 🎥' : ''}</span>` : ''}
            ${totalSlides > 1 ? `<button type="button" class="pg-c-nav pg-c-prev" onclick="movePgSlide(${cardIdx}, -1)">‹</button><button type="button" class="pg-c-nav pg-c-next" onclick="movePgSlide(${cardIdx}, 1)">›</button>` : ''}
            ${totalSlides > 1 ? `<div class="pg-c-dots">${slides.map((_, i) => `<button type="button" class="pg-c-dot ${i === 0 ? 'active' : ''}" onclick="setPgSlide(${cardIdx}, ${i})"></button>`).join('')}</div>` : ''}
            ${hasVideo ? `<button type="button" class="pcard-video-btn" onclick="openPropertyVideo('${escapeHtml(videoSrc)}', '${escapeHtml(item.videoUrl || '')}', '${escapeHtml(item.title)}')" style="position:absolute; bottom:12px; right:12px; z-index:3; background:#14243C; color:#F3F1EA; border:1px solid rgba(243,241,234,0.45); border-radius:999px; padding:5px 12px; font-size:11px; font-weight:700; cursor:pointer;">▶ Watch Video</button>` : ''}
          </div>
          <div class="pcard-body">
            <h4>${escapeHtml(item.title)}</h4>
            <div class="price mono">PKR ${escapeHtml(item.price)}</div>
            <ul>
              <li>${escapeHtml(item.area)} ${escapeHtml(item.areaUnit)}</li>
              ${item.beds ? `<li>${escapeHtml(item.beds)} Beds</li>` : ''}
              ${item.baths ? `<li>${escapeHtml(item.baths)} Baths</li>` : ''}
            </ul>
            <div class="pcard-loc">📍 ${escapeHtml(item.location)}, ${escapeHtml(item.city)}</div>
            <div class="pcard-seller-box">
              <div style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;"><strong>${escapeHtml(item.customerName || 'Verified Client')}</strong> · ✓</div>
              <div><a href="tel:${escapeHtml(item.mobile)}" style="color:#FFFFFF; font-weight:700; text-decoration:underline; text-underline-offset:2px;">${escapeHtml(item.mobile)}</a></div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; margin-top:auto;">
              <a href="contact-us.html" class="pcard-inquire-btn">Inquire <span>→</span></a>
              <span class="pcard-id">${escapeHtml(item.id)}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Start auto-scroll for carousels with > 1 slide (pause on hover)
    filtered.forEach((_, cardIdx) => {
      const car = document.getElementById(`pgCar-${cardIdx}`);
      if (!car) return;
      const total = parseInt(car.getAttribute('data-total') || '1', 10);
      if (total <= 1) return;

      let paused = false;
      car.addEventListener('mouseenter', () => { paused = true; });
      car.addEventListener('mouseleave', () => { paused = false; });

      const timer = setInterval(() => {
        if (!paused) window.movePgSlide(cardIdx, 1);
      }, 2800 + (cardIdx % 3) * 350);
      window._pgCarouselTimers.push(timer);
    });
  }

  window.setPgSlide = function(cardIdx, targetIdx) {
    const car = document.getElementById(`pgCar-${cardIdx}`);
    if (!car) return;
    const total = parseInt(car.getAttribute('data-total') || '1', 10);
    const nextIdx = ((targetIdx % total) + total) % total;
    car.setAttribute('data-idx', nextIdx);
    const track = car.querySelector('.pg-carousel-track');
    if (track) track.style.transform = `translateX(-${nextIdx * 100}%)`;
    const countEl = car.querySelector('.pg-c-count');
    if (countEl) {
      const hasVid = countEl.textContent.includes('🎥');
      countEl.textContent = `${nextIdx + 1} / ${total}${hasVid ? ' · 🎥' : ''}`;
    }
    car.querySelectorAll('.pg-c-dot').forEach((d, i) => d.classList.toggle('active', i === nextIdx));
  };

  window.movePgSlide = function(cardIdx, delta) {
    const car = document.getElementById(`pgCar-${cardIdx}`);
    if (!car) return;
    const curr = parseInt(car.getAttribute('data-idx') || '0', 10);
    window.setPgSlide(cardIdx, curr + delta);
  };

  // Video Lightbox Player for Property Cards
  window.openPropertyVideo = function(videoSrc, youtubeUrl, title) {
    let modal = document.getElementById('pgVideoModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'pgVideoModal';
      modal.style.cssText = 'position:fixed;inset:0;z-index:9999999;background:rgba(20,36,60,0.88);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px;';
      modal.innerHTML = `
        <div style="background:#F3F1EA;border-radius:18px;max-width:760px;width:100%;padding:20px;box-shadow:0 25px 60px rgba(0,0,0,0.5);border:1px solid rgba(20,36,60,0.18);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <h3 id="pgVideoTitle" style="color:#14243C;font-size:18px;margin:0;"></h3>
            <button type="button" id="pgVideoClose" style="background:none;border:none;font-size:26px;cursor:pointer;color:#14243C;">&times;</button>
          </div>
          <div id="pgVideoContainer"></div>
        </div>
      `;
      document.body.appendChild(modal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.id === 'pgVideoClose') {
          modal.style.display = 'none';
          document.getElementById('pgVideoContainer').innerHTML = '';
        }
      });
    }
    document.getElementById('pgVideoTitle').textContent = title || 'Property Video Tour';
    const container = document.getElementById('pgVideoContainer');
    if (videoSrc) {
      container.innerHTML = `<video controls autoplay playsinline style="width:100%;max-height:440px;border-radius:12px;background:#000;"><source src="${videoSrc}"></video>`;
    } else if (youtubeUrl) {
      const ytMatch = youtubeUrl.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
      if (ytMatch) {
        container.innerHTML = `<iframe width="100%" height="400" src="https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1" frameborder="0" allowfullscreen style="border-radius:12px;"></iframe>`;
      } else {
        container.innerHTML = `<p style="padding:20px;text-align:center;"><a href="${escapeHtml(youtubeUrl)}" target="_blank" class="btn btn-primary">Watch Video Link →</a></p>`;
      }
    }
    modal.style.display = 'flex';
  };

  window.PrimeGroupEngine = {
    KEYS,
    readStore,
    writeStore,
    trackVisitor,
    loginGmailCustomer,
    submitListingWithConfirmation,
    renderConfirmedListings
  };

  document.addEventListener('DOMContentLoaded', () => {
    trackVisitor();
    renderConfirmedListings('All');

    // Bind filter chips in #listing (if present)
    document.querySelectorAll('#listing .filter-bar .chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('#listing .filter-bar .chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const val = chip.textContent.trim();
        const catSelect = document.getElementById('inventoryCategorySelect');
        if (catSelect) catSelect.value = val;
        renderConfirmedListings(val);
      });
    });

    // Bind category dropdown list in #listing
    const catSelect = document.getElementById('inventoryCategorySelect');
    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        document.querySelectorAll('#listing .filter-bar .chip').forEach(c => {
          c.classList.toggle('active', c.textContent.trim() === val);
        });
        renderConfirmedListings(val);
      });
    }

    // Bind Grid / List View toggle buttons
    const viewGridBtn = document.getElementById('viewGridBtn');
    const viewListBtn = document.getElementById('viewListBtn');
    const listingGrid = document.querySelector('#listing .listing-grid');
    if (viewGridBtn && viewListBtn && listingGrid) {
      viewGridBtn.addEventListener('click', () => {
        listingGrid.classList.remove('list-view');
        viewGridBtn.classList.add('active');
        viewListBtn.classList.remove('active');
      });
      viewListBtn.addEventListener('click', () => {
        listingGrid.classList.add('list-view');
        viewListBtn.classList.add('active');
        viewGridBtn.classList.remove('active');
      });
    }

    // Bind quick search input in #listing
    const quickSearch = document.getElementById('inventoryQuickSearch');
    if (quickSearch) {
      quickSearch.addEventListener('input', (e) => {
        renderConfirmedListings(undefined, e.target.value);
      });
    }
  });
})();
