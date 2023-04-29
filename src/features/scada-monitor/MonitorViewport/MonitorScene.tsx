import { selectEditBoxes, selectEditLines } from '@/features/scada-edit/EditViewport/editSceneSlice';
import { scadaComponentsMap } from '@/features/scada/componentMap';
import { useAppSelector } from '@/store/hooks';
import { throwIfDev } from '@/util/util';
import { selectBoxes, selectLines } from '../monitorSceneSlice';
import Line from '@/features/scada/components/shapes/Line';

type Props = {};

const MonitorScene = (props: Props) => {
  const lines = useAppSelector(selectLines);
  const entities = useAppSelector(selectBoxes);
  return (
    <>
      {lines.map((line) => {
        return <Line key={line.uuid} points={line.points} />;
      })}
      {entities.map((entity) => {
        const key = entity.type as keyof typeof scadaComponentsMap;
        const Component = scadaComponentsMap[key] as React.ComponentType;
        if (!Component) throwIfDev('No component found for type: ' + entity.type);
        return <Component key={entity.uuid} {...entity} />;
      })}
    </>
  );

  return <div>MonitorScene</div>;
};

export default MonitorScene;
