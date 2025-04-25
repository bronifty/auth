// route("products/:pid", "./product.tsx");
import type { Route } from "./+types/product";

export async function loader({ params, request }: Route.LoaderArgs) {
  //   const product = {
  //     name: "Product 1",
  //     description: "Product 1 description",
  //   };
  // Create a URL relative to the current request
  const url = new URL("/resource", request.url);
  const product = await fetch(url).then((res) => res.json());
  return product;
}

export default function Product({ loaderData }: Route.ComponentProps) {
  const { name, description } = loaderData;
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
}
