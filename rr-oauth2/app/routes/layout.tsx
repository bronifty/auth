import { Outlet } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Layout() {
  return (
    <>
      <h1>Layout Header</h1>
      <Outlet />
      <h1>Layout Footer</h1>
    </>
  );
}
