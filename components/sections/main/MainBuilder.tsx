import React from "react";
import GeneralSection from "./GeneralSection";

function MainBuilder() {
  return (
    <div className="col-span-9 w-full border-r border-black/10 h-full">
      {/* top section */}
      <GeneralSection />
    </div>
  );
}

export default MainBuilder;
