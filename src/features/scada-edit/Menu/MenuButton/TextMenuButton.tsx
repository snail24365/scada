import React, { useContext } from 'react';
import { BiText } from 'react-icons/bi';
import { ButtonGroupContext } from '../ButtonGroup/ButtonGroupContext';
import MenuButton from './MenuButton';
import { flexCenter } from '@/style/style';
import DragDrop from '../../DragDrop/DragDrop';
import Text from '@/features/scada/components/texts/Text';

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
          type="Text"
          component={<Text x={320} y={200} width={75} height={75} text="Text" />}
          stickerSize={stickerSize}
        />
      </div>
    </MenuButton>
  );
};

export default TextMenuButton;
