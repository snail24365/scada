import React from 'react';
import { MdOutlineFolderDelete } from 'react-icons/md';

type Props = {};

const EquipmentButton = (props: Props) => {
  return (
    <div
      onClick={() => {}}
      css={{ color: '#fff', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <MdOutlineFolderDelete />
      <span>Equipment</span>
    </div>
  );
};

export default EquipmentButton;
