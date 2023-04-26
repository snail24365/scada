import { darkBlue, darkBlueGrey1, fontColor1, greyBorder, pageHeaderColor } from '@/assets/color';
import EditModeNav from '@/features/scada-edit/EditModeNav';
import EditSection from '@/features/scada-edit/EditSection';
import MonitorModeNav from '@/features/scada-monitor/MonitorModeNav';
import MonitorSection from '@/features/scada-monitor/MonitorSection';
import MonitorViewport from '@/features/scada-monitor/MonitorViewport/MonitorViewport';
import PageListItem from '@/features/scada-monitor/PageListItem';
import { scadaMode } from '@/features/scada/atom/scadaAtom';
import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

type Props = {};

const ScadaPage = (props: Props) => {
  const mode = useRecoilValue(scadaMode);
  const isMonitorMode = mode === 'monitor';
  const navBar = isMonitorMode ? <MonitorModeNav /> : <EditModeNav />;
  const section = isMonitorMode ? <MonitorSection /> : <EditSection />;

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
            minWidth: 0,
          },
        }}>
        <div
          style={{
            height: '100%',
            flex: 1,
          }}>
          {section}
        </div>
      </div>
    </div>
  );
};

export default ScadaPage;
