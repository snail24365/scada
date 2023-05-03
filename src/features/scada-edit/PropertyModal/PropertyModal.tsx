import { darkBlue2 } from '@/assets/color';
import { useAppSelector } from '@/store/hooks';
import { fadeInOut } from '@/style/style';
import { Paper } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { propertyModalState } from '../atom/scadaEditSectionAtom';
import { selectEntity } from '../slice/scadaEditSceneSlice';
import { getSelectedUUIDs } from '../slice/scadaEditSelectionSlice';

type Props = {};

const PropertyModal = ({}: Props) => {
  const [propertyModal, setProperyModal] = useRecoilState(propertyModalState);

  const selectedUUIDs = useAppSelector(getSelectedUUIDs);
  const entity = useAppSelector(selectEntity(selectedUUIDs[0]));

  const { isOpen } = propertyModal;

  if (selectedUUIDs.length !== 1) return null;

  if (!entity) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...fadeInOut}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setProperyModal({ isOpen: false });
            }
          }}
          css={{
            width: '100vw',
            height: '100vh',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Paper
            elevation={3}
            sx={{
              opacity: 1,
              width: 900,
              height: 600,
              overflow: 'hidden',
              padding: '8px 5px',
              backgroundColor: darkBlue2
            }}
          >
            <div>Property Modal</div>
            <ul>
              <li>
                <div>Property 1</div>
                <div>Value 1</div>
              </li>
              <li>
                <div>Property 2</div>
                <div>Value 2</div>
              </li>
            </ul>
          </Paper>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PropertyModal;
