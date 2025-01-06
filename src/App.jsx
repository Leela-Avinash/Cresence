import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Scene from './model_components/Scene';
import ExploreCollege from './components/ExploreCollege';
import HomeScene from "./model_components/HomeScene";

function App() {
  return (
    <Router>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 z-0">
          <Scene />
          <h1 className="bg-slate-200">fsfskfskfsksk</h1>
        </div>
        
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<HomeScene />} />
            <Route path="/explore" element={<ExploreCollege />} />
          </Routes>
        </div>
        
      </div>
    </Router>
  );
}

export default App;
