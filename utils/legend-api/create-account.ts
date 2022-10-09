import axios from "axios";
import store from "redux/store";

export const updateAccount = (args: {
  signature: string;
  timestamp: number;
  profile_image: string;
  banner_image: string;
  account_name: string;
  bio: string;
  email: string;
  external_link: string;
  twitter_link: string;
  instagram_link: string;
}) => {
  return new Promise<string>((resolve, reject) => {
    let data = new FormData();
    Object.keys(args).forEach((i: string) => {
      data.append(i, (args as { [x: string]: any })[i] || `""`);
    });
    axios({
      method: "post",
      url: store.getState().config.url + "/api/v1/account/update",
      headers: { "Content-Type": "multipart/form-data" },
      data,
    })
      .then((res) => {
        resolve(res.data.account);
      })
      .catch((err) => reject(err));
  });
};
