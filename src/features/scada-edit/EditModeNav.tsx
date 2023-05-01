import { primaryGrey } from '@/assets/color';
import { postService } from '@/service/api';
import { useAppSelector } from '@/store/hooks';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentScadaPageIdState, scadaMode } from '../scada/atom/scadaAtom';
import { selectEditScene } from './slice/scadaEditSceneSlice';

const EditModeNav = () => {
  const setMode = useSetRecoilState(scadaMode);
  const editScene = useAppSelector(selectEditScene);
  const currentPageId = useRecoilValue(currentScadaPageIdState);

  const onDoneButtonClick = async () => {
    if (!currentPageId) return;
    await postService(`/scene/${currentPageId}`, editScene);
    setMode('monitor');
  };

  const onCancelButtonClick = async () => {
    setMode('monitor');
  };
  return (
    <motion.div
      transition={{ duration: 0.6 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        gap: 10,
        marginRight: 8
      }}
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
