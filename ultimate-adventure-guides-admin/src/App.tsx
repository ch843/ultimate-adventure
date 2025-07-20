import { Routes, Route } from "react-router-dom";
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import Edit from './components/pages/Edit';
import './App.css';
import ClubManagement from "./components/pages/ClubManagement.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="club" element={<ClubManagement />} />
        <Route path="*" element={<Home />} /> {/* Redirect to Home if invalid page */}
      </Route>
    </Routes>
  );
}

export default App;
