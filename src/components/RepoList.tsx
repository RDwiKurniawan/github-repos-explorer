import { GitHubRepo } from "../types/github";

interface RepoListProps {
  repos: GitHubRepo[];
}

const RepoList: React.FC<{ repos: GitHubRepo[] }> = ({ repos }) => {
  if (repos.length === 0) {
    return <p className="text-gray-500 text-center">No repositories found.</p>;
  }

  return (
    <div className="space-y-4">
      {repos.map((repo) => (
        <div
          key={repo.id}
          className="p-4 border rounded shadow-md bg-white hover:shadow-lg transition"
        >
          <h3 className="font-bold text-lg">{repo.name}</h3>
          <p className="text-gray-600">{repo.description || "No description available."}</p>
          <div className="flex justify-between mt-2">
            <span className="text-gray-500">⭐ {repo.stargazers_count}</span>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View on GitHub
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepoList;
