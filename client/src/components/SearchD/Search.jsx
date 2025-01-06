/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import { BsHouseDoor } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import SearchData from "./searchData";

const Search = (props) => {
  // const [sendSearchData] = props;
  const [searchData, setQueryData] = useState(new SearchData());

  const handleSearch = (e) => {
    e.preventDefault();
    props.sendSearchData(searchData);
  };

  const clearAll = () => {
    setQueryData(new SearchData());
    props.sendSearchData(searchData);
  };

  return (
    <div className="SearchDiv grid gap-8 bg-gray-100 rounded-lg p-8 shadow-md">
      <form onSubmit={handleSearch}>
        <div className="firstDiv flex flex-col md:flex-row justify-between items-center rounded-lg gap-4 bg-white p-5 shadow-lg">
          {/* Search by Job */}
          <div className="flex gap-2 items-center w-full md:w-1/3">
            <AiOutlineSearch className="text-2xl text-gray-500" />
            <input
              value={searchData.title}
              onChange={(e) =>
                setQueryData(
                  new SearchData(
                    e.target.value,
                    searchData.company,
                    searchData.location,
                    searchData.type,
                    searchData.level
                  )
                )
              }
              type="text"
              className="bg-transparent text-gray-700 focus:outline-none w-full"
              placeholder="Search your fit..."
            />
            <AiOutlineCloseCircle className="text-2xl text-gray-400 hover:text-gray-600 cursor-pointer" />
          </div>

          {/* Search by Company */}
          <div className="flex gap-2 items-center w-full md:w-1/3">
            <BsHouseDoor className="text-2xl text-gray-500" />
            <input
              value={searchData.company}
              onChange={(e) =>
                setQueryData(
                  new SearchData(
                    searchData.title,
                    e.target.value,
                    searchData.location,
                    searchData.type,
                    searchData.level
                  )
                )
              }
              type="text"
              className="bg-transparent text-gray-700 focus:outline-none w-full"
              placeholder="Search by company..."
            />
            <AiOutlineCloseCircle className="text-2xl text-gray-400 hover:text-gray-600 cursor-pointer" />
          </div>

          {/* Search by Location */}
          <div className="flex gap-2 items-center w-full md:w-1/3">
            <CiLocationOn className="text-2xl text-gray-500" />
            <input
              value={searchData.location}
              onChange={(e) =>
                setQueryData(
                  new SearchData(
                    searchData.title,
                    searchData.company,
                    e.target.value,
                    searchData.type,
                    searchData.level
                  )
                )
              }
              type="text"
              className="bg-transparent text-gray-700 focus:outline-none w-full"
              placeholder="Search by location..."
            />
            <AiOutlineCloseCircle className="text-2xl text-gray-400 hover:text-gray-600 cursor-pointer" />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-400 transition-all duration-300 w-full md:w-auto"
          >
            Search
          </button>
        </div>
      </form>

      {/* Filters Section */}
      <div className="secDiv flex flex-col md:flex-row items-center gap-6">
        {/* Filter by Job Type */}
        <div className="singleSearch flex items-center gap-2">
          <label htmlFor="type" className="text-gray-600 font-semibold">
            Type:
          </label>
          <select
            id="type"
            value={searchData.type}
            onChange={(e) =>
              setQueryData(
                new SearchData(
                  searchData.title,
                  searchData.company,
                  searchData.location,
                  e.target.value,
                  searchData.level
                )
              )
            }
            className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-orange-400"
          >
            <option value="full time">Full-time</option>
            <option value="part time">Part-time</option>
            <option value="office">Office</option>
            <option value="remote">Remote</option>
          </select>
        </div>

        {/* Filter by Level */}
        <div className="singleSearch flex items-center gap-2">
          <label htmlFor="level" className="text-gray-600 font-semibold">
            Level:
          </label>
          <select
            id="level"
            value={searchData.level}
            onChange={(e) =>
              setQueryData(
                new SearchData(
                  searchData.title,
                  searchData.company,
                  searchData.location,
                  searchData.type,
                  e.target.value
                )
              )
            }
            className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-orange-400"
          >
            <option value="senior">Senior</option>
            <option value="entry level">Beginner</option>
            <option value="intermendiate">Intermediate</option>
            <option value="advocate">Advocate</option>
          </select>
        </div>

        {/* Clear All */}
        <span
          onClick={clearAll}
          className="text-gray-500 cursor-pointer hover:text-orange-500 transition-all duration-300"
        >
          Clear All
        </span>
      </div>
    </div>
  );
};

export default Search;
