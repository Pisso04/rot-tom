import axios from "axios";
import Cookies from "universal-cookie";

export default async function getUsers() {
  const cookies = new Cookies();
  let config = {
    method: "get",
    url: "http://localhost:5000/profile",
    headers: {
      Authorization: "Bearer " + cookies.get("access"),
    },
  };

  let user = "";
  try {
    await axios(config).then((resp) => (user = resp.data));
  } catch {}
  console.log("Cookie exist", user, typeof user);
  return user;
}
