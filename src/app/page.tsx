import dynamic from "next/dynamic";
import { fetchAddress } from "../utils/utils";
import { MapSidebar } from "@/components/MapSidebar";

const MapComponent = dynamic(() => import("../components/map/Map"), {
    ssr: false,
});

export default async function Home() {
    const locationInformations = await fetchAddress({
        lat: 44.1667,
        lng: 4.95,
    });
    return (
        <div className="w-screen h-screen">
            <MapComponent
                location={{
                    latLng: { lat: 44.1667, lng: 4.95 },
                    informations: locationInformations,
                    position: 0,
                }}
                zoom={13}
            />
            <div className="absolute top-0 right-0 h-full w-fit z-[10000]">
                <MapSidebar />
            </div>
        </div>
    );
}
