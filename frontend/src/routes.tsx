import React from "react";
import { Routes, Route } from "react-router";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Welcome } from "./pages/Welcome";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/welcome" element={<Welcome />} />
    </Routes>
  );
};
