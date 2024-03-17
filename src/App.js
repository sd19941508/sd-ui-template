import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";

import Header from "./components/common/Header";
import Home from "./components/pages/Home";
import Products from "./components/pages/Products";
import LoginForm from "./components/pages/LoginForm";
import SignUp from "./components/pages/SignUp";
import Posts from "./components/pages/Posts";

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
