import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Import images from public folder
import cert1 from '/cert1.jpg';
import cert2 from '/cert2.jpg';
import cert3 from '/cert3.jpg';
import cert4 from '/cert4.jpg';
import cert5 from '/cert5.jpg';
import cert6 from '/cert6.jpg';


const achievements = [
  { title: "Winner Innovation Oasis'23", issuer: "IIIT-Nagpur", year: 2023, image: cert1 },
  { title: "2nd Runner up Tech and Innovation Fair 24", issuer: "IIT-Madras", year: 2023, image: cert2,cert5 },
  { title: "Partcipated in ABU ROBOCON 24", issuer: "IIT-Delhi", year: 2024, image: cert3 },
  { title: "Partcipated in Shaastra - Tech and Innovation Fair 25", issuer: "IIT-Madras", year: 2025, image: cert4,cert6 },
  { title: "4th Runner up in Shaastra - Tech and Innovation Fair 24", issuer: "IIT-Madras", year: 2024, image: cert4,cert6 },
  { title: "2nd runner up - Elan N Vision'23", issuer: " IIT-Hyderabad", year: 2023, image: cert4,cert6 },
  { title: "3rd Place - ROBORG'23", issuer: " Sri Krishna College of Engineering and Technology-Coimbatore", year: 2023, image: cert4,cert6 },
  { title: "Best Paper Award- ICIIA'23", issuer: "Velammal Institute of Technology - Chennai", year: 2023, image: cert4,cert6 },

];

const Achievements: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // State for image popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const intervalId = setInterval(() => {
      if (!isMobile) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % achievements.length);
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  const nextCard = () => {
    if (!isMobile) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % achievements.length);
    }
  };

  const prevCard = () => {
    if (!isMobile) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + achievements.length) % achievements.length);
    }
  };

  // Adjusted card variants to spread the cards wider
  const cardVariants = {
    previous: { x: '-100%', opacity: 0.7, scale: 0.9, zIndex: 1 },
    center:   { x:     '0%', opacity: 1,   scale: 1.1, zIndex: 2 },
    next:     { x:  '100%', opacity: 0.7, scale: 0.9, zIndex: 1 },
    hidden:   { opacity: 0, scale: 0.8, zIndex: 0 }
  };

  // Function to open the image popup
  const openPopup = (image: string) => {
    setCurrentImage(image);
    setIsPopupOpen(true);
  };

  // Function to close the image popup
  const closePopup = () => {
    setCurrentImage("");
    setIsPopupOpen(false);
  };

  if (isMobile) {
    return (
      <section id="achievements" className="py-8 px-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Achievements & Certifications</h2>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 px-4" style={{ minWidth: 'min-content' }}>
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-40 object-cover cursor-pointer"
                    onClick={() => openPopup(item.image)} // Open popup on image click
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-400">{item.issuer}</p>
                  <p className="text-sm text-gray-500">{item.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Image Popup */}
        {isPopupOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
            onClick={closePopup}
          >
            <div className="relative max-w-3xl mx-auto">
              <img
                src={currentImage}
                alt="Achievement"
                className="max-h-screen"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
              />
              <button
                className="absolute top-4 right-4 text-white text-3xl"
                onClick={closePopup}
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </section>
    );
  }

  return (
    <section id="achievements" className="py-16 px-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <motion.h2 
        className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Achievements & Certifications
      </motion.h2>

      <div className="relative max-w-7xl mx-auto">
        <button 
          onClick={prevCard} 
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-transparent text-gray-900 dark:text-white p-4 rounded-full z-10"
        >
          {"<"}
        </button>

        <div className="relative h-[500px] flex justify-center items-center overflow-hidden">
          {achievements.map((item, index) => {
            let position = 'hidden';
            if (index === currentIndex) position = 'center';
            else if (index === (currentIndex - 1 + achievements.length) % achievements.length) position = 'previous';
            else if (index === (currentIndex + 1) % achievements.length) position = 'next';

            return (
              <motion.div
                key={index}
                className="absolute w-[400px] bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                variants={cardVariants}
                initial="hidden"
                animate={position}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => openPopup(item.image)} // Open popup on image click
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-400">{item.issuer}</p>
                  <p className="text-sm text-gray-500">{item.year}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <button 
          onClick={nextCard} 
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent text-gray-900 dark:text-white p-4 rounded-full z-10"
        >
          {">"}
        </button>
      </div>

      {/* Image Popup */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={closePopup}
        >
          <div className="relative max-w-3xl mx-auto">
            <img
              src={currentImage}
              alt="Achievement"
              className="max-h-screen"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
            />
            <button
              className="absolute top-4 right-4 text-white text-3xl"
              onClick={closePopup}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Achievements;
