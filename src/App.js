import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import Resources from "./pages/Resources";
import Opportunities from "./pages/Opportunities";
import Bookmarks from "./pages/Bookmarks";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
    
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route
  path="/bookmarks"
  element={<Bookmarks />}
/>
<Route
  path="/"
  element={<Home />}
/>
<Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;