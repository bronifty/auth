import type { Route } from "./+types/routes/resource/client/authorize";
import randomstring from "randomstring";
import querystring from "querystring";
import { useOAuth } from "../../../context";
import { buildUrl } from "../../../utils";

export async function loader(_: Route.LoaderArgs) {
  const { client, endpoints, requests, codes, tokens } = useOAuth();

  const state = randomstring.generate();

  const authorizeUrl = buildUrl(endpoints.authorizationEndpoint, {
    response_type: "code",
    client_id: client.client_id,
    redirect_uri: client.redirect_uris[0],
    state,
  });

  console.log("redirect", authorizeUrl);
  res.redirect(authorizeUrl);
}
