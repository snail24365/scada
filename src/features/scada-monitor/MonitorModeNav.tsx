import { fontColor2, primaryGrey } from '@/assets/color';
import { Button as BlueprintButton } from '@blueprintjs/core';
import { Button } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import { scadaMode } from '../scada/atom/scadaAtom';
import { GoPencil } from 'react-icons/go';
import { motion } from 'framer-motion';

const MonitorModeNav = () => {
  const scadaPageTitle = 'SCADA 1'; // TODO : change to recoil

  const setMode = useSetRecoilState(scadaMode);

  return (
    <motion.div
      transition={{ duration: 0.6 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        display: 'flex',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 8
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}></div>
      </div>
      <div>{scadaPageTitle}</div>
      <div>
        <Button
          onClick={() => setMode('edit')}
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
