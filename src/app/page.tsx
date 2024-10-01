import SearchLocation from "@/components/SearchLocation";
import MapSidebar from "@/components/sidebar/MapSidebar";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("../components/map/MapComponent"), {
    ssr: false,
});

export default async function Home() {
    return (
        <div className="h-screen w-screen">
            <MapComponent />
            <SearchLocation />
            <MapSidebar />
        </div>
    );
}
