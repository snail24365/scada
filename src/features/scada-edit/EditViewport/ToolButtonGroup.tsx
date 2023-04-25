import React from 'react';
import { ButtonGroup, Button } from '@blueprintjs/core';

type Props = {
  onZoomIn: () => void;
  onZoomOut: () => void;
};

const ToolButtonGroup = ({ onZoomIn, onZoomOut }: Props) => {
  return (
    <ButtonGroup style={{ display: 'flex' }}>
      <Button icon="zoom-in" onClick={onZoomIn}></Button>
      <Button icon="zoom-out" onClick={onZoomOut}></Button>
    </ButtonGroup>
  );
};
export default ToolButtonGroup;
