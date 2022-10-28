import React, { useState } from "react";
import Modal from "../../../../designSystem/modal/Modal";
import { Integrations } from "../../../../utils/db";
import { useRouter } from "next/router";
import { CheckIntegrationLinked } from "../../../../utils/CheckIntegrationLinked";

function PortfolioSection() {
  // checking what integrations linked.
  const { integrationsLinked } = CheckIntegrationLinked();
  return (
    <main className="w-full items-center justify-center flex">
      <div className="portfolio__integrationGrid_wrapper">
        {Integrations.filter(
          (item) =>
            item.title !== integrationsLinked.find((t) => t === item.title)
        ).map((integration) => (
          <IntegrationItem key={integration.id} item={integration} />
        ))}
      </div>
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
