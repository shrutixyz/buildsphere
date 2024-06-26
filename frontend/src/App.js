import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FormDetails from "./pages/FormDetails";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/form" element={<FormDetails />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />

    </Routes>
  </BrowserRouter>
  );
}

export default App;