import { darkBlue } from '@/assets/color';
import { useAppSelector } from '@/store/hooks';
import { scrollbar } from '@/style/style';
import { Paper } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';
import { selectEntity } from '../slice/scadaEditSceneSlice';
import { getSelectedUUIDs } from '../slice/scadaEditSelectionSlice';
import EmptyWindow from './EmptyWindow';
import PropertyEditWindow from './PropertyEditWIndow';

const PropertyWindow = () => {
  const selectedUUIDs = useAppSelector(getSelectedUUIDs);
  const entity = useAppSelector(selectEntity(selectedUUIDs[0] ?? ''));

  const propertyEditWindow = useMemo(() => <PropertyEditWindow />, [entity]);
  const emptyWindow = useMemo(() => <EmptyWindow />, [entity]);

  const isSingleEntitySelected = selectedUUIDs.length === 1 && entity;
  const contents = isSingleEntitySelected ? propertyEditWindow : emptyWindow;

  return (
    <Paper elevation={3}>
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
        <AnimatePresence>{contents}</AnimatePresence>
      </div>
    </Paper>
  );
};

export default PropertyWindow;
