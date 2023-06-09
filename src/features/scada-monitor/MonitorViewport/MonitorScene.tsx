import { boxComponents } from '@/features/scada/components/scadaComponents';
import Line from '@/features/scada/components/shapes/Line';
import Text from '@/features/scada/components/texts/Text';
import { useAppSelector } from '@/store/hooks';
import { throwIfDev } from '@/util/util';
import { selectMonitorScene } from '../slice/scadaMonitorSceneSlice';
import { absoulteFull, flexCenter, full } from '@/style/style';

type MonitorSceneProps = { width: number; height: number; resolution: { x: number; y: number } };

const MonitorScene = ({ width, height, resolution }: MonitorSceneProps) => {
  const scene = useAppSelector(selectMonitorScene);
  return (
    <div css={[absoulteFull, flexCenter]}>
      <svg width={width} height={height} viewBox={`0 0 ${resolution.x} ${resolution.y}`}>
        {scene.lines.map(({ uuid, points, ...rest }) => {
          return <Line key={uuid} points={points} {...rest} />;
        })}
        {scene.boxes.map((entity) => {
          const Component = boxComponents[entity.type] as React.ComponentType;
          if (!Component) throwIfDev('No component found for type: ' + entity.type);
          return <Component key={entity.uuid} {...entity} />;
        })}
        {scene.texts.map((entity) => {
          return <Text key={entity.uuid} {...entity} />;
        })}
      </svg>
    </div>
  );
};

export default MonitorScene;
