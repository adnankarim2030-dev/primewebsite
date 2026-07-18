document.addEventListener('DOMContentLoaded', () => {

    function wrapWords(node, isHeading) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.nodeValue;
            // Split by words, capturing whitespace
            const words = text.split(/(\s+)/);
            if(words.length === 1 && text.trim() === '') return; // Just whitespace

            const fragment = document.createDocumentFragment();
            words.forEach(word => {
                if (word.trim() === '') {
                    // It's whitespace, keep it as text node
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
            // Skip scripts, styles, or elements already processed/should be ignored
            if(['SCRIPT', 'STYLE', 'IMG', 'SVG', 'IFRAME', 'VIDEO'].includes(node.tagName.toUpperCase())) return;
            // Recursively process child nodes
            // Convert to array to avoid mutation issues during iteration
            Array.from(node.childNodes).forEach(child => wrapWords(child, isHeading));
        }
    }

    // 1. Process Headings
    const headings = document.querySelectorAll('h1, h2, h3');
    headings.forEach(heading => {
        // Skip nav links and footer titles to avoid breaking layout
        if(heading.closest('nav') || heading.closest('footer')) return;
        
        wrapWords(heading, true);
        heading.classList.add('anim-container');
        
        // Assign staggered delays
        const words = heading.querySelectorAll('.adv-heading-word');
        words.forEach((word, idx) => {
            word.style.transitionDelay = `${idx * 0.05}s`;
        });
    });

    // 2. Process Body Text
    const allParagraphs = Array.from(document.querySelectorAll('p:not(footer p):not(.topbar p)'));
    const specificParagraphs = Array.from(document.querySelectorAll('.section-head p, .about-copy p, .lead'));
    let paragraphs = [...new Set([...allParagraphs, ...specificParagraphs])];
    
    paragraphs = paragraphs.filter(p => {
        const text = p.textContent.trim();
        return text.split(/\s+/).length > 3; 
    });

    paragraphs.forEach(p => {
        wrapWords(p, false);
        p.classList.add('anim-container');
        
        // Assign staggered delays
        const words = p.querySelectorAll('.adv-body-word');
        words.forEach((word, idx) => {
            // Faster stagger for body text so it doesn't take too long
            word.style.transitionDelay = `${idx * 0.015}s`;
        });
    });

    // 3. Intersection Observer to trigger animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                // Remove to allow re-animating when scrolling back
                entry.target.classList.remove('in-view');
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px 0px -15% 0px' 
    });

    document.querySelectorAll('.anim-container').forEach(container => {
        observer.observe(container);
    });
});
