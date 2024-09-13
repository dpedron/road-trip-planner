import { LatLngExpression } from "leaflet";
import { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

export default function LocationMarker({
    position,
}: {
    position: LatLngExpression;
}) {
    const [markerPosition, setPosition] = useState(position);
    const map = useMapEvents({
        click() {
            map.locate();
        },
        dblclick(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return markerPosition === null ? null : (
        <Marker position={markerPosition}>
            <Popup>You are here</Popup>
        </Marker>
    );
}
