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

/**
 *  Load all names once
 */

const all_names = load_names();

(async () => {
  while (true) {
    // change ip
    await assign_new_ip();
    await create_new_yandex_mail(all_names.female_names);
  }
})();
