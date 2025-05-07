import { Link } from "react-router";

export default function Client() {
  return (
    <div>
      <h1>Client Page</h1>
      <p>
        <Link to="/client/authorize">Link to Client Authorize</Link>
      </p>
    </div>
  );
}
