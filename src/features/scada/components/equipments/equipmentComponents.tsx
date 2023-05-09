import { boxPropertySchema } from '@/types/schema/boxPropertySchema';
import Converter from './Converter';
import Gastank from './Gastank';
import HeatExchanger from './HeatExchanger';
import Pump1 from './Pump1';
import Pump2 from './Pump2';
import Watertank1 from './Watertank1';
import Watertank2 from './Watertank2';

export const equipmentComponents = {
  Converter,
  Gastank,
  HeatExchanger,
  Pump1,
  Pump2,
  Watertank1,
  Watertank2
} as const;

export const equipmentsPropertyMap = {
  Converter: boxPropertySchema,
  Gastank: boxPropertySchema,
  HeatExchanger: {
    ...boxPropertySchema,
    speed: {
      type: 'number',
      default: 0,
      hidden: true
    },
    speed_tag: {
      type: 'string',
      tag: 'speed',
      default: null
    }
  },
  Pump1: {
    ...boxPropertySchema,
    rotationSpeed: {
      type: 'number',
      default: 0,
      hidden: true
    },
    rotationSpeed_tag: {
      type: 'string',
      tag: 'speed',
      default: null
    }
  },
  Pump2: boxPropertySchema,
  Watertank1: {
    ...boxPropertySchema,
    percentage: {
      type: 'number',
      default: 0,
      hidden: true
    },
    percentage_tag: {
      type: 'string',
      tag: 'percentage',
      default: null
    }
  },
  Watertank2: {
    ...boxPropertySchema,
    percentage: {
      type: 'number',
      default: 0,
      hidden: true
    },
    percentage_tag: {
      type: 'string',
      tag: 'percentage',
      default: null
    },
    value: {
      type: 'number',
      default: 0,
      hidden: true
    },
    value_tag: {
      type: 'string',
      default: null,
      tag: 'value'
    }
  }
} as const;

export type EquipmentsType = keyof typeof equipmentComponents;
