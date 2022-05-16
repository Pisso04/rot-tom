import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import axios from "axios";
import JwtDecode from "../../../services/JwtDecode";
import Link from "next/link";
const cookies = new Cookies();
const cookie = cookies.get("access");

export default function users() {
  const router = useRouter();
  const [allUsers, setUsers] = useState([]);

  if (cookies.get("access") === undefined) {
    router.push("/");
  } else {
    const user = JwtDecode(cookies.get("access"))
    if (user.admin === false) router.push("/")
  }

  async function deleteUser(e) {
    // console.log(JwtDecode(cookie).id);
    let config = {
      method: "delete",
      url: "http://localhost:5000/users/" + e.target.id,
      headers: {
        Authorization: "Bearer " + cookie,
      },
      data: { id: JwtDecode(cookie).id },
    };
    await axios(config);
    getUsers();
  }

  async function setAdmin(e) {
    // console.log(JwtDecode(cookie).id);
    let config = {
      method: "post",
      url: "http://localhost:5000/users/admin/" + e.target.id,
      headers: {
        Authorization: "Bearer " + cookie,
      }
    };
    await axios(config);
    getUsers();
  }

  async function getUsers() {
    let results = [];
    let config = {
      method: "get",
      url: "http://localhost:5000/users",
      headers: {
        Authorization: "Bearer " + cookies.get("access"),
      },
    };

    await axios(config).then((response) => {
      response.data.map((data) =>
        results.push(
          <div
            key={data._id}
            className="flex flex-col shadow rounded-xl m-3 group"
          >
            <div className="w-[18rem] h-80 rounded-t-xl relative">
              <img
                src="https://www.melty.fr/wp-content/uploads/meltyfr/2021/12/media-6405.jpg"
                alt="ninho"
                className="w-full h-full object-center object-cover rounded-t-xl"
              />
              <div className="absolute hidden group-hover:inline-flex space-x-2 right-2 bottom-2">
                <Link href={"/dashboard/users/" + data._id}>
                  <a className="px-3 py-1 rounded bg-gray-800 text-white playfair">
                    Edit
                  </a>
                </Link>
                <button
                  onClick={deleteUser}
                  id={data._id}
                  className="px-3 py-1 rounded bg-gray-800 text-white playfair"
                >
                  Delete
                </button>
                <button
                  onClick={setAdmin}
                  hidden={data.is_admin || data.has_admin_privilege}
                  id={data._id}
                  className="px-3 py-1 rounded bg-gray-800 text-white playfair"
                >
                  set Admin
                </button>
              </div>
            </div>
            <div className="border rounded-b-xl bg-gray-100 inline-flex flex-col justify-center p-3">
              <span className="text-base text-gray-500">{data.username}</span>
              <span className="text-base text-gray-500">{data.email}</span>
              {data.is_admin === true || data.has_admin_privilege === true ? (
                <span className="text-base text-green-500">Admin</span>
              ) : (
                ""
              )}
            </div>
          </div>
        )
      );
    });
    setUsers(results);
  }

  useEffect(() => {
    if (cookies.get("access") === undefined) {
      router.push("/");
    } else {
      const user = JwtDecode(cookies.get("access"))
      if (user.admin === false) router.push("/")
    }
    if (users.length === 0) getUsers();
  }, []);

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    let config = {
      method: "post",
      url: "http://localhost:5000/users",
      headers: {
        Authorization: "Bearer " + cookies.get("access"),
      },
      data: {
        username,
        email,
        password,
      },
    };
    await axios(config).then((data) => {
      console.log(data);
      if (data.status === 201 && data.data.errors === undefined) {
        setSuccess("");
        setErrors([]);
        setSuccess("User Created !!!");
        getUsers();
      } else {
        setErrors([]);
        setSuccess("");
        setErrors(data.data.errors);
      }
    });
  }

  return (
    <div className="my-10 flex items-center flex-col">
      <span className="text-gray-500 text-7xl lobster">Dashboard - Users</span>
      <div className="mt-14 flex flex-col w-[95%]">
        <div className="luckiest text-4xl text-gray-500 py-1 px-5 rounded-lg bg-gray-100">
          Create User
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
              id="email"
              className="w-full px-3 py-2 text-lg poppins border-none bg-black bg-opacity-10 appearance-none rounded-lg text-gray-700"
            />
          </div>
          <div className="flex-col space-y-2">
            <label htmlFor="password" className="text-gray-600 poppins text-lg">
              Password
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
            CREATE USERS
          </button>
        </form>
        <div className="luckiest text-4xl text-gray-500 py-1 px-5 rounded-lg bg-gray-100 mt-20">
          Users
        </div>
        <div className="inline-flex items-center justify-center flex-wrap mt-14">
          {allUsers}
        </div>
      </div>
    </div>
  );
}
