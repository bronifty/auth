// route("products/:pid", "./product.tsx");
import type { Route } from "./+types/product";
import { useFetcher, useLoaderData } from "react-router";
import { useEffect } from "react";

export async function loader({ params }: Route.LoaderArgs) {
  // Initialize with default data
  return {
    name: "Loading...",
    description: "Loading description...",
  };
}

export default function Product({ loaderData }: Route.ComponentProps) {
  const initialData = useLoaderData();
  const fetcher = useFetcher();

  // Fetch data from resource route when component mounts
  useEffect(() => {
    fetcher.load("/resource");
  }, []);

  // Use fetcher data if available, otherwise use loader data
  const { name, description } = fetcher.data || initialData;

  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      {fetcher.state !== "idle" && <p>Loading...</p>}
    </div>
  );
}
