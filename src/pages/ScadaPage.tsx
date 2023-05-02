import { darkBlue, darkBlueGrey1 } from '@/assets/color';
import Header from '@/components/Header';
import EditModeNav from '@/features/scada-edit/EditModeNav';
import EditSection from '@/features/scada-edit/EditSection';
import MonitorModeNav from '@/features/scada-monitor/MonitorModeNav';
import MonitorSection from '@/features/scada-monitor/MonitorSection';
import { scadaMode } from '@/features/scada/atom/scadaAtom';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { useRecoilValue } from 'recoil';
type Props = {};

const ScadaPage = (props: Props) => {
  const mode = useRecoilValue(scadaMode);
  const isMonitorMode = mode === 'monitor';
  const Navbar = isMonitorMode ? MonitorModeNav : EditModeNav;
  const Section = isMonitorMode ? MonitorSection : EditSection;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      <Header />
      <nav style={{ background: darkBlue, height: '54px', flexShrink: 0 }}>
        <AnimatePresence>
          <Navbar />
        </AnimatePresence>
      </nav>
      <div
        css={{
          width: '100%',
          flex: 1,
          flexShrink: 1,
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
