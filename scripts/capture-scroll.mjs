import { chromium } from "playwright-core";

const browser = await chromium.launch({
  executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
const height = await page.locator(".scroll-story").evaluate((element) => element.scrollHeight - window.innerHeight);
for (const [name, progress] of [["opening", 0], ["feeder-product", .20], ["jungle-product", .36], ["mushroom-product", .53], ["tire-swing-product", .70], ["finale", .92]]) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), height * progress);
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${name}-scroll.png` });
}
const parallaxTop = await page.locator(".parallax-showcase").evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
const parallaxTravel = await page.locator(".parallax-showcase").evaluate((element) => element.offsetHeight - window.innerHeight);
for (const [name, progress] of [["parallax-hide", .08], ["parallax-climb", .43], ["parallax-personalised", .78]]) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), parallaxTop + parallaxTravel * progress);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${name}-scroll.png` });
}
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
mobile.on("pageerror", (error) => errors.push(`mobile: ${error.message}`));
await mobile.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
const mobileHeight = await mobile.locator(".scroll-story").evaluate((element) => element.scrollHeight - window.innerHeight);
await mobile.screenshot({ path: "mobile-opening-scroll.png" });
await mobile.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), mobileHeight * .42);
await mobile.waitForTimeout(700);
await mobile.screenshot({ path: "mobile-mid-scroll.png" });
const mobileParallaxTop = await mobile.locator(".parallax-showcase").evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
const mobileParallaxTravel = await mobile.locator(".parallax-showcase").evaluate((element) => element.offsetHeight - window.innerHeight);
await mobile.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), mobileParallaxTop + mobileParallaxTravel * .45);
await mobile.waitForTimeout(700);
await mobile.screenshot({ path: "mobile-parallax-scroll.png" });
console.log(JSON.stringify({ title: await page.title(), body: (await page.locator("body").innerText()).length, errors }));
await browser.close();
