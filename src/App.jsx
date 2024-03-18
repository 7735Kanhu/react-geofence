import React, { useState } from 'react';
import { GoogleMap, LoadScript, DrawingManager, Marker, Polygon } from '@react-google-maps/api';

function App() {
  const [polygonPath, setPolygonPath] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const onMapClick = (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setMarkers([...markers, newMarker]);

    if (markers.length >= 2) {
      const newPath = markers.map(marker => ({ lat: marker.lat, lng: marker.lng }));
      newPath.push(newMarker);
      setPolygonPath(newPath);
    }
  };

  const handleMarkerDrag = (index, event) => {
    const newMarkers = [...markers];
    newMarkers[index] = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setMarkers(newMarkers);

    const newPath = newMarkers.map(marker => ({ lat: marker.lat, lng: marker.lng }));
    setPolygonPath(newPath);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <LoadScript googleMapsApiKey='AIzaSyD9Ubz-DThoPFYnuptWWvovKRYavOX21ko'>
      <GoogleMap
        mapContainerStyle={{
          height: `50vh`,
          width: `50vw`,
        }}
        center={{
          lat: 0,
          lng: 0,
        }}
        zoom={3}
        onClick={onMapClick}
      >
        {polygonPath.length > 0 && (
          <Polygon
            path={polygonPath}
            options={{
              fillColor: '#FF5733',
              fillOpacity: 0.4,
              strokeColor: '#FF5733',
              strokeOpacity: 1,
              strokeWeight: 2,
              editable: true, // Allow polygon editing
            }}
            draggable={isEditing}
            onDragEnd={(event) => handleMarkerDrag(0, event)} // Assuming only one marker for simplicity
          />
        )}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker}
            draggable={isEditing}
            onDrag={(event) => handleMarkerDrag(index, event)}
          />
        ))}
      </GoogleMap>
      <button onClick={toggleEditing}>{isEditing ? 'Finish Editing' : 'Edit Polygon'}</button>
    </LoadScript>
  );
}

export default App;
