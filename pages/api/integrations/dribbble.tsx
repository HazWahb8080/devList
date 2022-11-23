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
      `https://dribbble.com/oauth/authorize?client_id=7e1b4dc2b11ca8157f6e91fed33d545d4b0844b60eabf752323f142cbb285972&redirect_uri=https://devlist.hazem.code/processing/dribbble`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
