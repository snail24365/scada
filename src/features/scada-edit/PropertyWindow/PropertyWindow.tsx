import { darkBlue2 } from '@/assets/color';
import { scrollbar } from '@/style/style';
import { MenuItem, Paper, Select } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import PropertyWindowContent from './PropertyWindowContent';
import TagSection from './TagSection';

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
          <PropertyWindowContent />
          {/* <TagSection /> */}
        </AnimatePresence>
      </div>
    </Paper>
  );
};

export default PropertyWindow;
