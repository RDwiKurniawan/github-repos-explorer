import { useState } from "react";
import axios from "axios";

interface GitHubUser {
  id: number;
  login: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
}

const Home = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [repos, setRepos] = useState<{ [key: string]: GitHubRepo[] }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!search.trim()) {
      setError("Please enter a username");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${search}&per_page=5`);
      if (response.data.items.length === 0) {
        setError("No users found.");
        setUsers([]);
      } else {
        setUsers(response.data.items);
      }
    } catch (err) {
      setError("Failed to fetch users.");
      setUsers([]);
    }

    setLoading(false);
  };

  const fetchRepositories = async (username: string) => {
    if (repos[username]) {
      setExpandedUser(expandedUser === username ? null : username);
      return;
    }

    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=3&sort=stars`);
      setRepos((prev) => ({ ...prev, [username]: response.data }));
      setExpandedUser(username);
    } catch (err) {
      setError("Failed to fetch repositories.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      {/* Input Field */}
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Enter username"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Search Button */}
      <button
        className="w-full mt-2 bg-blue-500 text-white py-2 rounded"
        onClick={handleSearch}
      >
        Search
      </button>

      {/* Loading & Error Messages */}
      {loading && <p className="text-gray-600 mt-2 text-center">Loading...</p>}
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

      {/* User List */}
      {users.length > 0 && (
        <div className="mt-4">
          <p className="text-gray-700">Showing users for "{search}"</p>
          {users.map((user) => (
            <div key={user.id} className="mt-2 border rounded">
              {/* User Item */}
              <div
                className="p-2 flex justify-between items-center cursor-pointer bg-gray-100"
                onClick={() => fetchRepositories(user.login)}
              >
                {user.login}
                <span>{expandedUser === user.login ? "▲" : "▼"}</span>
              </div>

              {/* Repository List (Hidden by Default) */}
              {expandedUser === user.login && repos[user.login] && (
                <div className="p-2 bg-white border-t">
                  {repos[user.login].map((repo) => (
                    <div key={repo.id} className="p-2 border rounded mt-1 flex justify-between items-center">
                      <div>
                        <p className="font-bold">{repo.name}</p>
                        <p className="text-sm text-gray-600">{repo.description || "No description"}</p>
                      </div>
                      <div className="flex items-center">
                        <p className="mr-1">{repo.stargazers_count}</p>
                        <span>⭐</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
