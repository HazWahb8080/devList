import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Integrations } from "./db";
import { useSession } from "next-auth/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addIntegrationLinked } from "../slices/linkedIntegrationsSlice";

export function CheckIntegrationLinked() {
  const { data: session } = useSession();
  const usermail = session?.user?.email;
  const dispatch = useDispatch();
  const MappedIntegrationTitles = useMemo(() => {
    return Integrations.map((intgr) => intgr.title); //string[]
  }, []);
  const integrationsLinked = useSelector(
    (state: RootState) => state.linkedIntegration.value
  );

  useEffect(() => {
    if (!session) return;
    const getIntegrationsLinked = async () => {
      let ref = doc(db, "users", usermail);
      let docDetails = await getDoc(ref);
      MappedIntegrationTitles.forEach((title) => {
        Object.keys(docDetails.data()).forEach((key) => {
          if (key === title) dispatch(addIntegrationLinked(key));
        });
      });
    };
    getIntegrationsLinked();
  }, [session]);

  return { integrationsLinked };
}
