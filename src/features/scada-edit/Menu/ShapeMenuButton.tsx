import Circle from '@/features/scada/components/shapes/Circle';
import { flexCenter } from '@/style/style';
import React from 'react';
import { FaRegSquare } from 'react-icons/fa';
import DragDropItem from './DragDropItem';
import MenuButton from './MenuButton';
import Rectangle from '@/features/scada/components/shapes/Rectangle';

type Props = { isOpen?: boolean; onClick?: React.MouseEventHandler };

const ShapeMenuButton = ({ isOpen, onClick }: Props) => {

  const buttonSize = 100;
  const scale = 1.5;
  const stickerSize = buttonSize * scale;
  return (
    <MenuButton isOpen={isOpen} onClick={onClick} icon={FaRegSquare} text="Shape">
      <div
        css={{
          display: 'flex',
          gap: '10px',
          '& > *': [
            {
              cursor: 'pointer',
              width: buttonSize,
              height: buttonSize,
            },
            flexCenter,
          ],
          '& > *:hover': {
            //TODO
          },
        }}>
        <DragDropItem
          type="Rectangle"
          component={<Rectangle width={stickerSize} height={stickerSize} fill="#fff" />}
          stickerSize={stickerSize}
        />
        <DragDropItem
          type="Circle"
          component={<Circle x={0} y={0} width={stickerSize} height={stickerSize} fill={'#fff'} />}
          stickerSize={stickerSize}
        />
        {/* <svg width={50} height={50} fill="#fff" stroke="#000" strokeWidth={2}>
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
        </svg> */}
      </div>
    </MenuButton>
  );
};

export default ShapeMenuButton;
