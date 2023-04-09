import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { About } from "./components/About";
import { CssBaseline } from "@mui/material";
import { PatientDetails } from "./components/PatientDetails";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Layout>
        <Routes>
          <Route index path="/" element={<Dashboard />} />
          <Route index path="/patients/:id" element={<PatientDetails />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
