import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TmdbMoviesList() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  function change_page(number) {
    setLoading(true);
    const options = {
      method: "GET",
      url:
        process.env.NEXT_PUBLIC_TMDB_BASE_URL +
        "movie/popular?api_key=" +
        process.env.NEXT_PUBLIC_TMDB_KEY +
        "&language=en-US&page=" +
        number,
    };
    axios.request(options).then((response) => {
      setData(response.data);
      setLoading(false);
      setPage(number);
      console.log(response.data);
    });
  }

  async function create_movie(tmdb_id) {
    const options = {
      method: "POST",
      url: process.env.NEXT_PUBLIC_API_BASE_URL + "movies",
      data: {
        tmdb_id: tmdb_id, // This is the body part
      },
    };
    await axios.request(options).then((response) => {
      console.log(response.data);
      if (response.data.success) alert(response.data.data.title + " added !");
      else {
        if ((response.data.error = "Movie already added"))
          alert("Movie already added to your website!");
      }
    });
  }
  useEffect(() => {
    setLoading(true);
    const options = {
      method: "GET",
      url:
        process.env.NEXT_PUBLIC_TMDB_BASE_URL +
        "movie/popular?api_key=" +
        process.env.NEXT_PUBLIC_TMDB_KEY +
        "&language=en-US&page=1",
    };
    axios.request(options).then((response) => {
      setData(response.data);
      setLoading(false);
      console.log(response.data);
    });
  }, []);

  if (isLoading) return <p> Loading... </p>;
  if (!data) return <p> Can not get data </p>;
  return (
    <>
      <div className="luckiest text-2xl text-gray-500 py-1 px-5 rounded-lg bg-gray-100  mb-10">
        The Movies DB List
      </div>
      <div className="grid grid-cols-4 gap-4">
        {data.results.map((movie) => (
          <div
            key={movie.id}
            className="flex rounded-2xl shadow w-[20rem] h-[30rem] relative"
          >
            <img
              src={
                process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL + movie.poster_path
              }
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
                {/* <a href={"/dashboard/movies/" + movie.id + "?from=tmdb"}>
                  <button className="w-full rounded-lg text-lg py-1 bg-orange-600 text-white playfair my-1">
                    See more
                  </button>
                </a> */}

                <form
                  action='<%= "/admin/concerts/delete/"+concert._id %>'
                  method="post"
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      create_movie(movie.id);
                    }}
                    className="w-full rounded-lg text-lg py-1 bg-orange-600 text-white playfair my-1"
                  >
                    Add To your list
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="inline-flex items-center justify-center flex-wrap mt-10">
        {[...Array(100)].map((e, i) => (
          <div
            onClick={(e) => {
              e.preventDefault();
              change_page(i + 1);
            }}
            key={i + 1}
            className={`${
              page === i + 1
                ? "bg-blue-500 bg-opacity-20"
                : "bg-gray-100 bg-opacity-20"
            } w-auto hover:border hover:border-blue-600 m-3 h-auto p-5 rounded-2xl shadow flex flex-col items-center justify-center`}
          >
            <span className="anton text-sm text-gray-500">{i + 1}</span>
          </div>
        ))}
      </div>
    </>
  );
}
