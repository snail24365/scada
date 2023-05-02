import Converter from './Converter';
import Gastank from './Gastank';
import HeatExchanger from './HeatExchanger';
import Pump1 from './Pump1';
import Pump2 from './Pump2';
import Watertank1 from './Watertank1';
import Watertank2 from './Watertank2';

export const bboxPropertySchema = {
  width: {
    type: 'number',
    contraints: {
      min: 0,
      max: 10000
    },
    default: 100
  },
  height: {
    type: 'number',
    contraints: {
      min: 0,
      max: 10000
    },
    default: 100
  },
  x: {
    type: 'number',
    contraints: {
      min: 0,
      max: 10000
    },
    default: 0
  },
  y: {
    type: 'number',
    contraints: {
      min: 0,
      max: 10000
    },
    default: 0
  }
};

export const equipmentComponentsMap = {
  Converter: {
    component: Converter,
    propertySchema: bboxPropertySchema
  },
  Gastank: {
    component: Gastank,
    propertySchema: bboxPropertySchema
  },
  HeatExchanger: {
    component: HeatExchanger,
    propertySchema: bboxPropertySchema
  },
  Pump1: {
    component: Pump1,
    propertySchema: bboxPropertySchema
  },
  Pump2: {
    component: Pump2,
    propertySchema: bboxPropertySchema
  },
  Watertank1: {
    component: Watertank1,
    propertySchema: bboxPropertySchema
  },
  Watertank2: {
    component: Watertank2,
    propertySchema: bboxPropertySchema
  }
};

export type EquipmentsType = keyof typeof equipmentComponentsMap;

export default equipmentComponentsMap;
