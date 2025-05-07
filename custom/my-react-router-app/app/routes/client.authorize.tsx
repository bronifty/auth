import type { Route } from "./+types/client.authorize";
import { redirect } from "react-router";
import { buildUrl } from "../utils";
import randomstring from "randomstring";
import { useOAuth } from "../context";
export async function loader(_: Route.LoaderArgs) {}

export default function ClientAuthorize() {
  const { setState, clients, endpoints } = useOAuth();
  const state = randomstring.generate() || "abc";
  setState(state);
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
