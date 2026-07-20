const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Fix the broken \n
    content = content.replace(/nav\.mainnav\{\\n  position:sticky;top:0;z-index:200;\\n  background:var\(--blue\);/g,
        'nav.mainnav{\n  position:sticky;top:0;z-index:200;\n  background:var(--blue);');
        
    fs.writeFileSync(f, content);
    console.log("Fixed broken newlines on", f);
});
