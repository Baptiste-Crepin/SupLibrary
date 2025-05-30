import MainLayout from "@layouts/MainLayout";
import BookDetailPage from '@pages/books/bookDetail.page';
import NotFoundPage from "@pages/errors/NotFound.page";
import HomePage from '@pages/home/Home.page';
import SearchPage from "@pages/search/Search.page";
import WorkDetailPage from '@pages/works/workDetail.page';
import { Route, Routes } from 'react-router';

export const Router = () => {
  return <Routes>
    <Route path='/' element={<MainLayout />}>
      <Route path='*' element={<NotFoundPage />} />
      <Route index element={<HomePage />} />
      <Route path="/books/:bookKey" element={<BookDetailPage />} />
      <Route path="/works/:workKey" element={<WorkDetailPage />} />
    </Route>
    <Route path='/search' element={<SearchPage />} />
  </Routes>
}