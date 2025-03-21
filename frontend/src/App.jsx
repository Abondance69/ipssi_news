import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import History from "./pages/History";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}