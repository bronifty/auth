import { Link } from "react-router";
import type { Route } from "./+types/client";

export default function Client() {
  return (
    <div>
      <h1>Client</h1>
      <Link to="client/authorize">Client Authorize</Link>
    </div>
  );
}
