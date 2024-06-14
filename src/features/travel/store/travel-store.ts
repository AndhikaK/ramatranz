import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

import { TravelScheduleQuery } from "@/apis/internal.api.type";
import { ExtractState } from "@/libs/zustand";

type TravelStore = {
  bookingPayload?: TravelScheduleQuery;
  doorToDoorPayload?: {
    from?: string;
    to?: string;
  };

  actions: {
    setBookingPayload: (bookinPayload?: TravelScheduleQuery) => void;
    setDoorToDoorPayload: (bookinPayload?: {
      from?: string;
      to?: string;
    }) => void;
    clearBookingSession: () => void;
  };
};

const travelStore = createStore<TravelStore>()((set, get) => ({
  bookingPayload: undefined,

  actions: {
    setBookingPayload: (bookingPayload) => set({ bookingPayload }),
    setDoorToDoorPayload: (doorToDoorPayload) => set({ doorToDoorPayload }),
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
const doorToDoorPayloadSelector = (state: ExtractState<typeof travelStore>) =>
  state.doorToDoorPayload;
const actionsSelector = (state: ExtractState<typeof travelStore>) =>
  state.actions;

// getters
export const getbookingPayload = () =>
  bookingPayloadSelector(travelStore.getState());
export const getdoorToDoorPayload = () =>
  doorToDoorPayloadSelector(travelStore.getState());
export const getTravelActions = () => actionsSelector(travelStore.getState());

function useTravelStore<U>(selector: Params<U>[1]) {
  return useStore(travelStore, selector);
}

// Hooks
export const useTravelbookingPayload = () =>
  useTravelStore(bookingPayloadSelector);
export const useTravelDoorToDoorPayload = () =>
  useTravelStore(doorToDoorPayloadSelector);
export const useTravelActions = () => useTravelStore(actionsSelector);
