import { atom } from 'recoil';

export const showMarkerPopups = atom<Record<string, boolean>>({
  key: 'showMarkerPopups',
  default: {}
});

export const mapCenterState = atom<{ longitude: number; latitude: number }>({
  key: 'mapCenterState',
  default: {
    // daejeon coordinate
    longitude: 127.3845475,
    latitude: 36.3504119
  }
});

export const focusedLocationIdState = atom<string | null>({
  key: 'focusedLocationIdState',
  default: null
});
