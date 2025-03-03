import { useState } from "react";
import axios from "axios";
import { fetchGithubApi } from "../utils/searchFunctions";
import { useQuery } from "@tanstack/react-query";
import { FaChevronDown, FaStar } from "react-icons/fa";
import { RiLoader4Fill } from "react-icons/ri";
import { GithubRepository, GithubUser } from "../utils/types";
import clsx from "clsx";

const UserItem = ({ user }: { user: GithubUser }) => {
  const [isRepoShown, setIsRepoShown] = useState(false);
  const {
    data: userRepos,
    isLoading,
    status,
    error,
  } = useQuery({
    queryKey: ["repositories", user.login],
    queryFn: () =>
      fetchGithubApi("search/repositories", { q: `user:${user.login}` }),
    enabled: isRepoShown,
    staleTime: 0,
    gcTime: 1000 * 60 * 2,
  });

  return (
    <li>
      <div
        onClick={() => setIsRepoShown(!isRepoShown)}
        className="flex p-3 justify-between items-center bg-slate-300 rounded-lg cursor-pointer"
      >
        <h3 className="font-bold">{user.login}</h3>
        <span>
          <FaChevronDown
            className={clsx(
              "transition duration-300",
              isRepoShown ? "rotate-180" : "rotate-0"
            )}
          />
        </span>
      </div>
      {isRepoShown && (
        <>
          {isLoading && (
            <div className="ml-2 mt-1 flex rounded-lg bg-slate-100 p-3 text-sm items-center gap-2">
              <RiLoader4Fill className="animate-spin" />
              <span className="text-slate-500">Fetching user repositories</span>
            </div>
          )}
          {status === "error" && axios.isAxiosError(error) && (
            <>
              {error.status === 401 ||
              error.status === 403 ||
              error.status === 429 ? (
                <div className="ml-2 mt-1 rounded-lg bg-red-100 p-3 text-sm text-red-600">
                  You don't have permission to see this content.
                </div>
              ) : error.status === 422 ? (
                <div className="ml-2 mt-1 rounded-lg bg-slate-100 p-3 text-sm">
                  This user doesn't have any public repositories.
                </div>
              ) : error.status === 404 ? (
                <div className="ml-2 mt-1 rounded-lg bg-red-100 p-3 text-sm text-red-600">
                  We couldn't find what you're looking for.
                </div>
              ) : error.status === 500 ? (
                <div className="ml-2 mt-1 rounded-lg bg-red-100 p-3 text-sm text-red-600">
                  Github is not responding at the moment, try again later.
                </div>
              ) : (
                <div className="ml-2 mt-1 rounded-lg bg-red-100 p-3 text-sm text-red-600">
                  Something unexpected happened. Please refresh the page and try
                  again.
                </div>
              )}
            </>
          )}
          {status === "success" && (
            <div>
              <ul className="ml-2 space-y-1 mt-1">
                {userRepos?.data.items.map((repo: GithubRepository) => {
                  return (
                    <li
                      key={repo.id}
                      className="flex rounded-lg bg-slate-100 p-3 text-sm justify-between items-start gap-4"
                    >
                      <div>
                        <h5 className="font-bold mb-1">{repo.name}</h5>
                        {repo.description && (
                          <p className="text-xs">{repo.description}</p>
                        )}
                      </div>
                      <div className="flex gap-1 items-center">
                        <FaStar />
                        {repo.stargazers_count}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </>
      )}
    </li>
  );
};

export default UserItem;
