import React from 'react';
import MonitorScene from './MonitorScene';
import { darkBlue, darkBlue2, darkBlueGrey1 } from '@/assets/color';

type Props = {};

const MonitorViewport = (props: Props) => {
  return (
    <svg
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: darkBlueGrey1
      }}
    >
      <MonitorScene />
    </svg>
  );
};

export default MonitorViewport;
