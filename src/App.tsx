import './App.css';
import EditViewport from './features/scada/EditViewport/EditViewport';

function App() {
  return (
    <div className="App" style={{ display: 'flex', height: '100vh' }}>
      <div>
        <ul>icon</ul>
        <ul>icon</ul>
        <ul>icon</ul>
      </div>
      <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', height: '50px' }}>
          <div>Item</div>
          <div>Item</div>
          <div>Item</div>
          <div>Item</div>
        </div>
        <div style={{ width: '100%', flex: '1 1 auto', position: 'relative', display: 'flex', minHeight: 0, justifyContent: 'center', alignItems: 'center' }}>
          <EditViewport width={1500} height={1200} />
        </div>
      </div>
    </div>
  );
}

export default App;
