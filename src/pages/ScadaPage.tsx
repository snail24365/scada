import { darkBlue, darkBlueGrey1, fontColor1, deepDark } from '@/assets/color';
import EditModeNav from '@/features/scada-edit/EditModeNav';
import EditSection from '@/features/scada-edit/EditSection';
import MonitorModeNav from '@/features/scada-monitor/MonitorModeNav';
import MonitorSection from '@/features/scada-monitor/MonitorSection';
import { resolutionState, scadaMode } from '@/features/scada/atom/scadaAtom';
import { AnimatePresence } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { MdTouchApp } from 'react-icons/md';
import Header from '@/components/Header';
import React, { useEffect } from 'react';
type Props = {};

const ScadaPage = (props: Props) => {
  const mode = useRecoilValue(scadaMode);
  const isMonitorMode = mode === 'monitor';
  const Navbar = isMonitorMode ? MonitorModeNav : EditModeNav;
  const Section = isMonitorMode ? MonitorSection : EditSection;
  const setResolution = useSetRecoilState(resolutionState);

  useEffect(() => {
    setResolution({ resolutionX: 1000, resolutionY: 600 });
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <nav style={{ background: darkBlue, flexDirection: 'row', height: '54px' }}>
        <AnimatePresence>
          <Navbar />
        </AnimatePresence>
      </nav>
      <div
        css={{
          width: '100%',
          flex: '1 1 auto',
          position: 'relative',
          display: 'flex',
          minHeight: 0,
          backgroundColor: darkBlueGrey1,
          '& > *': {
            minWidth: 0
          }
        }}
      >
        <div
          style={{
            height: '100%',
            flex: 1
          }}
        >
          <React.Suspense fallback={<div>Loading...</div>}>
            <Section />
          </React.Suspense>
        </div>
      </div>
    </div>
  );
};

export default ScadaPage;
