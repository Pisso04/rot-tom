import { useRouter } from "next/router";
import Cookies from "universal-cookie";

export default function logout() {
  const cookies = new Cookies();
  const cookie = cookies.get("access");
  const router = useRouter();

  if (cookie !== undefined) {
    cookies.remove("access");
    router.push("/login");
  }
}
