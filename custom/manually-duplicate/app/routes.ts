import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/client.tsx"),
  route("client/authorize", "./routes/client.authorize.tsx"),
  route("server/authorize", "./routes/server.authorize.tsx"),
] satisfies RouteConfig;
