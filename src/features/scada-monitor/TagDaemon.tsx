import { restSerivce } from '@/service/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { UUID } from '@/types/type';
import { useEffect } from 'react';
import { selectTagSubscriptionMap, updateMonitorEntityProperty } from './slice/scadaMonitorSceneSlice';
import { AppDispatch } from '@/store/store';
import _ from 'lodash';

type TagDaemonProps = {
  fetchInterval?: number;
};

const TagDaemon = ({ fetchInterval = 5000 }: TagDaemonProps) => {
  const dispatch = useAppDispatch();
  const tagSubscriptionMap = useAppSelector(selectTagSubscriptionMap, (prev, next) => _.isEqual(prev, next));

  useEffect(() => {
    // TODO : should be called after scene fetched
    setTimeout(async () => {
      synchronizeTagProperties(tagSubscriptionMap, dispatch);
    }, 100);

    const interval = setInterval(async () => {
      await synchronizeTagProperties(tagSubscriptionMap, dispatch);
    }, fetchInterval);
    return () => {
      clearInterval(interval);
    };
  }, [tagSubscriptionMap]);

  return null;
};

export default TagDaemon;

async function synchronizeTagProperties(
  tagSubscriptionMap: Record<string, Array<{ uuid: UUID; property: string }>>,
  dispatch: AppDispatch
) {
  const tags = Object.keys(tagSubscriptionMap);

  const tagValueMap = await restSerivce({ url: '/tag', method: 'get', data: tags });
  for (const tag of tags) {
    const value = tagValueMap[tag];

    for (const propertyInfo of tagSubscriptionMap[tag]) {
      const { uuid, property } = propertyInfo;
      dispatch(updateMonitorEntityProperty({ uuid, property, value }));
    }
  }
}
