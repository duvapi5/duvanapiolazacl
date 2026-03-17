import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });
await page.goto("https://proyectozatira.cl", {
  waitUntil: "load",
  timeout: 30000,
});

// Ocultar intro inmediatamente antes de que bloquee el renderizado
await page.evaluate(() => {
  // Inyectar CSS para ocultar intro-wrap y cualquier overlay de carga
  const style = document.createElement("style");
  style.textContent =
    '.intro-wrap { display: none !important; } [class*="intro"] { display: none !important; }';
  document.head.appendChild(style);
});

// Esperar a que Three.js y GSAP terminen de renderizar los modelos 3D
await new Promise((r) => setTimeout(r, 10000));

await page.screenshot({
  path: "public/projects/proyectozatira.jpg",
  type: "jpeg",
  quality: 90,
  clip: { x: 0, y: 0, width: 1280, height: 800 },
});
console.log("Screenshot guardado");
await browser.close();
