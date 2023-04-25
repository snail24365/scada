import Converter from './entities/Converter';
import Gastank from './entities/Gastank';
import HeatExchanger from './entities/HeatExchanger';
import Pump1 from './entities/Pump1';
import Pump2 from './entities/Pump2';
import Watertank1 from './entities/Watertank1';
import Watertank2 from './entities/Watertank2';

export const componentMap: Record<string, React.ComponentType<any>> = {
  converter: Converter,
  gastank: Gastank,
  heatExchanger: HeatExchanger,
  pump1: Pump1,
  pump2: Pump2,
  watertank1: Watertank1,
  watertank2: Watertank2,
};
