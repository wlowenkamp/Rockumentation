import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/UserContext/User";


const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <UserProvider>
        <ToastContainer/>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </UserProvider>
);
