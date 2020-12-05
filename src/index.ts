import * as puppeteer from 'puppeteer';
import { create_new_yandex_mail, create_outlook_mail, create_yandex_mail } from './create-email';
import { assign_new_ip, connect_to_tor_controll, generate_email_id, generate_email_password, load_male_names_json, load_names, pick_single_user } from './utils/common-utils';
import { whatis_my_ip } from './whatismyip';
import { Chance } from 'chance';
import { extract_insta_code_from_outlook_mail, extract_insta_code_from_yandex_mail } from './extract_insta_code';

// connect to tor controll
const tor_controll = connect_to_tor_controll();

// Prepare all the fake names
const all_names = load_names();
const name_lists = [all_names.female_names, all_names.male_names];

// Run the email creator

/** 
(async () => {
  let keep_running = true;
  const chance = new Chance();

  while (keep_running) {
    try {
      await assign_new_ip(tor_controll);
      await create_outlook_mail(chance.pickone(name_lists));
      // await create_new_yandex_mail(chance.pickone(name_lists));
      // await whatis_my_ip();
    } catch (error) {
      keep_running = false;
      console.log(error);
    }
  }
})();

*/

// extract_insta_code_from_yandex_mail('khu5hi.5ingh@yandex.com', 'Khushisingh@134$').then((code) => {
//     console.log(code, 'insta code');
// });

// extract_insta_code_from_outlook_mail('aparnasingh.1234@outlook.com', 'aparnasingh@1234').then((code) => {
//     console.log(code, 'insta code');
// });
