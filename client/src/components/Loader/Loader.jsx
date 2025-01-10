import "./loader.css";

const Loader = (props) => {
  return (
    <div className="loader-container">
      <div
        className="spinner"
        style={{ width: props.size || "20px", height: props.size || "20px" }}
      ></div>
    </div>
  );
};

export default Loader;
