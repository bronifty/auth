import { Link, Outlet } from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { useOAuth } from "./context";
export default function Layout() {
  const { clients, endpoints, requests, codes, tokens, state } = useOAuth();
  return (
    <>
      <header>
        <Link to="/">Home</Link>
      </header>
      <hr />
      <Outlet />
      <footer>
        <hr />
        <p>
          state: {state}
          <br />
          clients: {JSON.stringify(clients, null, 2)}
          <br />
          endpoints: {JSON.stringify(endpoints, null, 2)}
          <br />
          requests: {JSON.stringify(requests, null, 2)}
          <br />
          codes: {JSON.stringify(codes, null, 2)}
          <br />
          tokens: {JSON.stringify(tokens, null, 2)}
        </p>
      </footer>
    </>
  );
}
