import { create } from "zustand";
import { ILocation } from "@/interfaces/mapInterfaces";

interface LocationsState {
    locations: ILocation[];
    addLocation: (newLocation: ILocation) => void;
}

export const useLocationsStore = create<LocationsState>((set) => ({
    locations: [],
    addLocation: (newLocation) =>
        set((state) => ({
            locations: [...state.locations, newLocation],
        })),
}));
