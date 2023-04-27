import { primaryBlue } from "@/assets/color";
import { isEditingState, scadaEditUtil } from "@/features/scada/atom/scadaAtom";
import useDrag from "@/hooks/useDrag";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UUID, XY } from "@/types/type";
import _ from "lodash";
import { useContext } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { exclusiveSelect } from "../../scadaEditSlice";
import { isSelectedSelector, updateLinePoint } from "../editSceneSlice";
import { EditViewportContext } from "../EditViewportContext";
import { filterReconciledPoints } from "../util";
import { EditSectionContext } from "../../EditSectionContext";

type Props = {
  uuid: UUID;
  index: number;
  points: XY[];
  cx: number;
  cy: number;
  r: number;
  isHorizontal: boolean;
};

const ControlPoint = ({
  uuid,
  index,
  points,
  cx,
  cy,
  r,
  isHorizontal,
}: Props) => {
  const cursor = isHorizontal ? "row-resize" : "col-resize";
  const dispatch = useAppDispatch();
  const isSelected = useAppSelector(isSelectedSelector(uuid));

  const { rootSvgRef: containerRef } = useContext(EditSectionContext);
  const { getXY, clamp } = useRecoilValue(scadaEditUtil);
  const setIsEditing = useSetRecoilState(isEditingState);

  let downX = 0;
  let downY = 0;

  const onMouseDownDrag = useDrag({
    onMouseDown: (e) => {
      setIsEditing(true);
      dispatch(exclusiveSelect({ uuid }));
      const xyOnDown = getXY(e);
      downX = xyOnDown.x;
      downY = xyOnDown.y;
    },
    onMouseMove: (e) => {
      const container = containerRef.current;
      if (!container) return;
      points = _.cloneDeep(points);

      const updateAlongAxis = (point: { x: number; y: number }) => {
        const { x: mouseX, y: mouseY } = getXY(e);
        const updateValue = isHorizontal ? clamp(mouseY) : clamp(mouseX);
        const updateAxis = isHorizontal ? "y" : "x";
        point[updateAxis] = updateValue;
      };

      updateAlongAxis(points[index]);
      updateAlongAxis(points[index + 1]);

      dispatch(
        updateLinePoint({
          uuid,
          points: filterReconciledPoints(points),
        })
      );
    },
    onMouseUp: () => {
      setIsEditing(false);
    },
    containerRef,
  });

  return (
    <circle
      display={isSelected ? "block" : "none"}
      cx={cx}
      cy={cy}
      r={r}
      cursor={cursor}
      onMouseDown={onMouseDownDrag}
      fill={primaryBlue}
      stroke="#eee"
    />
  );
};

export default ControlPoint;
