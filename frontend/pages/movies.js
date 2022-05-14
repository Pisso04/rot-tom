import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component

export default function Moovies() {
  const [ openFilter, setOpenFilter] = useState(false);
  const [ movies, setMovies ] = useState([])
  const [ genres, setGenres ] = useState([]);
  const [ genreValue, setGenreValue ] = useState('')
  const [ search, setSearch ] = useState(false)

  function handleGenreValue (e) {
    setGenreValue(e.target.value);
  };

  function toggleFilterMenu() {
    setOpenFilter(!openFilter);
    setSearch(!search)
  }

  async function getAllMovies(){
    await fetch("http://localhost:5000/movies")
    .then((response) => response.json())
    .then((data) => {
      setMovies(data.data)
    })
  }

  async function getGenreMovies(id) {
    await fetch("http://localhost:5000/movies/" + id)
      .then((response) => response.json())
      .then((data) => {
        if(data.data){
          setMovies(data.data)
        }
        setMovies(data);
      });
  }

  async function getAllGenres() {
    await fetch("http://localhost:5000/genres")
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.data);
      });
  }

  function onClick(event) {
      toggleFilterMenu();
      getAllGenres();
  }

  function formatDate(string) {
    var options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(string).toLocaleDateString('en-Us', options);
  }

  useEffect(() => {
    if (genreValue == "") {
      getAllMovies();
    } else {
      getGenreMovies(genreValue);
    }
  }, [genreValue]);

  return (
    <div className="flex">
      <div className="mt-6 w-1/4">
        <div className="font-source text-2xl">Most popular movies</div>
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
                    value={genre._id}
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
              <select className="border rounded-lg bg-gray-300 w-64 h-10">
                {genres.map((genre) => (
                  <option className="border rounded-2xl py-1 px-2 my-1 font-source">
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
              <label className="font-source"> Date </label>
              <input
                type="number"
                placeholder="YYYY"
                min="1900"
                max="2022"
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
            <button className="font-source text-xl"> Search </button>
          </div>
        </div>
      </div>
      <div className="pl-8">
        <div className="grid grid-cols-4 gap-8 justify-between mt-10">
          {movies.map((movie) => (
            <div className=" border relative rounded-lg shadow-2xl h-[26rem] w-52 mt-8 flex-col">
              <img
                className="rounded-lg h-72 w-52"
                src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.image}`}
              />
              <div className="flex-col items-center py-4 px-2">
                <div className="font-bold font-source ">{movie.title}</div>
                <div className="font-source text-gray-600">
                  {formatDate(movie.release_date)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="border rounded-xl shadow-xl h-12 bg-[#032541] flex items-center justify-center my-6 font-source text-white text-2xl w-full">
            See More
          </div>
        </div>
      </div>
    </div>
  );
}