import { fontColor1, greyBorder } from '@/assets/color';
import { PropertySchema } from '@/types/schema';
import { toFixedNumber } from '@/util/util';
import { MenuItem, Select, TextField } from '@mui/material';
import _ from 'lodash';
import { useContext } from 'react';
import { PropertyEditWindowContext } from './PropertyWindowContext';
import { BoxEntity, ScadaEntity, UUID } from '@/types/type';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getEntity, getProperty, updateEntity, updateProperty } from '../slice/scadaEditSceneSlice';
import PropertyEditFieldLayout from './PropertyEditFieldLayout';

type Props = {
  propertyName: string;
  schema: PropertySchema;
  // initialValue: any;
  pickedId: UUID;
};

const borderStyle = {
  border: `1px solid ${greyBorder}`,
  borderRadius: 2,
  '& .MuiInputBase-input': {
    color: '#fff'
  }
};

const PropertyEditField = ({ propertyName, schema, pickedId }: Props) => {
  const { type, default: defaultValue } = schema;
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
    const menuItems = type.map((categoryItem, i) => (
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
        {menuItems}
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
