import { selectCurrentPageId } from '@/features/scada-monitor/slice/scadaPageSlice';
import { boxComponents } from '@/features/scada/components/scadaComponents';
import Line from '@/features/scada/components/shapes/Line';
import { objectMap, throwIfDev } from '@/util/util';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchScadaEditScene, getEditScene } from '../slice/scadaEditSceneSlice';
import EditableText from './EditableText';
import withBoxEdit from './withBoxEdit/withBoxEdit';
import withLineEdit from './withLineEdit/withLineEdit';

const EditableLine = withLineEdit(Line);

const editableBoxComponentMap = objectMap(boxComponents, (info) => withBoxEdit(info as any));

const EditScene = () => {
  const scene = useAppSelector(getEditScene);
  const dispatch = useAppDispatch();
  const currentScadaPageId = useAppSelector(selectCurrentPageId);

  useEffect(() => {
    (async () => {
      if (!currentScadaPageId) return;
      await dispatch(fetchScadaEditScene(currentScadaPageId));
    })();
  }, [currentScadaPageId]);

  return (
    <>
      {scene.lines.map((line) => {
        return <EditableLine key={line.uuid} {...line} />;
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
