import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { full, scrollbar } from '@/style/style';
import { Button } from '@mui/material';
import LocationList from './LocationList';

mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX_TOKEN;

type Props = {};
export type LocationInfo = {
  lng: number;
  lat: number;
  city: string;
  id: string;
  address: string;
};

const SiteMap = (props: Props) => {
  const [locationInfos, setLocationInfos] = useState<LocationInfo[]>([]);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    for (const locationInfo of locationInfos) {
      const element = document.createElement('div');
      element.className = 'marker';
      new mapboxgl.Marker(element)
        .setLngLat([locationInfo.lng, locationInfo.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(`<h3>${locationInfo.city}</h3><p>${locationInfo.address}</p>`)
        )
        .addTo(mapRef.current);
    }
    return () => {
      // TODO : remove marker element
    };
  }, [locationInfos]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    mapRef.current = new mapboxgl.Map({
      container: container,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [127.38, 36.35],
      zoom: 5
    });

    const locationInfos: LocationInfo[] = [
      { lng: 127.3845475, lat: 36.3504119, city: 'Daejeon', id: 'daejeon', address: '755 Hanbat-daero' },
      { lng: 129.3113596, lat: 35.5383773, city: 'Ulsan', id: 'ulsan', address: 'Wonsan-ri 919' },
      { lng: 126.9575991, lat: 35.9482858, city: 'Iksan', id: 'iksan', address: '599 Youngje-dong' },
      { lng: 127.0018494, lat: 36.789796, city: 'Asan', id: 'asan', address: '1077 Hyundai-daero' }
    ];

    setLocationInfos(locationInfos);
  }, []);

  return (
    <div css={{ ...full, position: 'relative' }}>
      <div
        ref={containerRef}
        css={{
          width: '100%',
          height: '100%',
          minHeight: '100%',
          minWidth: '100%',
          flexShrink: 1,
          flexGrow: 1,
          position: 'relative'
        }}
      ></div>
      <LocationList locationInfos={locationInfos} />
    </div>
  );
};

export default SiteMap;
