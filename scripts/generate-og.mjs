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

function buildSvg({ brandIcon }) {
  return String.raw`<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop stop-color="#070d1a"/>
      <stop offset="0.5" stop-color="#0a0f1e"/>
      <stop offset="1" stop-color="#0a1322"/>
    </linearGradient>
    <radialGradient id="orbLeft" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(180 100) rotate(40) scale(420 320)">
      <stop stop-color="#1D9E75" stop-opacity="0.10"/>
      <stop offset="1" stop-color="#1D9E75" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orbRight" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1050 540) rotate(180) scale(360 260)">
      <stop stop-color="#1D9E75" stop-opacity="0.07"/>
      <stop offset="1" stop-color="#1D9E75" stop-opacity="0"/>
    </radialGradient>
    <filter id="blur" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox">
      <feGaussianBlur stdDeviation="50"/>
    </filter>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" stroke="#E2E8F0" stroke-opacity="0.025"/>
    </pattern>
  </defs>

  <!-- Fondo -->
  <rect width="1200" height="630" rx="32" fill="url(#bg)"/>
  <rect width="1200" height="630" rx="32" fill="url(#grid)"/>

  <!-- Glow ambiental -->
  <circle cx="180" cy="100" r="360" fill="url(#orbLeft)" filter="url(#blur)"/>
  <circle cx="1050" cy="540" r="300" fill="url(#orbRight)" filter="url(#blur)"/>

  <!-- Borde sutil -->
  <rect x="0.5" y="0.5" width="1199" height="629" rx="32" stroke="#1e293b" stroke-opacity="0.6"/>

  <!-- ===== HEADER: logo DA + dominio discreto ===== -->
  <g transform="translate(80 80)">
    <rect x="0" y="0" width="48" height="48" rx="12" fill="#0f172a" stroke="#1D9E7520"/>
    <image href="${brandIcon}" x="6" y="6" width="36" height="36" preserveAspectRatio="xMidYMid meet"/>
  </g>
  <text x="142" y="110" fill="#3d4655" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="400" letter-spacing="0.2">duvanapiolaza.cl</text>

  <!-- ===== BLOQUE PRINCIPAL ===== -->
  <!-- Nombre -->
  <text x="80" y="240" fill="#F8FAFC" font-family="Segoe UI, Arial, sans-serif" font-size="68" font-weight="800" letter-spacing="-1">Duván Apiolaza</text>

  <!-- Propuesta de valor verde (2 líneas) -->
  <text fill="#1D9E75" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700">
    <tspan x="80" y="295">Diseño y desarrollo web para negocios que quieren</tspan>
    <tspan x="80" y="330">verse mejor y vender más</tspan>
  </text>

  <!-- Subtexto -->
  <text x="80" y="380" fill="#CBD5E1" font-family="Segoe UI, Arial, sans-serif" font-size="19" font-weight="400">Sitios web claros, rápidos y pensados para generar confianza, presencia y resultados.</text>

  <!-- CTA: Hablemos → -->
  <g transform="translate(80 404)">
    <rect x="0" y="0" width="176" height="46" rx="12" fill="#1D9E75"/>
    <text x="34" y="31" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700">Hablemos →</text>
  </g>

  <!-- ===== LÍNEA DIVISORIA ===== -->
  <path d="M80 500H1120" stroke="#1e293b" stroke-opacity="0.7"/>

  <!-- ===== TRUST PROOFS ===== -->
  <!-- Proof 1 -->
  <g transform="translate(80 540)">
    <circle cx="11" cy="0" r="11" fill="#1D9E7520"/>
    <path d="M6 0l3.5 3.5L17 -4" stroke="#1D9E75" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <text x="32" y="6" fill="#E2E8F0" font-family="Segoe UI, Arial, sans-serif" font-size="17" font-weight="600">6 proyectos en producción</text>
  </g>

  <!-- Proof 2 -->
  <g transform="translate(380 540)">
    <circle cx="11" cy="0" r="11" fill="#1D9E7520"/>
    <path d="M6 0l3.5 3.5L17 -4" stroke="#1D9E75" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <text x="32" y="6" fill="#E2E8F0" font-family="Segoe UI, Arial, sans-serif" font-size="17" font-weight="600">Ingeniero en Informática · USM</text>
  </g>

  <!-- Proof 3 -->
  <g transform="translate(740 540)">
    <circle cx="11" cy="0" r="11" fill="#1D9E7520"/>
    <path d="M6 0l3.5 3.5L17 -4" stroke="#1D9E75" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <text x="32" y="6" fill="#E2E8F0" font-family="Segoe UI, Arial, sans-serif" font-size="17" font-weight="600">Entrega en 7 a 14 días</text>
  </g>
</svg>`;
}

async function main() {
  await mkdir(publicDir, { recursive: true });

  const brandIconPath = path.join(publicDir, "logo-transparent.png");
  const svgPath = path.join(publicDir, "og.svg");
  const pngPath = path.join(publicDir, "og.png");

  const brandIconBuffer = await readFile(brandIconPath);

  const svg = buildSvg({
    brandIcon: toDataUri(brandIconBuffer),
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
