import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Link1 from "./routes/Link1";
import Link2 from "./routes/Link2";
import { APIHostContext, host } from "./APIHostContext";

const rootElement = document.getElementById("root");

render(
  <APIHostContext.Provider value={host}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="link1" element={<Link1 />} />
        <Route path="link2" element={<Link2 />} />
      </Routes>
    </BrowserRouter>
  </APIHostContext.Provider>,
  rootElement
);