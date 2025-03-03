import axios from "axios";

export const fetchGithubApi = (
  endpoint: string,
  params: { [key: string]: unknown }
) => {
  return axios.get(`https://api.github.com/${endpoint}`, {
    params,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
};
