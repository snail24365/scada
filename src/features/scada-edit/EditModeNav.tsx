import { primaryGrey } from '@/assets/color';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useSetRecoilState } from 'recoil';
import { scadaMode } from '../scada/atom/scadaAtom';

const EditModeNav = () => {
  const setMode = useSetRecoilState(scadaMode);

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
        marginRight: 8,
      }}>
      <Button
        onClick={() => {
          setMode('monitor');
        }}
        variant="contained">
        Done
      </Button>
      <Button
        onClick={() => {
          setMode('monitor');
        }}
        css={{
          backgroundColor: primaryGrey,
          '&:hover': {
            backgroundColor: primaryGrey,
          },
        }}
        variant="contained">
        Cancel
      </Button>
    </motion.div>
  );
};

export default EditModeNav;
