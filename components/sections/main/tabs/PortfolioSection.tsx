import React, { useState } from "react";
import Modal from "../../../../designSystem/modal/Modal";
import { Integrations } from "../../../../utils/db";

function PortfolioSection() {
  return (
    <main className="w-full items-center justify-center flex">
      <div className="portfolio__integrationGrid_wrapper">
        {Integrations.map((integration) => (
          <IntegrationItem key={integration.id} item={integration} />
        ))}
      </div>
    </main>
  );
}

export default PortfolioSection;

function IntegrationItem({ item }) {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const handleModal = (title: string) => {
    setTitle(title);
  };
  return (
    <Modal open={openModal} setOpen={setOpenModal} item={item}>
      <div className="portfolio__integrations__item_wrapper">
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
    </Modal>
  );
}
