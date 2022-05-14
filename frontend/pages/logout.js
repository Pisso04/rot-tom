import { useRouter } from "next/router";
import Cookies from "universal-cookie";

export default function logout() {
    const cookies = new Cookies();
    const router = useRouter()
    cookies.remove('access')
    router.push('/login')
}
