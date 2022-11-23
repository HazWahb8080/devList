/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import {
  addDoc,
  doc,
  collection,
  setDoc,
  updateDoc,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useSession } from "next-auth/react";

export default function Integration() {
  const router = useRouter();
  const { code, integration } = router.query;
  const { data: session } = useSession();
  const usermail = session?.user?.email;
  useEffect(() => {
    if (!code || !integration || !usermail) return;
    var codeData = {
      code,
    };

    const controller = new AbortController();
    const signal = controller.signal;

    // sending the code to get the accesstoken and perform further actions
    fetch(`/api/integrations/${integration}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(codeData),
      signal,
    })
      .then((res) => res.json())
      .then((data) => fireToDb(data));
    return () => {
      controller.abort();
    };
  }, [code, integration, usermail]);

  const fireToDb = async (data: any) => {
    let docRef = collection(db, "users", usermail, "integrations");
    await setDoc(doc(docRef, `${integration}`), {
      data: data.result,
    });

    if (typeof integration === "string") {
      // will use this to check on the dashboard if the  integration linked or not.
      await updateDoc(doc(db, "users", usermail), {
        [integration]: true,
      });
    }
    if (integration === "github") {
      data.RepoResponse.forEach(async (repoData: DocumentData) => {
        await addDoc(collection(docRef, `${integration}`, "repos"), {
          repo: repoData,
        });
      });
    }
    console.log("connected", integration);
    router.push("/dash");
  };

  return <div>{integration}</div>;
}
