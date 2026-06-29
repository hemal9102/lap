const fs = require('fs');
const path = require('path');

const files = [
  'AboutClient.jsx',
  'AdminClient.jsx',
  'ContactClient.jsx',
  'FaqClient.jsx',
  'HomeClient.jsx',
  'LaptopsClient.jsx',
  'LegalClient.jsx'
];

let success = true;

files.forEach(file => {
  try {
    const p = path.join('H:/laptop/frontend/src/components', file);
    let content = fs.readFileSync(p, 'utf8');
    
    // Check if imports already exist
    if (!content.includes('import { colors } from "@/lib/theme"')) {
      // Remove colors object
      content = content.replace(/const\s+colors\s*=\s*\{[\s\S]*?\};\r?\n/g, '');
      
      // Remove GlowOrb function
      content = content.replace(/function\s+GlowOrb\s*\([\s\S]*?\)\s*\{[\s\S]*?return\s*\([\s\S]*?\);\s*\}\r?\n/g, '');
      
      // Insert imports right after "use client";
      const imports = `\nimport { colors } from "@/lib/theme";\nimport GlowOrb from "@/components/GlowOrb";`;
      content = content.replace(/("use client";|'use client';)/, `$1${imports}`);
      
      fs.writeFileSync(p, content);
      console.log(`Refactored ${file}`);
    } else {
      console.log(`Skipped ${file} (already refactored)`);
    }
  } catch (err) {
    console.error(`Error processing ${file}: ${err.message}`);
    success = false;
  }
});

if (success) {
  console.log('Refactoring complete.');
} else {
  console.log('Refactoring finished with errors.');
}
