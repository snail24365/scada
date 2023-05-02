import { primaryGrey } from '@/assets/color';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { flexVerticalCenter } from '@/style/style';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { GoPencil } from 'react-icons/go';
import { useSetRecoilState } from 'recoil';
import { scadaMode } from '../scada/atom/scadaAtom';
import { selectMonitorScene } from './slice/scadaMonitorSceneSlice';

const MonitorModeNav = () => {
  const scadaPageTitle = 'SCADA 1'; // TODO : change to recoil
  const dispatch = useAppDispatch();
  const scene = useAppSelector(selectMonitorScene);
  const setMode = useSetRecoilState(scadaMode);

  const onScadaEditClick = () => {
    setMode('edit');
  };

  return (
    <motion.div
      transition={{ duration: 0.6 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      css={[
        flexVerticalCenter,
        {
          height: '100%',
          justifyContent: 'space-between',
          marginRight: 8
        }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}></div>
      </div>
      <div>{scadaPageTitle}</div>
      <div>
        <Button
          onClick={onScadaEditClick}
          variant="contained"
          css={{
            backgroundColor: primaryGrey,
            '&:hover': {
              backgroundColor: primaryGrey
            }
          }}
        >
          <GoPencil />
          <span css={{ marginLeft: 8 }}>SCADA Edit</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default MonitorModeNav;
