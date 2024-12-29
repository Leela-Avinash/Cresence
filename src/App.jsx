import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Scene from './model_components/Scene';
import ExploreCollege from './components/ExploreCollege';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Scene />} />
        <Route path="/explore" element={<ExploreCollege />} />
      </Routes>
    </Router>
  );
}

export default App;
