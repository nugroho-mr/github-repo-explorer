export interface GithubUser {
  id: number;
  login: string;
}

export interface GithubRepository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
}
