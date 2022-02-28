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
        <Link to="/login">Login</Link> |{" "}
        <Link to="/signup">Signup</Link>
      </nav>
    </div>
  );
}