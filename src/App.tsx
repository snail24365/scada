import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Stack from './components/util/Stack';
import { resolutionState } from './features/scada/atom/scadaAtom';
import ScadaPage from './pages/ScadaPage';
import SitePage from './pages/SitePage/SitePage';
import { full } from './style/style';

function App() {
  initialize();

  return (
    <Stack direction="row" sx={{ ...full, minWidth: 1600, minHeight: 700, overflow: 'hidden' }}>
      <Sidebar />
      <Stack sx={{ position: 'relative', flexGrow: 1, flexShrink: 0 }}>
        <Header />
        <Routes>
          <Route path="site/*" element={<SitePage />}></Route>
          <Route path="scada" element={<ScadaPage />} />
          <Route path="*" element={<ScadaPage />} />
        </Routes>
      </Stack>
    </Stack>
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
