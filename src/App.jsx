import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LettersPage from './pages/LettersPage';
import WordsPage from './pages/WordsPage';
import PracticePage from './pages/PracticePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:lang/letters" element={<LettersPage />} />
        <Route path="/:lang/words" element={<WordsPage />} />
        <Route path="/practice" element={<PracticePage />} />
      </Routes>
    </BrowserRouter>
  );
}
