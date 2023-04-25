import { fontColor2, primaryGrey } from '@/assets/color';
import { Button } from '@blueprintjs/core';
import { useSetRecoilState } from 'recoil';
import { scadaMode } from '../scada/atom/scadaAtom';

const MonitorModeNav = () => {
  const scadaPageTitle = 'SCADA 1'; // TODO : change to recoil
  const ratio = 100; // TODO : change to recoil

  const setMode = useSetRecoilState(scadaMode);

  return (
    <div style={{ height: '100%', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>{`${ratio}`}</div>
        <div>V</div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {/* buttons  */}
          <Button icon="zoom-in"></Button>
          <Button icon="zoom-out"></Button>
          <Button icon="reset"></Button>
        </div>
      </div>
      <div>{scadaPageTitle}</div>
      <div>
        <Button
          onClick={() => setMode('edit')}
          icon="edit"
          large={true}
          css={{ backgroundColor: primaryGrey, color: fontColor2, fill: fontColor2 }}>
          SCADA Edit{' '}
        </Button>
      </div>
    </div>
  );
};

export default MonitorModeNav;
