import { useAppSelector } from '@/store/hooks';
import { fadeInOut } from '@/style/style';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { scadaComponentsMap } from '../../scada/componentMap';
import { getEntity } from '../slice/scadaEditSceneSlice';
import { getSingleSelectionId } from '../slice/scadaEditSelectionSlice';
import EmptyWindow from './EmptyWindow';
import PropertyEditField from './PropertyEditField';

const PropertyWindowContent = () => {
  const id = useAppSelector(getSingleSelectionId);
  const entity = useAppSelector(getEntity(id));

  const editFields = useMemo(() => {
    if (!(entity && id)) return null;

    const inputs = [];
    const propertySchema = scadaComponentsMap[entity.type].propertySchema;

    for (const name in propertySchema) {
      const schema = propertySchema[name as keyof typeof propertySchema];

      inputs.push(<PropertyEditField pickedId={id} key={name} propertyName={name} schema={schema} />);
    }

    return (
      <motion.div
        {...fadeInOut}
        css={[
          {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'repeat(auto-fill, 100px)',
            paddingBottom: 30,
            gap: 16
          }
        ]}
      >
        {inputs}
      </motion.div>
    );
  }, [id]);

  return entity ? editFields : <EmptyWindow />;
};

export default PropertyWindowContent;
