import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("products/:pid", "./routes/products.tsx"),
  route("resource", "./routes/resource.ts"),
] satisfies RouteConfig;
