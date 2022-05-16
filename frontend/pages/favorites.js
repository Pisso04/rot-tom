import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import {
  useRouter
} from "next/router";

import Cookies from 'universal-cookie';


export default function Moovies() {
    const router = useRouter();

  const cookies = new Cookies();
  const cookie = cookies.get("access")
  if (cookie === undefined) {
    router.push("/");
  }

  const [movies, setMovies] = useState([])
  const [user, setUser] = useState({})
  const [favorites, setFavorites] = useState([])


  async function getAllMovies(id) {
    await fetch("http://localhost:5000/users/favorites/" + id)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      });
  }

  async function addToFavorites(u_id, mo_id){
    await fetch("http://localhost:5000/users/add_favorite", {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: u_id ,
        movie_id: mo_id
      })
    })
      .then((response) => response.json())
      .then((data) => {
          getUser()
      });
  }

  async function getUser() {
    const access = await cookies.get("access");
    await fetch("http://localhost:5000/profile", {
      headers: {
        Authorization: "Bearer " + access,
      },
    })
      .then((response) => response.json())
      .then((data) => {
		  if (data.userId) {
			fetch("http://localhost:5000/users/" + data.userId, {
			headers: {
				Authorization: "Bearer " + access,
			},
			})
			.then((response) => response.json())
			.then((data) => {
				setUser(data);
                setFavorites(data.favorites)
                getAllMovies(data._id)
			});
			}
		});
  	};

  function formatDate(string) {
    var options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(string).toLocaleDateString("en-Us", options);
  }

  useEffect(() => {
        getUser();
  }, []);

  return (
    <div className="flex">
    <div className="font-source text-2xl">My favorites</div>
      <div className="pl-8">
        <div className="grid grid-cols-4 gap-8 justify-between mt-10">
            {  movies.map((movie) => (
                <div className=" border relative rounded-lg shadow-2xl h-[30rem] w-52 mt-8 flex-col" key={movie._id}>
                  <img
                    className="rounded-lg h-[19rem] w-52"
                    src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.image}`}
                  />
                  <div className="flex-col items-center px-2 h-32">
                    <div className="flex-row">
                      <FontAwesomeIcon className="text-[#032541]" icon={faStar}></FontAwesomeIcon>
                      <span className="font-bold ml-1">{movie.grade}.0</span>
                    </div>
                    <div className="font-bold font-source ">{movie.title}</div>
                    <div className="font-source text-gray-600">
                      {formatDate(movie.release_date)}
                    </div>
                    {
                      movie.genres.map((genre) => (
                        <div className="font-source text-gray-600 text-sm" key={genre._id}>
                          <div>{genre.name}</div>
                        </div>
                      ))
                    }
                  </div>
                  <div className="flex justify-end space-x-3 pr-2 pt-2">
                    <button onClick={() => addToFavorites(user._id, movie._id)}><FontAwesomeIcon className={`${favorites.indexOf(movie._id.toString()) > -1 ? "text-[#032541]" : "text-gray-500"}`} icon={faHeart}></FontAwesomeIcon></button>
                    <a  href={"/movies/" + movie._id}><button><FontAwesomeIcon className="text-gray-500" icon={faEye}></FontAwesomeIcon></button></a>
                  </div>
                </div>
            ))    
          }
        </div>
      </div>
    </div>
  );
}
