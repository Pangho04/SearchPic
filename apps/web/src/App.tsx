import { Routes, Route } from 'react-router-dom';
import RouteContainer from './router/RouteContainer';

function App() {
  return (
    <Routes>
      <Route path="/*" element={<RouteContainer />} />
    </Routes>
  );
}

export default App;
