import dynamic from "next/dynamic";
import { MapSidebar } from "@/components/MapSidebar";
import SearchLocation from "@/components/SearchLocation";

const MapComponent = dynamic(() => import("../components/map/MapComponent"), {
    ssr: false,
});

export default async function Home() {
    return (
        <div className="w-screen h-screen">
            <MapComponent />
            <SearchLocation />
            <MapSidebar />
        </div>
    );
}
