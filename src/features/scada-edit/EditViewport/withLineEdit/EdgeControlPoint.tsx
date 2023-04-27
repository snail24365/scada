import { darkBlue } from "@/assets/color";
import { scadaEditUtil } from "@/features/scada/atom/scadaAtom";
import useDrag from "@/hooks/useDrag";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { XY } from "@/types/type";
import _ from "lodash";
import { useContext, useRef } from "react";
import { useRecoilValue } from "recoil";
import { isSelectedSelector, updateLinePoint } from "../editSceneSlice";
import { EditViewportContext } from "../EditViewportContext";
import { filterReconciledPoints } from "../util";
import { EditSectionContext } from "../../EditSectionContext";

export const EdgeControlPoint = ({
  points,
  uuid,
  radius,
  edge,
}: {
  points: XY[];
  uuid: string;
  radius: number;
  edge: "start" | "end";
}) => {
  const ref = useRef(null);
  const { clamp, getXY } = useRecoilValue(scadaEditUtil);
  const { rootSvgRef: containerRef } = useContext(EditSectionContext);
  const isSelected = useAppSelector(isSelectedSelector(uuid));

  const dispatch = useAppDispatch();

  const index = edge === "start" ? 0 : points.length - 1;
  const { x: cx, y: cy } = points[index];
  const onMouseDownDrag = useDrag({
    onMouseMove: (e) => {
      const container = containerRef.current;

      if (!container) return;
      const { x: absoluteX, y: absoulteY } = getXY(e);

      const clonedPoints = _.cloneDeep(points);
      const edgePoint = clonedPoints[index];
      const adjointPoint = clonedPoints[index + (edge === "start" ? 1 : -1)];

      const updatedEdgePoint = { x: clamp(absoluteX), y: clamp(absoulteY) };
      const isChanged =
        updatedEdgePoint.x !== edgePoint.x ||
        updatedEdgePoint.y !== edgePoint.y;

      if (!isChanged) return;

      const isHorizontal = edgePoint.y === adjointPoint.y;
      const anchorPoint = isHorizontal
        ? { x: updatedEdgePoint.x, y: edgePoint.y }
        : { x: edgePoint.x, y: updatedEdgePoint.y };

      if (edge === "start") {
        clonedPoints.unshift(anchorPoint);
        clonedPoints.unshift(updatedEdgePoint);
      } else {
        clonedPoints.push(anchorPoint);
        clonedPoints.push(updatedEdgePoint);
      }

      const updatedPoints = filterReconciledPoints(clonedPoints);

      dispatch(updateLinePoint({ uuid, points: updatedPoints }));
    },
    containerRef,
  });
  return isSelected ? (
    <circle
      onMouseDown={onMouseDownDrag}
      ref={ref}
      cx={cx}
      cy={cy}
      r={radius}
      fill={"red"}
      strokeWidth={1}
      stroke="#eee"
      cursor="pointer"
    />
  ) : (
    <></>
  );
};
export default EdgeControlPoint;
