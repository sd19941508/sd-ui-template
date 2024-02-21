import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";

import Header from "./example/Header";
import HeroSection from "./example/HeroSection";
import Home from "./example/Home";
import Example from "./example/Example";
import LoginForm from "./example/LoginForm";
import SignUp from "./example/SignUp";
import Posts from "./example/Posts";

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/hero" element={<HeroSection />} />
          <Route path="/product" element={<Example />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
