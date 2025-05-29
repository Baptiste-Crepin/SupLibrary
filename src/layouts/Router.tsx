import MainLayout from "@layouts/MainLayout";
import BookDetailPage from '@pages/books/bookDetail.page';
import HomePage from '@pages/home/Home.page';
import WorkDetailPage from '@pages/works/workDetail.page';
import { Route, Routes } from 'react-router';

export const Router = () => {
  return <Routes>
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/books/:bookKey" element={<BookDetailPage />} />
      <Route path="/works/:workKey" element={<WorkDetailPage />} />
    </Route>
  </Routes>
}