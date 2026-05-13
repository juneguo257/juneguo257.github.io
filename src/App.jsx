import { useCallback, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Loader from './components/Loader';

export default function App() {
  const [loading, setLoading] = useState(true);
  const onLoaderDone = useCallback(() => setLoading(false), []);

  return (
    <div className="relative min-h-screen bg-bg text-text overflow-x-hidden">
      {loading && <Loader onComplete={onLoaderDone} />}
      <Navbar />
      <main>
        <Hero />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
