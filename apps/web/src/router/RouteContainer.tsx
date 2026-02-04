import Home from '@/pages/Home/Home';
import Result from '@/pages/Result/Result';
import { Navigate, Route, Routes } from 'react-router-dom';
import NotFound from '@/pages/NotFound/NotFound';
import { NotFoundPath, ResultPath, RootPath } from './Paths';

function RouteContainer() {
  return (
    <Routes>
      <Route path={RootPath} element={<Home />} />
      <Route path={ResultPath} element={<Result />} />
      <Route path={NotFoundPath} element={<NotFound />} />
      <Route path="*" element={<Navigate to={NotFoundPath} replace />} />
    </Routes>
  );
}

export default RouteContainer;
