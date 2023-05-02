import { boxComponentsMap } from '@/features/scada/componentMap';
import Line from '@/features/scada/components/shapes/Line';
import Text from '@/features/scada/components/texts/Text';
import { useAppSelector } from '@/store/hooks';
import { throwIfDev } from '@/util/util';
import { selectMonitorScene } from '../slice/scadaMonitorSceneSlice';

type Props = {};

const MonitorScene = (props: Props) => {
  const scene = useAppSelector(selectMonitorScene);

  return (
    <>
      {scene.lines.map((line) => {
        return <Line key={line.uuid} points={line.points} />;
      })}
      {scene.boxes.map((entity) => {
        const Component = boxComponentsMap[entity.type].component as React.ComponentType;
        if (!Component) throwIfDev('No component found for type: ' + entity.type);
        return <Component key={entity.uuid} {...entity} />;
      })}
      {scene.texts.map((entity) => {
        return <Text key={entity.uuid} {...entity} />;
      })}
    </>
  );
};

export default MonitorScene;
