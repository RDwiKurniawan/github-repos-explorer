import { GitHubUser } from "../types/github";
import { useNavigate } from "react-router-dom";

interface UserListProps {
  users: GitHubUser[];
  loading: boolean;
}

const UserList: React.FC<UserListProps> = ({ users, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return <p className="text-center text-gray-600">Loading users...</p>;
  }

  return (
    <div className="p-4">
      {users.length === 0 ? <p className="text-gray-500 text-center">No users found.</p> : null}
      {users.map((user) => (
        <button
          key={user.id}
          className="p-2 border-b w-full text-left hover:bg-blue-100 transition duration-200"
          onClick={() => navigate(`/user/${user.login}`)}
        >
          {user.login}
        </button>
      ))}
    </div>
  );
};

export default UserList;
