import React, { useState, useEffect } from "react";

export const useFetchData = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const getData = async (integrationTitle: string) => {
    setLoading(true);
    await fetch(`/api/integrations/${integrationTitle}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setResult(data))
      .finally(() => setLoading(false))
      .catch((err) => console.error(err));
  };
  return { loading, result, getData };
};
