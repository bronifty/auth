import querystring from "querystring";

const buildUrl = function (
  base: string,
  options: Record<string, string>,
  hash?: string
) {
  // Handle relative URLs by prepending the base URL
  let url = base;

  // Check if the URL is relative (doesn't start with http or https)
  if (!base.startsWith("http")) {
    // For server-side (Node.js), we need a full URL
    // The base URL should be configured based on your environment
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:5173"; // Default to localhost in server environment

    // Ensure we don't have double slashes
    if (base.startsWith("/")) {
      url = `${baseUrl}${base}`;
    } else {
      url = `${baseUrl}/${base}`;
    }
  }

  const newUrl = new URL(url);

  Object.keys(options).forEach(function (key) {
    newUrl.searchParams.set(key, options[key]);
  });

  if (hash) {
    newUrl.hash = hash;
  }

  return newUrl.toString();
};

const encodeClientCredentials = function (
  clientId: string,
  clientSecret: string
) {
  return Buffer.from(
    querystring.escape(clientId) + ":" + querystring.escape(clientSecret)
  ).toString("base64");
};

const getClient = function (clientId: string, clients: any) {
  let foundClient = null;
  clients.forEach(function (client: any) {
    if (client.client_id == clientId) {
      foundClient = client;
    }
  });
  return foundClient;
};

export { buildUrl, encodeClientCredentials, getClient };
