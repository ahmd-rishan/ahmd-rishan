const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// 1. Logo SVG (White text on transparent / dark background)
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 130" fill="none">
  <style>
    .brand-text { font-family: 'Syne', 'Space Grotesk', sans-serif; font-weight: 800; font-size: 52px; fill: currentColor; letter-spacing: -1.5px; }
  </style>
  <text x="0" y="52" class="brand-text">AHAMMED</text>
  <text x="0" y="112" class="brand-text">RISHAN</text>
</svg>`;

fs.writeFileSync(path.join(assetsDir, 'logo-white.svg'), logoSvg.replace('currentColor', '#FFFFFF'));
fs.writeFileSync(path.join(assetsDir, 'logo-dark.svg'), logoSvg.replace('currentColor', '#0E0E0E'));

// 2. Project Elatot SVG Graphic
const elatotSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <rect width="800" height="600" fill="#141517"/>
  <!-- Slate platform background -->
  <path d="M50 420 L750 420 L700 560 L100 560 Z" fill="#202225"/>
  <!-- Elatot Pouch Mockup -->
  <g transform="translate(260, 100)">
    <path d="M40 20 L240 20 L260 380 L20 380 Z" fill="#D9C5A0"/>
    <path d="M40 20 L240 20 L230 50 L50 50 Z" fill="#BAA37B"/>
    <rect x="60" y="100" width="160" height="220" rx="8" fill="#1C1D1F"/>
    <text x="140" y="145" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="20" fill="#D4FF00">ELATOT</text>
    <text x="140" y="170" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="12" fill="#FFFFFF" letter-spacing="2">FOODS</text>
    <circle cx="140" cy="220" r="30" fill="#2A2C30" stroke="#D4FF00" stroke-width="2"/>
    <text x="140" y="225" text-anchor="middle" font-size="20" fill="#D4FF00">🌿</text>
    <text x="140" y="280" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#A0A5AD">ORGANIC &amp; NATURAL</text>
  </g>
  <!-- Spice bowl left -->
  <ellipse cx="200" cy="440" rx="70" ry="35" fill="#2A2C30"/>
  <ellipse cx="200" cy="435" rx="60" ry="25" fill="#C86D3B"/>
  <!-- Bowl right -->
  <ellipse cx="580" cy="450" rx="80" ry="40" fill="#2A2C30"/>
  <ellipse cx="580" cy="445" rx="70" ry="30" fill="#E5AA42"/>
</svg>`;
fs.writeFileSync(path.join(assetsDir, 'project_elatot.svg'), elatotSvg);

// 3. Services Thumbnail SVG
const servicesSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="300" height="200">
  <rect width="300" height="200" fill="#121315"/>
  <circle cx="150" cy="100" r="70" fill="none" stroke="#33373E" stroke-width="3"/>
  <circle cx="150" cy="100" r="50" fill="none" stroke="#D4FF00" stroke-width="2" stroke-dasharray="8 4"/>
  <circle cx="150" cy="100" r="30" fill="#1C1E22"/>
  <path d="M150 40 L150 160 M90 100 L210 100" stroke="#D4FF00" stroke-width="1.5" opacity="0.6"/>
</svg>`;
fs.writeFileSync(path.join(assetsDir, 'services_thumb.svg'), servicesSvg);

// 4. Workspace SVG Graphic
const workspaceSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <rect width="400" height="300" fill="#1A1B1E"/>
  <rect x="40" y="40" width="220" height="150" rx="6" fill="#2B2D32" stroke="#40444D" stroke-width="2"/>
  <rect x="50" y="50" width="200" height="130" fill="#0E0F11"/>
  <path d="M65 75 L145 75 M65 95 L185 95 M65 115 L125 115" stroke="#D4FF00" stroke-width="3" stroke-linecap="round"/>
  <rect x="280" y="100" width="70" height="120" rx="8" fill="#25272B" stroke="#3A3D45"/>
  <circle cx="315" cy="200" r="10" fill="#D4FF00" opacity="0.3"/>
  <line x1="20" y1="230" x2="380" y2="230" stroke="#33373E" stroke-width="4"/>
</svg>`;
fs.writeFileSync(path.join(assetsDir, 'about_workspace.svg'), workspaceSvg);

// 5. Client Avatar SVG
const avatarSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="50" fill="#232529"/>
  <circle cx="50" cy="38" r="20" fill="#808590"/>
  <path d="M20 85 C20 65 35 55 50 55 C65 55 80 65 80 85 Z" fill="#808590"/>
</svg>`;
fs.writeFileSync(path.join(assetsDir, 'client_avatar.svg'), avatarSvg);

// 6. Blog Thumbnails
const blog1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" width="400" height="250">
  <rect width="400" height="250" fill="#141619"/>
  <rect x="30" y="30" width="340" height="190" rx="8" fill="#1F2226"/>
  <path d="M60 160 L120 110 L180 140 L240 80 L300 120 L340 70" fill="none" stroke="#D4FF00" stroke-width="4" stroke-linecap="round"/>
  <circle cx="240" cy="80" r="6" fill="#D4FF00"/>
  <text x="60" y="70" font-family="'Space Grotesk', sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">GOOGLE ANALYTICS 4</text>
</svg>`;
fs.writeFileSync(path.join(assetsDir, 'blog1.svg'), blog1Svg);

const blog2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" width="400" height="250">
  <rect width="400" height="250" fill="#141619"/>
  <rect x="40" y="40" width="150" height="170" rx="6" fill="#24272D"/>
  <rect x="210" y="40" width="150" height="170" rx="6" fill="#1A1C20" stroke="#D4FF00" stroke-width="2"/>
  <text x="115" y="130" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#A0A5AD">WEBFLOW</text>
  <text x="285" y="130" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#D4FF00">WORDPRESS</text>
</svg>`;
fs.writeFileSync(path.join(assetsDir, 'blog2.svg'), blog2Svg);

const blog3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" width="400" height="250">
  <rect width="400" height="250" fill="#141619"/>
  <rect x="40" y="80" width="320" height="50" rx="25" fill="#24272D" stroke="#3A3E46"/>
  <circle cx="70" cy="105" r="12" fill="none" stroke="#D4FF00" stroke-width="3"/>
  <line x1="79" y1="114" x2="90" y2="125" stroke="#D4FF00" stroke-width="3" stroke-linecap="round"/>
  <text x="105" y="111" font-family="'Space Grotesk', sans-serif" font-size="15" fill="#FFFFFF">SEO Ranking Strategies 2026</text>
</svg>`;
fs.writeFileSync(path.join(assetsDir, 'blog3.svg'), blog3Svg);

console.log('Assets generated successfully!');
