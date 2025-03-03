import { memo } from "react";
import UserItem from "./UserItem";
import { GithubUser } from "../utils/types";

const SearchResult = ({
  users,
  searchKey,
}: {
  users: GithubUser[];
  searchKey: string;
}) => {
  return (
    <div className="mt-4">
      {users.length ? (
        <>
          <p className="text-sm text-slate-600 mb-3">
            Showing users for "{searchKey}"
          </p>
          <ul className="space-y-3">
            {users.map((user: GithubUser) => {
              return <UserItem key={user.id} user={user} />;
            })}
          </ul>
        </>
      ) : (
        <p className="text-sm text-slate-600 mb-3">
          No result found for "{searchKey}"
        </p>
      )}
    </div>
  );
};

export default memo(SearchResult);
