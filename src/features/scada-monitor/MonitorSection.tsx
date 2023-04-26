import { darkBlue, greyBorder } from '@/assets/color';
import { motion } from 'framer-motion';
import React from 'react';
import MonitorViewport from './MonitorViewport/MonitorViewport';
import PageListItem from './PageListItem';

type Props = {};

const MonitorSection = (props: Props) => {
  const numPage = 5; // TODO : change to redux

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
        }}>
        <span>Pages List</span>
        <div>Search Form</div>
        <ul>
          <PageListItem isSelected={true} title={'Floor 1, Computer room'} />
          <PageListItem title={'Floor 1, manufacturing room'} />
        </ul>
        <span>{`(${numPage})`}</span>
      </motion.div>
      <MonitorViewport />
    </div>
  );
};

export default MonitorSection;
