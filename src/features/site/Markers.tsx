import { useAppSelector } from '@/store/hooks';
import { Marker } from 'react-map-gl';
import { useSetRecoilState } from 'recoil';
import { selectSites } from './siteSlice';
import { showMarkerPopups } from './atom';

const Markers = () => {
  const sites = useAppSelector(selectSites);
  const setShowPopups = useSetRecoilState(showMarkerPopups);

  return (
    <>
      {sites.map((site) => (
        <Marker
          longitude={site.lng}
          latitude={site.lat}
          key={site.id}
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            setShowPopups((state) => ({ ...state, [site.id]: !state[site.id] }));
          }}
        />
      ))}
    </>
  );
};

export default Markers;
