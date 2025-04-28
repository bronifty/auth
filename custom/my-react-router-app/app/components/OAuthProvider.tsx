import type { ReactNode } from "react";
import { useSelector } from "@xstate/react";
import { oauthActor } from "../store/oauth";

export function OAuthProvider({ children }: { children: ReactNode }) {
  // useSelector will re-render components when selected state changes
  useSelector(oauthActor, (state) => state.context);

  return <>{children}</>;
}
