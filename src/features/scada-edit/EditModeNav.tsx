import { primaryGrey } from '@/assets/color';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useRecoilRefresher_UNSTABLE, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentScadaPageIdState, scadaMode } from '../scada/atom/scadaAtom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { postService } from '@/service/api';
import { selectEditScene } from './EditViewport/editSceneSlice';
import { scadaSceneState } from '../scada-monitor/scadaMonitorAtom';

const EditModeNav = () => {
  const setMode = useSetRecoilState(scadaMode);
  const editScene = useAppSelector(selectEditScene);
  const currentPageId = useRecoilValue(currentScadaPageIdState);

  const refreshScadaScene = useRecoilRefresher_UNSTABLE(scadaSceneState);

  const onDoneButtonClick = async () => {
    if (!currentPageId) return;
    await postService(`/scene/${currentPageId}`, editScene);
    refreshScadaScene();
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
