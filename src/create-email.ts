import * as puppeteer from "puppeteer";
import { save_created_email } from "./save_created_email";
import {
  delay_time,
  generate_email_id,
  generate_email_password,
  pick_single_user,
} from "./utils/common-utils";

export async function create_new_proton_email(
  user_name: string,
  password: string,
  password_again: string
) {
  if (password_again !== password) {
    return;
  }

  /**
   * Create new proton email, with human intervention , need to update this
   */
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--proxy-server=socks5://127.0.0.1:9050"],
    slowMo: 50,
  });
  const incognitoB = await browser.createIncognitoBrowserContext();

  const page = await incognitoB.newPage();
  await page.goto("https://protonmail.com/", {
    waitUntil: "domcontentloaded",
    timeout: 0,
  });

  /**
   * Click the button to create the account
   */
  await page.waitForSelector(".encrypted-email");
  await page.click(".encrypted-email");

  /**
   * CLick the free plan of the proton  mail
   */

  await page.waitForSelector("div[data-plan=free]", { visible: true });
  const free_plan = await page.$("div[data-plan=free]");
  free_plan.click();
  await page.waitForSelector("#freePlan", { visible: true });
  await page.click("#freePlan");

  /**
   * Fill the username and password
   */

  // Fill the username which is in iframe
  await page.waitForSelector(".signupIframe-iframe>iframe");
  const username_frame = await page.$(".signupIframe-iframe>iframe");
  const username_frame_data = await username_frame.contentFrame();
  await username_frame_data.waitForSelector("#username");
  await username_frame_data.type("#username", user_name, { delay: 100 });

  // Fill the password
  await page.focus("#password");
  await page.keyboard.type(password, { delay: 200 });

  // Fill the password again
  await page.focus("#passwordc");
  await page.keyboard.type(password, { delay: 100 });

  // Click the submit button
  await page.waitForSelector(".signupIframe-iframe>iframe.bottom");
  const submit_iframe = await page.$(".signupIframe-iframe>iframe.bottom");
  const submit_iframe_data = await submit_iframe.contentFrame();
  await submit_iframe_data.click(".btn-submit", { delay: 50 });

  await page.waitForSelector(".pm_modal", { visible: true });
  await page.click("#confirmModalBtn", { delay: 100 });

  await browser.waitForTarget(() => false);
  await browser.close();
}

export const create_yandex_mail = async (
  first_name: string,
  last_name: string,
  password: string,
  email: string
) => {
  const security_question_answer = " Kumar Singh";

  const browser = await puppeteer.launch({
    headless: false,
    // args: ["--proxy-server=socks5://127.0.0.1:9050"],
    slowMo: 50,
  });

  const incognitoB = await browser.createIncognitoBrowserContext();
  const page = await incognitoB.newPage();
  await page.goto("https://passport.yandex.com/", {
    waitUntil: "domcontentloaded",
  });

  await page.waitForSelector(".passp-exp-register-button");
  await page.click(".passp-exp-register-button", { delay: delay_time() });

  await page.waitForSelector("#firstname");
  await page.focus("#firstname");
  await page.keyboard.type(first_name, { delay: delay_time() });

  await page.waitForSelector("#lastname");
  await page.focus("#lastname");
  await page.keyboard.type(last_name, { delay: delay_time() });

  await page.waitForSelector("#login");
  await page.focus("#login");
  await page.keyboard.type(email, { delay: delay_time() });

  await page.waitForSelector("#password");
  await page.focus("#password");
  await page.keyboard.type(password, { delay: delay_time() });

  await page.waitForSelector("#password_confirm");
  await page.focus("#password_confirm");
  await page.keyboard.type(password, { delay: delay_time() });

  await page.waitForSelector(".link_has-no-phone");
  await page.click(".link_has-no-phone", { delay: delay_time() });

  await page.waitForSelector("#hint_answer", { visible: false });
  await page.focus("#hint_answer");
  await page.keyboard.type(security_question_answer, { delay: delay_time() });

  await browser.waitForTarget((target) => false);
  await browser.close();
};

export const create_new_yandex_mail = async (all_names: any[]) => {
  const user = pick_single_user(all_names);
  const first_name = user.first_name;
  const last_name = user.last_name;
  const email = generate_email_id(
    user.first_name.toLowerCase() + user.last_name.toLowerCase()
  );
  const password = generate_email_password(user.first_name);
  const email_id = `${email}@yandex.com`;
  const gender = user.gender;

  try {
    try {
      await create_yandex_mail(first_name, last_name, password, email);
    } catch (error) {}
    await save_created_email(
      first_name,
      last_name,
      email_id,
      password,
      "YANDEX",
      gender
    );
  } catch (error) {
    console.log(error, "error happens");
  }
};
