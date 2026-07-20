const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Fix mobile nav text colors
    content = content.replace(
        /\.mnav-panel a\{([^}]+)color:var\(--blue\);/g,
        '.mnav-panel a{$1color:var(--white);'
    );
    
    content = content.replace(
        /\.mnav-close\{([^}]+)color:var\(--blue\);\}/g,
        '.mnav-close{$1color:var(--white);}'
    );
    
    // Also check if var(--line) which is rgba(11,61,107,0.12) is visible on blue background.
    // It's a dark line, so on a dark blue background it will be almost invisible.
    // Let's make it a semi-transparent white for mnav-panel a border-bottom
    content = content.replace(
        /border-bottom:1px solid var\(--line\);color:var\(--white\);/g,
        'border-bottom:1px solid rgba(255,255,255,0.15);color:var(--white);'
    );

    fs.writeFileSync(f, content);
    console.log("Fixed mobile nav colors on", f);
});
