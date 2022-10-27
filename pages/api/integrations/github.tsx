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
      `https://github.com/login/oauth/access_token?client_id=d1e100b716c65639f27d&client_secret=a61c661e89f5959ee96b66efeecffa6acc0b3b6f&code=${req.body.code}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      }
    );
    const response = await data.json();
    // with the access token we now can get the userDetails
    const userData = await fetch("https://api.github.com/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${response.access_token}`,
        "Content-Type": "application/json",
      },
    });
    const result = await userData.json();
    const Repos = await fetch("https://api.github.com/user/repos", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${response.access_token}`,
        Accept: "application/vnd.github+json",
      },
    });
    const RepoResponse = await Repos.json();
    return res.status(200).send({ result, RepoResponse });
  } catch (err) {
    return res.status(500).send(err.messge);
  }
}
