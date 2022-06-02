import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import Buttons from "./routes/Buttons";
import "./index.css";

const root = document.getElementById("root");
root &&
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <RecoilRoot>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route
                index
                element={
                  <div className="hero min-h-screen bg-base-200 -mt-32">
                    <div className="hero-content text-center">
                      <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Hello there</h1>
                        <p className="py-6">
                          Provident cupiditate voluptatem et in. Quaerat fugiat
                          ut assumenda excepturi exercitationem quasi. In
                          deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                      </div>
                    </div>
                  </div>
                }
              />
              <Route path="buttons" element={<Buttons />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </React.StrictMode>
  );
