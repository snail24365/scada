import { darkBlue, fontColor1 } from '@/assets/color';
import { useAppSelector } from '@/store/hooks';
import { Paper, TextField } from '@mui/material';
import React, { useMemo } from 'react';
import { getSelectedUUIDs } from './slice/scadaEditSelectionSlice';
import { selectEntity } from './slice/scadaEditSceneSlice';
import { flexCenter, scrollbar } from '@/style/style';
import { AnimatePresence, motion } from 'framer-motion';
import { scadaComponentsMap } from '../scada/componentMap';
import _ from 'lodash';

type Props = {};

const PropertyWindow = (props: Props) => {
  const selectedUUIDs = useAppSelector(getSelectedUUIDs);
  const entity = useAppSelector(selectEntity(selectedUUIDs[0] ?? ''));
  const windowWidth = 'max(400px, 20vw)';

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
    if (!entity) return null;
    const type = entity.type;
    const info = scadaComponentsMap[entity.type as keyof typeof scadaComponentsMap];
    const schema = info.propertySchema;

    let aaa = [];

    for (let propertyName in schema) {
      const propertyType = schema[propertyName as keyof typeof schema].type;
      if (propertyType === 'number') {
        aaa.push(
          <div css={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span css={{ fontSize: 18 }}>{_.startCase(propertyName)}</span>
            <TextField
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              sx={{
                border: `1px solid ${fontColor1}`,
                borderRadius: 2,
                '& .MuiInputBase-input': {
                  color: fontColor1
                }
              }}
            />
          </div>
        );
      } else if (propertyType === 'string') {
      } else if (propertyType === 'boolean') {
      }
    }

    return (
      <motion.div
        transition={{ duration: 0.2, delay: 0.2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        css={[
          {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'repeat(auto-fill, 100px)',
            height: '100%',
            maxHeight: '100%',
            gap: 16
          }
        ]}
      >
        {aaa}
      </motion.div>
    );
  };

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
            width: windowWidth,
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
