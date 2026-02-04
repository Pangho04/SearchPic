import Home from '@/pages/Home/Home';
import Result from '@/pages/Result/Result';
import { Route, Routes } from 'react-router-dom';
import { ResultPath, RootPath } from './Paths';

function RouteContainer() {
  return (
    <Routes>
      <Route path={RootPath} element={<Home />} />
      <Route path={ResultPath} element={<Result />} />
    </Routes>
  );
}

export default RouteContainer;
