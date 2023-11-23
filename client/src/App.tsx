import React from 'react';
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import Articles from "./components/Articles/Articles";
import AuthPage from "./components/Authentification/AuthPage";

function App() {
  return (
    <div>
        <Routes>
            <Route path={'/'} element={<Articles/>} />
            <Route path={'/auth'} element={<AuthPage/>} />
        </Routes>
        <ToastContainer />
    </div>
  );
}

export default App;
