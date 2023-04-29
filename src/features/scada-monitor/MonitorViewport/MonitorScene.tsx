import { scadaComponentsMap } from '@/features/scada/componentMap';
import Line from '@/features/scada/components/shapes/Line';
import { throwIfDev } from '@/util/util';
import { useRecoilValue } from 'recoil';
import { scadaSceneState } from '../scadaMonitorAtom';
import { useAppDispatch } from '@/store/hooks';
import { useEffect } from 'react';
import { updateEditScene } from '@/features/scada-edit/EditViewport/editSceneSlice';

type Props = {};

const MonitorScene = (props: Props) => {
  const scene = useRecoilValue(scadaSceneState);
  const dispatch = useAppDispatch();
  const lines = scene.lines;
  const boxes = scene.boxes;

  useEffect(() => {
    dispatch(updateEditScene(scene));
  }, [scene]);

  return (
    <>
      {lines.map((line) => {
        return <Line key={line.uuid} points={line.points} />;
      })}
      {boxes.map((box) => {
        const key = box.type as keyof typeof scadaComponentsMap;
        const Component = scadaComponentsMap[key] as React.ComponentType;
        if (!Component) throwIfDev('No component found for type: ' + box.type);
        return <Component key={box.uuid} {...box} />;
      })}
    </>
  );
};

export default MonitorScene;
