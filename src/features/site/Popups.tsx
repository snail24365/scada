import { useAppSelector } from '@/store/hooks';
import React, { useEffect } from 'react';
import { selectSites } from './siteSlice';
import { useMap, Popup as MapboxPopup } from 'react-map-gl';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import { SiteInfo } from './type';
import './mapbox_popup.css';
import _ from 'lodash';
import { ReactComponent as FactoryIcon } from '@/assets/factory_icon.svg';
import { createRoot } from 'react-dom/client';
import { Button } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import { focusedLocationIdState, showMarkerPopups } from './atom';
import { Link } from 'react-router-dom';

type Props = {};

const PopupField = ({ label, value }: { label: string; value: React.ReactNode }) => {
  return (
    <div css={{ display: 'flex', gap: 10, justifyContent: 'space-between' }}>
      <p css={{ fontWeight: 600, width: 90 }}>{label}</p>
      <div css={{ flex: 1 }}>
        <p>{value}</p>
      </div>
    </div>
  );
};

const Popup = ({ info }: { info: SiteInfo }) => {
  return (
    <div css={{ width: 300, maxWidth: 300 }}>
      <div css={{ display: 'flex', gap: 15 }}>
        <FactoryIcon width={50} height={60} />
        <div>
          <p>{_.capitalize(info.type)}</p>
          <p css={{ fontWeight: 600, fontSize: 23 }}>{_.capitalize(info.city)} Plant</p>
        </div>
      </div>
      <br />
      <PopupField label="Location" value={info.location} />
      <img src={info.thumbnailUrl} css={{ width: '100%', height: 170, pointerEvents: 'none' }} />
      <PopupField
        label="Area"
        value={
          <span>
            {`${info.area} m`}
            <sup>2</sup>
          </span>
        }
      />
      <PopupField label="Machines" value={info.numMachines} />
      <div css={{ display: 'flex', justifyContent: 'end' }}>
        <Link to={`${info.id}`}>
          <Button variant="contained">Digtial Twin</Button>
        </Link>
      </div>
    </div>
  );
};

const Popups = (props: Props) => {
  const sites = useAppSelector(selectSites);
  const focusedLocationId = useRecoilValue(focusedLocationIdState);

  const { current: map } = useMap();
  const [showPopups, setShowPopups] = useRecoilState(showMarkerPopups);

  useEffect(() => {
    if (!focusedLocationId) return;
    setShowPopups(() => ({ [focusedLocationId]: true }));
  }, [focusedLocationId]);

  const popups = sites.map((site) => {
    return (
      showPopups[site.id] && (
        <MapboxPopup
          longitude={site.lng}
          latitude={site.lat}
          closeButton={false}
          closeOnClick={false}
          closeOnMove={false}
          key={site.id}
          offset={40}
          className="mapbox-popup"
          maxWidth="600px"
        >
          <Popup info={site} />
        </MapboxPopup>
      )
    );
  });
  return <>{popups}</>;
};

export default Popups;
