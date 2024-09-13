import { fetchAddress } from "@/app/utils/fetchAdress";
import { Iposition } from "@/interfaces/mapInterfaces";
import { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

export default function LocationMarker({ position }: { position: Iposition }) {
    const [markersPositions, setMarkersPositions] = useState([position]);
    const map = useMapEvents({
        click() {
            map.locate();
        },
        async dblclick(e) {
            const positionInformations = await fetchAddress(e.latlng);
            setMarkersPositions([
                ...markersPositions,
                { latLng: e.latlng, informations: positionInformations },
            ]);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return markersPositions.map((markerPosition) => {
        const { road, postcode, city, village, country } =
            markerPosition.informations;
        const markerNumber = markersPositions.indexOf(markerPosition) + 1;
        return (
            markerPosition.latLng && (
                <Marker
                    key={`${markerPosition.latLng.lat}-${markerPosition.latLng.lng}`}
                    position={markerPosition.latLng}
                >
                    <Popup>
                        <div>
                            <p>{markerNumber}</p>
                            <p className="text-center">
                                {road}
                                <br />
                                {postcode}
                                <br />
                                {city ? city : village}
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
