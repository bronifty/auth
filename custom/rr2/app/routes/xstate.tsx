import { useMachine } from "@xstate/react";
import { toggleMachine } from "../state.machine";

const App = () => {
  const [state, send] = useMachine(toggleMachine);

  return (
    <div>
      <div>Value: {state.value.toString()}</div>
      <button onClick={() => send({ type: "toggle" })}>Toggle</button>
      <div>Count: {state.context.count}</div>
      <div>Max Count: {state.context.maxCount}</div>
    </div>
  );
};

export default App;
