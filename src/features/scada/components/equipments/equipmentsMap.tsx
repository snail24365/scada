import Converter from './Converter';
import Gastank from './Gastank';
import HeatExchanger from './HeatExchanger';
import Pump1 from './Pump1';
import Pump2 from './Pump2';
import Watertank1 from './Watertank1';
import Watertank2 from './Watertank2';

export const equipmentComponentsMap = {
  Converter: Converter,
  Gastank: Gastank,
  HeatExchanger: HeatExchanger,
  Pump1: Pump1,
  Pump2: Pump2,
  Watertank1: Watertank1,
  Watertank2: Watertank2
};

export type EquipmentsType = keyof typeof equipmentComponentsMap;

export default equipmentComponentsMap;
