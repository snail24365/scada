import { primaryGrey } from '@/assets/color';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentScadaPageIdState, scadaMode } from '../scada/atom/scadaAtom';
import { saveScadaScene, getEditScene } from './slice/scadaEditSceneSlice';
import { restSerivce } from '@/service/api';
import { selectCurrentPageId } from '../scada-monitor/slice/scadaPageSlice';
import { fadeInOut, flexVerticalCenter } from '@/style/style';

const EditModeNav = () => {
  const setMode = useSetRecoilState(scadaMode);
  const dispath = useAppDispatch();

  const onDoneButtonClick = async () => {
    (async () => {
      dispath(saveScadaScene());
      setMode('monitor');
    })();
  };

  const onCancelButtonClick = async () => {
    setMode('monitor');
  };
  return (
    <motion.div
      {...fadeInOut}
      css={[
        flexVerticalCenter,
        {
          height: '100%',
          justifyContent: 'end',
          gap: 10,
          marginRight: 8
        }
      ]}
    >
      <Button onClick={onDoneButtonClick} variant="contained">
        Done
      </Button>
      <Button
        onClick={onCancelButtonClick}
        css={{
          backgroundColor: primaryGrey,
          '&:hover': {
            backgroundColor: primaryGrey
          }
        }}
        variant="contained"
      >
        Cancel
      </Button>
    </motion.div>
  );
};

export default EditModeNav;
