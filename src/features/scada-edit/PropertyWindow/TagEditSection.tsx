import { scadaPropertySchema } from '@/features/scada/components/scadaComponents';
import { useAppSelector } from '@/store/hooks';
import { fadeInOut } from '@/style/style';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { getEntity } from '../slice/scadaEditSceneSlice';
import { getSingleSelectionId } from '../slice/scadaEditSelectionSlice';

type Props = {};

const TagEditSection = (props: Props) => {
  const id = useAppSelector(getSingleSelectionId);
  const entity = useAppSelector(getEntity(id));

  const editFields = useMemo(() => {
    if (!(entity && id)) return null;

    const propertySchema = scadaPropertySchema[entity.type];

    for (const name in propertySchema) {
      const schema = propertySchema[name as keyof typeof propertySchema] as any;
      if (schema.editable === false) {
        continue;
      }
      // inputs.push(<PropertyEditField pickedId={id} key={name} propertyName={name} schema={schema} />);
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
        {editFields}
      </motion.div>
    );
  }, [id]);
};

export default TagEditSection;
