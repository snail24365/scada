import { boxPropertySchema } from '@/types/schema';
import Converter from './Converter';
import Gastank from './Gastank';
import HeatExchanger from './HeatExchanger';
import Pump1 from './Pump1';
import Pump2 from './Pump2';
import Watertank1 from './Watertank1';
import Watertank2 from './Watertank2';

export const equipmentMap = {
  Converter,
  Gastank,
  HeatExchanger,
  Pump1,
  Pump2,
  Watertank1,
  Watertank2
} as const;

export const equipemntSchemaMap = {
  Converter: boxPropertySchema,
  Gastank: boxPropertySchema,
  HeatExchanger: {
    ...boxPropertySchema,
    speed: {
      type: 'number',
      default: 0,
      hidden: true
    },
    speedTag: {
      type: 'tag/speed',
      default: null
    }
  },
  Pump1: {
    ...boxPropertySchema,
    percentage: {
      type: 'number',
      default: 0,
      hidden: true
    },
    percentageTag: {
      type: 'tag/percentage',
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
    percentageTag: {
      type: 'tag/percentage',
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
    percentageTag: {
      type: 'tag/percentage',
      default: null
    },
    value: {
      type: 'number',
      default: 0,
      hidden: true
    },
    valueTag: {
      type: 'tag/value',
      default: null
    }
  }
} as const;

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
        type: 'number',
        default: 0,
        hidden: true
      },
      speedTag: {
        type: 'tag/speed',
        default: null
      }
    }
  },
  Pump1: {
    component: Pump1,
    propertySchema: {
      ...boxPropertySchema,
      percentage: {
        type: 'number',
        default: 0,
        hidden: true
      },
      percentageTag: {
        type: 'tag/percentage',
        default: null
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
        type: 'number',
        default: 0,
        hidden: true
      },
      percentageTag: {
        type: 'tag/percentage',
        default: null
      }
    }
  },
  Watertank2: {
    component: Watertank2,
    propertySchema: {
      ...boxPropertySchema,
      percentage: {
        type: 'number',
        default: 0,
        hidden: true
      },
      percentageTag: {
        type: 'tag/percentage',
        default: null
      },
      value: {
        type: 'number',
        default: 0,
        hidden: true
      },
      valueTag: {
        type: 'tag/value',
        default: null
      }
    }
  }
};

export type EquipmentsType = keyof typeof equipmentComponentsMap;

export default equipmentComponentsMap;

type a = (typeof equipemntSchemaMap)['HeatExchanger'];
