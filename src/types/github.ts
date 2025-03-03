export interface GitHubUser {
    login: string;
    id: number;
    avatar_url: string;
  }
  
  export interface GitHubRepo {
    name: string;
    description: string;
    stargazers_count: number;
  }
  