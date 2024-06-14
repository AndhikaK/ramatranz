import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

import { TravelScheduleQuery } from "@/apis/internal.api.type";
import { ExtractState } from "@/libs/zustand";

type TravelStore = {
  bookingPayload?: TravelScheduleQuery;

  actions: {
    setBookingPayload: (bookinPayload?: TravelScheduleQuery) => void;
    clearBookingSession: () => void;
  };
};

const travelStore = createStore<TravelStore>()((set, get) => ({
  bookingPayload: undefined,

  actions: {
    setBookingPayload: (bookingPayload) => set({ bookingPayload }),
    clearBookingSession: async () => {
      set({
        bookingPayload: undefined,
      });
    },
  },
}));

type Params<U> = Parameters<typeof useStore<typeof travelStore, U>>;

// Selectors
const bookingPayloadSelector = (state: ExtractState<typeof travelStore>) =>
  state.bookingPayload;
const actionsSelector = (state: ExtractState<typeof travelStore>) =>
  state.actions;

// getters
export const getbookingPayload = () =>
  bookingPayloadSelector(travelStore.getState());
export const getTravelActions = () => actionsSelector(travelStore.getState());

function useTravelStore<U>(selector: Params<U>[1]) {
  return useStore(travelStore, selector);
}

// Hooks
export const useTravelbookingPayload = () =>
  useTravelStore(bookingPayloadSelector);
export const useTravelActions = () => useTravelStore(actionsSelector);
