const puppeteer = require('puppeteer');
const {
    create_new_email
} = require('./create-email');

(async () => {
    const browser = await puppeteer.launch({ headless: false});

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);

    await page.goto('https://outlook.live.com/owa/', {
        waitUntil: 'domcontentloaded',
        timeout: 0
    });

    const signup_button_outlook = (await page.$$('.action'))[1];
    await signup_button_outlook.click({
        delay: '200'
    })

    /**
     * User info
     */
    const new_email = 'jensengering54321'
    const password = 'jensengering@123456'
    const first_name = 'Jensen';
    const last_name = 'Jering';
    const birth_date = {
        month: '2',
        day: '14',
        year: '2004'
    }

    await page.waitForNavigation();
    await page.focus('#MemberName');
    await page.keyboard.type(new_email, {
        delay: 150
    });
    await page.click('#iSignupAction', {
        delay: 200
    });

    await page.waitForSelector('#inner');
    await page.waitForSelector('#PasswordText');
    const inner_box = await page.$('#inner');
    await inner_box.click();
    await page.focus("#PasswordText");
    await page.keyboard.type(password, {delay: 300});
    await page.click("#iSignupAction");

    /**
     * Fill the full name
     */
    await page.waitForSelector('#inner');
    await page.waitForSelector('#FirstName');
    await page.waitForSelector('#LastName');

    const inner_box_full_name = await page.$('#inner');
    inner_box_full_name.click();

    await page.focus("#FirstName");
    await page.keyboard.type(first_name, {delay: 300});
    await page.focus('#LastName');
    await page.keyboard.type(last_name, {delay: 200});
    await page.click('#iSignupAction');

    /**
     * Fill the birth date and country
     */

    await page.waitForSelector('#inner');
    await page.waitForSelector('#iSignupAction');
    await page.waitForSelector('#BirthMonth');
    await page.waitForSelector('#BirthDay');
    await page.waitForSelector('#BirthYear');
    await page.waitForSelector('#Country');
    const inner_box_birth_date = await page.$('#inner');
    inner_box_birth_date.click();

    await page.select("#BirthMonth", birth_date.month);
    await page.select("#BirthDay", birth_date.day)
    await page.select("#BirthYear", birth_date.year);

    await page.click("#iSignupAction");

    await browser.waitForTarget(() => false);
    await browser.close();
})();