import { darkBlue, darkBlueGrey1, fontColor1, deepDark } from '@/assets/color';
import EditModeNav from '@/features/scada-edit/EditModeNav';
import EditSection from '@/features/scada-edit/EditSection';
import MonitorModeNav from '@/features/scada-monitor/MonitorModeNav';
import MonitorSection from '@/features/scada-monitor/MonitorSection';
import { scadaMode } from '@/features/scada/atom/scadaAtom';
import { AnimatePresence } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { MdTouchApp } from 'react-icons/md';
import Header from '@/components/Header';
type Props = {};

const ScadaPage = (props: Props) => {
  const mode = useRecoilValue(scadaMode);
  const isMonitorMode = mode === 'monitor';
  const navBar = isMonitorMode ? <MonitorModeNav /> : <EditModeNav />;
  const section = isMonitorMode ? <MonitorSection /> : <EditSection />;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Header />
      {/* <div
        style={{
          height: '50px',
          backgroundColor: deepDark,
          color: fontColor1
        }}
      >
        <MdTouchApp />
        SCADA{' '}
      </div> */}
      <nav style={{ background: darkBlue, flexDirection: 'row', height: '54px' }}>
        <AnimatePresence>{navBar}</AnimatePresence>
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
          {section}
        </div>
      </div>
    </div>
  );
};

export default ScadaPage;
