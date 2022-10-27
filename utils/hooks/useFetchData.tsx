import React, { useState, useEffect } from "react";

export const useFetchData = (initialValue: string) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const getData = async (initialValue: string) => {
    setLoading(true);
    // await fetch(`/api/integrations/${initialValue}`, {
    //   method: "post",
    // }).then((res) => console.log(res));
  };
  return { loading, result, getData };
};
