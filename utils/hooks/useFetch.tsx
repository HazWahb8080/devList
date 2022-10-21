import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

function useFetch(type = "" as string) {
  const { data: session } = useSession();
  const [result, setResult] = useState<any>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session || !type) return;
    if (type === "user") {
      const fetchUserData = async () => {
        // we are fetching user details
        setLoading(true);
        const userDetails = await getDoc(
          doc(db, "users", session?.user?.email)
        );
        if (userDetails.exists()) {
          setResult(userDetails.data());
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [type, session]);

  return { result, loading };
}

export default useFetch;
