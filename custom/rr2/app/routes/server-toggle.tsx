import { redirect } from "react-router";
import { useLoaderData, Link, Form } from "react-router";
import { toggleActor, getToggleState } from "../state.machine";

// Server-side loader
export function loader() {
  // Get current state from the global actor
  const state = getToggleState();

  return {
    value: state.value,
    count: state.context.count,
    maxCount: state.context.maxCount,
  };
}

// Server-side action
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "toggle") {
    // Send toggle event to the global actor
    toggleActor.send({ type: "toggle" });
  }

  // Simple redirect
  return null;
}

export default function ServerToggle() {
  // @ts-ignore - Simplified for demo
  const state = useLoaderData();

  return (
    <div>
      <h1>Server-Side State Machine</h1>
      <div>Value: {String(state.value)}</div>
      <div>Count: {state.count}</div>
      <div>Max Count: {state.maxCount}</div>

      <form method="post">
        <input type="hidden" name="action" value="toggle" />
        <button type="submit">Toggle (Server Action)</button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <a href="/xstate">Go to client-side version</a>
      </div>
    </div>
  );
}
