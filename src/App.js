import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Blog from "./screens/Blog/Blog";
import Navbar from "./screens/Navbar/Navbar";
import EditProfile from "./screens/Editprofile/EditProfile";
import Profile from "./screens/Profile/Profile";
import Tag from "./screens/Tagwise/Tag";
import Pending from "./screens/AdditionalPages/Pending";
import Bookmark from "./screens/Bookmark/Bookmark";
import Write from "./screens/Write/Write";
import Share from "./screens/AdditionalPages/Share";
import Error from "./screens/AdditionalPages/Error";
import Home from "./screens/Homepage/Home";
import Login from "./screens/auth/login";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route element={<Profile />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route exact path="/navbar" element={<Navbar />} />
        <Route exact path="/tag/:id" element={<Tag />} />
        <Route path="/notifications" element={<Pending />} />
        <Route exact path="/share" element={<Share />} />
        <Route exact path="/edit/:id" element={<EditProfile />} />
        <Route exact path="/profile/:id" element={<Profile />} />
        <Route exact path="/bookmarks" element={<Bookmark />} />
        <Route exact path="/write" element={<Write />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
