import { borderColor1 } from '@/assets/color';
import { PropertySchema } from '@/types/schema/propertySchema';
import { UUID } from '@/types/type';
import { MenuItem, Select } from '@mui/material';
import PropertyEditFieldLayout from './PropertyEditFieldLayout';
import { useAppDispatch } from '@/store/hooks';
import { subscribeTag } from '@/features/scada-monitor/slice/tagSubscriptionSlice';
import { useState } from 'react';

type TagEditFieldProps = {
  propertyName: string;
  schema: PropertySchema;
  pickedId: UUID;
};

const borderStyle = {
  border: `1px solid ${borderColor1}`,
  borderRadius: 2,
  '& .MuiInputBase-input': {
    color: '#fff'
  }
};

const TagEditField = ({ propertyName, schema, pickedId }: TagEditFieldProps) => {
  const [value, setValue] = useState('');
  const { type: type } = schema;
  const dispatch = useAppDispatch();

  let menuItem: React.ReactElement[] = [];
  if (typeof type === 'string' && type === 'tag/speed') {
    const tags = [...Array(13).keys()].map((x) => `s${x}`);
    menuItem = tags.map((tag) => (
      <MenuItem key={tag} value={tag}>
        {tag}
      </MenuItem>
    ));
  }

  return (
    <PropertyEditFieldLayout name={propertyName}>
      <Select
        value={value}
        onChange={(e) => {
          const tag = e.target.value as string;
          dispatch(subscribeTag({ uuid: pickedId, property: propertyName, tag }));
          setValue(tag);
        }}
        sx={borderStyle}
      >
        {menuItem}
      </Select>
    </PropertyEditFieldLayout>
  );
};

export default TagEditField;
