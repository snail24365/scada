import { borderColor1 } from '@/assets/color';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { PropertySchema } from '@/types/schema';
import { UUID } from '@/types/type';
import { toFixedNumber } from '@/util/util';
import { MenuItem, Select, TextField } from '@mui/material';
import { getProperty, updateProperty } from '../slice/scadaEditSceneSlice';
import PropertyEditFieldLayout from './PropertyEditFieldLayout';

type PropertyEditFieldProps = {
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

const PropertyEditField = ({ propertyName, schema, pickedId }: PropertyEditFieldProps) => {
  const { category: type, default: defaultValue } = schema;
  const dispatch = useAppDispatch();
  const propertyValue = useAppSelector(getProperty(pickedId, propertyName));

  let inputField: React.ReactNode = null;
  let value = propertyValue ?? defaultValue;
  value = toFixedNumber(String(value));

  const updateEntityProperty = (val: string | number) => {
    const value = toFixedNumber(String(val));
    dispatch(updateProperty({ uuid: pickedId, property: propertyName, value }));
  };

  if (typeof type === 'object') {
    const items = type.map((categoryItem, i) => (
      <MenuItem key={i} value={categoryItem}>
        {categoryItem}
      </MenuItem>
    ));
    inputField = (
      <Select
        value={value}
        onChange={(e) => {
          updateEntityProperty(e.target.value);
        }}
        sx={borderStyle}
      >
        {items}
      </Select>
    );
  } else if (type.startsWith('tag')) {
    const map = {
      'tag/percentage': 'p',
      'tag/value': 'v',
      'tag/speed': 's'
    };
    const prefix = map[type as keyof typeof map];
    const categories = [...Array(13).keys()].map((x) => `${prefix}${x}`);
    const items = categories.map((tag, i) => (
      <MenuItem key={i} value={tag}>
        {tag}
      </MenuItem>
    ));
    inputField = (
      <Select
        value={value}
        onChange={(e) => {
          console.log(e.target.value);
          updateEntityProperty(e.target.value);
        }}
        sx={borderStyle}
      >
        {items}
      </Select>
    );
  } else {
    inputField = (
      <TextField
        type={type}
        sx={borderStyle}
        value={value}
        onChange={(e) => {
          updateEntityProperty(e.target.value);
          console.log(e);
        }}
      />
    );
  }

  return <PropertyEditFieldLayout name={propertyName}>{inputField}</PropertyEditFieldLayout>;
};

export default PropertyEditField;
