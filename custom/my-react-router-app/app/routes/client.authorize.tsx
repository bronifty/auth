import { useLoaderData } from "react-router";

export async function loader() {
  return {
    message: "Client Authorize",
  };
}
