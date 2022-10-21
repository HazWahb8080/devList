import React from "react";
import GeneralSection from "./GeneralSection";

function MainBuilder({session}) {
  return (
    <div className="col-span-9 w-full border-r border-black/10 h-full">
      {/* top section */}
      <GeneralSection session={session} />
    </div>
  );
}

export default MainBuilder;
