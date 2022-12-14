import type { NextApiRequest, NextApiResponse } from "next";
// we are using github aouth App istead of using public github APIs :
// compliance issues and mainly to make it maintanable at scale in case we need to perform
// more actions.
var bodyParser = require("body-parser");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // sending the code to get the access token
    const data = await fetch(
      `https://medium2.p.rapidapi.com/user/id_for/${req.body.username}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "c72d5f7031mshf5f7a1824e385d2p12e2a3jsn56c7215773f4",
          "X-RapidAPI-Host": "medium2.p.rapidapi.com",
        },
      }
    );

    const response = await data.json();
    console.log(response);
    // with the access token we now can get the userDetails
    // const userArticles = await fetch(
    //   `https://medium2.p.rapidapi.com/user/${response.id}/articles`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // const result = await userArticles.json();
    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).send(err.messge);
  }
}
