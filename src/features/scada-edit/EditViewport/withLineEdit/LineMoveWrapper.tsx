import { isEditingState, scadaEditUtil } from '@/features/scada/atom/scadaAtom';
import useDrag from '@/hooks/useDrag';
import { useAppDispatch } from '@/store/hooks';
import { BBox, UUID, XY } from '@/types/type';
import _ from 'lodash';
import { useContext } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { EditSectionContext } from '../../EditSectionContext';
import { exclusiveSelect } from '../../slice/scadaEditSelectionSlice';
import { updateLinePoint } from '../../slice/scadaEditSceneSlice';
import { filterReconciledPoints } from '../util';

type Props = {
  points: XY[];
  uuid: UUID;
} & BBox;

const LineMoveWrapper = ({ points, uuid, x, y, width, height }: Props) => {
  const { rootSvgRef: containerRef } = useContext(EditSectionContext);

  const dispatch = useAppDispatch();
  const setIsEditing = useSetRecoilState(isEditingState);
  const { getXY, clamp } = useRecoilValue(scadaEditUtil);

  let downX = 0;
  let downY = 0;
  let downPoints = _.cloneDeep(points);

  const onMouseDownDrag = useDrag({
    onMouseDown: (e) => {
      setIsEditing(true);
      dispatch(exclusiveSelect({ uuid }));
      const xyOnDown = getXY(e);
      downX = xyOnDown.x;
      downY = xyOnDown.y;
    },
    onMouseMove: (e) => {
      const xyOnMove = getXY(e);
      const deltaX = xyOnMove.x - downX;
      const deltaY = xyOnMove.y - downY;
      const translatedPoints = downPoints.map((point) => {
        return {
          x: clamp(point.x + deltaX),
          y: clamp(point.y + deltaY)
        };
      });
      dispatch(
        updateLinePoint({
          uuid,
          points: filterReconciledPoints(translatedPoints)
        })
      );
    },
    onMouseUp: () => {
      setIsEditing(false);
    },
    moveElementRef: containerRef
  });

  return (
    <rect onMouseDown={onMouseDownDrag} x={x} y={y} width={width} height={height} fill="transparent" cursor={'move'} />
  );
};

export default LineMoveWrapper;
