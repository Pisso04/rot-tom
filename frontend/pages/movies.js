import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

export default function Moovies() {
  const [isOpen, setIsOpen] = useState(false);
  const [ openFilter, setOpenFilter] = useState(false);
  const [ openOption, setOpenOption ] = useState(false);
  function toggleSortMenu() {
    setIsOpen(!isOpen);
  }
  function toggleFilterMenu() {
    setOpenFilter(!openFilter);
  }
  function toggleOptionMenu() {
    setOpenOption(!openOption);
  }
  return (
    <div className="flex">
      <div className="mt-6 ml-6 w-1/4">
        <div className="font-source text-2xl">Most popular movies</div>
        <div className="w-72">
          <div className="border-2 mt-6 rounded-lg shadow-xl h-max-32 py-3 flex-col items-center space-y-1">
            <div
              className="pl-4 w-full font-source text-xl"
              onClick={toggleSortMenu}
            >
              Sort
            </div>
            <div
              className={`flex-col flex pl-4 pt-2 space-y-1 w-full border-t ${
                isOpen ? "block" : "hidden"
              }`}
            >
              <span className="font-source"> Sort results by </span>
              <select className=" border rounded-lg bg-gray-300 w-64 h-10">
                <option selected>Release date +/-</option>
                <option value="1">Release date -/+</option>
              </select>
            </div>
          </div>
          <div className="border-2 mt-4 py-3 rounded-lg shadow-xl h-max-64 flex-col items-center space-y-1">
            <div
              className="pl-4 w-full font-source text-xl"
              onClick={toggleFilterMenu}
            >
              Filter
            </div>
            <div
              className={`flex-col flex px-4 pt-2 space-y-1 w-full border-t ${
                openFilter ? "block" : "hidden"
              }`}
            >
              <div className="font-source"> Genres </div>
              <div className="flex flex-wrap justify-between">
                <div className="border rounded-2xl py-1 px-2 my-1 font-source">
                  Action
                </div>
                <div className="border rounded-2xl py-1 px-2 my-1 font-source">
                  Action
                </div>
                <div className="border rounded-2xl py-1 px-2 my-1 font-source">
                  Action
                </div>
                <div className="border rounded-2xl py-1 px-2 my-1 font-source">
                  Action
                </div>
                <div className="border rounded-2xl py-1 px-2 my-1 font-source">
                  Action
                </div>
                <div className="border rounded-2xl py-1 px-2 my-1 font-source">
                  Action
                </div>
                <div className="border rounded-2xl py-1 px-2 my-1 font-source">
                  Action
                </div>
                <div className="border rounded-2xl py-1 px-2 my-1 font-source">
                  Action
                </div>
                <div className="border rounded-2xl py-1 px-2 my-1 font-source">
                  Action
                </div>
              </div>
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
          <div className="border my-4 rounded-xl shadow-xl h-12 bg-gray-300 flex items-center justify-center">
            <span className="font-source text-xl"> Search </span>
          </div>
        </div>
      </div>
      <div>
        <div className="w-5/6 h-94 grid grid-cols-5 gap-4 mt-12">
          <div className=" border relative rounded-lg shadow-2xl h-96 w-52 mt-8 flex-col">
            <FontAwesomeIcon
              onClick={toggleOptionMenu}
              icon={faEllipsis}
              className="absolute top-0 right-0 text-gray-700 rounded-full p-1 bg-gray-300 text-lg mr-2 mt-2 hover:bg-[#032541] hover:text-white"
            ></FontAwesomeIcon>

            {openOption ? (
              <div className="absolute w-max h-24 bg-white border border-white shadow-lg rounded-xl top-10 right-2 p-4 flex-col items-center">
                <div className=" font-source">Add to Favorites</div>
                <div className=" mt-1 pt-1 font-source border-t border-gray-500 w-full">
                  Your rating
                </div>
              </div>
            ) : (
              ""
            )}

            <img
              className="rounded-lg h-72 w-72"
              src="https://i.pinimg.com/564x/e2/dd/ab/e2ddabeb01c610f576da0a3ce46e6441.jpg"
            />
            <div className="flex-col items-center py-4 pl-2">
              <div className="font-bold font-source text-lg">
                Naruto Shipudden
              </div>
              <div className="font-source text-gray-600">12 mai 2022</div>
            </div>
          </div>
        </div>
        <div>
          <span className="border rounded-xl shadow-xl h-12 bg-[#032541] flex items-center justify-center my-6 font-source text-white text-2xl">
            See More
          </span>
        </div>
      </div>
    </div>
  );
}
