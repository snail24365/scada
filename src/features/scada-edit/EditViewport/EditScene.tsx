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
import { isBoxEntity, isLineEntity, isTextEntity } from '@/types/type';

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

  return (
    <>
      {scene.entities.map((entity) => {
        console.log(entity.type);

        if (isBoxEntity(entity)) {
          const Component = editableBoxComponentMap[entity.type] as React.ComponentType;
          if (!Component) throwIfDev('No component found for type: ' + entity.type);
          return <Component key={entity.uuid} {...entity} />;
        }
        if (isLineEntity(entity)) {
          return <EditableLine key={entity.uuid} points={entity.points} type="Line" uuid={entity.uuid} />;
        }
        if (isTextEntity(entity)) {
          return <EditableText key={entity.uuid} {...entity} />;
        }
      })}
    </>
  );
};

export default EditScene;
