import { Routes, Route } from 'react-router-dom';
import RouteContainer from './router/RouteContainer';
import { QueryProvider } from './common/services/query';

function App() {
  return (
    <QueryProvider>
      <Routes>
        <Route path="/*" element={<RouteContainer />} />
      </Routes>
    </QueryProvider>
  );
}

export default App;
