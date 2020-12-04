import * as puppeteer from "puppeteer";

export const whatis_my_ip = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--proxy-server=socks5://127.0.0.1:9050"],
  });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  await page.goto("https://check.torproject.org/", {
    waitUntil: "domcontentloaded",
    timeout: 0,
  });

  await page.waitForNavigation();
  await browser.close();
};
