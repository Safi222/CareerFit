
const Value = () => {
  return (
    <div className="mb-16 mt-16 px-4">
      <h1 className="text-textColor text-2xl py-8 pb-12 font-bold text-center">
        The value that holds us true to account
      </h1>

      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array(3).fill().map((_, index) => (
          <div key={index} className="singleGrid rounded-lg hover:bg-[#eeedf7] p-6">
            <div className="flex items-center gap-3">
              <div className="imgDiv p-2 rounded-lg bg-inherit h-24 w-24 flex items-center justify-center">
                <img src="" alt="" className="w-3/4" />
              </div>

              <span className="font-semibold text-textColor text-lg">
                Simplicity
              </span>
            </div>
            <p className="text-sm text-Color opacity-70 py-4 font-semibold">
              Things being made beautiful simple are at the heart of everything we do.
            </p>
          </div>
        ))}
      </div>

      <div className="card mt-8 flex flex-col md:flex-row justify-between bg-white p-10 rounded-lg">
        <div>
          <h1 className="text-black text-3xl font-bold">
            Ready to switch a career?
          </h1>
          <button className="bg-orange-500 text-white mt-4 py-2 px-6 rounded-lg hover:bg-orange-400 transition-all duration-300 hover:translate-x-1 hover:translate-y-1">
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Value;