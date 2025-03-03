import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RepoList from "../components/RepoList";
import { GitHubRepo } from "../types/github";

const RepoDetail = () => {
  const { username } = useParams<{ username: string }>();
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      setError("");
      setRepos([]);

      try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        if (response.data.length === 0) {
          setError("No repositories found.");
        } else {
          setRepos(response.data);
        }
      } catch (err) {
        setError("Failed to fetch repositories. Please try again later.");
      }

      setLoading(false);
    };

    fetchRepos();
  }, [username]);

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <h2 className="text-xl font-bold mb-4">Repositories for {username}</h2>
      {loading && <p className="text-center text-gray-600">Loading repositories...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <RepoList repos={repos} />
    </div>
  );
};

export default RepoDetail;
