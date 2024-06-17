import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

import { ExtractState } from "@/libs/zustand";

type PackageOrderPayload = {};
type PackageStore = {
  packageOrderPayload?: {
    from: PackageOrderPayload;
    to: PackageOrderPayload;
  };

  actions: {
    setPackageOrderPayload: (packageOrderPayload?: {
      from: PackageOrderPayload;
      to: PackageOrderPayload;
    }) => void;
    clearBookingSession: () => void;
  };
};

const packageStore = createStore<PackageStore>()((set, get) => ({
  packageOrderPayload: undefined,

  actions: {
    setPackageOrderPayload: (packageOrderPayload) =>
      set({ packageOrderPayload }),
    clearBookingSession: async () => {
      set({
        packageOrderPayload: undefined,
      });
    },
  },
}));

type Params<U> = Parameters<typeof useStore<typeof packageStore, U>>;

// Selectors
const packageOrderPayloadSelector = (
  state: ExtractState<typeof packageStore>
) => state.packageOrderPayload;
const actionsSelector = (state: ExtractState<typeof packageStore>) =>
  state.actions;

// getters
export const getPackageOrderPayload = () =>
  packageOrderPayloadSelector(packageStore.getState());
export const getPackageActions = () => actionsSelector(packageStore.getState());

function usePackageStore<U>(selector: Params<U>[1]) {
  return useStore(packageStore, selector);
}

// Hooks
export const usePackageOrderPayload = () =>
  usePackageStore(packageOrderPayloadSelector);
export const usePackageActions = () => usePackageStore(actionsSelector);
