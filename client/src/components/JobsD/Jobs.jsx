/* eslint-disable react/prop-types */
import { BiTimeFive } from "react-icons/bi";
import { useEffect, useContext, useRef, useState } from "react";
import "./Jobs.css";
import SearchData from "../SearchD/searchData";
import Search from "../SearchD/Search";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import Loader from "../Loader/Loader";

const Jobs = (props) => {
  const [searchParams] = useSearchParams();
  const tokenParam = searchParams.get("token");
  const job_title = searchParams.get("job_title");
  const level = searchParams.get("level");

  const serverUri = import.meta.env.VITE_SERVER_URI;
  const [jobs, setJobs] = useState([]);
  const [counter, setCounter] = useState(1);
  const [viewMoreStatus, setViewMoreStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState(new SearchData());
  const isInitialMount = useRef(true);
  const addMoreStatus = useRef(false);
  const fromSearch = useRef(false);
  const navigate = useNavigate();
  const { fetchUserProfile } = useContext(AuthContext);
  

  const getJobsHome = (AddMore = false) => {
    setIsLoading(true);
    fetch(`${serverUri}/jobs/home?page=${counter}&num_pages=1`)
      .then((res) => res.json())
      .then((d) => {
        if (AddMore) {
          setJobs([...jobs, ...d.data.jobs]);
        } else {
          setJobs([...d.data.jobs]);
        }
        setViewMoreStatus(d.data.jobs.length ? true : false);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const getJobs = (AddMore = false) => {
    setIsLoading(true);
    if ((job_title || level) && isInitialMount.current) {
      searchData.title = job_title;
      searchData.level = level;
    }
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
        setViewMoreStatus(d.data.jobs.length ? true : false);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const getMoreJobs = async () => {
    addMoreStatus.current = true;
    setCounter(counter + 1);
  };

  useEffect(() => {
    if (props?.fromHome && !fromSearch.current) {
      getJobsHome(addMoreStatus.current);
    } else {
      getJobs(addMoreStatus.current);
    }
    isInitialMount.current = false;
  }, [counter, searchData]);

  const handleSearchData = (searchData) => {
    addMoreStatus.current = false;
    fromSearch.current = true;
    setCounter(1);
    setSearchData(searchData);
  };
  
  useEffect(() => {
    if (tokenParam) {
      localStorage.setItem("token", tokenParam);
      fetchUserProfile().then(() => {
        navigate("/profile");
      });
    }
  }, []);

  return (
    <>
      <Search isLoading={isLoading} sendSearchData={handleSearchData} />
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

                  <div className="company mt-auto flex items-center gap-2 ">
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

        <div> {isLoading ? <Loader size="50px" /> : ""}</div>

        {/* Add the View More Fits button with Link */}
        {viewMoreStatus ? (
          <div className="text-center mt-6">
            <button
              disabled={isLoading}
              onClick={getMoreJobs}
              className="bg-orange-400 text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition flex justify-center items-center gap-3 mx-auto"
            >
              View More jobs {isLoading ? <Loader /> : ""}
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Jobs;
