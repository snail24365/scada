import { darkBlue2 } from '@/assets/color';
import React from 'react';
import { useRecoilState, useSetRecoilState as useRecoilValue } from 'recoil';
import { selectedEditMenuIndexState } from '../atom/scadaEditSectionAtom';
import ButtonGroup from './ButtonGroup/ButtonGroup';
import EquipmentButton from './EquipmentButton';
import ShapeMenuButton from './ShapeMenuButton';
import TextMenuButton from './TextMenuButton';

type Props = {};

const EditMenu = (props: Props) => {
  return (
    <div
      css={{
        display: 'flex',
        position: 'relative',
        gap: 30,
        fontSize: '20px',
        height: 54,
        padding: 8,
        alignItems: 'center',
        paddingLeft: 30,
        backgroundColor: darkBlue2,
      }}>
      <ButtonGroup>
        <TextMenuButton />
        <ShapeMenuButton />
      </ButtonGroup>
      <EquipmentButton />
    </div>
  );
};

export default EditMenu;
