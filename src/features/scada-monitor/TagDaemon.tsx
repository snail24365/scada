import { restSerivce } from '@/service/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { rest } from 'lodash';
import React, { useEffect } from 'react';
import { EntityProperty } from './slice/tagSubscriptionSlice';
import { updateMonitorEntityProperty } from './slice/scadaMonitorSceneSlice';

type TagDaemonProps = {
  fetchInterval?: number;
};

const TagDaemon = ({ fetchInterval = 3000 }: TagDaemonProps) => {
  const dispatch = useAppDispatch();
  const tagSubscription = useAppSelector((state) => state.tagSubscription);

  useEffect(() => {
    const interval = setInterval(synchronizeScada, fetchInterval);
    return () => {
      clearInterval(interval);
    };

    async function synchronizeScada() {
      const tags = Object.keys(tagSubscription);

      const tagInfo = await restSerivce({ url: '/tag', method: 'get', data: tags });

      injectLatestDataToRedux();

      function injectLatestDataToRedux() {
        for (const tag of tags) {
          const value = tagInfo[tag];

          const linkedProperties = tagSubscription[tag];
          for (const linkedProperty of linkedProperties) {
            const { uuid, property } = linkedProperty;

            dispatch(updateMonitorEntityProperty({ uuid, property, value }));
          }
        }
      }
    }
  }, [tagSubscription, dispatch]);

  return <></>;
};

export default TagDaemon;
