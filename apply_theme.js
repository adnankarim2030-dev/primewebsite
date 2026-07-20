const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');

    // 1. Change text color to pure black
    content = content.replace(/--ink:#08192B;/g, '--ink:#000000;');
    
    // 2. Headings are already var(--blue), no need to change that.
    
    // 3. Menu background blue
    // From: background:rgba(255,255,255,.86);backdrop-filter:blur(14px);
    // To: background:var(--blue);
    content = content.replace(
        /nav\.mainnav\{\s*position:sticky;top:0;z-index:200;\s*background:rgba\(255,255,255,\.86\);backdrop-filter:blur\(14px\);/g,
        'nav.mainnav{\\n  position:sticky;top:0;z-index:200;\\n  background:var(--blue);'
    );
    
    // In case the above regex fails due to whitespace formatting, let's also do a simpler replace
    content = content.replace(
        /background:rgba\(255,255,255,\.86\);backdrop-filter:blur\(14px\);/g,
        'background:var(--blue);'
    );

    // 4. Menu text color white
    // In index.html, .navlinks a has color:var(--ink);
    content = content.replace(
        /\.navlinks a\{\s*padding:[^;]+;border-radius:999px;font-size:[^;]+;font-weight:500;color:var\(--ink\);/g,
        function(match) {
            return match.replace('color:var(--ink);', 'color:var(--white);');
        }
    );

    // 5. Logo text color (if there's any raw text logo)
    content = content.replace(
        /\.logo\{[^}]+color:var\(--blue\);/g,
        function(match) {
            return match.replace('color:var(--blue);', 'color:var(--white);');
        }
    );

    // 6. Fix Logo image to be white so it's visible on blue
    // <img src="logo2.png" id="dynamic-logo" alt="Prime Estate" style="height: 120px; max-width: none; transition: opacity 0.5s ease;">
    content = content.replace(
        /id="dynamic-logo"[^>]*style="([^"]+)"/g,
        function(match, styles) {
            if (!styles.includes('filter:')) {
                return match.replace(styles, styles + ' filter: brightness(0) invert(1);');
            }
            return match;
        }
    );

    // 7. Burger icon color should be white
    content = content.replace(
        /\.burger span\{display:block;width:24px;height:2px;background:var\(--ink\);/g,
        '.burger span{display:block;width:24px;height:2px;background:var(--white);'
    );
    content = content.replace(
        /\.burger span::before,\.burger span::after\{content:'';position:absolute;width:24px;height:2px;background:var\(--ink\);/g,
        ".burger span::before,.burger span::after{content:'';position:absolute;width:24px;height:2px;background:var(--white);"
    );

    // 8. Mobile menu background
    // .mnav-panel{position:absolute;right:0;top:0;bottom:0;width:280px;background:#fff;
    content = content.replace(
        /\.mnav-panel\{position:absolute;right:0;top:0;bottom:0;width:280px;background:#fff;/g,
        '.mnav-panel{position:absolute;right:0;top:0;bottom:0;width:280px;background:var(--blue);'
    );
    // .mnav-panel .navlinks a { color: var(--ink); } might be there, we need to ensure mobile links are white
    // Since we already changed .navlinks a { color: var(--white) }, the mobile navlinks will also be white.

    fs.writeFileSync(f, content);
    console.log("Updated theme on", f);
});
