import {Routes, Route} from "react-router-dom";
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import Book from './components/pages/Book';
import Reviews from "./components/pages/Reviews.tsx";
import About from './components/pages/About';
import './App.css';
import ActivityDetails from "./components/pages/ActivityDetails.tsx";

function App() {
  return (
      <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="book" element={<Book />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="about" element={<About />} />
              <Route path="/activity/:id" element={<ActivityDetails />} />
              <Route path="*" element={<Home />} /> {/* Redirect to Home if invalid page */}
          </Route>
      </Routes>
  );
}

export default App;