import { createContext, useContext } from "react";

interface Client {
  client_id: string;
  client_secret: string;
  redirect_uris: string[];
}

const client: Client = {
  client_id: "oauth-client-1",
  client_secret: "oauth-client-secret-1",
  redirect_uris: ["http://localhost:9000/callback"],
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

interface OAuthContextType {
  client: Client;
  endpoints: Endpoints;
}

const OAuthContext = createContext<OAuthContextType | undefined>(undefined);

export function OAuthProvider({ children }: { children: React.ReactNode }) {
    