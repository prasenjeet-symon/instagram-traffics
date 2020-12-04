import { readJSONSync } from "fs-extra";
import { path } from "ghost-cursor";
import * as pathe from "path";
var TorControl = require("tor-control");
import { Chance } from "chance";

export const generate_email_id = (user_name: string) => {
  const time_stamp = +new Date();
  const single_name = user_name.trim().replace(" ", "_");

  const email = `${single_name}.${time_stamp.toString().slice(2)}`;
  return email;
};

export const generate_email_password = (user_name: string) => {
  const time_stamp = +new Date();
  const single_name = user_name.trim().replace(" ", "_");

  const password = `${single_name}@${time_stamp}`;
  return password;
};

export const load_male_names_json = () => {
  const male_names = readJSONSync(
    pathe.join(__dirname, "../../resources", "male_names.json")
  );
  return male_names as any[];
};

export const load_female_names_json = () => {
  const female_names = readJSONSync(
    pathe.join(__dirname, "../../resources", "female_names.json")
  );
  return female_names as any[];
};

export const load_names = () => {
  const male_names = load_male_names_json();
  const female_names = load_female_names_json();
  return {
    male_names: male_names.map((p) => {
      return { full_name: p.name, gender: "male" };
    }),
    female_names: female_names.map((p) => {
      return { full_name: p.name, gender: "female" };
    }),
  };
};

export const pick_single_user = (name_list: any[]) => {
  const chance = new Chance();
  const picked_one = chance.pickone(name_list);
  const full_name_trimed = picked_one.full_name.trim();
  const full_name_arr = full_name_trimed.split(" ");
  let first_name = null;
  let last_name = null;

  if (full_name_arr.length >= 2) {
    first_name = full_name_arr[0];
    last_name = full_name_arr[1];
  } else {
    first_name = full_name_arr[0];
    last_name = "Singh";
  }

  return {
    first_name: first_name,
    last_name: last_name,
    gender: picked_one.gender,
  } as { first_name: string; last_name: string; gender: "male" | "female" };
};

export const assign_new_ip = (password = "password") => {
  return new Promise<"OK">((resolve, reject) => {
    var control = new TorControl({
      // Your password for tor-control
      password,
      // Keep connection (persistent)
      persistent: false,
    });

    control.signalNewnym(function (err: any, status: any) {
      // Get a new circuit / ip
      if (err) {
        reject(err);
      } else {
        resolve(status.messages[0]); // --> "OK"
      }
    });
  });
};

export const delay_time = () => {
  const delays = [100, 200, 50, 400, 300, 150, 120, 110, 90, 70, 35];
  const chance = new Chance();
  return chance.pickone(delays);
};
