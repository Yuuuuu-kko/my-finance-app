import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

// detail창으로 가려면 동적 라우팅!!
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/expenses/:id" element={<Detail />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
