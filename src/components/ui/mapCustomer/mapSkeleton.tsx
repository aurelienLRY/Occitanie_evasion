import { motion } from 'framer-motion';

const MapSkeleton = () => {
  return (
    <motion.div 
      className="rounded-l-[0.8em] min-w-[350px] min-h-[450px] h-[60%] w-full shadow-lg bg-gray-200 relative flex flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        duration: 0.5, 
        ease: "easeInOut",
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
    >
      {/* Marqueurs animés avec des délais différents */}
      <motion.div 
        className="absolute top-[180px] left-1/2 w-6 h-6 bg-primary rounded-full"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute top-[150px] left-1/3 w-4 h-4 bg-primary rounded-full"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3
        }}
      />
      <motion.div 
        className="absolute top-[350px] left-1/3 w-4 h-4 bg-primary rounded-full"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 2.2, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6
        }}
      />
      <motion.div 
        className="absolute top-[400px] left-2/3 w-5 h-5 bg-primary rounded-full"
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.4, 1, 0.4]
        }}
        transition={{ 
          duration: 2.8, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.9
        }}
      />
      
      {/* Icône de recherche avec animation de rotation */}
      <motion.span 
        className="text-6xl"
     
      >
        🔍
      </motion.span>
      
      {/* Texte avec animation de fade et de typewriter */}
      <motion.span 
        className="font-title text-2xl font-bold mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.3,
          ease: "easeOut"
        }}
      >
        Recherche de Florent en cours
      </motion.span>
      
      {/* Points de suspension animés */}
      <motion.div 
        className="flex space-x-1 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="text-2xl"
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          >
            .
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default MapSkeleton;
MapSkeleton.displayName = "MapSkeleton";