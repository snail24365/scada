import React, { useContext } from 'react';
import { BiText } from 'react-icons/bi';
import { ButtonGroupContext } from './ButtonGroup/ButtonGroupContext';
import MenuButton from './MenuButton';

type Props = { isOpen?: boolean; onClick?: React.MouseEventHandler };

const TextMenuButton = ({ isOpen, onClick }: Props) => {
  return (
    <MenuButton icon={BiText} text="Text" isOpen={isOpen} onClick={onClick}>
      <svg width="70" height="70" viewBox="0 0 620 140">
        <text x="30" y="90" fill="#fff" fontSize="230" fontFamily="Sans serif">
          Text
        </text>
      </svg>
      <svg width="70" height="70" viewBox="0 0 620 140">
        <text x="30" y="90" fill="#fff" fontSize="230" textDecoration="underline">
          Text
        </text>
      </svg>
      <svg width="70" height="70" viewBox="0 0 620 140">
        <rect x={0} y={-140} width={620} height={300} stroke={'#fff'} fill={'transparent'} />
        <text x="30" y="90" fill="#fff" fontSize="230">
          Text
        </text>
      </svg>
    </MenuButton>
  );
};

export default TextMenuButton;
