import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faUser } from '@fortawesome/free-solid-svg-icons'
import React, {useState} from 'react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    function toggleMenu() {
        setIsOpen(!isOpen)
    }
  return (
    <nav className = "flex flex-row justify-between px-10 py-4 bg-[#032541] text-white items-center" >
        <div className = "flex space-x-10 items-center" >
            <Link href="/">
                <a className = "text-xl text-blue-500">StreamInfo</a>
            </Link>
            <Link href="/movies">
                <a>Movies</a>
            </Link>
            <Link href="/favorites">
                <a>Favorites</a>
            </Link>
            <Link href="/watchlist">
                <a>Watchlist</a>
            </Link>
            <Link href="/dashboar">
                <a>Dashboard</a>
            </Link>
        </div>

        <div className = "inline-flex space-x-10 items-center" >
            <Link href="/login">
                <a>Login</a>
            </Link>
          
            <div>
                <div class="relative m-1 mr-2 w-8 h-8 text-lg relative flex cursor-pointer justify-center items-center rounded-full bg-blue-500 text-xl text-white uppercase">
                    <FontAwesomeIcon  icon={faUser} onClick={toggleMenu}></FontAwesomeIcon>
                </div>
                <div
                    className = {`absolute right-2 top-20 flex flex-col space-y-5 bg-white text-black text-md p-5 border rounded-lg border-gray-800 border-opacity-10 w-40 ${isOpen ?'block':'hidden'}`} >
                        <Link href="/login">
                            <a className="hover:bg-gray-400 hover:text-white hover:p-2">My profile</a>
                        </Link>
                        <Link href="/favorites">
                            <a className="hover:bg-gray-400 hover:text-white hover:p-2">My Favorites</a>
                        </Link>
                        <Link href="/watchlist">
                            <a className="hover:bg-gray-400 hover:text-white hover:p-2">My Watchlist</a>
                        </Link>
                        <a className="hover:bg-gray-400 hover:text-white hover:p-2">Logout</a>
                </div>
            </div>
        </div>
    </nav>
  )
}