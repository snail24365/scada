import { componentMap } from '@/features/scada/componentMap';
import Line from '@/features/scada/primitives/Line';
import { objectMap, throwIfDev } from '@/util/util';
import { useAppSelector } from '../../../store/hooks';
import { selectEditEntities, selectEditLines } from './editSceneSlice';
import withBoxEdit from './withBoxEdit/withBoxEdit';
import withLineEdit from './withLineEdit/withLineEdit';

const EditableLine = withLineEdit(Line);

const editableComponentMap = objectMap(componentMap, (Component) => withBoxEdit(Component));

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
