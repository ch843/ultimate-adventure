import { Routes, Route } from "react-router-dom";
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import Book from './components/pages/Book';
import About from './components/pages/About';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Book />} />
        <Route path="book" element={<Book />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Home />} /> {/* Redirect to Home if invalid page */}
      </Route>
    </Routes>
  );
}

export default App;
