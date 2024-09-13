import dynamic from "next/dynamic";
import { fetchAddress } from "./utils/fetchAdress";

const MapComponent = dynamic(() => import("../components/map/Map"), {
    ssr: false,
});

export default async function Home() {
    const positionInformations = await fetchAddress({
        lat: 44.1667,
        lng: 4.95,
    });
    return (
        <div className="w-screen h-screen">
            <MapComponent
                position={{
                    latLng: { lat: 44.1667, lng: 4.95 },
                    informations: positionInformations,
                }}
                zoom={13}
            />
        </div>
    );
}
