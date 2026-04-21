import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });
await page.goto("https://urde.cl", {
  waitUntil: "networkidle2",
  timeout: 30000,
});

// Esperar a que termine la animación de entrada (~5s)
await new Promise((r) => setTimeout(r, 6000));

await page.screenshot({
  path: "public/projects/urde.jpg",
  type: "jpeg",
  quality: 90,
  clip: { x: 0, y: 0, width: 1280, height: 800 },
});
console.log("Screenshot guardado en public/projects/urde.jpg");
await browser.close();
