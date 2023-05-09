import { primaryGrey } from '@/assets/color';
import { useAppDispatch } from '@/store/hooks';
import { fadeInOut, flexVerticalCenter } from '@/style/style';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useSetRecoilState } from 'recoil';
import { scadaMode } from '../scada/atom/scadaAtom';
import { saveScadaScene } from './slice/scadaEditSceneSlice';

const EditModeNav = () => {
  const setMode = useSetRecoilState(scadaMode);
  const dispatch = useAppDispatch();

  const onDoneButtonClick = async () => {
    (async () => {
      dispatch(saveScadaScene());
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
