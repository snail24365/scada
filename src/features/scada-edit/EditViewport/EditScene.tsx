import { scadaComponentsMap } from '@/features/scada/componentMap';
import Line from '@/features/scada/components/shapes/Line';
import { objectMap, throwIfDev } from '@/util/util';
import { useAppSelector } from '../../../store/hooks';
import { selectEditScene } from './editSceneSlice';
import withBoxEdit from './withBoxEdit/withBoxEdit';
import withLineEdit from './withLineEdit/withLineEdit';

const EditableLine = withLineEdit(Line);

const editableComponentMap = objectMap(scadaComponentsMap, (Component) => withBoxEdit(Component as any));

type EditSceneProp = {};

const EditScene = ({}: EditSceneProp) => {
  const scene = useAppSelector(selectEditScene);

  return (
    <>
      {scene.lines.map((line) => {
        return <EditableLine key={line.uuid} points={line.points} type="line" uuid={line.uuid} />;
      })}
      {scene.boxes.map((entity) => {
        const Component = editableComponentMap[entity.type] as React.ComponentType;
        if (!Component) throwIfDev('No component found for type: ' + entity.type);
        return <Component key={entity.uuid} {...entity} />;
      })}
    </>
  );
};

export default EditScene;
