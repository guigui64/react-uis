import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import Buttons from "./routes/Buttons";
import Hero from "./routes/Hero";
import "./index.css";

const root = document.getElementById("root");
root &&
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <RecoilRoot>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Hero />} />
              <Route path="buttons" element={<Buttons />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </React.StrictMode>
  );
