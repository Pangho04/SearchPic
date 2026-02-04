import { Routes, Route } from 'react-router-dom';
import RouteContainer from './router/RouteContainer';
import { QueryProvider } from './common/services/query';
import { AlertProvider } from './common/providers/AlertProvider';

function App() {
  return (
    <QueryProvider>
      <AlertProvider>
        <Routes>
          <Route path="/*" element={<RouteContainer />} />
        </Routes>
      </AlertProvider>
    </QueryProvider>
  );
}

export default App;
