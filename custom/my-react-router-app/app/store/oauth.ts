import { createMachine, assign, createActor } from "xstate";

export interface Client {
  client_id: string;
  client_secret: string;
  redirect_uris: string[];
  scope: string;
}

export interface Endpoints {
  authorizationEndpoint: string;
  tokenEndpoint: string;
  protectedResource: string;
}

export interface Requests {
  [key: string]: {
    response_type: string;
    client_id: string;
    redirect_uri: string;
    state: string;
  };
}

export interface Codes {
  [key: string]: {
    authorizationEndpointRequest: Requests;
    scope: string[];
    user: string;
  };
}

export interface Tokens {
  [key: string]: {
    access_token: string;
    client_id: string;
    scope: string;
  };
}

// Event types
type OAuthEvent =
  | { type: "ADD_REQUEST"; state: string; request: Requests[string] }
  | { type: "ADD_CODE"; code: string; codeData: Codes[string] }
  | { type: "ADD_TOKEN"; key: string; tokenData: Tokens[string] };

// Machine context type
export interface OAuthContext {
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
      redirect_uris: ["http://localhost:5173/callback"],
      scope: "foo bar",
    },
  ],
  endpoints: {
    authorizationEndpoint: "http://localhost:5173/server/authorize",
    tokenEndpoint: "http://localhost:5173/token",
    protectedResource: "http://localhost:5173/resource",
  },
  requests: {},
  codes: {},
  tokens: {},
};

export const oauthMachine = createMachine({
  id: "oauth",
  initial: "idle",
  context: initialContext,
  types: {
    context: {} as OAuthContext,
    events: {} as OAuthEvent,
  },
  states: {
    idle: {
      on: {
        ADD_REQUEST: {
          actions: assign(({ context, event }) => ({
            requests: {
              ...context.requests,
              [event.state]: event.request,
            },
          })),
        },
        ADD_CODE: {
          actions: assign(({ context, event }) => ({
            codes: {
              ...context.codes,
              [event.code]: event.codeData,
            },
          })),
        },
        ADD_TOKEN: {
          actions: assign(({ context, event }) => ({
            tokens: {
              ...context.tokens,
              [event.key]: event.tokenData,
            },
          })),
        },
      },
    },
  },
});

// Create an instance of the machine that can be shared across the app
export const oauthActor = createActor(oauthMachine);

// Initialize the actor
oauthActor.start();

// Helper functions to access the state outside of React
export function getOAuthState() {
  return oauthActor.getSnapshot().context;
}

// Send events to the machine
export function addRequest(state: string, request: Requests[string]) {
  oauthActor.send({ type: "ADD_REQUEST", state, request });
}

export function addCode(code: string, codeData: Codes[string]) {
  oauthActor.send({ type: "ADD_CODE", code, codeData });
}

export function addToken(key: string, tokenData: Tokens[string]) {
  oauthActor.send({ type: "ADD_TOKEN", key, tokenData });
}
