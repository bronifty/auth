import { Link, Outlet } from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export default function Layout() {
  return (
    <>
      <header>
        <Link to="/">Home</Link>
      </header>
      <Outlet />
      <footer>footer</footer>
    </>
  );
}
