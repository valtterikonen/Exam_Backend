import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
// pages & components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import FruitPage from "./pages/fruitpage";
import FruitUpdate from "./pages/fruitUpdate";
import users from "./pages/users";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token")) || false
  );
  const [bgColor, setbgColor] = useState("White");
  function toggleBackGroundColor() {
    setbgColor(bgColor === "White" ? "#aed8e6" : "White");
  }


  
  return (
    <div className="App" style={{ backgroundColor: bgColor }}> 
      <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} 
      setIsAuthenticated={setIsAuthenticated} 
      toggleBackgroundColor={toggleBackGroundColor}
      />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/fruit/:id"
              element={isAuthenticated ? <FruitPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/fruit/:id/update"
              element={isAuthenticated ? <FruitUpdate /> : <Navigate to="/login" />}
            />
            <Route 
              path="/users"
              element={isAuthenticated ? <users /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/signup"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Signup setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
