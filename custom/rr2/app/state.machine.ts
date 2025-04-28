import { assign, createMachine, createActor } from "xstate";

type ToggleContext = {
  count: number;
  maxCount: number;
};

type ToggleEvents = { type: "toggle" };

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
      },
    },
    Active: {
      entry: assign({
        count: ({ context }) => context.count + 1,
      }),
      on: { toggle: "Inactive" },
      after: { 2000: "Inactive" },
    },
  },
});

const actor = createActor(toggleMachine);

actor.subscribe((snapshot) => {
  console.log("State:", snapshot.value);
});

actor.start();

actor.send({ type: "toggle" });
