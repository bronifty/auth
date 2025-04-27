import { createMachine, assign } from "xstate";

interface Client {
  client_id: string;
  client_secret: string;
  redirect_uris: string[];
  scope: string;
}

interface Endpoints {
  authorizationEndpoint: string;
  tokenEndpoint: string;
  protectedResource: string;
}

interface Requests {
  [key: string]: {
    response_type: string;
    client_id: string;
    redirect_uri: string;
    state: string;
  };
}

interface Codes {
  [key: string]: {
    authorizationEndpointRequest: Requests;
    scope: string[];
    user: string;
  };
}

interface Tokens {
  [key: string]: {
    access_token: string;
    client_id: string;
    scope: string;
  };
}

// Machine context type
interface OAuthContext {
  clients: Client[];
  endpoints: Endpoints;
  requests: Requests;
  codes: Codes;
  tokens: Tokens;
}

// Create the initial context
const initialContext: OAuthContext = {
  clients: [
    {
      client_id: "oauth-client-1",
      client_secret: "oauth-client-secret-1",
      redirect_uris: ["http://localhost:9000/callback"],
      scope: "foo bar",
    },
  ],
  endpoints: {
    authorizationEndpoint: "server/authorize",
    tokenEndpoint: "http://localhost:9001/token",
    protectedResource: "http://localhost:9002/resource",
  },
  requests: {},
  codes: {},
  tokens: {},
};

export const oauthMachine = createMachine({
  id: "oauth",
  initial: "idle",
  context: initialContext,
  states: {
    idle: {
      on: {
        ADD_REQUEST: {
          actions: assign({
            requests: (context, event) => ({
              ...context.requests,
              [event.state]: event.request,
            }),
          }),
        },
        ADD_CODE: {
          actions: assign({
            codes: (context, event) => ({
              ...context.codes,
              [event.code]: event.codeData,
            }),
          }),
        },
        ADD_TOKEN: {
          actions: assign({
            tokens: (context, event) => ({
              ...context.tokens,
              [event.key]: event.tokenData,
            }),
          }),
        },
      },
    },
  },
});
