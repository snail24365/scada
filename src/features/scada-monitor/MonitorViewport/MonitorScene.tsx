import { boxComponentsMap } from '@/features/scada/componentMap';
import Line from '@/features/scada/components/shapes/Line';
import Text from '@/features/scada/components/texts/Text';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { throwIfDev } from '@/util/util';
import { useEffect } from 'react';
import { fetchScadaMonitorScene, selectMonitorScene } from '../slice/scadaMonitorSceneSlice';
import { selectCurrentPageId } from '../slice/scadaPageSlice';

type Props = { width: number; height: number; resolution: { x: number; y: number } };

const MonitorScene = ({ width, height, resolution }: Props) => {
  const scene = useAppSelector(selectMonitorScene);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${resolution.x} ${resolution.y}`}>
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
    </svg>
  );
};

export default MonitorScene;
