import { fontColor1 } from '@/assets/color';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { TextField } from '@mui/material';
import { motion } from 'framer-motion';
import _ from 'lodash';
import { scadaComponentsMap } from '../../scada/componentMap';
import { selectEntity, updateEntity } from '../slice/scadaEditSceneSlice';
import { getSelectedUUIDs } from '../slice/scadaEditSelectionSlice';
import { useEffect, useState } from 'react';
import { PropertyEditWindowContext } from './PropertyEditWindowContext';
import PropertyEditItem from './PropertyEditItem';
import { PropertySchema } from '@/types/type';

const PropertyEditWindow = () => {
  const selectedUUIDs = useAppSelector(getSelectedUUIDs);
  const entity = useAppSelector(selectEntity(selectedUUIDs[0] ?? ''));
  const dispatch = useAppDispatch();
  const [property, setProperty] = useState<object>({});

  useEffect(() => {
    if (!selectedUUIDs[0]) return;
    console.log(selectedUUIDs[0], { ...entity, ...property });

    dispatch(updateEntity({ uuid: selectedUUIDs[0], newState: { ...entity, ...property } }));
  }, [property]);

  if (!entity) return null;
  const propertiesSchema = scadaComponentsMap[entity.type].propertySchema;

  const propertyEditList = [];

  for (const propertyName in propertiesSchema) {
    const propertySchema = propertiesSchema[propertyName as keyof typeof propertiesSchema];

    propertyEditList.push(
      <PropertyEditItem propertyName={propertyName} schema={propertySchema as PropertySchema} entity={propertySchema} />
    );
  }

  return (
    <PropertyEditWindowContext.Provider value={{ property, setProperty }}>
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
        {propertyEditList}
      </motion.div>
    </PropertyEditWindowContext.Provider>
  );
};

export default PropertyEditWindow;
