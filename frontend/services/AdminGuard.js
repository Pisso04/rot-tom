import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

export default function AdminGuard() {
    const router = useRouter()
    const cookies = new Cookies()
    // console.log(cookies().get('access'))
    if (cookies().get('access') !== undefined) {
        let config = {
            method: "get",
            url: "http://localhost:5000/profile",
            headers: {
                Authorization: cookies().get('access'),
            },
        };

        let user = false;

        try {
            await axios(config)
            .then((resp) => user = resp.data);
        }
        catch {}

        if (!user.admin) router.back()
    }
}