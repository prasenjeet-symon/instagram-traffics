import * as puppeteer from 'puppeteer';
import { delay_time } from './utils/common-utils';

/**
 * Extract insta code from yandex
 */

export const extract_insta_code_from_yandex_mail = async (email: string, password: string) => {
    // ------------------------------------------------------------------>
    const browser = await puppeteer.launch({
        headless: false,
        // args: ['--proxy-server=socks5://127.0.0.1:9050'],
    });
    // ------------------------------------------------------------------>

    // ------------------------------------------------------------------>
    const incognitoB = await browser.createIncognitoBrowserContext();
    // ------------------------------------------------------------------>

    // ------------------------------------------------------------------>
    const page = await incognitoB.newPage();
    // ------------------------------------------------------------------>

    // ------------------------------------------------------------------>
    page.setDefaultNavigationTimeout(0);
    await page.goto('https://mail.yandex.com/', {
        waitUntil: 'domcontentloaded',
    });
    // ------------------------------------------------------------------>

    // ------------------------------------------------------------------>
    await page.waitForSelector('.HeadBanner-ButtonsWrapper > a');
    const login_button = await page.$$('.HeadBanner-ButtonsWrapper > a');
    await login_button[1].click();
    // ------------------------------------------------------------------>

    // ------------------------------------------------------------------>
    await page.waitForSelector('#passp-field-login');
    await page.focus('#passp-field-login');
    await page.keyboard.type(email, { delay: delay_time() });
    await page.click('.passp-sign-in-button');
    // ------------------------------------------------------------------>

    // ------------------------------------------------------------------>
    try {
        await page.waitForSelector('div[data-t=phone_skip]', { timeout: 100 });
        await page.click('div[data-t=phone_skip]');
    } catch (error) {}
    // ------------------------------------------------------------------>

    // ------------------------------------------------------------------>
    await page.waitForSelector('#passp-field-passwd');
    await page.focus('#passp-field-passwd');
    await page.keyboard.type(password, { delay: delay_time() });
    await page.click('.passp-sign-in-button');
    // ------------------------------------------------------------------>

    // ------------------------------------------------------------------>
    try {
        await page.waitForSelector('button.mail-Wizard-Close', { visible: false, timeout: 100 });
        await page.click('button.mail-Wizard-Close', { delay: delay_time() });
    } catch (error) {}
    // ------------------------------------------------------------------>

    // ------------------------------------------------------------------>
    await page.waitForSelector("[title ~= 'no-reply@mail.instagram.com']");
    await page.click("[title ~= 'no-reply@mail.instagram.com']");
    // ------------------------------------------------------------------>

    // ------------------------------------------------------------------>
    await page.waitForSelector('table>tbody>tr:nth-of-type(2)>td:nth-of-type(2)');
    const insta_code = await page.evaluate((e) => {
        let code: string = '';
        document.querySelectorAll('table>tbody>tr:nth-of-type(2)>td:nth-of-type(2)').forEach((ele) => {
            if (!isNaN(ele.textContent as any)) {
                code = ele.textContent.trim();
            }
        });
        return code;
    });
    // ------------------------------------------------------------------>

    // ------------------------------------------------------------------>
    await page.click('.user-account__pic');
    await page.waitForSelector("a[aria-label='Log out']", { visible: false });
    await page.click("a[aria-label='Log out']", { delay: delay_time() });
    // ------------------------------------------------------------------>

    // ------------------------------------------------------------------>
    await page.waitForNavigation();
    await browser.close();
    // ------------------------------------------------------------------>

    return insta_code;
};

/**
 * Extract the code from outllok mail
 */

export const extract_insta_code_from_outlook_mail = async (email: string, password: string) => {
    // ------------------------------------------------------------------>
    const browser = await puppeteer.launch({
        headless: false,
        // args: ['--proxy-server=socks5://127.0.0.1:9050'],
    });
    // ------------------------------------------------------------------>

    // ------------------------------------------------------------------>
    const incognitoB = await browser.createIncognitoBrowserContext();
    // ------------------------------------------------------------------>

    // ------------------------------------------------------------------>
    const page = await incognitoB.newPage();
    // ------------------------------------------------------------------>

    // ------------------------------------------------------------------>
    page.setDefaultNavigationTimeout(0);
    await page.goto('https://outlook.live.com/owa/', {
        waitUntil: 'domcontentloaded',
    });
    // ------------------------------------------------------------------>

    // ------------------------------------------------------------------>
    await page.waitForSelector("a[data-task='signin']");
    await page.click("a[data-task='signin']", { delay: delay_time() });
    // ------------------------------------------------------------------>

    await page.waitForSelector("input[name='loginfmt']");
    await page.focus("input[name='loginfmt']");
    await page.keyboard.type(email, { delay: delay_time() });
    await page.click("input[id='idSIButton9']", { delay: delay_time() });
    // ------------------------------------------------------------------>

    // ------------------------------------------------------------------>
    await page.waitForSelector("[name='passwd']");
    await page.waitForTimeout(1000);
    await page.focus("[name='passwd']");
    await page.keyboard.type(password, { delay: delay_time() });
    await page.click("[id='idSIButton9']", { delay: delay_time() });
    // ------------------------------------------------------------------>

    // ------------------------------------------------------------------>
    await page.waitForSelector("[title ~= 'no-reply@mail.instagram.com']");
    await page.click("[title ~= 'no-reply@mail.instagram.com']", { delay: delay_time() });
    // ------------------------------------------------------------------>

    // ------------------------------------------------------------------>
    await page.waitForSelector('table>tbody>tr:nth-of-type(2)>td:nth-of-type(2)');
    const insta_code = await page.evaluate((e) => {
        let code: string = '';
        document.querySelectorAll('table>tbody>tr:nth-of-type(2)>td:nth-of-type(2)').forEach((ele) => {
            if (!isNaN(ele.textContent as any)) {
                code = ele.textContent.trim();
            }
        });
        return code;
    });
    // ------------------------------------------------------------------>

    // ------------------------------------------------------------------>
    await page.click('._2KqWkae0FcyhdNhWQ-Cp-M');
    await page.waitForSelector('#mectrl_body_signOut', { visible: false });
    await page.click('#mectrl_body_signOut', { delay: delay_time() });
    // ------------------------------------------------------------------>

    // ------------------------------------------------------------------>
    await page.waitForNavigation();
    await browser.close();
    // ------------------------------------------------------------------>

    return insta_code;
};
