import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Users() {
    const nextRouter = useRouter()
  console.log(cookies.get("access"));
//   if (cookies.get("access") === undefined) {
//     router.push("/");
//   } else if (cookies.get("access").admin != "admin") router.push("/");

  const [errors, setErrors] = useState([]);

//   async function create(email, password) {
//     let config = {
//       method: "post",
//       url: "http://localhost:5000/users",
//       data: {
//         email,
//         password,
//       },
//     };
//     await axios(config).then((data) =>
//       cookies.set("access", data.data.access_token, {
//         path: "/",
//         secure: true,
//       })
//     );
//     router.push("/");
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const username = e.target[0].value;
//     const email = e.target[1].value;
//     const password = e.target[2].value;

//     let config = {
//       method: "post",
//       url: "http://localhost:5000/users",
//       data: {
//         username,
//         email,
//         password,
//       },
//     };
//     const resp = (await axios(config)).data;
//     if (resp.errors) setErrors([...resp.errors]);
//     else {
//       login(email, password);
//     }
//   }

  return (
    <div className="my-10 flex items-center flex-col">
      <span className="text-gray-500 text-7xl lobster">Dashboard - Users</span>
      <div className="mt-14 flex flex-col w-[95%]">
        <div className="luckiest text-4xl text-gray-500 py-1 px-5 rounded-lg bg-gray-100">
          Create User
        </div>
        <form
        //   onSubmit={handleSubmit}
          className="py-4 flex flex-col space-y-10 px-5"
        >
          <div className="messages text-red-300 mt-2">{errors.join(", ")}</div>
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
          <div className="flex flex-col shadow rounded-xl m-3 group">
            <div className="w-[18rem] h-80 rounded-t-xl relative">
              <img
                src="https://www.melty.fr/wp-content/uploads/meltyfr/2021/12/media-6405.jpg"
                alt="ninho"
                className="w-full h-full object-center object-cover rounded-t-xl"
              />
              <div className="absolute hidden group-hover:inline-flex space-x-2 right-2 bottom-2">
                <button className="px-3 py-1 rounded bg-gray-800 text-white playfair">
                  Edit
                </button>
                <button className="px-3 py-1 rounded bg-gray-800 text-white playfair">
                  Delete
                </button>
              </div>
            </div>
            <div className="border rounded-b-xl bg-gray-100 inline-flex flex-col justify-center p-3">
              <span className="text-base text-gray-500">Itan</span>
              <span className="text-base text-gray-500">itan@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
