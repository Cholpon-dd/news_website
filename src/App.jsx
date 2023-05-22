import { Routes, Route } from 'react-router-dom';
import NewsPage from './components/NewsPage';
import Main from './pages/Main';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/news/:title" element={<NewsPage />} />
    </Routes>
  );
}

export default App;
