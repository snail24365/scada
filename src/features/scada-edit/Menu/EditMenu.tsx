import { darkBlue2 } from '@/assets/color';
import { viewboxState, viewboxZoomActionState, zoomRatioState } from '@/features/scada/atom/scadaAtom';
import { flexVerticalCenter } from '@/style/style';
import { IconButton } from '@mui/material';
import { BiZoomIn, BiZoomOut } from 'react-icons/bi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ButtonGroup from './ButtonGroup/ButtonGroup';
import EquipmentButton from './MenuButton/EquipmentButton';
import ShapeMenuButton from './MenuButton/ShapeMenuButton/ShapeMenuButton';
import TextMenuButton from './MenuButton/TextMenuButton';
type Props = {};

const EditMenu = (props: Props) => {
  const zoomRatio = useRecoilValue(zoomRatioState);
  const setViewbox = useSetRecoilState(viewboxState);
  const viewboxZoomAction = useRecoilValue(viewboxZoomActionState);
  const zoomAmount = 3;

  const zoomIn = () => {
    setViewbox(viewboxZoomAction('in', zoomAmount));
  };

  const zoomOut = () => {
    setViewbox(viewboxZoomAction('out', zoomAmount));
  };

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
        backgroundColor: darkBlue2
      }}
    >
      <ButtonGroup>
        <TextMenuButton />
        <ShapeMenuButton />
      </ButtonGroup>
      <EquipmentButton />
      <div css={[flexVerticalCenter, { marginLeft: 20 }]}>
        <span css={{ color: '#fff', marginRight: 10 }}>{`Zoom: ${(zoomRatio * 100).toFixed(0)}%`}</span>
        <IconButton onClick={zoomIn}>
          <BiZoomIn color="#fff" />
        </IconButton>
        <IconButton onClick={zoomOut}>
          <BiZoomOut color="#fff" />
        </IconButton>
      </div>
    </div>
  );
};

export default EditMenu;
