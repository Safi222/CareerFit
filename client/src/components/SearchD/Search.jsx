import React from 'react';
import { AiOutlineSearch, AiOutlineCloseCircle } from 'react-icons/ai';
import { BsHouseDoor } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

const Search = () => {
  return (
    <div className="SearchDiv grid gap-8 bg-gray-100 rounded-lg p-8 shadow-md">
      <form action="">
        <div className="firstDiv flex justify-between items-center rounded-lg gap-4 bg-white p-5 shadow-lg">
          {/* Search by Job */}
          <div className="flex gap-2 items-center w-1/3">
            <AiOutlineSearch className="text-2xl text-gray-500" />
            <input
              type="text"
              className="bg-transparent text-gray-700 focus:outline-none w-full"
              placeholder="Search your fit..."
            />
            <AiOutlineCloseCircle className="text-2xl text-gray-400 hover:text-gray-600 cursor-pointer" />
          </div>

          {/* Search by Company */}
          <div className="flex gap-2 items-center w-1/3">
            <BsHouseDoor className="text-2xl text-gray-500" />
            <input
              type="text"
              className="bg-transparent text-gray-700 focus:outline-none w-full"
              placeholder="Search by company..."
            />
            <AiOutlineCloseCircle className="text-2xl text-gray-400 hover:text-gray-600 cursor-pointer" />
          </div>

          {/* Search by Location */}
          <div className="flex gap-2 items-center w-1/3">
            <CiLocationOn className="text-2xl text-gray-500" />
            <input
              type="text"
              className="bg-transparent text-gray-700 focus:outline-none w-full"
              placeholder="Search by location..."
            />
            <AiOutlineCloseCircle className="text-2xl text-gray-400 hover:text-gray-600 cursor-pointer" />
          </div>

          {/* Search Button */}
          <button className="bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-400 transition-all duration-300">
            Search
          </button>
        </div>
      </form>

      {/* Filters Section */}
      <div className="secDiv flex items-center gap-6">
        {/* Sort by Relevance */}
        <div className="singleSearch flex items-center gap-2">
          <label htmlFor="relevance" className="text-gray-600 font-semibold">
            Sort by:
          </label>
          <select
            id="relevance"
            className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-orange-400"
          >
            <option value="">Relevance</option>
            <option value="">Inclusive</option>
            <option value="">Starts With</option>
            <option value="">Contains</option>
          </select>
        </div>

        {/* Filter by Job Type */}
        <div className="singleSearch flex items-center gap-2">
          <label htmlFor="type" className="text-gray-600 font-semibold">
            Type:
          </label>
          <select
            id="type"
            className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-orange-400"
          >
            <option value="">Full-time</option>
            <option value="">Part-time</option>
            <option value="">Office</option>
            <option value="">Remote</option>
          </select>
        </div>

        {/* Filter by Level */}
        <div className="singleSearch flex items-center gap-2">
          <label htmlFor="level" className="text-gray-600 font-semibold">
            Level:
          </label>
          <select
            id="level"
            className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-orange-400"
          >
            <option value="">Senior</option>
            <option value="">Beginner</option>
            <option value="">Intermediate</option>
            <option value="">Advocate</option>
          </select>
        </div>

        {/* Clear All */}
        <span className="text-gray-500 cursor-pointer hover:text-orange-500 transition-all duration-300">
          Clear All
        </span>
      </div>
    </div>
  );
};

export default Search;
