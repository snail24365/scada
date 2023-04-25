import { darkBlue, darkBlueGrey1, fontColor1, greyBorder, pageHeaderColor } from '@/assets/color';
import EditModeNav from '@/features/scada-edit/EditModeNav';
import EditViewport from '@/features/scada-edit/EditViewport/EditViewport';
import MonitorViewport from '@/features/scada-monitor/MonitorViewport/MonitorViewport';
import PageListItem from '@/features/scada-monitor/PageListItem';
import MonitorModeNav from '@/features/scada-monitor/ViewModeNav';
import { scadaMode } from '@/features/scada/atom/scadaAtom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

type Props = {};

const ScadaPage = (props: Props) => {
  const mode = useRecoilValue(scadaMode);
  const isMonitorMode = mode === 'monitor';
  const navBar = isMonitorMode ? <MonitorModeNav /> : <EditModeNav />;
  const viewport = isMonitorMode ? (
    <MonitorViewport />
  ) : (
    <EditViewport resolutionX={2000} resolutionY={1600} />
  );
  const numPage = 5; // TODO : change to redux

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          height: '50px',
          backgroundColor: pageHeaderColor,
          color: fontColor1,
        }}>
        SCADA{' '}
      </div>
      <nav style={{ background: darkBlue, display: 'grid', height: '40px', flexDirection: 'row' }}>
        <AnimatePresence>{navBar}</AnimatePresence>
      </nav>
      <div
        css={{
          width: '100%',
          flex: '1 1 auto',
          position: 'relative',
          display: 'flex',
          minHeight: 0,
          padding: '10px 20px',
          backgroundColor: darkBlueGrey1,
          '& > *': {
            minWidth: 0,
          },
        }}>
        <AnimatePresence>
          {isMonitorMode && (
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
          )}
        </AnimatePresence>
        <div
          style={{
            height: '100%',
            flex: 1,
          }}>
          {viewport}
        </div>
      </div>
    </div>
  );
};

export default ScadaPage;
