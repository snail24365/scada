import { boxComponentsMap } from '@/features/scada/componentMap';
import Line from '@/features/scada/components/shapes/Line';
import { objectMap, throwIfDev } from '@/util/util';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchScadaEditScene, getEditScene } from '../slice/scadaEditSceneSlice';
import withBoxEdit from './withBoxEdit/withBoxEdit';
import withLineEdit from './withLineEdit/withLineEdit';
import EditableText from './EditableText';
import { selectCurrentPageId } from '@/features/scada-monitor/slice/scadaPageSlice';
import { useEffect } from 'react';

const EditableLine = withLineEdit(Line);

const editableBoxComponentMap = objectMap(boxComponentsMap, (info) => withBoxEdit(info.component as any));

type EditSceneProp = {};

const EditScene = ({}: EditSceneProp) => {
  const scene = useAppSelector(getEditScene);
  const dispatch = useAppDispatch();
  const currentScadaPageId = useAppSelector(selectCurrentPageId);

  useEffect(() => {
    (async () => {
      if (!currentScadaPageId) return;
      await dispatch(fetchScadaEditScene(currentScadaPageId));
    })();
  }, [currentScadaPageId]);

  // const scene = useAppSelector(selectEditScene);

  return (
    <>
      {scene.lines.map((line) => {
        return <EditableLine key={line.uuid} points={line.points} type="Line" uuid={line.uuid} />;
      })}
      {scene.boxes.map((entity) => {
        const Component = editableBoxComponentMap[entity.type] as React.ComponentType;
        if (!Component) throwIfDev('No component found for type: ' + entity.type);
        return <Component key={entity.uuid} {...entity} />;
      })}
      {scene.texts.map((entity) => {
        return <EditableText key={entity.uuid} {...entity} />;
      })}
    </>
  );
};

export default EditScene;
