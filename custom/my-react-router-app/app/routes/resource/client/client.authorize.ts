import type { Route } from "./+types/routes/resource/client/authorize";
import randomstring from "randomstring";
import { useOAuth } from "../../../context";
import { buildUrl } from "../../../utils";
import { redirect } from "react-router";

export async function loader(_: Route.LoaderArgs) {
  const { clients, endpoints, requests, codes, tokens } = useOAuth();

  const state = randomstring.generate();

  const authorizeUrl = buildUrl(endpoints.authorizationEndpoint, {
    response_type: "code",
    client_id: clients[0].client_id,
    redirect_uri: clients[0].redirect_uris[0],
    state,
  });

  console.log("redirect", authorizeUrl);
  return redirect(authorizeUrl);
}
