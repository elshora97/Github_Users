import React from "react";
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from "./pages";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
