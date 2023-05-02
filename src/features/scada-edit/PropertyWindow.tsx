import { darkBlue } from '@/assets/color';
import { useAppSelector } from '@/store/hooks';
import { Paper } from '@mui/material';
import React, { useMemo } from 'react';
import { getSelectedUUIDs } from './slice/scadaEditSelectionSlice';
import { selectEntity } from './slice/scadaEditSceneSlice';
import { flexCenter } from '@/style/style';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {};

const PropertyWindow = (props: Props) => {
  const selectedUUIDs = useAppSelector(getSelectedUUIDs);
  const entity = useAppSelector(selectEntity(selectedUUIDs[0] ?? ''));
  const width = 'max(400px, 20vw)';

  const EmptyWindow = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, delay: 0.2 }}
      css={[flexCenter, { width: '100%', height: '100%', flexDirection: 'column' }]}
    >
      <div
        css={[
          flexCenter,
          { width: 220, height: 220, fontSize: 19, textAlign: 'center', color: '#666', whiteSpace: 'nowrap' }
        ]}
      >
        To edit select a component
      </div>
    </motion.div>
  );

  const PropertyEditWindow = () => {
    return (
      <motion.div
        transition={{ duration: 0.2, delay: 0.2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        sadsad
      </motion.div>
    );
  };

  const propertyEditWindow = useMemo(() => <PropertyEditWindow />, [entity]);
  const emptyWindow = useMemo(() => <EmptyWindow />, [entity]);

  const isSingleEntitySelected = selectedUUIDs.length === 1 && entity;
  const contents = isSingleEntitySelected ? propertyEditWindow : emptyWindow;

  return (
    <Paper elevation={3}>
      <div css={{ width, height: '100%', backgroundColor: darkBlue, padding: 16 }}>
        <AnimatePresence>{contents}</AnimatePresence>
      </div>
    </Paper>
  );
};

export default PropertyWindow;
