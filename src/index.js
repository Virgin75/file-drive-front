import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import { APIHostContext, host } from "./APIHostContext";

const rootElement = document.getElementById("root");

render(
  <APIHostContext.Provider value={host}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </APIHostContext.Provider>,
  rootElement
);