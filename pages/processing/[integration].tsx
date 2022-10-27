/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { addDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useSession } from "next-auth/react";

export default function Integration() {
  const router = useRouter();
  const { code, integration } = router.query;
  const { data: session } = useSession();
  const usermail = session?.user?.email;
  useEffect(() => {
    if (!code || !integration || !usermail) return;
    const codeData = {
      code,
    };
    fetch(`/api/integrations/${integration}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(codeData),
    })
      .then((res) => res.json())
      .then((data) => fireToDb(data));
  }, [code, integration, usermail]);

  const fireToDb = async (data: any) => {
    await addDoc(collection(db, "users", usermail, `${integration}`), {
      data: data,
    });
    console.log("connected", integration);
    router.push("/dash");
  };

  return <div>{integration}</div>;
}
