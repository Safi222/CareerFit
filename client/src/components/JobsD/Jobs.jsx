/* eslint-disable react/prop-types */
import { BiTimeFive } from "react-icons/bi";
import { useEffect, useState } from "react";
import "./Jobs.css";
import SearchData from "../SearchD/searchData";
import Search from "../SearchD/Search";

const Jobs = (props) => {
  const serverUri = import.meta.env.VITE_SERVER_URI;
  const [jobs, setJobs] = useState([]);
  const [counter, setCounter] = useState(1);
  const [searchData, setSearchData] = useState(new SearchData());

  const getJobsHome = (AddMore = false) => {
    fetch(`${serverUri}/jobs/home?page=${counter}&num_pages=1`)
      .then((res) => res.json())
      .then((d) => {
        if (AddMore) {
          setJobs([...jobs, ...d.data.jobs]);
        } else {
          setJobs([...d.data.jobs]);
        }
      })
      .catch((err) => console.log(err));
  };

  const getJobs = (AddMore = false) => {
    fetch(
      `${serverUri}/jobs/search?title=${searchData.title}&company=${searchData.company}&location=${searchData.location}&type=${searchData.type}&level=${searchData.level}&page=${counter}&num_pages=1`
    )
      .then((res) => res.json())
      .then((d) => {
        if (AddMore) {
          setJobs([...jobs, ...d.data.jobs]);
        } else {
          setJobs([...d.data.jobs]);
        }
      })
      .catch((err) => console.log(err));
  };

  const getMoreJobs = () => {
    setCounter(counter + 1);
    getJobs(true);
  };

  useEffect(() => {
    if (props?.fromHome) {
      getJobsHome();
    } else {
      getJobs();
    }
  }, []);

  const handleSearchData = (searchData) => {
    setCounter(1);
    setSearchData(searchData);
    getJobs();
  };

  return (
    <>
      <Search sendSearchData={handleSearchData} />
      <div className="container mx-auto px-4">
        <div className="jobContainer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10">
          {jobs.map(
            ({
              job_id,
              employer_logo,
              job_title,
              job_posted_at,
              job_country,
              job_description,
              job_apply_link,
              job_employment_type,
            }) => {
              return (
                <div
                  key={job_id}
                  className="group singleJob p-4 flex-col flex bg-white rounded-lg shadow-lg hover:bg-orange-500 transition duration-300"
                >
                  <h2 className="text-lg font-semibold text-gray-800 group-hover:text-white mb-4">
                    {job_title}
                  </h2>
                  <div className="flex justify-between items-center gap-4">
                    <h6 className="text-gray-800">{job_country}</h6>
                    <span className="flex items-center text-gray-400 gap-1">
                      <BiTimeFive />
                      {job_posted_at}
                    </span>
                  </div>

                  <p
                    title={job_description}
                    className="text-sm text-gray-600 mb-3 pt-4 border-t mt-4 group-hover:text-white truncated-text"
                  >
                    {job_description}
                  </p>

                  <div className="company mt-auto flex items-center gap-2 mt-4">
                    <img
                      src={employer_logo}
                      alt={`${job_country} logo`}
                      className="w-12 h-12 object-cover"
                    />
                    <span className="text-md py-2 block group-hover:text-white">
                      {job_employment_type}
                    </span>
                  </div>
                  <a
                    href={job_apply_link}
                    target="_blank"
                    className="border-2 mt-2 rounded-lg block p-2 w-full text-md font-semibold text-gray-800 hover:bg-white group-hover:text-white group-hover:bg-orange-500 transition duration-300"
                  >
                    Apply Now
                  </a>
                </div>
              );
            }
          )}
        </div>

        {/* Add the View More Fits button with Link */}
        <div className="text-center mt-6">
          <button
            onClick={getMoreJobs}
            className="bg-orange-400 text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition"
          >
            View More Fits
          </button>
        </div>
      </div>
    </>
  );
};

export default Jobs;
