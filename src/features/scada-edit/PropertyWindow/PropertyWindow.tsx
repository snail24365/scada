import { darkBlue } from '@/assets/color';
import { scrollbar } from '@/style/style';
import { Paper } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import PropertyWindowContent from './PropertyWindowContent';

const PropertyWindow = () => {
  return (
    <Paper elevation={3} sx={{ position: 'relative', zIndex: 60 }}>
      <div
        css={[
          scrollbar,
          {
            overflow: 'scroll',
            overflowX: 'hidden',
            width: 'max(400px, 20vw)',
            height: '100%',
            backgroundColor: darkBlue,
            padding: 24
          }
        ]}
      >
        <AnimatePresence>
          <PropertyWindowContent />
        </AnimatePresence>
      </div>
    </Paper>
  );
};

export default PropertyWindow;
