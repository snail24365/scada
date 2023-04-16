import React, { useContext } from 'react';
import { EditViewportContext } from './EditViewportContext';

type Props = {
  gap: number;
};

const Grid = ({ gap }: Props) => {
  const { viewport } = useContext(EditViewportContext);
  let d = '';

  for (let i = 0; i < viewport.width; i += gap) {
    d += `M ${i} 0 L ${i} ${viewport.height} `;
  }
  for (let i = 0; i < viewport.height; i += gap) {
    d += `M 0 ${i} L ${viewport.width} ${i} `;
  }
  return <path d={d} fill="transparent" stroke="silver" strokeWidth={0.5} />;
};

export default Grid;
