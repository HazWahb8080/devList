import React, { useState, useCallback, Suspense } from "react";
import Modal from "../../../shared/modal/Modal";
import { Integrations } from "../../../../utils/db";
import { useRouter } from "next/router";
import { CheckIntegrationLinked } from "../../../../utils/CheckIntegrationLinked";
import dynamic from "next/dynamic";
const GITHUB = dynamic(() =>
  import("../../../integrations/github/GITHUB").then((mod) => mod.GITHUB)
);
function PortfolioSection() {
  // checking what integrations linked.
  const check = useCallback(() => {
    return CheckIntegrationLinked();
  }, []);
  const { integrationsLinked } = check();
  const filterIntegrations = (item: string) => {
    if (!item) return;
    return integrationsLinked.some((title: string) => title === item);
  };
  return (
    <main className="w-full items-center justify-center flex flex-col space-y-12">
      <div className="portfolio__integrationGrid_wrapper">
        {Integrations.filter(
          (item) =>
            item.title !== integrationsLinked?.find((t) => t === item.title)
        ).map((integration) => (
          <IntegrationItem key={integration.id} item={integration} />
        ))}
      </div>
      <div className="w-full py-1 border-t border-black/10" />
      <Suspense fallback={`loading...`}>
        {filterIntegrations("github") && <GITHUB />}
      </Suspense>
    </main>
  );
}

export default PortfolioSection;

function IntegrationItem({ item }) {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  return (
    // <Modal open={openModal} setOpen={setOpenModal} item={item}>
    <div
      onClick={() => router.replace(item.authorizeLink)}
      className="portfolio__integrations__item_wrapper"
    >
      {/* logo */}
      <span className="">{item.icon}</span>
      {/* text */}
      <span className="w-full space-y-1">
        <h2 className="text-lg font-medium">{item.title}</h2>
        <p className="text-xs line">{item.desc}</p>
      </span>
      {/* plusIcon */}
      <span className="">++</span>
    </div>
    // </Modal>
  );
}
