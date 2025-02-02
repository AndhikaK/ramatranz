import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

import {
  TravelScheduleQuery,
  TravelScheduleResponseSuccess,
} from "@/apis/internal.api.type";
import { PassengerSeat } from "@/app/(authenticated)/travel/add-passenger";
import { ExtractState } from "@/libs/zustand";

type TravelStore = {
  bookingPayload?: TravelScheduleQuery;
  pointToPointPayload?: {
    from?: string;
    to?: string;
  };
  travelSchedule?: TravelScheduleResponseSuccess["data"][number];
  passenger: PassengerSeat[];

  actions: {
    setBookingPayload: (bookinPayload?: TravelScheduleQuery) => void;
    setPointToPointPayload: (bookinPayload?: {
      from?: string;
      to?: string;
    }) => void;
    setTravelSchedule: (
      bookinPayload?: TravelScheduleResponseSuccess["data"][number]
    ) => void;
    setPassenger: (bookinPayload: PassengerSeat[]) => void;
    clearBookingSession: () => void;
  };
};

const travelStore = createStore<TravelStore>()((set, get) => ({
  bookingPayload: undefined,
  pointToPointPayload: undefined,
  travelSchedule: undefined,
  passenger: [],

  actions: {
    setBookingPayload: (bookingPayload) => set({ bookingPayload }),
    setPointToPointPayload: (pointToPointPayload) =>
      set({ pointToPointPayload: pointToPointPayload }),
    setTravelSchedule: (travelSchedule) => set({ travelSchedule }),
    setPassenger: (passenger) => set({ passenger }),
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
const pointToPointPayloadSelector = (state: ExtractState<typeof travelStore>) =>
  state.pointToPointPayload;
const travelScheduleSelector = (state: ExtractState<typeof travelStore>) =>
  state.travelSchedule;
const travelPassengerSelector = (state: ExtractState<typeof travelStore>) =>
  state.passenger;
const actionsSelector = (state: ExtractState<typeof travelStore>) =>
  state.actions;

// getters
export const getbookingPayload = () =>
  bookingPayloadSelector(travelStore.getState());
export const getPointToPointPayload = () =>
  pointToPointPayloadSelector(travelStore.getState());
export const getTravelSchedule = () =>
  travelScheduleSelector(travelStore.getState());
export const getTravelPassenger = () =>
  travelPassengerSelector(travelStore.getState());
export const getTravelActions = () => actionsSelector(travelStore.getState());

function useTravelStore<U>(selector: Params<U>[1]) {
  return useStore(travelStore, selector);
}

// Hooks
export const useTravelbookingPayload = () =>
  useTravelStore(bookingPayloadSelector);
export const useTravelPointToPointPayload = () =>
  useTravelStore(pointToPointPayloadSelector);
export const useTravelSchedule = () => useTravelStore(travelScheduleSelector);
export const useTravelPassenger = () => useTravelStore(travelPassengerSelector);
export const useTravelActions = () => useTravelStore(actionsSelector);
