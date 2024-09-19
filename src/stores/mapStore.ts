import { create } from "zustand";
import { Map } from "leaflet";

interface MapState {
    map: Map | null;
    setMap: (map: Map) => void;
}

export const useMapStore = create<MapState>((set) => ({
    map: null,
    setMap: (map: Map) => set({ map }),
}));
