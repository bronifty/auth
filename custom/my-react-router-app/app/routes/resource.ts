import type { Route } from "./+types/resource";

export function loader(_: Route.LoaderArgs) {
  return Response.json({
    name: "Product 3",
    description: "Product 3 description",
  });
}

export function action(_: Route.ActionArgs) {
  return Response.json({
    message: "I handle everything else",
  });
}
