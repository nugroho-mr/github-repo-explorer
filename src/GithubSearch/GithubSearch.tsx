import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { RiLoader4Fill } from "react-icons/ri";
import { BiSolidError } from "react-icons/bi";
import axios from "axios";
import { fetchGithubApi } from "../utils/searchFunctions";
import SearchResult from "./SearchResult";

const GithubSearch = () => {
  const [searchParams] = useSearchParams();
  const [searchKey, setSearchKey] = useState(searchParams.get("s") || "");
  const [isFormError, setIsFormError] = useState(false);
  const navigate = useNavigate();

  const {
    data: usersData,
    refetch: refetchUsersData,
    isFetching,
    status,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetchGithubApi("search/users", { q: searchKey, per_page: 5, page: 1 }),
    enabled: !!searchParams.get("s"),
  });

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchKey || searchKey.length < 3) {
      setIsFormError(true);
    } else {
      refetchUsersData();
      navigate(`?s=${searchKey}`);
    }
  };

  const searchInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
  };

  useEffect(() => {
    if (searchKey.length >= 3) setIsFormError(false);
  }, [searchKey]);

  return (
    <div className="bg-slate-200 min-h-screen md:py-10">
      <div className="bg-white p-6 min-h-screen md:min-h-[unset] md:max-w-[640px] md:mx-auto md:rounded-2xl md:shadow-2xl">
        <h1 className="text-center mb-4 text-4xl font-bold">GitHub Explorer</h1>
        <form onSubmit={searchHandler}>
          <input
            type="text"
            value={searchKey}
            onChange={searchInputChangeHandler}
            className={clsx(
              "p-3 border rounded-lg w-full",
              isFormError
                ? "border-red-400 outline-red-600"
                : "border-slate-300"
            )}
            placeholder="Enter username"
          />
          <button
            type="submit"
            className="block mt-2 w-full bg-blue-500 text-white rounded-lg p-3 cursor-pointer outline-blue-900 hover:bg-blue-700"
          >
            Search
          </button>
          {isFormError && (
            <p className="text-red-600 text-xs italic text-center mt-1">
              {searchKey.length > 0 ? (
                <>Username must be at least 3 characters.</>
              ) : (
                <>Username cannot be empty.</>
              )}
            </p>
          )}
        </form>
        {status === "error" && axios.isAxiosError(error) && (
          <div className="flex text-sm text-red-600 items-center justify-center gap-2 mt-20">
            <BiSolidError />
            <span>
              {error.status === 401 ||
              error.status === 403 ||
              error.status === 429 ? (
                <>You don't have enough permission to do this action.</>
              ) : error.status === 404 ? (
                <>We couldn't find what you're looking for.</>
              ) : error.status === 500 ? (
                <>Github is not responding at the moment, try again later.</>
              ) : (
                <>
                  Something unexpected happened. Please refresh the page and try
                  again.
                </>
              )}
            </span>
          </div>
        )}
        {isFetching && searchKey !== usersData?.config.params.q && (
          <div className="flex text-sm items-center justify-center gap-2 mt-20">
            <RiLoader4Fill className="animate-spin" />
            <span className="text-slate-500">Fetching Github users.</span>
          </div>
        )}
        {(isFetching && searchKey !== usersData?.config.params.q) ||
          (status === "success" && (
            <SearchResult
              users={usersData?.data.items}
              searchKey={usersData?.config.params.q}
            />
          ))}
      </div>
    </div>
  );
};

export default GithubSearch;
