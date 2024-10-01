import { ILocation } from "@/interfaces/locationInterfaces";
import { useLocationsStore } from "@/stores/locationsStore";
import { fetchLocationByLatLng } from "@/utils/fetchUtils";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import LocationBadge from "../LocationBadge";
import { roadType, administrativeDivision } from "@/utils/locationUtils";

export default function LocationMarker() {
    const { locations, addLocation } = useLocationsStore((state) => state);

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
