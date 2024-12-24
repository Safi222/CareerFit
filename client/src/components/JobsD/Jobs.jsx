import { BiTimeFive } from "react-icons/bi";
import logo1 from "../../Assets/logo1.png";
import logo2 from "../../Assets/logo2.png";
import logo3 from "../../Assets/logo3.png";

const Data = [
  {
    id: 1,
    image: logo1,
    title: "Graphic Designer",
    time: "Now",
    location: "Haiti",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, laboriosam!",
    company: "Vertex Solutions Co.",
  },
  {
    id: 2,
    image: logo2,
    title: "Business Analyst",
    time: "3Hrs",
    location: "US",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, laboriosam!",
    company: "Merci Co.",
  },
  {
    id: 3,
    image: logo3,
    title: "Backend Developer",
    time: "20Hrs",
    location: "Austria",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, laboriosam!",
    company: "Noka Tech Co.",
  },
  {
    id: 4,
    image: logo3,
    title: "Backend Developer",
    time: "20Hrs",
    location: "Austria",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, laboriosam!",
    company: "Noka Tech Co.",
  },
  {
    id: 5,
    image: logo3,
    title: "Backend Developer",
    time: "20Hrs",
    location: "Austria",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, laboriosam!",
    company: "Noka Tech Co.",
  },
  {
    id: 6,
    image: logo3,
    title: "Backend Developer",
    time: "20Hrs",
    location: "Austria",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, laboriosam!",
    company: "Noka Tech Co.",
  },
  // Add more job data as needed
];

const Jobs = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="jobContainer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10">
        {Data.map(({ id, image, title, time, location, desc, company }) => {
          return (
            <div
              key={id}
              className="group singleJob p-4 bg-white rounded-lg shadow-lg hover:bg-orange-500 transition duration-300"
            >
              <span className="flex justify-between items-center gap-4">
                <h1 className="text-lg font-semibold text-gray-800 group-hover:text-white">
                  {title}
                </h1>
                <span className="flex items-center text-gray-400 gap-1">
                  <BiTimeFive />
                  {time}
                </span>
              </span>

              <h6 className="text-gray-500">{location}</h6>

              <p className="text-sm text-gray-600 pt-4 border-t mt-4 group-hover:text-white">
                {desc}
              </p>

              <div className="company flex items-center gap-2 mt-4">
                <img src={image} alt={`${company} logo`} className="w-12 h-12 object-cover" />
                <span className="text-md py-2 block group-hover:text-white">
                  {company}
                </span>
              </div>

              <button className="border-2 rounded-lg block p-2 w-full text-md font-semibold text-gray-800 hover:bg-white group-hover:text-gray-800 group-hover:bg-orange-500 transition duration-300">
                Fit in Now
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Jobs;