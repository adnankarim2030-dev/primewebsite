document.addEventListener('DOMContentLoaded', () => {
    const SKIP_SELECTOR = 'nav, footer, #gmailAuthModal, .lp-zameen-wrap, .lp-success-box, .table-card';

    function wrapWords(node, isHeading) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.nodeValue;
            const words = text.split(/(\s+)/);
            if (words.length === 1 && text.trim() === '') return;

            const fragment = document.createDocumentFragment();
            words.forEach(word => {
                if (word.trim() === '') {
                    fragment.appendChild(document.createTextNode(word));
                } else {
                    const wordSpan = document.createElement('span');
                    wordSpan.textContent = word;

                    if (isHeading) {
                        wordSpan.className = 'adv-heading-word';
                        const wrapper = document.createElement('span');
                        wrapper.className = 'adv-heading-word-wrapper';
                        wrapper.appendChild(wordSpan);
                        fragment.appendChild(wrapper);
                    } else {
                        wordSpan.className = 'adv-body-word';
                        fragment.appendChild(wordSpan);
                    }
                }
            });
            node.parentNode.replaceChild(fragment, node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            if (['SCRIPT', 'STYLE', 'IMG', 'SVG', 'IFRAME', 'VIDEO', 'INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(node.tagName.toUpperCase())) return;
            Array.from(node.childNodes).forEach(child => wrapWords(child, isHeading));
        }
    }

    // 1. Process Headings
    const headings = document.querySelectorAll('h1, h2, h3');
    headings.forEach(heading => {
        if (heading.closest(SKIP_SELECTOR)) return;
        wrapWords(heading, true);
        heading.classList.add('anim-container');
        heading.querySelectorAll('.adv-heading-word').forEach((word, idx) => {
            word.style.transitionDelay = `${Math.min(idx * 0.045, 0.45)}s`;
        });
    });

    // 2. Process Body Text
    const allParagraphs = Array.from(document.querySelectorAll('p:not(footer p):not(.topbar p)'));
    const specificParagraphs = Array.from(document.querySelectorAll('.section-head p, .about-copy p, .lead'));
    let paragraphs = [...new Set([...allParagraphs, ...specificParagraphs])].filter(p => {
        if (p.closest(SKIP_SELECTOR)) return false;
        return p.textContent.trim().split(/\s+/).length > 3;
    });

    paragraphs.forEach(p => {
        wrapWords(p, false);
        p.classList.add('anim-container');
        p.querySelectorAll('.adv-body-word').forEach((word, idx) => {
            word.style.transitionDelay = `${Math.min(idx * 0.012, 0.35)}s`;
        });
    });

    // 3. Process Sections & Cards for Overall Scroll Reveal
    const scrollTargets = document.querySelectorAll(
        '.section-head, .about-copy, .stack-3d, .svc-card, .offer-card, .pcard, .pstep, .tl-item, .blueprint, .kpi-card, .table-card, .reveal, .reveal-r'
    );
    scrollTargets.forEach((el, idx) => {
        if (el.closest('header') || el.closest('nav')) return;
        el.classList.add('adv-scroll-item');
        el.style.transitionDelay = `${(idx % 4) * 0.07}s`;
    });

    // 4. Intersection Observer for Text & Sections (never hide cards once revealed)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                entry.target.classList.add('in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.02,
        rootMargin: '80px 0px 80px 0px'
    });

    document.querySelectorAll('.anim-container, .adv-scroll-item').forEach(el => {
        observer.observe(el);
    });
});
