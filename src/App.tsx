import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RepoDetail from "./pages/RepoDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<RepoDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
