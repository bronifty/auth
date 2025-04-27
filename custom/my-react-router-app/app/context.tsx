import { createContext, useContext } from "react";

interface Client {
  client_id: string;
  client_secret: string;
  redirect_uris: string[];
  scope: string;
}

const client: Client = {
  client_id: "oauth-client-1",
  client_secret: "oauth-client-secret-1",
  redirect_uris: ["http://localhost:9000/callback"],
  scope: "foo bar",
};

interface Endpoints {
  authorizationEndpoint: string;
  tokenEndpoint: string;
  protectedResource: string;
}

const endpoints: Endpoints = {
  authorizationEndpoint: "http://localhost:9001/authorize",
  tokenEndpoint: "http://localhost:9001/token",
  protectedResource: "http://localhost:9002/resource",
};

interface Requests {
  [key: string]: {
    response_type: string;
    client_id: string;
    redirect_uri: string;
    state: string;
  };
}

const requests: Requests = {};

interface Codes {
  [key: string]: {
    authorizationEndpointRequest: Requests;
    scope: string[];
    user: string;
  };
}

const codes: Codes = {};

interface Tokens {
  [key: string]: {
    access_token: string;
    client_id: string;
    scope: string;
  };
}

const tokens: Tokens = {};

interface OAuthContextType {
  client: Client;
  endpoints: Endpoints;
  requests: Requests;
  codes: Codes;
  tokens: Tokens;
}

const OAuthContext = createContext<OAuthContextType | undefined>(undefined);

export function OAuthProvider({ children }: { children: React.ReactNode }) {
  const value = {
    client,
    endpoints,
    requests,
    codes,
    tokens,
  };
  return <OAuthContext value={value}>{children}</OAuthContext>;
}

export function useOAuth() {
  const context = useContext(OAuthContext);
  if (!context) {
    throw new Error("useOAuth must be used within an OAuthProvider");
  }
  return context;
}
