import { updateEditScene } from '@/features/scada-edit/EditViewport/editSceneSlice';
import { ScadaComponents, scadaComponentsMap } from '@/features/scada/componentMap';
import Line from '@/features/scada/components/shapes/Line';
import { useAppDispatch } from '@/store/hooks';
import { throwIfDev } from '@/util/util';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { scadaSceneState } from '../scadaMonitorAtom';
import Text from '@/features/scada/components/texts/Text';

type Props = {};

const MonitorScene = (props: Props) => {
  const scene = useRecoilValue(scadaSceneState);
  const lines = scene.lines;
  const boxes = scene.boxes;
  const texts = scene.texts;

  // useEffect(() => {
  //   dispatch(updateEditScene(scene));
  // }, [scene]);

  return (
    <>
      {lines.map((line) => {
        return <Line key={line.uuid} points={line.points} />;
      })}
      {boxes.map((box) => {
        const type = box.type as ScadaComponents;
        const Component = scadaComponentsMap[type] as React.ComponentType;
        if (!Component) throwIfDev('No component found for type: ' + box.type);
        return <Component key={box.uuid} {...box} />;
      })}
      {texts.map((text) => {
        return <Text key={text.uuid} {...text} />;
      })}
    </>
  );
};

export default MonitorScene;
