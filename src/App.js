import { Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>File drive front</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/link1">Link 1</Link> |{" "}
        <Link to="/link2">Link 2</Link>
      </nav>
    </div>
  );
}