import Converter from './Converter';
import Gastank from './Gastank';
import HeatExchanger from './HeatExchanger';
import Pump1 from './Pump1';
import Pump2 from './Pump2';
import Watertank1 from './Watertank1';
import Watertank2 from './Watertank2';

export const equipmentsMap = {
  Converter,
  Gastank,
  HeatExchanger,
  Pump1,
  Pump2,
  Watertank1,
  Watertank2,
};

export type EquipmentsType = keyof typeof equipmentsMap

export default equipmentsMap;