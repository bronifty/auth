import { Link, Outlet } from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { useOAuth } from "./context";
export default function Layout() {
  const { client, endpoints } = useOAuth();
  return (
    <>
      <header>
        <Link to="/">Home</Link>
      </header>
      <Outlet />
      <footer>
        <hr />
        <p>
          client: {JSON.stringify(client, null, 2)}
          <br />
          endpoints: {JSON.stringify(endpoints, null, 2)}
        </p>
      </footer>
    </>
  );
}
