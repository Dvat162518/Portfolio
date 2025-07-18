import { motion } from 'framer-motion';

const BootIntro = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a192f] overflow-hidden"
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
          className="text-5xl md:text-7xl font-bold text-white relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Welcome
        </motion.span>
        
        {/* Enhanced Glow Effects */}
        <div className="absolute inset-0 -z-10">
          {/* Primary glow */}
          <motion.div 
            className="absolute inset-0 bg-blue-500 rounded-full blur-3xl opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Secondary pulsing glow */}
          <motion.div 
            className="absolute inset-0 bg-[#4d9fff] rounded-full blur-2xl"
            animate={{
              scale: [0.8, 1.1, 0.8],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          
          {/* Outer ethereal glow */}
          <motion.div 
            className="absolute inset-0 bg-purple-500 rounded-full blur-3xl opacity-10"
            animate={{
              scale: [1.2, 1.5, 1.2],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          {/* Core bright glow */}
          <motion.div 
            className="absolute inset-0 bg-white rounded-full blur-3xl opacity-10"
            animate={{
              scale: [0.9, 1.2, 0.9],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Background stabilizer */}
          <div className="absolute inset-0 bg-[#0a192f] rounded-full blur-2xl opacity-75" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BootIntro;