import ScalePoints from '@/features/scada-edit/EditViewport/withBoxEdit/ScalePoints/ScalePoints';
import { flexCenter } from '@/style/style';
import { TextEntity } from '@/types/type';
import React, { useEffect, useState } from 'react';
import MouseEventHandler from './withBoxEdit/MouseEventHandler';
import { useSelector } from 'react-redux';
import { getSelectedUUIDs } from '../slice/scadaEditSelectionSlice';
import { useAppDispatch } from '@/store/hooks';
import { updateText } from '../slice/scadaEditSceneSlice';

export type EditalbeTextProps = TextEntity;

const EditableText = ({ x, y, width, height, text, uuid }: EditalbeTextProps) => {
  const selectedUUIDs = useSelector(getSelectedUUIDs);
  const dispatch = useAppDispatch();

  const [textState, setTextState] = useState(text || '');

  const [isEditable, setIsEditable] = useState(false);

  const isOnlySelected = selectedUUIDs.length === 1 && selectedUUIDs[0] === uuid;

  useEffect(() => {
    setIsEditable(false);
  }, [isOnlySelected]);

  useEffect(() => {
    dispatch(updateText({ uuid, text: textState }));
  }, [textState]);

  const radius = 5;
  return (
    <>
      <svg x={x} y={y} width={width} height={height} pointerEvents={'none'}>
        <foreignObject width="100%" height="100%" css={{ border: '1px dashed silver' }}>
          <div css={[flexCenter, { pointerEvents: 'all', width, height }]}>
            <textarea
              css={{
                width: '100%',
                height: '100%',
                color: '#fff !important',
                backgroundColor: 'transparent',
                border: 'none',
                resize: 'none',
                overflow: 'hidden'
              }}
              value={textState}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                setTextState(event.target.value);
              }}
            />
          </div>
        </foreignObject>
      </svg>
      {!isEditable && (
        <MouseEventHandler
          x={x}
          y={y}
          width={width}
          height={height}
          uuid={uuid}
          onDoubleClick={() => {
            setIsEditable(true);
          }}
        />
      )}
      {isOnlySelected && <ScalePoints radius={radius} x={x} y={y} width={width} height={height} uuid={uuid} />}
    </>
  );
};

export default EditableText;