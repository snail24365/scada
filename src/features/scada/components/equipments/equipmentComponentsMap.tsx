import { boxPropertySchema } from '@/types/schema';
import Converter from './Converter';
import Gastank from './Gastank';
import HeatExchanger from './HeatExchanger';
import Pump1 from './Pump1';
import Pump2 from './Pump2';
import Watertank1 from './Watertank1';
import Watertank2 from './Watertank2';

export const equipmentComponentsMap = {
  Converter: {
    component: Converter,
    propertySchema: boxPropertySchema
  },
  Gastank: {
    component: Gastank,
    propertySchema: boxPropertySchema
  },
  HeatExchanger: {
    component: HeatExchanger,
    propertySchema: boxPropertySchema
  },
  Pump1: {
    component: Pump1,
    propertySchema: boxPropertySchema
  },
  Pump2: {
    component: Pump2,
    propertySchema: boxPropertySchema
  },
  Watertank1: {
    component: Watertank1,
    propertySchema: boxPropertySchema
  },
  Watertank2: {
    component: Watertank2,
    propertySchema: boxPropertySchema
  }
};

export type EquipmentsType = keyof typeof equipmentComponentsMap;

export default equipmentComponentsMap;
