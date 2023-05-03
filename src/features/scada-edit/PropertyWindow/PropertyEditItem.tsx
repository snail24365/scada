import { fontColor1 } from '@/assets/color';
import { PropertySchema, StateSetter } from '@/types/type';
import { MenuItem, Select, TextField } from '@mui/material';
import _ from 'lodash';
import { useContext } from 'react';
import { PropertyEditWindowContext } from './PropertyEditWindowContext';

type Props = { propertyName: string; schema: PropertySchema; entity: any };

const PropertyEditItemLayout = ({ children: input, name }: { name: string; children: React.ReactNode }) => {
  return (
    <div css={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span css={{ fontSize: 18 }}>{_.startCase(name)}</span>
      {input}
    </div>
  );
};

const PropertyEditItem = ({ propertyName, schema, entity }: Props) => {
  const { property, setProperty } = useContext(PropertyEditWindowContext);
  const { type, category, validation, default: defaultValue, contraints } = schema;

  const style = {
    border: `1px solid ${fontColor1}`,
    borderRadius: 2,
    '& .MuiInputBase-input': {
      color: fontColor1
    }
  };

  const initialValue = entity[propertyName];

  let inputField: React.ReactNode = null;
  const value = property[propertyName] ?? initialValue;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProperty({ ...property, [propertyName]: e.target.value });
  };

  switch (type) {
    case 'color':
      inputField = <TextField type="color" sx={style} value={value} onChange={onChange} />;
      break;
    case 'text':
      inputField = <TextField type="text" sx={style} value={value} onChange={onChange} />;
      break;
    case 'number':
      inputField = <TextField type="number" sx={style} value={value} onChange={onChange} />;
      break;
    case 'category':
      const menuItems = category?.map((item, i) => (
        <MenuItem key={i} value={item}>
          {item}
        </MenuItem>
      ));
      inputField = (
        <Select
          value={value}
          onSelect={onChange}
          sx={{
            border: `1px solid ${fontColor1}`,
            borderRadius: 2,
            '& .MuiInputBase-input': {
              color: fontColor1
            }
          }}
          // value={age}
          // onChange={handleChange}
        >
          {menuItems}
        </Select>
      );
      break;
    default:
      break;
  }

  return <PropertyEditItemLayout name={propertyName}>{inputField}</PropertyEditItemLayout>;
};

export default PropertyEditItem;
