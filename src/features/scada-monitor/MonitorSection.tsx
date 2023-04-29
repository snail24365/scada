import { darkBlue, darkBlueGrey1, greyBorder } from '@/assets/color';
import { motion } from 'framer-motion';
import React from 'react';
import MonitorViewport from './MonitorViewport/MonitorViewport';
import PageListItem from './PageListItem';
import PageList from './PageList';

type Props = {};

const MonitorSection = (props: Props) => {
  const numPage = 2; // TODO : change to redux

  return (
    <div css={{ display: 'flex', height: '100%', padding: '10px 20px' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transform: 'translate(-300px, 0)' }}
        style={{
          backgroundColor: darkBlue,
          border: `1px solid ${greyBorder}`,
          marginRight: '10px',
          padding: '20px 10px',
          borderRadius: 6
        }}
      >
        <div css={{ marginBottom: 20 }}>
          <span css={{ fontSize: 18, fontWeight: 600 }}>Pages List</span>
          <span css={{ marginLeft: 10, color: 'grey' }}>{`(${numPage})`}</span>
        </div>
        <PageList />
      </motion.div>
      <MonitorViewport />
    </div>
  );
};

export default MonitorSection;
