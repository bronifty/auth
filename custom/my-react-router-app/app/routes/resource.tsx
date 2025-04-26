import type { Route } from "./+types/resource";

export async function loader(_: Route.LoaderArgs) {
  // Example product data for GET requests
  const product = {
    name: "Product from Resource Route (GET)",
    description: "This data comes from a resource route GET request",
  };

  return Response.json(product);
}

// Handle POST requests
export async function action({ request }: Route.ActionArgs) {
  // Get form data from the request
  const formData = await request.formData();

  // Process the data (in a real app, you might save to database, etc.)
  const message = formData.get("message") || "No message provided";

  // Return a response with the processed data
  return Response.json({
    success: true,
    message: message,
    receivedAt: new Date().toISOString(),
    responseType: "POST Response",
  });
}
