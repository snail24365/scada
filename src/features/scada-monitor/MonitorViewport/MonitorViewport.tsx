import React from 'react';
import MonitorScene from './MonitorScene';

type Props = {};

const MonitorViewport = (props: Props) => {
  return (
    <svg
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'grey',
      }}>
      <MonitorScene />
    </svg>
  );
};

export default MonitorViewport;
