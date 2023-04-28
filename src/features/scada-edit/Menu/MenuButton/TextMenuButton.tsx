import React, { useContext } from 'react';
import { BiText } from 'react-icons/bi';
import { ButtonGroupContext } from '../ButtonGroup/ButtonGroupContext';
import MenuButton from './MenuButton';
import { flexCenter } from '@/style/style';
import DragDrop from '../../DragDrop/DragDrop';
import BasicText from '@/features/scada/components/texts/BasicText';

type Props = { isOpen?: boolean; onClick?: React.MouseEventHandler };

const TextMenuButton = ({ isOpen, onClick }: Props) => {
  const buttonSize = 100;
  const scale = 1.5;
  const stickerSize = buttonSize * scale;

  return (
    <MenuButton icon={BiText} text="Text" isOpen={isOpen} onClick={onClick}>
      <div
        css={[
          flexCenter,
          {
            height: 100,
            '& > *': [
              {
                cursor: 'pointer',
                width: buttonSize,
                height: buttonSize,
                padding: 10,
                borderRadius: 5
              },
              flexCenter
            ],
            '& > *:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }
        ]}
      >
        <DragDrop
          type="BasicText"
          component={<BasicText x={320} y={200} width={200} height={200} text="asdff@@#" />}
          stickerSize={stickerSize}
        />
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
      </div>
    </MenuButton>
  );
};

export default TextMenuButton;
