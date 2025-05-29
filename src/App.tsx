import { BrowserRouter } from 'react-router';
import { Router } from './layouts/Router';

import './App.css';


function App() {
  return (
    <BrowserRouter basename="/SupLibrary">
      <Router />
    </BrowserRouter>
  )
}

export default App
