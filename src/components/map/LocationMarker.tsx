import {
    administrativeDivision,
    fetchLocationByLatLng,
    roadType,
} from "@/utils/utils";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { useLocationsStore } from "@/stores/locationsStore";
import LocationBadge from "../LocationBadge";
import { ILocation } from "@/interfaces/locationInterfaces";

export default function LocationMarker() {
    const locations = useLocationsStore((state) => state.locations);
    const addLocation = useLocationsStore((state) => state.addLocation);

    const map = useMapEvents({
        click() {
            map.locate();
        },
        async dblclick(e) {
            const location = await fetchLocationByLatLng(e.latlng);

            if (location) {
                const { lat, lon, address } = location;
                addLocation({
                    lat: lat,
                    lon: lon,
                    address: address,
                    positionOnMap: locations.length + 1,
                });
                map.flyTo(e.latlng, map.getZoom());
            }
        },
    });

    return locations.map((location: ILocation) => {
        const { postcode, country } = location.address;
        const { lat, lon, positionOnMap, address } = location;
        return (
            location && (
                <Marker key={`${lat}-${lon}`} position={{ lat: lat, lng: lon }}>
                    <Popup>
                        <div>
                            <p className="flex flex-col items-center text-center">
                                <LocationBadge>
                                    {positionOnMap.toString()}
                                </LocationBadge>
                                {roadType(address)}
                                <br />
                                {postcode}
                                <br />
                                {administrativeDivision(address)}
                                <br />
                                {country}
                                <br />
                            </p>
                        </div>
                    </Popup>
                </Marker>
            )
        );
    });
}
