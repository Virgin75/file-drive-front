import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import MyDrive from "./routes/MyDrive";
import FolderView from './routes/FolderView'
import SharedWithMeView from './routes/SharedWithMeView'
import { APIHostContext, host } from "./APIHostContext";

const rootElement = document.getElementById("root");

render(
  <APIHostContext.Provider value={host}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyDrive />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="my-drive" element={<MyDrive />} />
        <Route path="folders/:id" element={<FolderView />} />
        <Route path="shared-with-me" element={<SharedWithMeView />} />
      </Routes>
    </BrowserRouter>
  </APIHostContext.Provider>,
  rootElement
);