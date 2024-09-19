import { useEffect } from "react";
import { useMapStore } from "@/stores/mapStore";
import { useMap } from "react-leaflet";

export default function MapComponentHook() {
    const map = useMap();
    const setMap = useMapStore((state) => state.setMap);

    useEffect(() => {
        setMap(map);
    }, [map, setMap]);

    return null;
}
