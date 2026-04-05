import puppeteer from "puppeteer";

const URL = "http://localhost:3001/ar/portfolio/fleet/?id=8";
const WAIT_MS = 12000; // wait 12 seconds to capture delayed errors

const browser = await puppeteer.launch({
  headless: "new",
  args: [
    "--disable-extensions",     // no extensions = no extension errors
    "--no-sandbox",
    "--enable-webgl",
    "--use-gl=swiftshader",     // software WebGL for headless
  ],
});

const page = await browser.newPage();

const messages = [];

page.on("console", (msg) => {
  messages.push({
    type: msg.type(),
    text: msg.text(),
    ts: Date.now(),
  });
});

page.on("pageerror", (err) => {
  messages.push({ type: "PAGE_ERROR", text: err.message, ts: Date.now() });
});

page.on("requestfailed", (req) => {
  messages.push({
    type: "REQUEST_FAILED",
    text: `${req.url()} - ${req.failure()?.errorText}`,
    ts: Date.now(),
  });
});

console.log(`Loading ${URL} ...`);
const start = Date.now();

try {
  await page.goto(URL, { waitUntil: "networkidle2", timeout: 30000 });
  console.log(`Page loaded in ${Date.now() - start}ms`);
} catch (e) {
  console.log(`Navigation error: ${e.message}`);
}

// Wait to capture late-firing errors
console.log(`Waiting ${WAIT_MS / 1000}s for delayed errors...`);
await new Promise((r) => setTimeout(r, WAIT_MS));

await browser.close();

console.log("\n========== CONSOLE OUTPUT ==========");
if (messages.length === 0) {
  console.log("(no console messages)");
} else {
  for (const m of messages) {
    const elapsed = ((m.ts - start) / 1000).toFixed(1);
    console.log(`[${elapsed}s] [${m.type.toUpperCase()}] ${m.text}`);
  }
}
console.log(`\nTotal messages: ${messages.length}`);

const errors = messages.filter(
  (m) =>
    m.type === "error" ||
    m.type === "PAGE_ERROR" ||
    m.type === "REQUEST_FAILED"
);
console.log(`Errors: ${errors.length}`);

if (errors.length > 0) {
  console.log("\n========== ERRORS ONLY ==========");
  for (const e of errors) {
    console.log(`  [${e.type.toUpperCase()}] ${e.text}`);
  }
}
