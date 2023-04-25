import { Button } from '@blueprintjs/core';
import { useSetRecoilState } from 'recoil';
import { scadaMode } from '../scada/atom/scadaAtom';

const EditModeNav = () => {
  const setMode = useSetRecoilState(scadaMode);

  return (
    <div style={{ height: '100%' }}>
      <Button
        onClick={() => {
          setMode('monitor');
        }}>
        Cancel
      </Button>
      <Button
        onClick={() => {
          setMode('monitor');
          // TODO : save to redux
        }}>
        Done
      </Button>
    </div>
  );
};

export default EditModeNav;
