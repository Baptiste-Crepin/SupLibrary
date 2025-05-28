import RecentChangeList from '@components/RecentChange/RecentChangeList';
import MainLayout from "@layouts/MainLayout";
import { Route, Routes } from 'react-router';

export const Router = () => {
  return <Routes>
    <Route path='/' element={<MainLayout />}>
      <Route index element={<RecentChangeList />} />
    </Route>
  </Routes>
}