import { borderColor1 } from '@/assets/color';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { PropertySchema } from '@/types/schema/propertySchema';
import { UUID } from '@/types/type';
import { toFixedNumber } from '@/util/util';
import { MenuItem, Select, TextField } from '@mui/material';
import { getProperty, updateProperty } from '../slice/scadaEditSceneSlice';
import PropertyEditFieldLayout from './PropertyEditFieldLayout';

/**
 * TODO : refactor this component
 */
type PropertyEditFieldProps = {
  propertyName: string;
  schema: PropertySchema;
  pickedId: UUID;
};

const borderStyle = {
  border: `1px solid grey`,
  borderRadius: 2,
  '& .MuiInputBase-input': {
    color: '#fff'
  }
};

const PropertyEditField = ({ propertyName, schema, pickedId }: PropertyEditFieldProps) => {
  const { type: type, default: defaultValue, tag } = schema;
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
      <MenuItem key={i} value={categoryItem} css={{ color: '#000' }}>
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
  } else if (tag) {
    const map = {
      percentage: 'p',
      value: 'v',
      speed: 's'
    };
    const prefix = map[tag as keyof typeof map];
    const categories = [...Array(13).keys()].map((x) => `${prefix}${x}`);
    const items = categories.map((tag, i) => (
      <MenuItem key={i} value={tag} css={{ color: '#000' }}>
        {tag}
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
  } else {
    inputField = (
      <TextField
        type={type}
        sx={borderStyle}
        value={value}
        onChange={(e) => {
          updateEntityProperty(e.target.value);
        }}
      />
    );
  }

  return <PropertyEditFieldLayout name={propertyName}>{inputField}</PropertyEditFieldLayout>;
};

export default PropertyEditField;
