import * as puppeteer from "puppeteer";
import {
  create_new_proton_email,
  create_new_yandex_mail,
  create_yandex_mail,
} from "./create-email";
import {
  assign_new_ip,
  generate_email_id,
  generate_email_password,
  load_male_names_json,
  load_names,
  pick_single_user,
} from "./utils/common-utils";
import { whatis_my_ip } from "./whatismyip";
import { Chance } from "chance";

// Prepare all the fake names
const all_names = load_names();
const name_lists = [all_names.female_names, all_names.male_names];

// Run the email creator

(async () => {
  let keep_running = true;
  const chance = new Chance();

  while (keep_running) {
    try {
      await assign_new_ip();
      await create_new_yandex_mail(chance.pickone(name_lists));
    } catch (error) {
      keep_running = false;
      console.log(error);
    }
  }
})();
