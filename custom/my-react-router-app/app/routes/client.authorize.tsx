import type { Route } from "./+types/client.authorize";
import { redirect } from "react-router";
import { buildUrl } from "../utils";
import randomstring from "randomstring";
import { useOAuth } from "../context";
export async function loader(_: Route.LoaderArgs) {
  const state = randomstring({ length: 16 }) || "abc";

  // Get clients and endpoints from context to use in the loader function
  // We need to create this with direct access since hooks can't be used in loaders
  const clients = [
    {
      client_id: "oauth-client-1",
      client_secret: "oauth-client-secret-1",
      redirect_uris: ["http://localhost:5173/callback"],
      scope: "foo bar",
    },
  ];

  const endpoints = {
    authorizationEndpoint: "http://localhost:5173/server/authorize",
    tokenEndpoint: "http://localhost:5173/token",
    protectedResource: "http://localhost:5173/resource",
  };

  // Create the request
  const request = {
    response_type: "code",
    client_id: clients[0].client_id,
    redirect_uri: clients[0].redirect_uris[0],
    state,
  };

  const authorizeUrl = buildUrl(endpoints.authorizationEndpoint, request);
  console.log("redirect", authorizeUrl);
  return redirect(authorizeUrl);
}

export default function ClientAuthorize() {
  return <div>Redirecting to authorization server...</div>;
}
