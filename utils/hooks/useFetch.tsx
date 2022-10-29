/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { db } from "../../firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { getUserDetails } from "../../slices/userDetailsSlice";
import { getGithubRepos } from "../../slices/githubReposSlice";

function useFetch(type = "" as string) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const result = useSelector((state: RootState) => state.userDetails.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!session || !type) return;
    if (type === "user") {
      const fetchUserData = async () => {
        // we are fetching user details
        setLoading(true);
        if (Object.values(result).some((value) => value !== "")) {
          // we are saying that whenever we rerender the generalSection we don't re-fetch the
          // data again and again. once it is fetched once and stored we get it.
          const userDetails = await getDoc(
            doc(db, "users", session?.user?.email)
          );
          if (userDetails.exists()) {
            dispatch(getUserDetails(userDetails.data()));
            setLoading(false);
          }
        }
      };
      fetchUserData();
    }
  }, [type, session]);

  return { result, loading };
}

export default useFetch;
