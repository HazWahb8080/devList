import type { NextApiRequest, NextApiResponse } from "next";
// we are using github aouth App istead of using public github APIs :
// compliance issues and mainly to make it maintanable at scale in case we need to perform
// more actions.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // sending the code to get the access token
    const data = await fetch(
      `https://api.medium.com/v1/token?code=${req.body.code}&client_id=32975313ad33&client_secret=00eed9e451fa43499c57df440df0790cf5f9ee68&grant_type=authorization_code&redirect_uri=https://devlist.hazem.codes/processing/medium`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      }
    );
    const response = await data.json();
    console.log(response);
    // with the access token we now can get the userDetails
    const userData = await fetch("https://api.medium.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${response.access_token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const result = await userData.json();
    const publications = await fetch(
      `https://api.medium.com/v1/users/${result.data.id}/publications`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${response.access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const publications_Data = await publications.json();
    return res.status(200).send({ result, publications_Data });
  } catch (err) {
    return res.status(500).send(err.messge);
  }
}
