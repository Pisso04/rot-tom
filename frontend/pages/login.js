import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

const cookies = new Cookies()
// console.log(cookies.get("access"));

export default function login() {
  const router = useRouter()
  if (cookies.get('access') !== undefined) {
    router.push("/");
  }

  const [errors, setErrors] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    let config = {
      method: "post",
      url: "http://localhost:5000/login",
      data: {
        email,
        password,
      },
    };
    try {
      await axios(config)
        .catch(setErrors("Invalid credentials !!!"))
        .then((resp) =>
          cookies.set("access", resp.data.access_token, {
            path: "/",
            secure: true,
          })
        );
      router.push("/");
    } catch {}
  }

  return (
    <div className="mx-auto w-max bg-gray-800 rounded-3xl">
      {/* <div className="w-full h-full rounded-xl bg-gray-800">
        <div className="flex justify-start h-full items-center"> */}
      <div className="w-[40rem] p-8 h-max rounded-xl shadow">
        <p className="text-center text-7xl font-bold bg-gradient-to-r text-transparent bg-clip-text from-indigo-500 via-purple-500 to-pink-500">
          StreamBox
        </p>
        {/* <div className="border border-white border-opacity-20 bg-red-600 h-32 rounded-lg mt-4 bg-opacity-25 shadow">{errors}</div> */}
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="messages text-red-300 mt-2">{errors}</div>
          <div className="flex flex-col mt-2">
            <label htmlFor="email" className="text-gray-300 text-lg">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="your@email.com"
              className="shadow appearance-none bg-opacity-20 placeholder:text-gray-400 bg-white rounded w-full py-2 px-3 text-gray-300 mt-1 leading-normal text-lg focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="flex flex-col mt-10">
            <label htmlFor="password" className="text-lg text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="shadow appearance-none bg-opacity-20 placeholder:text-gray-400 bg-white rounded w-full py-2 px-3 text-gray-300 mt-1 leading-normal text-lg focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <button className="bg-green-600 rounded text-white text-xl p-2 mt-12">
            Sign In
          </button>
        </form>
      </div>
    </div>
    //   </div>
    // </div>
  );
}
