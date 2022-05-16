import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MoviesList() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  async function remove_movie(id) {
    const options = {
      method: "DELETE",
      url: process.env.NEXT_PUBLIC_API_BASE_URL + "movies/" + id,
    };
    await axios.request(options).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        alert(response.data.data.title + " removed !");
        getData();
      } else {
        alert(response.data.error);
      }
    });
  }
  async function getData() {
    setLoading(true);
    const options = {
      method: "GET",
      url: process.env.NEXT_PUBLIC_API_BASE_URL + "movies",
    };
    await axios.request(options).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        setData(response.data.data);
        setLoading(false);
      }
      console.log(response.data);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) return <p> Loading... </p>;
  if (!data) return <p> Can not get data </p>;
  return (
    <>
      <div className="luckiest text-2xl text-gray-500 py-1 px-5 rounded-lg bg-gray-100 mt-20 mb-10">
        Your movies
      </div>
      <div className="grid grid-cols-4 gap-4">
        {data.map((movie) => (
          <div
            key={movie._id}
            className="flex rounded-2xl shadow w-[20rem] h-[30rem] relative"
          >
            <img
              src={process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL + movie.image}
              alt=""
              className="w-full h-full object-cover object-center rounded-2xl"
            />
            <div
              className="absolute bottom-2 left-2 flex flex-col space-y-2 bg-white bg-opacity-70 p-2 w-max max-w-[95%]
                        group transition-all ease-in-out duration-500 rounded-xl"
            >
              <span className="text-2xl luckiest text-gray-700">
                {movie.title}
              </span>
              <div className="text-gray-700 group-hover:block hidden transition-all ease-in-out duration-500 delay-500">
                <i className="fa-light fa-location-arrow mr-2"></i>
                {movie.overview}
              </div>
              <div className="text-gray-700 group-hover:block hidden transition-all ease-in-out duration-500 delay-500">
                <i className="fa-light fa-timer mr-2"></i> Genres:
                {movie.genres.map((genre) => (
                  <span key={genre._id}> {genre.name}</span>
                ))}
              </div>
              <div className="text-gray-700 group-hover:block hidden transition-all ease-in-out duration-500 delay-500">
                <i className="fa-light fa-timer mr-2"></i>
                <span> Grade: {movie.grade}</span>
              </div>

              <div className="text-gray-700 group-hover:block hidden transition-all ease-in-out duration-500 delay-500">
                <a href={"/dashboard/movies/" + movie._id + "?from=our"}>
                  <button className="w-full rounded-lg text-lg py-1 bg-orange-600 text-white playfair my-1">
                    See more
                  </button>
                </a>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    remove_movie(movie._id);
                  }}
                  type="submit"
                  className="w-full rounded-lg text-lg py-1 bg-orange-600 text-white playfair my-1"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
