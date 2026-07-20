const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Burger icon should be white
    content = content.replace(
        /\.burger span, \.burger span::before, \.burger span::after\{content:"";display:block;width:18px;height:2px;background:var\(--blue\);/g,
        '.burger span, .burger span::before, .burger span::after{content:"";display:block;width:18px;height:2px;background:var(--white);'
    );
    
    fs.writeFileSync(f, content);
    console.log("Fixed burger icon on", f);
});
