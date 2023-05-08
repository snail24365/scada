import React from 'react';
import MonitorViewport from './MonitorViewport/MonitorViewport';
import PageWindow from './PageWindow/PageWindow';
import PageEditModal from './PageEditModal/PageEditModal';
import TagDaemon from './TagDaemon';

type Props = {};

const MonitorSection = (props: Props) => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <div css={{ display: 'flex', height: '100%', padding: '10px 20px' }}>
        <PageWindow />
        <MonitorViewport />
        <PageEditModal />
        <TagDaemon />
      </div>
    </React.Suspense>
  );
};

export default MonitorSection;
