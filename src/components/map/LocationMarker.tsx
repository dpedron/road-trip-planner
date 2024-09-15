import { administrativeDivision, fetchAddress, roadType } from "@/utils/utils";
import { ILocation } from "@/interfaces/mapInterfaces";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { useLocationsStore } from "@/stores/locations-store";
import LocationBadge from "../LocationBadge";

export default function LocationMarker() {
    const locations = useLocationsStore((state) => state.locations);
    const addLocation = useLocationsStore((state) => state.addLocation);

    const map = useMapEvents({
        click() {
            map.locate();
        },
        async dblclick(e) {
            const locationInformations = await fetchAddress(e.latlng);
            addLocation({
                latLng: e.latlng,
                informations: locationInformations,
                id: locations.length + 1,
            });
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return locations.map((location: ILocation) => {
        const { postcode, country } = location.informations;
        return (
            location.latLng && (
                <Marker
                    key={`${location.latLng.lat}-${location.latLng.lng}`}
                    position={location.latLng}
                >
                    <Popup>
                        <div>
                            <p className="flex flex-col items-center text-center">
                                <LocationBadge>
                                    {location.id.toString()}
                                </LocationBadge>
                                {roadType(location.informations)}
                                <br />
                                {postcode}
                                <br />
                                {administrativeDivision(location.informations)}
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
