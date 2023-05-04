import { useSetRecoilState } from 'recoil';
import './App.css';
import ScadaPage from './pages/ScadaPage';
import { resolutionState } from './features/scada/atom/scadaAtom';
import { useEffect } from 'react';

function App() {
  initialize();

  return (
    <div className="App" style={{ height: '100%', minWidth: 1600, overflow: 'hidden' }}>
      <ScadaPage />
    </div>
  );
}

export default App;

function initialize() {
  const setResolution = useSetRecoilState(resolutionState);

  useEffect(() => {
    setResolution({ x: 1600, y: 900 });
    const contextMenuListener = (e: MouseEvent): void => e.preventDefault();
    window.addEventListener('contextmenu', contextMenuListener);
    return () => {
      window.removeEventListener('contextmenu', contextMenuListener);
    };
  }, []);
}
