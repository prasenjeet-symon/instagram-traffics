import Axios from "axios";
import { save_email_route } from "./server_config";
import { v4 as uuid } from "uuid";

export const save_created_email = async (
  first_name: string,
  last_name: string,
  email_id: string,
  email_password: string,
  company: string,
  gender: string
) => {
  const result = await Axios.post(save_email_route, {
    first_name,
    last_name,
    company,
    email: email_id,
    email_password: email_password,
    row_uuid: uuid(),
    gender,
  });

  if (result.data.err) {
    console.log(result.data.err, "Err Happen");
  }

  return result.data;
};
