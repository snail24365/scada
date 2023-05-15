import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { focusedLocationIdState, mapCenterState } from './atom';
import { useMap } from 'react-map-gl';
import { selectSites } from './siteSlice';
import { useSelector } from 'react-redux';

type Props = {};

const CameraFly = () => {
  // const mapCenter = useRecoilValue(mapCenterState);
  const locationId = useRecoilValue(focusedLocationIdState);
  const locationInfos = useSelector(selectSites);

  const location = locationInfos.find((location) => location.id === locationId);

  const { current: map } = useMap();

  useEffect(() => {
    if (!location) return;
    map?.flyTo({ center: [location.lng, location.lat] });
  }, [locationId]);

  return null;
};

export default CameraFly;
