import { chromium } from 'playwright';

const seeds = [37,38,39,40,41,42,43,44,45,46];
let grandTotal = 0;

for (const seed of seeds) {
  // Use the actual URL pattern you were given in your exam
  const url = `https://codedamn-classrooms.github.io/Playwright-Webtable-Assignment/${seed}/`;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const allNumbers = await page.$$eval('table td', tds => 
    tds.map(td => td.innerText.trim()).filter(x => !isNaN(x) && x !== '').map(Number)
  );

  grandTotal += allNumbers.reduce((a, b) => a + b, 0);

  await browser.close();
}
console.log(`TOTAL_SUM=${grandTotal}`);
