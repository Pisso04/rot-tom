import Link from "next/link";
import MoviesList from '../../../components/movies_list';
import Cookies from 'universal-cookie';
import { useRouter } from "next/router";

const cookies = new Cookies();
export default function movies_dashboard() {
    const router = useRouter();

    // if (cookies.get("access") === undefined) {
    //     router.push("/");
    // } else {
    //     const user = JwtDecode(cookies.get("access"))
    //     if (user.admin === false) router.push("/")
    // }

  return (
        <div className="my-10 flex items-center flex-col">
        <span className="text-gray-500 text-3xl lobster">
            Dashboard - Movies
        </span>
        <div className="flex flex-rox space-x-8 mt-2">
            <Link href="/dashboard/movies/tmdb"><a className="w-auto hover:border hover:border-blue-600 m-3 h-auto bg-gray-100 p-2 rounded-md shadow flex flex-col items-center justify-center">Movies Database</a></Link>
            <Link href="/dashboard/movies"><a className="w-auto hover:border hover:border-blue-600 m-3 h-auto bg-gray-100 p-2 rounded-md shadow flex flex-col items-center justify-center">StreamBox Movies</a></Link>
        </div>
        <div className="mt-14 flex flex-col w-[95%]">
            < MoviesList />
        </div>
    </div>

  )
}
