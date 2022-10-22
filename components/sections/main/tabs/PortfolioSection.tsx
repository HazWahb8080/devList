import React from "react";
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
  return (
    <main className="portfolio__integrations__item_wrapper">
      {/* logo */}
      <span className="">{item.icon}</span>
      {/* text */}
      <span className="w-full space-y-1">
        <h2 className="text-lg font-medium">{item.title}</h2>
        <p className="text-xs line">{item.desc}</p>
      </span>
      {/* plusIcon */}
      <span className="">++</span>
    </main>
  );
}
