import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");

const width = 1200;
const height = 630;

function toDataUri(buffer) {
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

function buildSvg({ brandIcon, brandMark }) {
  return String.raw`<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="96" y1="64" x2="1110" y2="590" gradientUnits="userSpaceOnUse">
      <stop stop-color="#020617"/>
      <stop offset="0.55" stop-color="#0F172A"/>
      <stop offset="1" stop-color="#111827"/>
    </linearGradient>
    <linearGradient id="panel" x1="72" y1="72" x2="1128" y2="558" gradientUnits="userSpaceOnUse">
      <stop stop-color="#081121" stop-opacity="0.94"/>
      <stop offset="1" stop-color="#09172A" stop-opacity="0.88"/>
    </linearGradient>
    <linearGradient id="accent" x1="180" y1="120" x2="1024" y2="518" gradientUnits="userSpaceOnUse">
      <stop stop-color="#10B981"/>
      <stop offset="1" stop-color="#06B6D4"/>
    </linearGradient>
    <linearGradient id="softLine" x1="110" y1="170" x2="1044" y2="170" gradientUnits="userSpaceOnUse">
      <stop stop-color="#10B981" stop-opacity="0.92"/>
      <stop offset="1" stop-color="#06B6D4" stop-opacity="0.5"/>
    </linearGradient>
    <radialGradient id="orbLeft" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(220 120) rotate(40) scale(360 260)">
      <stop stop-color="#10B981" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#10B981" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orbRight" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1010 525) rotate(180) scale(310 220)">
      <stop stop-color="#06B6D4" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#06B6D4" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="lsPanelGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(962 324) rotate(90) scale(104 104)">
      <stop stop-color="#0F766E" stop-opacity="0.18"/>
      <stop offset="0.58" stop-color="#0B2233" stop-opacity="0.08"/>
      <stop offset="1" stop-color="#03111A" stop-opacity="0"/>
    </radialGradient>
    <filter id="blur" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox">
      <feGaussianBlur stdDeviation="42"/>
    </filter>
    <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox">
      <feDropShadow dx="0" dy="0" stdDeviation="14" flood-color="#10B981" flood-opacity="0.18"/>
    </filter>
    <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
      <path d="M36 0H0V36" stroke="#E2E8F0" stroke-opacity="0.04"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" rx="36" fill="url(#bg)"/>
  <rect width="1200" height="630" rx="36" fill="url(#grid)"/>

  <circle cx="220" cy="120" r="310" fill="url(#orbLeft)" filter="url(#blur)"/>
  <circle cx="1010" cy="525" r="250" fill="url(#orbRight)" filter="url(#blur)"/>

  <rect x="72" y="72" width="1056" height="486" rx="32" fill="url(#panel)" stroke="#334155" stroke-opacity="0.58"/>
  <path d="M112 178H1088" stroke="url(#softLine)" stroke-opacity="0.48"/>

  <g transform="translate(112 104)">
    <rect x="0" y="0" width="92" height="92" rx="24" fill="#04101A" stroke="#1F4E46" stroke-opacity="0.9"/>
    <image href="${brandIcon}" x="14" y="14" width="64" height="64" preserveAspectRatio="xMidYMid meet" filter="url(#logoGlow)"/>
  </g>

  <g transform="translate(232 118)">
    <text x="0" y="24" fill="#10B981" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="800" letter-spacing="3">DUVANAPIOLAZA.CL</text>
    <text x="0" y="58" fill="#E2E8F0" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="600" letter-spacing="2">DESARROLLO WEB  •  AUTOMATIZACION  •  CONSULTORIA TI</text>
  </g>

  <g transform="translate(112 270)">
    <text x="0" y="0" fill="#F8FAFC" font-family="Segoe UI, Arial, sans-serif" font-size="64" font-weight="800">Duván Apiolaza</text>
    <text x="0" y="44" fill="#34D399" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="700">Ingeniero en Informatica</text>
    <text x="0" y="126" fill="#CBD5E1" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="500">
      <tspan x="0" dy="0">Soluciones digitales claras, mantenibles</tspan>
      <tspan x="0" dy="36">y pensadas para resultados reales.</tspan>
    </text>
  </g>

  <g transform="translate(112 462)">
    <rect x="0" y="0" width="206" height="52" rx="16" fill="#10B981"/>
    <text x="28" y="34" fill="#F8FAFC" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="800">Ver proyectos</text>

    <rect x="228" y="0" width="248" height="52" rx="16" fill="#0F172A" stroke="#334155"/>
    <text x="254" y="33" fill="#E2E8F0" font-family="Segoe UI, Arial, sans-serif" font-size="21" font-weight="700">Agenda abierta 2026</text>
  </g>

  <g transform="translate(858 220)">
    <rect x="0" y="0" width="208" height="208" rx="32" fill="#03111A" fill-opacity="0.84" stroke="#1E293B"/>
    <rect x="18" y="18" width="172" height="172" rx="26" fill="#051722" stroke="#34D399" stroke-opacity="0.1"/>
    <rect x="18" y="18" width="172" height="172" rx="26" fill="url(#lsPanelGlow)"/>
    <image href="${brandMark}" x="56" y="38" width="96" height="124" preserveAspectRatio="xMidYMid meet" filter="url(#logoGlow)"/>
  </g>

  <g transform="translate(790 472)">
    <text x="0" y="0" fill="#94A3B8" font-family="Consolas, 'Courier New', monospace" font-size="17" font-weight="700">&lt;/&gt; Tecnologia que se entiende.</text>
    <text x="0" y="34" fill="#64748B" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="600">Rengo, Chile  •  Remoto y presencial</text>
  </g>
</svg>`;
}

async function main() {
  await mkdir(publicDir, { recursive: true });

  const brandIconPath = path.join(publicDir, "logo-transparent.png");
  const brandMarkPath = path.join(publicDir, "logo-ls.png");
  const svgPath = path.join(publicDir, "og.svg");
  const pngPath = path.join(publicDir, "og.png");

  const [brandIconBuffer, brandMarkBuffer] = await Promise.all([
    readFile(brandIconPath),
    readFile(brandMarkPath),
  ]);

  const svg = buildSvg({
    brandIcon: toDataUri(brandIconBuffer),
    brandMark: toDataUri(brandMarkBuffer),
  });

  await writeFile(svgPath, svg, "utf8");
  await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9, quality: 100 })
    .toFile(pngPath);

  console.log(
    `OG generada en ${path.relative(projectRoot, svgPath)} y ${path.relative(projectRoot, pngPath)}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
