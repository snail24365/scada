import {
  selectEditEntities,
  selectEditLines,
} from '@/features/scada-edit/EditViewport/editSceneSlice';
import { componentMap } from '@/features/scada/componentMap';
import { useAppSelector } from '@/store/hooks';
import { throwIfDev } from '@/util/util';

type Props = {};

const MonitorScene = (props: Props) => {
  const lines = useAppSelector(selectEditLines);
  const entities = useAppSelector(selectEditEntities);
  return (
    <>
      {lines.map((line) => {
        // return <Line key={line.uuid} points={line.points} type="line" uuid={line.uuid} />;
      })}
      {entities.map((entity) => {
        const Component = componentMap[entity.type];

        if (!Component) throwIfDev('No component found for type: ' + entity.type);

        return <Component key={entity.uuid} {...entity} />;
      })}
    </>
  );

  return <div>MonitorScene</div>;
};

export default MonitorScene;
