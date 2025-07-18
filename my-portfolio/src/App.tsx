// src/App.tsx
import { Suspense, lazy, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingMenu from './components/FloatingMenu';
import Header from './components/Header';
import useTheme from './hooks/useTheme';

// Lazy load components
const Profile = lazy(() => import('./components/Profile'));
const AboutMe = lazy(() => import('./components/AboutMe'));
const Skills = lazy(() => import('./components/Skills'));
const Timeline = lazy(() => import('./components/Timeline'));
const ProjectShowcase = lazy(() => import('./components/ProjectShowcase'));
const Achievements = lazy(() => import('./components/Achievements'));
const Contact = lazy(() => import('./components/Contact'));
const InfoBanner = lazy(() => import('./components/InfoBanner'));
const Footer = lazy(() => import('./components/Footer'));

// Skeleton loading component
const SkeletonLoader = () => (
  <div className="w-full h-32 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
);

// Boot Screen Component
const BootScreen = () => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a192f]"
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    transition={{ duration: 1, delay: 4 }}
    onAnimationComplete={() => {
      document.body.style.overflow = 'auto';
    }}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0.8, 1, 1, 0.8],
      }}
      transition={{
        duration: 4,
        times: [0, 0.2, 0.8, 1],
        ease: "easeInOut",
      }}
      className="relative text-center"
    >
      <motion.span 
        className="text-5xl md:text-7xl font-bold text-white font-russo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Welcome
      </motion.span>
      
      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 animate-glow">
        <div className="absolute inset-0 bg-[#0a192f] rounded-full blur-2xl opacity-75" />
        <div className="absolute inset-0 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" />
      </div>
    </motion.div>
  </motion.div>
);

function App() {
  const [showContent, setShowContent] = useState(false);
  const [startAnimations, setStartAnimations] = useState(false);
  useTheme();

  useEffect(() => {
    // Prevent scrolling during intro
    document.body.style.overflow = 'hidden';
    
    // Show main content after intro
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 5000);

    // Start animations slightly after content appears
    const animationTimer = setTimeout(() => {
      setStartAnimations(true);
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    }, 5500);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(animationTimer);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {!showContent && <BootScreen />}
      </AnimatePresence>
      
      <motion.div 
        className="relative min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white 
                   transition-colors duration-300 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showContent ? 1 : 0,
        }}
        transition={{ duration: 1 }}
      >
        <FloatingMenu />
        <Header startAnimations={startAnimations} />
        
        <Suspense fallback={<SkeletonLoader />}>
          <Profile />
        </Suspense>

        <Suspense fallback={<SkeletonLoader />}>
          <AboutMe />
        </Suspense>

        <Suspense fallback={<SkeletonLoader />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SkeletonLoader />}>
          <Timeline />
        </Suspense>

        <Suspense fallback={<SkeletonLoader />}>
          <ProjectShowcase />
        </Suspense>

        <Suspense fallback={<SkeletonLoader />}>
          <Achievements />
        </Suspense>

        <Suspense fallback={<SkeletonLoader />}>
          <Contact />
        </Suspense>
        
        <Suspense fallback={<SkeletonLoader />}>
          <InfoBanner />
        </Suspense>

        <Suspense fallback={<SkeletonLoader />}>
          <Footer />
        </Suspense>
      </motion.div>
    </>
  );
}

export default App;