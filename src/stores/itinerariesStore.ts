import { IItinerary } from "@/interfaces/itineraryInterface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ItinerariesState {
    itineraries: { [key: string]: IItinerary };
    addItinerary: (key: string, newItinerary: IItinerary) => void;
}

export const useItinerariesStore = create<ItinerariesState>()(
    persist(
        (set) => ({
            itineraries: {},
            addItinerary: (key, newItinerary) =>
                set((state) => ({
                    itineraries: {
                        ...state.itineraries,
                        [key]: newItinerary,
                    },
                })),
        }),
        {
            name: "itineraries-storage",
        }
    )
);
