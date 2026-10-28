import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const outputDir = path.resolve('public/images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Clean up any test/svg files
const files = fs.readdirSync(outputDir);
for (const f of files) {
  if (f.endsWith('.svg') || f === 'test.jpg') {
    fs.unlinkSync(path.join(outputDir, f));
  }
}

const items = [
  {
    file: 'super-fusion-hero.jpg',
    width: 1600,
    height: 900,
    title: 'SUPER FUSION CUISINE II',
    sub: 'Watertown Square Japanese Dining & Sushi Bar',
    accent: '#B91C1C',
    fishColor: '#DC2626'
  },
  {
    file: 'watertown-maki.jpg',
    width: 800,
    height: 600,
    title: 'WATERTOWN MAKI',
    sub: 'Torched Salmon - Spicy Tuna - Yellowtail',
    accent: '#EA580C',
    fishColor: '#F97316'
  },
  {
    file: 'double-toro-maki.jpg',
    width: 800,
    height: 600,
    title: 'DOUBLE TORO MAKI',
    sub: 'Seared Fatty Toro - Spicy Aioli - Tempura Crisp',
    accent: '#DC2626',
    fishColor: '#FCA5A5'
  },
  {
    file: '54-maki.jpg',
    width: 800,
    height: 600,
    title: '54 MAKI',
    sub: 'Spicy Lobster - Shrimp - Mango - Tobiko',
    accent: '#D97706',
    fishColor: '#FBBF24'
  },
  {
    file: 'baked-salmon.jpg',
    width: 800,
    height: 600,
    title: 'BAKED SALMON MAKI',
    sub: 'Warm Torched Salmon - Crab - Glaze',
    accent: '#C2410C',
    fishColor: '#FB923C'
  },
  {
    file: 'fusion-combo.jpg',
    width: 800,
    height: 600,
    title: 'FUSION MAKI COMBO (18 PCS)',
    sub: 'Tuna Roll - California Roll - Shrimp Tempura',
    accent: '#2563EB',
    fishColor: '#60A5FA'
  },
  {
    file: 'chirashi.jpg',
    width: 800,
    height: 600,
    title: 'CHIRASHI SUSHI',
    sub: 'Chef Assorted Fresh Sashimi over Seasoned Rice',
    accent: '#BE185D',
    fishColor: '#F43F5E'
  }
];

for (const item of items) {
  const target = path.join(outputDir, item.file);
  const w = item.width;
  const h = item.height;
  const cx = Math.floor(w / 2);
  const cy = Math.floor(h * 0.44);
  const prx = Math.floor(w * 0.3);
  const pry = Math.floor(h * 0.24);

  const cmd = `convert -size ${w}x${h} xc:"#0E1116" \
    -fill "#181B22" -stroke "rgba(255,255,255,0.06)" -strokewidth 2 \
    -draw "ellipse ${cx},${cy} ${prx},${pry} 0,360" \
    -fill "#12141A" -stroke "none" \
    -draw "ellipse ${cx},${cy} ${Math.floor(prx * 0.9)},${Math.floor(pry * 0.9)} 0,360" \
    -fill "${item.fishColor}" -stroke "none" \
    -draw "circle ${cx - 90},${cy} ${cx - 60},${cy}" \
    -fill "${item.accent}" \
    -draw "circle ${cx},${cy - 10} ${cx + 30},${cy - 10}" \
    -fill "#10B981" \
    -draw "circle ${cx + 90},${cy} ${cx + 120},${cy}" \
    -fill "#65A30D" \
    -draw "circle ${cx + 160},${cy - 30} ${cx + 175},${cy - 30}" \
    -fill "#FDA4AF" \
    -draw "circle ${cx + 190},${cy - 20} ${cx + 204},${cy - 20}" \
    -fill "#B91C1C" \
    -draw "roundrectangle ${w - 70},30 ${w - 30},70 6,6" \
    -fill "#FFFFFF" -pointsize ${Math.floor(w > 1000 ? 28 : 22)} -gravity south \
    -annotate +0+${Math.floor(h * 0.12)} "${item.title}" \
    -fill "#9CA3AF" -pointsize ${Math.floor(w > 1000 ? 15 : 13)} \
    -annotate +0+${Math.floor(h * 0.06)} "${item.sub}" \
    -quality 95 "${target}"`;

  execSync(cmd);
  console.log(`Generated ${target}`);
}
console.log('All image assets generated successfully.');
