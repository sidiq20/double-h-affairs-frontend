# Map Integration Guide

The MapSection component currently shows a placeholder for the wedding venue location. To integrate with a real map service, you can choose from these options:

## Option 1: Google Maps Embed (Easiest)
Replace the map container in `MapSection.tsx` with an iframe:

```jsx
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.5434567890123!2d3.39999999!3d6.54999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNUT%20Pavilion!5e0!3m2!1sen!2sng!4v1234567890123"
  width="100%"
  height="384"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  className="rounded-2xl"
/>
```

## Option 2: React-Leaflet (Open Source)
Install: `npm install react-leaflet leaflet`

```jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// In your map container:
<MapContainer 
  center={[6.5500, 3.4000]} // Lagos coordinates
  zoom={15} 
  style={{ height: '400px', width: '100%' }}
  className="rounded-2xl"
>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  <Marker position={[6.5500, 3.4000]}>
    <Popup>NUT Pavilion, NERDC Road, Lagos</Popup>
  </Marker>
</MapContainer>
```

## Option 3: Mapbox (Professional)
Install: `npm install mapbox-gl react-map-gl`

```jsx
import Map, { Marker } from 'react-map-gl';

<Map
  mapboxAccessToken="YOUR_MAPBOX_TOKEN"
  initialViewState={{
    longitude: 3.4000,
    latitude: 6.5500,
    zoom: 15
  }}
  style={{ width: '100%', height: '400px' }}
  mapStyle="mapbox://styles/mapbox/streets-v11"
  className="rounded-2xl"
>
  <Marker longitude={3.4000} latitude={6.5500} />
</Map>
```

Choose the option that best fits your needs and budget!