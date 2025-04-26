import { Outlet } from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export default function Layout() {
  return (
    <>
      <header>header</header>
      <Outlet />
      <footer>footer</footer>
    </>
  );
}
