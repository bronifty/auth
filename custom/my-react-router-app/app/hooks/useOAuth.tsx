import { useSelector } from "@xstate/react";
import { oauthActor, addRequest, addCode, addToken } from "../store/oauth";
import type { Requests, Codes, Tokens } from "../store/oauth";

// This hook returns the state and functions to update it
export function useOAuth() {
  // Get the current state from the actor
  const state = useSelector(oauthActor, (state) => state.context);

  return {
    // Access state properties
    clients: state.clients,
    endpoints: state.endpoints,
    requests: state.requests,
    codes: state.codes,
    tokens: state.tokens,

    // Functions to update state
    addRequest,
    addCode,
    addToken,
  };
}
