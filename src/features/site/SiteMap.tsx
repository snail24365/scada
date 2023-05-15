import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect } from 'react';
import MapboxMap from 'react-map-gl';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import CameraFly from './CameraFly';
import Markers from './Markers';
import Popups from './Popups';
import { focusedLocationIdState, mapCenterState } from './atom';

mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX_TOKEN;

type Props = {};

const SiteMap = (props: Props) => {
  const mapCenter = useRecoilValue(mapCenterState);

  const setFocusedLocationId = useSetRecoilState(focusedLocationIdState);

  useEffect(() => {
    setFocusedLocationId(null);
  }, []);

  return (
    <MapboxMap
      initialViewState={{
        ...mapCenter,
        zoom: 14
      }}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '100%',
        minWidth: '100%',
        flexShrink: 1,
        flexGrow: 1,
        position: 'relative'
      }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
    >
      <CameraFly />
      <Markers />
      <Popups />
    </MapboxMap>
  );
};

export default SiteMap;
