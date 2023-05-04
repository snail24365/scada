import { boxComponentsMap } from '@/features/scada/componentMap';
import Line from '@/features/scada/components/shapes/Line';
import Text from '@/features/scada/components/texts/Text';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { throwIfDev } from '@/util/util';
import { useEffect } from 'react';
import { fetchScadaMonitorScene, selectMonitorScene } from '../slice/scadaMonitorSceneSlice';
import { selectCurrentPageId } from '../slice/scadaPageSlice';
import { isBoxEntity, isLineEntity, isTextEntity } from '@/types/type';

type Props = {};

const MonitorScene = (props: Props) => {
  const scene = useAppSelector(selectMonitorScene);
  const dispatch = useAppDispatch();
  const currentScadaPageId = useAppSelector(selectCurrentPageId);

  useEffect(() => {
    (async () => {
      if (!currentScadaPageId) return;
      await dispatch(fetchScadaMonitorScene(currentScadaPageId));
    })();
  }, [currentScadaPageId]);

  return (
    <>
      {scene.entities.map((entity) => {
        if (isBoxEntity(entity)) {
          const Component = boxComponentsMap[entity.type].component as React.ComponentType;
          if (!Component) throwIfDev('No component found for type: ' + entity.type);
          return <Component key={entity.uuid} {...entity} />;
        }
        if (isLineEntity(entity)) {
          return <Line key={entity.uuid} points={entity.points} />;
        }
        if (isTextEntity(entity)) {
          return <Text key={entity.uuid} {...entity} />;
        }
      })}
      {/* {scene.lines.map((line) => {
        return <Line key={line.uuid} points={line.points} />;
      })}
      {scene.boxes.map((entity) => {
        const Component = boxComponentsMap[entity.type].component as React.ComponentType;
        if (!Component) throwIfDev('No component found for type: ' + entity.type);
        return <Component key={entity.uuid} {...entity} />;
      })}
      {scene.texts.map((entity) => {
        return <Text key={entity.uuid} {...entity} />;
      })} */}
    </>
  );
};

export default MonitorScene;
