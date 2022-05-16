import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import getUsers from "../../services/getUser";
import Cookies from "universal-cookie";
import JwtDecode from "../../services/JwtDecode"

export default function Header() {
  const cookies = new Cookies();
  const cookie = cookies.get("access");
  const userCookie = JwtDecode(cookie)
  const [user, setUser] = useState("");
  useEffect(() => {
    setUser(cookie === undefined ? "notFound" : "Found");
  });

  const [isOpen, setIsOpen] = useState(false);
  function toggleMenu() {
    setIsOpen(!isOpen);
  }
  return (
    <nav className="flex items-center justify-between px-20 py-2 bg-[#032541] text-white">
      <div className="flex space-x-10 items-center">
        <Link href="/">
          <a className="text-2xl text-blue-500">StreamBox</a>
        </Link>
        <Link href="/movies">
          <a>Movies</a>
        </Link>
        <Link href="/favorites">
          <a>Favorites</a>
        </Link>
        {userCookie.admin === true ? (
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        ) : (
          ""
        )}
      </div>

      <div className="inline-flex space-x-10 items-center">
        {user === "notFound" ? (
          <Link href="/login">
            <a>Login</a>
          </Link>
        ) : (
          ""
        )}
        {user === "notFound" ? (
          <Link href="/register">
            <a>Register</a>
          </Link>
        ) : (
          ""
        )}

        <div>
          {user === "Found" ? (
            <div className="relative m-1 mr-2 w-8 h-8 flex cursor-pointer justify-center items-center rounded-full bg-blue-500 text-xl text-white uppercase">
              <FontAwesomeIcon
                icon={faUser}
                onClick={toggleMenu}
              ></FontAwesomeIcon>
            </div>
          ) : (
            ""
          )}
          <div
            className={`absolute right-20 top-16 flex flex-col space-y-1 p-1 bg-white text-gray-800 text-lg border rounded-lg border-gray-800 border-opacity-30 w-40 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <Link href="/profil">
              <a className="hover:bg-gray-200 rounded-md px-5 py-2">
                My profile
              </a>
            </Link>
            <Link href="/favorites">
              <a className="hover:bg-gray-200 rounded-md px-5 py-2">
                My Favorites
              </a>
            </Link>
            {/* <Link href="/watchlist">
              <a className="hover:bg-gray-400 hover:text-white hover:p-2">
                My Watchlist
              </a>
            </Link> */}
            <Link href="/logout">
              <a className="hover:bg-gray-200 rounded-md px-5 py-2">
                Logout
              </a>
            </Link>
          </div>
        </div>
      </div>

      {/* <div className="inline-flex space-x-10 items-center">
        <Link href="/login">
          <a>Login</a>
        </Link>
        <div>
          <div className="relative m-1 mr-2 w-8 h-8 flex cursor-pointer justify-center items-center rounded-full bg-blue-500 text-xl text-white uppercase">
            <FontAwesomeIcon
              icon={faUser}
              onClick={toggleMenu}
            ></FontAwesomeIcon>
          </div>
          <div
            className={`absolute right-2 top-20 flex flex-col space-y-5 bg-white text-black text-md p-5 border rounded-lg border-gray-800 border-opacity-10 w-40 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <Link href="/login">
              <a className="hover:bg-gray-400 hover:text-white hover:p-2">
                My profile
              </a>
            </Link>
            <Link href="/favorites">
              <a className="hover:bg-gray-400 hover:text-white hover:p-2">
                My Favorites
              </a>
            </Link>
            <Link href="/watchlist">
              <a className="hover:bg-gray-400 hover:text-white hover:p-2">
                My Watchlist
              </a>
            </Link>
            <a className="hover:bg-gray-400 hover:text-white hover:p-2">
              Logout
            </a>
          </div>
        </div>
      </div> */}
    </nav>
  );
}
