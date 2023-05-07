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
    propertySchema: {
      ...boxPropertySchema,
      speed: {
        type: 'tag/speed',
        default: 0
      }
    }
  },
  Pump1: {
    component: Pump1,
    propertySchema: {
      ...boxPropertySchema,
      percentage: {
        type: 'tag/speed',
        default: 0
      }
    }
  },
  Pump2: {
    component: Pump2,
    propertySchema: boxPropertySchema
  },
  Watertank1: {
    component: Watertank1,
    propertySchema: {
      ...boxPropertySchema,
      percentage: {
        type: 'tag/percentage',
        default: 0
      }
    }
  },
  Watertank2: {
    component: Watertank2,
    propertySchema: {
      ...boxPropertySchema,
      percentage: {
        type: 'tag/percentage',
        default: 0
      },
      value: {
        type: 'tag/value',
        default: 0
      }
    }
  }
};

export type EquipmentsType = keyof typeof equipmentComponentsMap;

export default equipmentComponentsMap;
