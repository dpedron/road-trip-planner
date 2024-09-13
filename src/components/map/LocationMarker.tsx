import { LatLngLiteral } from "leaflet";
import { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

export default function LocationMarker({
    position,
}: {
    position: LatLngLiteral;
}) {
    const [markersPositions, setPosition] = useState([position]);
    const map = useMapEvents({
        click() {
            map.locate();
        },
        dblclick(e) {
            setPosition([...markersPositions, e.latlng]);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return (
        markersPositions &&
        markersPositions.map((markerPosition) => {
            return (
                <Marker
                    key={`${markerPosition.lat}-${markerPosition.lng}`}
                    position={markerPosition}
                >
                    <Popup>
                        <div>
                            <p>Latitude: {markerPosition.lat}</p>
                            <p>Longitude: {markerPosition.lng}</p>
                        </div>
                    </Popup>
                </Marker>
            );
        })
    );
}
