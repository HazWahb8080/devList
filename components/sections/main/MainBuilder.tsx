import React, { startTransition, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeTabIs } from "../../../slices/activeTab";
import { RootState } from "../../../store";
import GeneralSection from "./GeneralSection";
import PortfolioSection from "./tabs/PortfolioSection";
import ResumeSection from "./tabs/ResumeSection";

export function MainBuilder({ session }) {
  const activeTab = useSelector((state: RootState) => state.activeTab.value);
  const dispatch = useDispatch();

  const tabs = ["Portfolio", "Resume"];
  const handleTab = (tab: string) => {
    startTransition(() => {
      dispatch(activeTabIs(tab as string));
    });
  };
  return (
    <main className="col-span-9 w-full border-r border-black/10 h-full">
      {/* top section */}
      <GeneralSection session={session} />
      <span className=" lg:px-12 w-full pt-2 border-y border-black/10 items-center justify-start flex space-x-4">
        {tabs.map((tab) => (
          <h2
            key={tab}
            onClick={() => handleTab(tab)}
            className={`${activeTab === tab ? "tab--active" : "tab"} `}
          >
            {tab}
          </h2>
        ))}
      </span>
      <Suspense fallback={<p>loading...</p>}>
        {activeTab === "Portfolio" ? <PortfolioSection /> : <ResumeSection />}
      </Suspense>
    </main>
  );
}
