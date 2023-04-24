import { throwIfDev } from '@/util/util';
import React from 'react';
import { useAppSelector } from '../../../store/hooks';
import Converter from '../entities/Converter';
import Gastank from '../entities/Gastank';
import HeatExchanger from '../entities/HeatExchanger';
import Pump1 from '../entities/Pump1';
import Pump2 from '../entities/Pump2';
import Watertank1 from '../entities/Watertank1';
import Watertank2 from '../entities/Watertank2';
import Line from '../primitives/Line';
import { selectEditEntities, selectEditLines } from './editSceneSlice';
import withBoxEdit from './withBoxEdit/withBoxEdit';
import withLineEdit from './withLineEdit/withLineEdit';

const EditableLine = withLineEdit(Line);

const editableComponentMap: Record<string, React.ComponentType<any>> = {
  converter: withBoxEdit(Converter),
  gastank: withBoxEdit(Gastank),
  heatExchanger: withBoxEdit(HeatExchanger),
  pump1: withBoxEdit(Pump1),
  pump2: withBoxEdit(Pump2),
  watertank1: withBoxEdit(Watertank1),
  watertank2: withBoxEdit(Watertank2),
};

type Props = {};

const EditScene = (props: Props) => {
  const lines = useAppSelector(selectEditLines);
  const entities = useAppSelector(selectEditEntities);
  return (
    <>
      {lines.map((line) => {
        return <EditableLine key={line.uuid} points={line.points} type="line" uuid={line.uuid} />;
      })}
      {entities.map((entity) => {
        const Component = editableComponentMap[entity.type];
        if (!Component) throwIfDev('No component found for type: ' + entity.type);
        return <Component key={entity.uuid} {...entity} />;
      })}
    </>
  );
};

export default EditScene;
