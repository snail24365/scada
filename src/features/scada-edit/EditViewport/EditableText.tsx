import ScalePoints from '@/features/scada-edit/EditViewport/withBoxEdit/ScalePoints/ScalePoints';
import { useAppDispatch } from '@/store/hooks';
import { TextEntity } from '@/types/type';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getEditText, updateText } from '../slice/scadaEditSceneSlice';
import { getSelectedUUIDs } from '../slice/scadaEditSelectionSlice';
import MouseEventHandler from './MouseEventHandler';

export type EditalbeTextProps = TextEntity;

const EditableText = (props: EditalbeTextProps) => {
  const { x, y, uuid, width, height } = props;
  const selectedUUIDs = useSelector(getSelectedUUIDs);

  const textEntity = useSelector(getEditText(uuid));
  const dispatch = useAppDispatch();

  const [isTextEditMode, setIsTextEditMode] = useState(false);

  const isSelcected = selectedUUIDs.includes(uuid);

  useEffect(() => {
    setIsTextEditMode(false);
  }, [isSelcected]);

  const radius = 5;

  return (
    <>
      <svg x={x} y={y} width={width} height={height} pointerEvents={'none'}>
        <foreignObject width="100%" height="100%" css={{ border: '1px solid #444' }}>
          <div
            style={{
              pointerEvents: 'all',
              width,
              height,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <textarea
              placeholder="Type here..."
              style={{
                border: 'none',
                resize: 'none',
                overflow: 'hidden',
                fontSize: 16,
                ...props
              }}
              value={textEntity?.text ?? ''}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                dispatch(updateText({ uuid, text: e.target.value }));
              }}
            />
          </div>
        </foreignObject>
      </svg>
      {!isTextEditMode && (
        <MouseEventHandler
          x={x}
          y={y}
          width={width}
          height={height}
          uuid={uuid}
          onDoubleClick={() => {
            setIsTextEditMode(true);
          }}
        />
      )}
      {isSelcected && <ScalePoints radius={radius} x={x} y={y} width={width} height={height} uuid={uuid} />}
    </>
  );
};

export default EditableText;
