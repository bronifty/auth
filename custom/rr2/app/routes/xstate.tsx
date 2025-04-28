import { useState, useEffect } from "react";
import { toggleActor } from "../state.machine";

const App = () => {
  // Use state and effect hooks to subscribe to the global actor
  const [state, setState] = useState(toggleActor.getSnapshot());

  useEffect(() => {
    // Subscribe to actor updates
    const subscription = toggleActor.subscribe((snapshot) => {
      setState(snapshot);
    });

    // Cleanup on unmount
    return () => subscription.unsubscribe();
  }, []);

  // Function to send events
  const send = (event: { type: string }) => toggleActor.send(event);

  return (
    <div>
      <h1>Client-Side State Machine</h1>
      <div>Value: {state.value.toString()}</div>
      <button onClick={() => send({ type: "toggle" })}>
        Toggle (Client Event)
      </button>
      <div>Count: {state.context.count}</div>
      <div>Max Count: {state.context.maxCount}</div>

      <div style={{ marginTop: "20px" }}>
        <a href="/server-toggle">Go to server-side version</a>
      </div>
    </div>
  );
};

export default App;
