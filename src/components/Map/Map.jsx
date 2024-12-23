import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useHotels } from "../context/HotelsProvider"
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useGeoLocation from './../../hooks/useGeoLocation';

function Map() {
    const { isloading, hotels } = useHotels();
    const [mapCenter, setMapCenter] = useState([50, 10]);
    const [searchParams, setSearchparams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const { isloading: isLoadingGeoPosition, position: geoPosition, getPosition } = useGeoLocation();

    useEffect(() => {
        if (lat && lng) setMapCenter([lat, lng]);
    }, [lat, lng]);

    useEffect(() => {
        if (geoPosition?.lat && geoPosition?.lng) setMapCenter([geoPosition?.lat, geoPosition?.lng]);
    }, [geoPosition?.lat,geoPosition?.lng]);

    return (
        <div className="mapContainer">
            <MapContainer className="map" center={mapCenter} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <button onClick={getPosition} className="getLocation">{isLoadingGeoPosition ? "Loading..." : "Use Your Location"}</button>
                <ChangeCenter position={mapCenter} />
                {
                    hotels.map((item) => (
                        <Marker key={item.id} position={[item.latitude, item.longitude]}>
                            <Popup>
                                {item.host_location}
                            </Popup>
                        </Marker>
                    ))}
            </MapContainer>,
        </div>
    )
}

export default Map;

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}