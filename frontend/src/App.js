import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page404 from './components/Page404.jsx';
import MainPage from './components/MainPage.jsx'
import LoginPage from './components/LoginPage.jsx';

const App = () => {
  return (
  <BrowserRouter>
      <Routes>
        <Route path='*' element={<Page404 />} />
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
