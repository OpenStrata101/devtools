import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { ColorGenerator } from './pages/ColorGenerator';
import { LinearGradient } from './pages/LinearGradient';
import { MeshGradient } from './pages/MeshGradient';
import { ColorPalette } from './pages/ColorPalette';
import { BoxShadow } from './pages/BoxShadow';
import { SvgWave } from './pages/SvgWave';
import { Glassmorphism } from './pages/Glassmorphism';
import { Neumorphism } from './pages/Neumorphism';
import { BorderRadius } from './pages/BorderRadius';
import { ButtonGenerator } from './pages/ButtonGenerator';
import { AnimationGenerator } from './pages/AnimationGenerator';
import { PatternGenerator } from './pages/PatternGenerator';
import { LayoutPlayground } from './pages/LayoutPlayground';
import { UnitConverter } from './pages/UnitConverter';
import { MetaTags } from './pages/MetaTags';
import { JsonTools } from './pages/JsonTools';
import { HttpStatus } from './pages/HttpStatus';
import { TextCase } from './pages/TextCase';
import { LoremIpsum } from './pages/LoremIpsum';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/colors/random" element={<ColorGenerator />} />
          <Route path="/colors/linear-gradient" element={<LinearGradient />} />
          <Route path="/colors/mesh-gradient" element={<MeshGradient />} />
          <Route path="/colors/palette" element={<ColorPalette />} />
          <Route path="/generators/box-shadow" element={<BoxShadow />} />
          <Route path="/generators/wave" element={<SvgWave />} />
          <Route path="/generators/glassmorphism" element={<Glassmorphism />} />
          <Route path="/generators/neumorphism" element={<Neumorphism />} />
          <Route path="/generators/border-radius" element={<BorderRadius />} />
          <Route path="/generators/button" element={<ButtonGenerator />} />
          <Route path="/generators/animation" element={<AnimationGenerator />} />
          <Route path="/generators/pattern" element={<PatternGenerator />} />
          <Route path="/playground/layout" element={<LayoutPlayground />} />
          <Route path="/tools/unit-converter" element={<UnitConverter />} />
          <Route path="/generators/meta-tags" element={<MetaTags />} />
          <Route path="/tools/json" element={<JsonTools />} />
          <Route path="/tools/http-status" element={<HttpStatus />} />
          <Route path="/tools/text-case" element={<TextCase />} />
          <Route path="/generators/lorem-ipsum" element={<LoremIpsum />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;