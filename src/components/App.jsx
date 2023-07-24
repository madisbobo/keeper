import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Header from "./Header"
import Footer from "./Footer"



function App() {
    return (
            <BrowserRouter>
                <Header />
                <Footer />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </BrowserRouter>
    )
}

export default App;


