import * as puppeteer from "puppeteer";
import { save_created_email } from "./save_created_email";
import {
  delay_time,
  generate_email_id,
  generate_email_password,
  give_date_of_birth,
  pick_single_user,
} from "./utils/common-utils";

export const create_new_outlook_mail = async (
  first_name: string,
  last_name: string,
  password: string,
  email: string
) => {
  const birth_date = give_date_of_birth();

  const browser = await puppeteer.launch({
    headless: false,
    args: ["--proxy-server=socks5://127.0.0.1:9050"],
  });
  const incognitoB = await browser.createIncognitoBrowserContext();
  const page = await incognitoB.newPage();
  page.setDefaultNavigationTimeout(0);
  await page.goto("https://outlook.live.com/owa/", {
    waitUntil: "domcontentloaded",
  });


  await page.waitForSelector(".action-wrapper");

  // await page.waitForSelector(".action");
  await page.click(".action-wrapper", { delay: delay_time() });

  await page.waitForSelector("#MemberName");
  await page.focus("#MemberName");
  await page.keyboard.type(email, { delay: delay_time() });
  await page.click("#iSignupAction", { delay: delay_time() });

  await page.waitForSelector("#PasswordInput");
  await page.focus("#PasswordInput");
  await page.keyboard.type(password, { delay: delay_time() });

  await page.waitForSelector("#iSignupAction");
  await page.click("#iSignupAction", { delay: delay_time() });

  await page.waitForSelector("#FirstName");
  await page.focus("#FirstName");
  await page.keyboard.type(first_name, { delay: delay_time() });

  await page.waitForSelector("#LastName");
  await page.focus("#LastName");
  await page.keyboard.type(last_name, { delay: delay_time() });

  await page.waitForSelector("#iSignupAction");
  await page.click("#iSignupAction", { delay: delay_time() });

  await page.waitForSelector("#pageControlHost");
  await page.waitForSelector("select[name=BirthMonth]");
  await page.select("select[name=BirthMonth]", birth_date.month.toString());

  await page.waitForSelector("select[name=BirthDay]");
  await page.select("select[name=BirthDay]", birth_date.day.toString());

  await page.waitForSelector("select[name=BirthYear]");
  await page.select("select[name=BirthYear]", birth_date.year.toString());

  await page.waitForSelector("input#iSignupAction");
  await page.click("input#iSignupAction", { delay: delay_time() });

  await page.waitForNavigation({ waitUntil: "networkidle2" });
  await browser.close();
};

export const create_yandex_mail = async (
  first_name: string,
  last_name: string,
  password: string,
  email: string
) => {
  const security_question_answer = " Kumar Singh";

  const browser = await puppeteer.launch({
    headless: false,
    args: ["--proxy-server=socks5://127.0.0.1:9050"],
  });

  const incognitoB = await browser.createIncognitoBrowserContext();
  const page = await incognitoB.newPage();
  page.setDefaultNavigationTimeout(0);
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

  await page.waitForNavigation({ waitUntil: "networkidle2" });
  await browser.close();
};

export const create_outlook_mail = async (all_names: any[]) => {
  const user = pick_single_user(all_names);
  const first_name = user.first_name;
  const last_name = user.last_name;
  const email = generate_email_id(
    user.first_name.toLowerCase() + user.last_name.toLowerCase()
  );
  const password = generate_email_password(user.first_name);
  const email_id = `${email}@outlook.com`;
  const gender = user.gender;
  try {
    await create_new_outlook_mail(first_name, last_name, password, email);
    await save_created_email(
      first_name,
      last_name,
      email_id,
      password,
      "OUTLOOK",
      gender
    );
  } catch (error) {
    console.error(
      error,
      "Error occured while creating email... terminating process"
    );
    throw new Error("error while creating email. browser closed by human.");
  }
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
    await create_yandex_mail(first_name, last_name, password, email);
    await save_created_email(
      first_name,
      last_name,
      email_id,
      password,
      "YANDEX",
      gender
    );
  } catch (error) {
    console.error(
      error,
      "Error occured while creating email... terminating process"
    );
    throw new Error("error while creating email. browser closed by human.");
  }
};
