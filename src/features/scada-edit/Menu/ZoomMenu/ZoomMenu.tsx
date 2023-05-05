import React from 'react';
import { viewboxState, viewboxZoomActionState, zoomRatioState } from '@/features/scada/atom/scadaAtom';
import { flexVerticalCenter } from '@/style/style';
import { IconButton } from '@mui/material';
import { BiZoomIn, BiZoomOut } from 'react-icons/bi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ZoomRatioDisplay from './ZoomRatioDisplay';

const ZoomMenu = () => {
  const setViewbox = useSetRecoilState(viewboxState);
  const viewboxZoomAction = useRecoilValue(viewboxZoomActionState);
  const zoomAmount = 3;

  const zoomIn = () => {
    setViewbox(viewboxZoomAction('in', zoomAmount));
  };

  const zoomOut = () => {
    setViewbox(viewboxZoomAction('out', zoomAmount));
  };
  return (
    <div css={[flexVerticalCenter, { marginLeft: 20 }]}>
      <ZoomRatioDisplay />
      <IconButton onClick={zoomIn}>
        <BiZoomIn color="#fff" />
      </IconButton>
      <IconButton onClick={zoomOut}>
        <BiZoomOut color="#fff" />
      </IconButton>
    </div>
  );
};

export default ZoomMenu;
