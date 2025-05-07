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

export default function ClientAuthorize() {
  return (
    <div>
      <h1>Client Authorize Page</h1>
      <p>{JSON.stringify(client, null, 2)} </p>
    </div>
  );
}
