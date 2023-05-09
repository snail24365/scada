import { useAppSelector } from '@/store/hooks';
import { fadeInOut } from '@/style/style';
import { PropertySchema } from '@/types/schema/propertySchema';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { scadaPropertySchema } from '../../scada/components/scadaComponents';
import { getEntity } from '../slice/scadaEditSceneSlice';
import { getSingleSelectionId } from '../slice/scadaEditSelectionSlice';
import EmptyWindow from './EmptyWindow';
import PropertyEditField from './PropertyEditField';

const PropertyEditSection = () => {
  const id = useAppSelector(getSingleSelectionId);
  const entity = useAppSelector(getEntity(id));

  const editFields = useMemo(() => {
    if (!(entity && id)) return null;

    const propertyFields = [];

    const propertySchema = scadaPropertySchema[entity.type];

    for (const name in propertySchema) {
      const schema = propertySchema[name as keyof typeof propertySchema] as PropertySchema;
      if (!schema.hidden) {
        propertyFields.push(<PropertyEditField pickedId={id} key={name} propertyName={name} schema={schema} />);
      }
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
        {propertyFields}
      </motion.div>
    );
  }, [id]);

  return entity ? editFields : <EmptyWindow />;
};

export default PropertyEditSection;
