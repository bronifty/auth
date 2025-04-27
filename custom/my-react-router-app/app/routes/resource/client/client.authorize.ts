import type { Route } from "./+types/routes/resource/client/authorize";
import randomstring from "randomstring";
import querystring from "querystring";
import { useOAuth } from "../../../context";

export async function loader(_: Route.LoaderArgs) {
  const { client, endpoints, requests, codes, tokens } = useOAuth();
  access_token = null;

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

const buildUrl = function (
  base: string,
  options: Record<string, string>,
  hash?: string
) {
  const newUrl = new URL(base);

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
