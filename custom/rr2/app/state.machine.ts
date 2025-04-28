import { assign, createMachine, createActor } from "xstate";

type ToggleContext = {
  count: number;
  maxCount: number;
};

type ToggleEvents =
  | { type: "toggle" }
  | { type: "SYNC"; data: { value: string; count: number; maxCount: number } };

export const toggleMachine = createMachine({
  id: "toggle",
  initial: "Inactive",
  context: {
    count: 0,
    maxCount: 10,
  },
  states: {
    Inactive: {
      on: {
        toggle: {
          // Only trigger toggle transition if count is less than maxCount
          guard: ({ context }) => context.count < context.maxCount,
          target: "Active",
        },
        SYNC: {
          actions: assign({
            count: (_, event) => event.data.count,
            maxCount: (_, event) => event.data.maxCount,
          }),
        },
      },
    },
    Active: {
      entry: assign({
        count: ({ context }) => context.count + 1,
      }),
      on: {
        toggle: "Inactive",
        SYNC: {
          actions: assign({
            count: (_, event) => event.data.count,
            maxCount: (_, event) => event.data.maxCount,
          }),
        },
      },
      after: { 2000: "Inactive" },
    },
  },
});

// Create a global actor instance
export const toggleActor = createActor(toggleMachine);

// Start the actor
toggleActor.start();

// Helper to get current state snapshot
export const getToggleState = () => toggleActor.getSnapshot();

// Subscribe to log state changes if needed
toggleActor.subscribe((snapshot) => {
  console.log("State:", snapshot.value, "Count:", snapshot.context.count);
});
