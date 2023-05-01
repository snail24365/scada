import React, { useEffect } from 'react';
import MonitorViewport from './MonitorViewport/MonitorViewport';
import PageWindow from './PageWindow';
import { getService } from '@/service/api';
import { useRecoilValue } from 'recoil';
import { currentScadaPageIdState } from '../scada/atom/scadaAtom';
import { useAppDispatch } from '@/store/hooks';
import { ScadaSceneState } from '@/types/type';
import { updateMonitorScene } from './slice/scadaMonitorSceneSlice';

type Props = {};

const MonitorSection = (props: Props) => {
  const currentPageId = useRecoilValue(currentScadaPageIdState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('ihihi');

    (async () => {
      const scene = (await getService(`/scene/${currentPageId}`)).data;
      dispatch(updateMonitorScene(scene as ScadaSceneState));
    })();
  }, []);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <div css={{ display: 'flex', height: '100%', padding: '10px 20px' }}>
        <PageWindow />
        <MonitorViewport />
      </div>
    </React.Suspense>
  );
};

export default MonitorSection;
