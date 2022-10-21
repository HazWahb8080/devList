import React from "react";
import useFetch from "../../../utils/hooks/useFetch";

function GeneralSection() {
  const { result, loading } = useFetch("user");
  const handleName = () => {
    return (
      result.firstName[0].toUpperCase() +
      result.firstName.slice(1) +
      " " +
      result.lastName[0].toUpperCase() +
      result.lastName.slice(1)
    );
  };

  return (
    <div className="w-full items-center justify-between py-6 px-4 flex bg-[#FAFBFC]">
      {/* right */}
      {loading ? (
        <div className="w-full flex flex-col items-start justify-start">
          <h1> loading...! </h1>
        </div>
      ) : (
        <div className="w-full flex flex-col items-start justify-start">
          <span>
            <h1 className="text-2xl lg:text-4xl text-black pb-5">
              {handleName()}
            </h1>
          </span>

          <h2> {result.description} </h2>
        </div>
      )}
      {/* left__ the Image */}
    </div>
  );
}

export default GeneralSection;
