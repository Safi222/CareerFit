import { GiUpgrade } from "react-icons/gi";
import { MdAssessment } from "react-icons/md";
import { MdRecommend } from "react-icons/md";
import { MdPrivacyTip } from "react-icons/md";
import Cvpilot from "../../Assets/Cvpilot.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const FeaturesData = [
  {
    id: 1,
    icon: <MdAssessment size={30} />,
    title: "Assess Your CV",
    desc: "Receive points on each skill or employment detail.",
  },
  {
    id: 2,
    icon: <GiUpgrade size={30} />,
    title: "Improve Suggestions",
    desc: "Get tailored suggestions to enhance your CV.",
  },
  {
    id: 3,
    icon: <MdRecommend size={30} />,
    title: "Job Recommendations",
    desc: "Discover jobs that match your profile.",
  },
  {
    id: 4,
    icon: <MdPrivacyTip size={30} />,
    title: "Privacy Secured",
    desc: "Your data is safe and used responsibly.",
  },
];

const CVPilot = () => {
  const serverUri = import.meta.env.VITE_SERVER_URI;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [jobsRecommendtions, setJobsRecommendtions] = useState([]);
  const [loginPrompt, setLoginPrompt] = useState(false); // New state for login prompt
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyzeClick = async () => {
    if (!token) {
      setLoginPrompt(true);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${serverUri}/cv/analyze`, {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }

      const data = await res.json();
      setJobsRecommendtions(data.data.recommendation.recommendations);
      setError(null);
      console.log(data);
      setIsModalOpen(true);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigateToJobs = (job) => {
    navigate(`/jobs?job_title=${job.job_title}&level=${job.level}`);
  };

  const handleLoginRedirect = () => {
    setLoginPrompt(false);
    navigate("/login");
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Hello, My name is CvPilot
          </h1>
          <h2 className="text-xl text-gray-600 mb-9">
            I'm here to assist you to find your Career Fit ...
          </h2>
        </div>

        <div className="text-center">
          <img src={Cvpilot} alt="CvPilot" className="w-80 h-auto mx-auto" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        {FeaturesData.map(({ id, icon, title, desc }) => (
          <div
            key={id}
            className="group p-4 bg-white rounded-lg shadow-lg hover:bg-orange-400 transition duration-300"
          >
            <div className="text-center mb-4">{icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-white">
              {title}
            </h3>
            <p className="text-sm text-gray-600 group-hover:text-white mt-2">
              {desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          disabled={isLoading}
          onClick={handleAnalyzeClick}
          className="bg-orange-400 text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition flex justify-center items-center gap-3 mx-auto"
        >
          Analyze Your CV 🤖 {isLoading && <Loader />}
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-3">
          <div className="bg-white relative p-6 rounded-lg text-center gap-3 w-full max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              CV Analysis Results
            </h2>
            <div class="container mx-auto mt-10 p-4">
              <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">
                {jobsRecommendtions.map((job) => (
                  <div
                    class="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:bg-gray-100 hover:cursor-pointer"
                    key={job.id}
                    onClick={() => navigateToJobs(job)}
                  >
                    <div class="p-4">
                      <h2 class="text-xl font-semibold text-gray-800 ">
                        {job.job_title}
                      </h2>
                      <p class="text-sm text-gray-500 mt-1">{job.level}</p>
                      <p class="text-gray-600 mt-3">{job.reason}</p>
                      <div class="mt-4 flex items-center justify-between">
                        <span class="text-gray-700 font-medium">Score:</span>
                        <span class="text-[#f57922] font-semibold">
                          {(job.relevance_score * 100).toFixed()}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={closeModal}
              className="bg-[#f57922] text-white rounded-full font-bold text-lg absolute top-0 right-5 mt-4 px-2"
            >
              x
            </button>
          </div>
        </div>
      )}

      {loginPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              You need to log in to analyze your CV.
            </h2>
            <button
              onClick={handleLoginRedirect}
              className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition"
            >
              Go to Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVPilot;
