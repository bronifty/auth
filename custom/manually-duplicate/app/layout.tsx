import { Outlet, Link } from "react-router";

export default function Layout() {
  return (
    <div>
      <h1>
        <Link to="/">Link to Home</Link>
      </h1>
      <Outlet />
    </div>
  );
}
