import { flexCenter } from '@/style/style';
import React, { useContext } from 'react';
import { FaRegSquare } from 'react-icons/fa';
import { ButtonGroupContext } from './ButtonGroup/ButtonGroupContext';
import EntityDragDropItem from './EntityDragDropItem';
import MenuButton from './MenuButton';
import ShapeList from './ShapeList';

type Props = { isOpen?: boolean; onClick?: React.MouseEventHandler };

const ShapeMenuButton = ({ isOpen, onClick }: Props) => {
  return (
    <MenuButton isOpen={isOpen} onClick={onClick} icon={FaRegSquare} text="Shape">
      <div
        css={{
          display: 'flex',
          gap: '10px',
          '& > *': [
            {
              cursor: 'pointer',
              width: 100,
              height: 100,
            },
            flexCenter,
          ],
          '& > *:hover': {
            //TODO
          },
        }}>
        <EntityDragDropItem>
          <svg fill="#fff" stroke="#000" strokeWidth={2} width={70} height={70}>
            <rect x={0} y={0} width={70} height={70} viewBox={`0 0 70 70 `}></rect>
          </svg>
        </EntityDragDropItem>
        <svg
          fill="#fff"
          stroke="#000"
          strokeWidth={2}
          width={100}
          height={100}
          viewBox={`0 0 70 70 `}>
          <circle cx={35} cy={35} r={35}></circle>
        </svg>
        <svg width={50} height={50} fill="#fff" stroke="#000" strokeWidth={2}>
          <path d="M0 50 l 50 0 l -25 -50z"></path>
        </svg>
        <svg width={50} height={50} stroke="#fff" strokeWidth={2}>
          <path d="M50 0 L 0 50"></path>
        </svg>
        <svg width={50} height={50} stroke="#fff" strokeWidth={2} strokeDasharray="5, 5">
          <path d="M50 0 L 0 50"></path>
        </svg>
        <svg width={50} height={50} stroke="#fff" strokeWidth={2}>
          <path d="M50 0 L 0 50 l 5 -10 M 0 50 l 10 -5"></path>
        </svg>
        <svg width={50} height={50} stroke="#fff" strokeWidth={2} strokeDasharray="5, 5">
          <path d="M50 0 L 0 50 l 5 -10 M 0 50 l 10 -5"></path>
        </svg>
      </div>
    </MenuButton>
  );
};

export default ShapeMenuButton;
