import Circle from '@/features/scada/components/shapes/Circle';
import { flexCenter } from '@/style/style';
import React from 'react';
import { FaRegSquare } from 'react-icons/fa';
import Rectangle from '@/features/scada/components/shapes/Rectangle';
import shapeComponentsMap from '@/features/scada/components/shapes/shapeComponentsMap';
import Ellipse from '@/features/scada/components/shapes/Ellipse';
import Diamond from '@/features/scada/components/shapes/Diamond';
import MenuButton from '../MenuButton';
import DragDrop from '../../../DragDrop/DragDrop';
import Triangle from '@/features/scada/components/shapes/Triangle';
import { darkBlue } from '@/assets/color';

type Props = { isOpen?: boolean; onClick?: React.MouseEventHandler };

const ShapeMenuButton = ({ isOpen, onClick }: Props) => {
  const buttonSize = 100;
  const scale = 1.5;
  const stickerSize = buttonSize * scale;
  const boxShapeProp = {
    x: 0,
    y: 0,
    width: buttonSize,
    height: buttonSize,
    stroke: '#fff',
    fill: darkBlue,
    strokeWidth: 3
  };
  return (
    <MenuButton isOpen={isOpen} onClick={onClick} icon={FaRegSquare} text="Shape">
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
        <DragDrop type="Rectangle" component={<Rectangle {...boxShapeProp} />} stickerSize={stickerSize} />
        <DragDrop type="Circle" component={<Circle {...boxShapeProp} />} stickerSize={stickerSize} />
        <DragDrop
          type="Ellipse"
          component={<Ellipse x={0} y={0} width={100} height={75} strokeWidth={3} fill={darkBlue} stroke="#fff" />}
          stickerSize={stickerSize}
        />
        <DragDrop type="Diamond" component={<Diamond {...boxShapeProp} />} stickerSize={stickerSize} />
        <DragDrop type="Triangle" component={<Triangle {...boxShapeProp} />} stickerSize={stickerSize} />
      </div>
    </MenuButton>
  );
};

export default ShapeMenuButton;
