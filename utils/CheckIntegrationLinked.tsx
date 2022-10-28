import React, { useState, useEffect } from "react";
import { Integrations } from "./db";
import { useSession } from "next-auth/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export function CheckIntegrationLinked() {
  const { data: session } = useSession();
  const usermail = session?.user?.email;
  const [integrationsLinked, setIntegrationsLinked] = useState<string[]>([]);
  const MappedIntegrationTitles = () => {
    return Integrations.map((intgr) => intgr.title); //string[]
  };

  useEffect(() => {
    if (!session) return;
    const getIntegrationsLinked = async () => {
      let ref = doc(db, "users", usermail);
      let docDetails = await getDoc(ref);
      MappedIntegrationTitles().forEach((title) => {
        Object.keys(docDetails.data()).forEach((key) => {
          if (key === title)
            setIntegrationsLinked([...integrationsLinked, key]);
        });
      });
    };
    getIntegrationsLinked();
  }, [session]);

  return { integrationsLinked };
}
