import { redirect } from "react-router";

const authServer = {
  authorizationEndpoint: "http://localhost:9001/authorize",
  tokenEndpoint: "http://localhost:9001/token",
};

const protectedResource = "http://localhost:9002/resource";

const client = {
  client_id: "oauth-client-1",
  client_secret: "oauth-client-secret-1",
  redirect_uris: ["http://localhost:9000/callback"],
};

let state = null;

let access_token = null;
let scope = null;

export async function loader() {
  return redirect("/server/authorize");
}
