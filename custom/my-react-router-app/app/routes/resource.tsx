// Resource route that returns JSON data
export async function loader() {
  // Example product data
  const product = {
    name: "Product from Resource Route",
    description: "This data comes from a resource route in React Router",
  };

  return Response.json(product);
}
