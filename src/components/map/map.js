import { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationMarker from './locationMarker';
import LocationInfoBox from './locationInfoBox';

const NATURAL_EVENT_WILDFIRE = 8;

const Map = ({ eventData, center, zoom }) => {
    const [locationInfo, setLocationInfo] = useState(null);

    const markers = eventData.map((ev, index) => {
        if (ev.categories[0].id === NATURAL_EVENT_WILDFIRE) {
            return (
                <LocationMarker
                    key={index}
                    onClick={() =>
                        setLocationInfo({ id: ev.id, title: ev.title })
                    }
                />
            );
        }
        return null;
    });

    return (
        <div className="map">
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: 'AIzaSyCDu2VjGH-8M1nd01xUPNedqIo8xFSmpio'
                }}
                defaultCenter={center}
                defaultZoom={zoom}
            >
                {markers}
                <LocationMarker lat={center.lat} lng={center.lng} />
            </GoogleMapReact>
            {locationInfo && <LocationInfoBox info={locationInfo} />}
        </div>
    );
};

Map.defaultProps = {
    center: {
        lat: 40.3411911,
        lng: 49.8076646
    },
    zoom: 10.5
};

export default Map;
