import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'universal-cookie';

const cookies = new Cookies();


export default function Moovies() {
  const [openFilter, setOpenFilter] = useState(false);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [genreValue, setGenreValue] = useState("");
  const [directorValue, setDirectorValue] = useState("");
  const [search, setSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState([]);
  const [no_result, setNoResult] = useState([])
  const [resultStatus, setResultStatus] = useState(false)
  const [user, setUser] = useState({})
  const [favorites, setFavorites] = useState([])


  function handleKeyword(e) {
    setKeyword(e.target.value)
    setSearch(true);
  }

  function handleGenreValue(e) {
    setGenreValue(e.target.value);
  }

  function handleDirectorValue(e) {
    setDirectorValue(e.target.value);
    getDirectorMovies(e.target.value);
  }

  function toggleFilterMenu() {
    setOpenFilter(!openFilter);
    setSearch(false);
  }

  async function getAllMovies() {
    setResultStatus(false)
    await fetch("http://localhost:5000/movies")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.data);
      });
  }

  async function getGenreMovies(id) {
    setResultStatus(false)
    await fetch("http://localhost:5000/movies/genre/" + id)
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          setMovies(data.data);
        }
        setMovies(data);
      });
  }

  async function getDirectorMovies(id) {
    setResultStatus(false)
    if(id == ""){
      getAllMovies()
    }
    else{
      await fetch("http://localhost:5000/movies/director/" + id)
      .then((response) => response.json())
      .then((data) => {
          setMovies(data);
      });
    }
  }

  async function getAllGenres() {
    await fetch("http://localhost:5000/genres")
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.data);
      });
  }

  async function getAllDirectors() {
    await fetch("http://localhost:5000/directors")
      .then((response) => response.json())
      .then((data) => {
        setDirectors(data.data);
      });
  }

  async function getByKeyword(e){
    e.preventDefault()
    setResult([])
    const result = []
    const no_result = []
    movies.forEach((x) => {
      if(x.title.toString().toLowerCase().includes(keyword) === true){
        setResultStatus(false)
        result.push(x)
        setResult(result)
      }
      else{
        no_result.push("Nothing to display...")
        setResultStatus(false)
        setNoResult(no_result)
      }
    })
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
			});
			}
		});
  	};


  function onClick(event) {
    toggleFilterMenu();
    getAllGenres();
    getAllDirectors();
  }

  function formatDate(string) {
    var options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(string).toLocaleDateString("en-Us", options);
  }

  useEffect(() => {
    if (genreValue == "") {
      getAllMovies();
      if(cookies.get("access")){
        getUser();
      }
    } else {
      getGenreMovies(genreValue);
      if(cookies.get("access")){
        getUser();
      }
    }
  }, [genreValue]);

  return (
    <div className="flex">
      <div className="mt-6 w-1/4">
        <div className="font-source text-2xl">Movies</div>
        <div className="w-72">
          <div className="border-2 mt-4 py-3 rounded-lg shadow-xl h-max-64 flex-col items-center space-y-1">
            <div className="pl-4 w-full font-source text-xl" onClick={onClick}>
              Filter
            </div>
            <div
              className={`flex-col flex px-4 pt-2 space-y-1 w-full border-t ${
                openFilter ? "block" : "hidden"
              }`}
            >
              <div className="font-source"> Genres </div>
              <select
                className="border rounded-lg bg-gray-300 w-64 h-10"
                value={genreValue}
                onChange={handleGenreValue}
              >
                <option value=""> All </option>
                {genres.map((genre) => (
                  <option
                    className="border rounded-2xl py-1 px-2 my-1 font-source"
                    value={genre.tmdb_id}
                    key={genre._id}
                  >
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
            <div
              className={`flex-col flex px-4 pt-2 space-y-1 w-full border-t ${
                openFilter ? "block" : "hidden"
              }`}
            >
              <div className="font-source"> Director </div>
              <select
                className="border rounded-lg bg-gray-300 w-64 h-10"
                value={directorValue}
                onChange={handleDirectorValue}
              >
                <option value=""> All </option>
                {directors.map((director) => (
                  <option
                    className="border rounded-2xl py-1 px-2 my-1 font-source"
                    value={director._id}
                    key={director._id}
                  >
                    {director.name}
                  </option>
                ))}
              </select>
            </div>
            <div
              className={`flex-col flex px-4 pt-2 space-y-1 w-full border-t ${
                openFilter ? "block" : "hidden"
              }`}
            >
              <label className="font-source"> Date </label>
              <input
                type="date"
                className="border rounded-lg bg-gray-300 w-64 h-10"
              />
            </div>
            <div
              className={`flex-col flex px-4 pt-2 space-y-1 w-full border-t ${
                openFilter ? "block" : "hidden"
              }`}
            >
              <label className="font-source"> Keywords </label>
              <input
                onChange={handleKeyword}
                value={keyword}
                placeholder="Filter by keywords"
                className="h-10 border-gray-300 border rounded-sm p-2 font-source"
              />
            </div>
          </div>
          <div
            className={`border my-4 rounded-xl shadow-xl h-12 bg-gray-300 flex items-center justify-center ${
              !search ? "background" : "bg-[#032541]"
            } ${!search ? "text-color" : "text-white"}`}
          >
            <button className="font-source text-xl w-full" onClick={getByKeyword}> Search </button>
          </div>
        </div>
      </div>
      <div className="pl-8">
        <div className="grid grid-cols-4 gap-8 justify-between mt-10">
          { (no_result[0] == "Nothing to display..." && !resultStatus && result[0] == undefined)?
              <div className="font-source text-3xl w-96 m-56 text-center">{no_result[0]}</div>
              :
          (result[0] == undefined && !resultStatus) ? 
              movies.map((movie) => (
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
                    <a  href={"/movies/" + movie._id}><button><FontAwesomeIcon className="text-gray-500" icon={faEye}></FontAwesomeIcon></button> </a>
                  </div>
                </div>
              )) : 
              result.map((res) => (
                <div className=" border relative rounded-lg shadow-2xl h-[30rem] w-52 mt-8 flex-col" key={res._id}>
                  <img
                    className="rounded-lg h-[19rem] w-52"
                    src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${res.image}`}
                  />
                  <div className="flex-col items-center py-4 px-2 h-32">
                    <div className="font-bold font-source ">{res.title}</div>
                    <div className="font-source text-gray-600">
                      {formatDate(res.release_date)}
                    </div>
                    {
                      res.genres.map((genre) => (
                        <div className="font-source text-gray-600 text-sm" key={genre._id}>
                          {genre.name}
                        </div>
                      ))
                    }
                  </div>
                  <div className="flex justify-end space-x-3 pr-2 pt-2">
                    <button onClick={() => addToFavorites(user._id, res._id)}><FontAwesomeIcon className={`${favorites.indexOf(res._id.toString()) > -1 ? "text-[#032541]" : "text-gray-500"}`} icon={faHeart}></FontAwesomeIcon></button>
                    <a  href={"/movies/" + res._id}><button><FontAwesomeIcon className="text-gray-500" icon={faEye}></FontAwesomeIcon></button></a>
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    </div>
  );
}
