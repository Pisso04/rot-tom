import Cookies from "universal-cookie";
import axios from "axios";
import React, { useState, useEffect } from "react";
import JwtDecode from "../services/JwtDecode";
import { useRouter } from "next/router";
const cookie = new Cookies().get("access");

export default function Profil() {
  const router = useRouter();
  const [user, setUser] = useState([]);
  const cookieUser = JwtDecode(cookie);

  if (cookie === undefined) {
    router.push("/");
  }

  async function getUser() {
    let res = [];
    let config = {
      method: "get",
      url: "http://localhost:5000/users/" + cookieUser.id,
      headers: {
        Authorization: "Bearer " + cookie,
      },
    };
    await axios(config).then((response) => {
      res = response.data;
    });
    setUser(res);
  }

  useEffect(() => {
    if (cookie === undefined) {
      router.push("/");
    }
    // console.log(user.length);
    if (user.length === 0) getUser();
    // console.log(user);
  }, []);

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    let config = {
      method: "patch",
      url: "http://localhost:5000/users/" + cookieUser.id,
      headers: {
        Authorization: "Bearer " + cookie,
      },
      data: {
        username,
        email,
        password,
      },
    };
    await axios(config).then((data) => {
      console.log(data);
      if (data.status === 200 && data.data.errors === undefined) {
        setSuccess("");
        setErrors([]);
        setSuccess("User Updated !!!");
      } else {
        setErrors([]);
        setSuccess("");
        setErrors(data.data.errors);
      }
    });
  }

  // Render data...
  return (
    <div className="my-10 flex items-center flex-col">
      <span className="text-gray-500 text-7xl lobster">My Profil</span>
      <div className="mt-14 flex flex-col w-[95%]">
        <div className="luckiest text-4xl text-gray-500 py-1 px-5 rounded-lg bg-gray-100">
          Update Profil
        </div>
        <form
          onSubmit={handleSubmit}
          className="py-4 flex flex-col space-y-10 px-5"
        >
          <div className="messages text-red-600 mt-2">{errors.join(", ")}</div>
          <div className="messages text-green-600 mt-2">{success}</div>
          <div className="flex-col space-y-2">
            <label htmlFor="username" className="text-gray-600 poppins text-lg">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder={user.username}
              className="w-full px-3 py-2 text-lg poppins border-none bg-black bg-opacity-10 appearance-none rounded-lg text-gray-700"
            />
          </div>
          <div className="flex-col space-y-2">
            <label htmlFor="email" className="text-gray-600 poppins text-lg">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder={user.email}
              id="email"
              className="w-full px-3 py-2 text-lg poppins border-none bg-black bg-opacity-10 appearance-none rounded-lg text-gray-700"
            />
          </div>
          <div className="flex-col space-y-2">
            <label htmlFor="password" className="text-gray-600 poppins text-lg">
              Confirm Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-3 py-2 text-lg poppins border-none bg-black bg-opacity-10 rounded-lg text-gray-700"
            />
          </div>
          <button
            type="submit"
            name="register"
            className="w-full px-6 py-2 bg-gray-800 text-white poppins text-xl leading-tight uppercase rounded shadow-md"
          >
            UPDATE
          </button>
        </form>
      </div>
    </div>
  );
}
