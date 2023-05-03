import { fontColor1 } from '@/assets/color';
import { useAppSelector } from '@/store/hooks';
import { TextField } from '@mui/material';
import { motion } from 'framer-motion';
import _ from 'lodash';
import { scadaComponentsMap } from '../../scada/componentMap';
import { selectEntity } from '../slice/scadaEditSceneSlice';
import { getSelectedUUIDs } from '../slice/scadaEditSelectionSlice';

const PropertyEditWindow = () => {
  const selectedUUIDs = useAppSelector(getSelectedUUIDs);
  const entity = useAppSelector(selectEntity(selectedUUIDs[0] ?? ''));

  if (!entity) return null;
  const schema = scadaComponentsMap[entity.type].propertySchema;

  const PropertyEditList = [];

  for (let propertyName in schema) {
    const propertyType = schema[propertyName as keyof typeof schema].type;
    if (propertyType === 'number') {
      PropertyEditList.push(
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
      {PropertyEditList}
    </motion.div>
  );
};

export default PropertyEditWindow;
