import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "universal-cookie";
import JwtDecode from "../../services/JwtDecode";
import { useRouter } from "next/router";

export default function dashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter()
  const cookies = new Cookies()
  const cookie = cookies.get("access")

  if (cookie === undefined) {
    router.push("/");
  } else {
    const user = JwtDecode(cookie);
    if (user.admin === false) router.push("/");
  }

  useEffect(() => {
    if (cookie === undefined) {
      router.push("/");
    } else {
      const user = JwtDecode(cookie);
      if (user.admin === false) router.push("/");
    }

    console.log(process.env);
    console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
    setLoading(true);
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "statistique")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
        console.log(data);
      });
  }, []);

  if (isLoading) return <p> Loading... </p>;
  if (!data) return <p> No profile data </p>;
  return (
    <div className="my-10 flex items-center flex-col">
      <span className="text-gray-500 text-7xl lobster">Dashboard</span>
      <div className="inline-flex items-center justify-center flex-wrap mt-10 mb-10">
        <Link href="/dashboard/users">
          <a className="w-96 hover:border hover:border-blue-600 m-3 h-64 bg-gray-100 p-5 rounded-2xl shadow flex flex-col items-center justify-center">
            <span className="anton text-[7rem] text-gray-500">
              {data.nbre_users}
            </span>
            <span className="anton text-4xl text-gray-500">Users</span>
          </a>
        </Link>
        <Link href="/dashboard/movies">
          <a className="w-96 hover:border hover:border-blue-600 m-3 h-64 bg-gray-100 p-5 rounded-2xl shadow flex flex-col items-center justify-center">
            <span className="anton text-[7rem] text-gray-500">
              {data.nbre_movies}
            </span>
            <span className="anton text-4xl text-gray-500">Movies</span>
          </a>
        </Link>
        <Link href={"#"}>
          <a className="w-96 hover:border hover:border-blue-600 m-3 h-64 bg-gray-100 p-5 rounded-2xl shadow flex flex-col items-center justify-center">
            <span className="anton text-[7rem] text-gray-500">
              {data.nbre_genres}
            </span>
            <span className="anton text-4xl text-gray-500">Genres</span>
          </a>
        </Link>
        <div className="w-96 hover:border hover:border-blue-600 m-3 h-64 bg-gray-100 p-5 rounded-2xl shadow flex flex-col items-center justify-center">
          <span className="anton text-[7rem] text-gray-500">
            {data.nbre_comments}
          </span>
          <span className="anton text-4xl text-gray-500">Comments</span>
        </div>
      </div>

      <div className="my-7 luckiest text-4xl text-gray-500 py-1 px-5 rounded-lg bg-gray-100">
        Movie By genres{" "}
      </div>

      <div className="inline-flex items-center justify-center flex-wrap mt-10">
        {data.movies_by_genres.map((genre) => (
          <div
            key={genre.name}
            className="w-64 hover:border hover:border-blue-600 m-3 h-64 bg-gray-100 p-5 rounded-2xl shadow flex flex-col items-center justify-center"
          >
            <span className="anton text-[7rem] text-gray-500">
              {genre.total}
            </span>
            <span className="anton text-4xl text-gray-500">{genre.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
