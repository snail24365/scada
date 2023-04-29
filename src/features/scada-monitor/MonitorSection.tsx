import { darkBlue, greyBorder, greyBorder2 } from '@/assets/color';
import { motion } from 'framer-motion';
import React from 'react';
import { useRecoilValue } from 'recoil';
import MonitorViewport from './MonitorViewport/MonitorViewport';
import PageList from './PageList';
import { scadaPagesState } from './scadaMonitorAtom';

type Props = {};

const MonitorSection = (props: Props) => {
  const pages = useRecoilValue(scadaPagesState);
  const numPage = pages.length;
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <div css={{ display: 'flex', height: '100%', padding: '10px 20px' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transform: 'translate(-300px, 0)' }}
          style={{
            backgroundColor: darkBlue,
            border: `3px solid ${greyBorder2}`,
            marginRight: '10px',
            padding: '20px 10px',
            borderRadius: 6
          }}
        >
          <div css={{ marginBottom: 20 }}>
            <span css={{ fontSize: 18, fontWeight: 600 }}>Pages List</span>
            <span css={{ marginLeft: 10, color: 'grey' }}>{`(${numPage})`}</span>
          </div>
          <React.Suspense fallback={<div>Loading...</div>}>
            <PageList />
          </React.Suspense>
        </motion.div>
        <MonitorViewport />
      </div>
    </React.Suspense>
  );
};

export default MonitorSection;
