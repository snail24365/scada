import { useSetRecoilState } from 'recoil';
import './App.css';
import ScadaPage from './pages/ScadaPage';
import { resolutionState } from './features/scada/atom/scadaAtom';
import { useEffect, useRef, useState } from 'react';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SitePage from './pages/SitePage';

//todo remote this to env

function App() {
  initialize();

  return (
    <BrowserRouter>
      <div
        className="App"
        style={{
          width: '100%',
          height: '100%',
          minWidth: 1600,
          minHeight: 700,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <Sidebar />
        <Routes>
          <Route path="/site" element={<SitePage />} />
          <Route path="/scada" element={<ScadaPage />} />
          <Route path="/" element={<ScadaPage />} />
        </Routes>
      </div>
    </BrowserRouter>
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
