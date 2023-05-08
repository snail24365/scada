import { darkBlue2 } from '@/assets/color';
import { scrollbar } from '@/style/style';
import { Divider, MenuItem, Paper, Select } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import PropertyEditSection from './PropertyEditSection';
import TagEditSection from './TagEditSection';

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
            backgroundColor: darkBlue2,
            padding: 24
          }
        ]}
      >
        <AnimatePresence>
          <PropertyEditSection />
          <Divider />
        </AnimatePresence>
      </div>
    </Paper>
  );
};

export default PropertyWindow;
