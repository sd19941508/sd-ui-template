import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";

import Header from "./example/Header";
import Home from "./example/Home";
import Example from "./example/Example";
import LoginForm from "./example/LoginForm";

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Example />} />
          <Route path="/login/:userId" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
