import { useNavigate } from "react-router-dom";
import { GiUpgrade } from "react-icons/gi";
import { MdAssessment } from "react-icons/md";
import { MdRecommend } from "react-icons/md";
import { MdPrivacyTip } from "react-icons/md";
import Cvpilot from "../../Assets/Cvpilot.png";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  const handleAnalyzeClick = () => {
    if (isLoggedIn) {
      setIsModalOpen(true);
    } else {
      alert("You need to log in to use this feature!"); 
      navigate("/login");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Right Components */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Hello, My name is CvPilot
          </h1>
          <h2 className="text-xl text-gray-600 mb-9">
            I'm here to assist you to find your Career Fit ...
          </h2>
        </div>

        {/* Left Components */}
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
        <input type="file" id="cv-upload" className="block mx-auto mb-4" />
        <button
          onClick={handleAnalyzeClick}
          className="bg-orange-400 text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition"
        >
          Analyze Your CV 🤖
        </button>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg text-center gap-3">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              CV Analysis Results
            </h2>
            <p className="text-gray-600 mb-2">
              Your CV scored <span className="font-bold text-green-600">85/100</span> points.
            </p>
            <p className="text-gray-600 mb-6">
              Recommended jobs: Software Engineer, Data Scientist, Product Manager.
            </p>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVPilot;
