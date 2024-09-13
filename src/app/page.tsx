import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("../components/map/Map"), {
    ssr: false,
});

export default function Home() {
    return (
        <div className="w-screen h-screen">
            <MapComponent position={{ lat: 44.1667, lng: 4.95 }} zoom={13} />
        </div>
    );
}
