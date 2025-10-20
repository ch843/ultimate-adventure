import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Adventures from "./components/pages/Adventures";
import Members from "./components/pages/Members";
import Trips from "./components/pages/Trips";
import TripDetails from "./components/pages/TripDetails";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Adventures />} />
        <Route path="members" element={<Members />} />
        <Route path="trips" element={<Trips />} />
        <Route path="trips/:id" element={<TripDetails />} />
        <Route path="*" element={<Adventures />} />{" "}
        {/* Redirect to Adventures if invalid page */}
      </Route>
    </Routes>
  );
}

export default App;
