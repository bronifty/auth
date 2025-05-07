import { redirect } from "react-router";
import randomstring from "randomstring";
import url from "url";
const authServer = {
  authorizationEndpoint: "http://localhost:5173/server/authorize",
  tokenEndpoint: "http://localhost:5173/server/token",
};

const protectedResource = "http://localhost:5173/api/resource";

const client = {
  client_id: "oauth-client-1",
  client_secret: "oauth-client-secret-1",
  redirect_uris: ["http://localhost:5173/client/callback"],
};

let state = null;

let access_token = null;
let scope = null;

var buildUrl = function (base, options, hash) {
  var newUrl = url.parse(base, true);
  delete newUrl.search;
  if (!newUrl.query) {
    newUrl.query = {};
  }
  Object.keys(options).forEach(function (key) {
    newUrl.query[key] = options[key];
  });
  if (hash) {
    newUrl.hash = hash;
  }

  return url.format(newUrl);
};

export async function loader() {
  access_token = null;

  state = randomstring.generate();

  var authorizeUrl = buildUrl(authServer.authorizationEndpoint, {
    response_type: "code",
    client_id: client.client_id,
    redirect_uri: client.redirect_uris[0],
    state,
  });

  console.log("redirect", authorizeUrl);
  return redirect(authorizeUrl);
}
