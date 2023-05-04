import { BBox, BoxEntity, UUID } from '../../../../../types/type';
import ScalePoint, { ScalePointDirection } from './ScalePoint';

const ScalePoints = (props: BBox & { radius?: number; uuid: UUID }) => {
  const radius = props.radius ?? 5;
  const eightDirections = Object.values(ScalePointDirection);

  return (
    <>
      {eightDirections.map((direction, i) => (
        <ScalePoint key={i} boundBox={props} direction={direction} r={radius} entityUUID={props.uuid} />
      ))}
    </>
  );
};

export default ScalePoints;
