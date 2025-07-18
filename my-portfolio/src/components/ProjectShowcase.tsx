import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Added Autoplay
import { Github } from "lucide-react";
import { useState } from "react"; // Import useState for popup functionality
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CatSVG = () => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    whileHover={{ scale: 1.2 }}
    className="text-blue-500"
  >
    <motion.path
      d="M12 2L15 5H19C20.1 5 21 5.9 21 7V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V7C3 5.9 3.9 5 5 5H9L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.circle
      cx="12"
      cy="13"
      r="3"
      stroke="currentColor"
      strokeWidth="2"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5 }}
    />
  </motion.svg>
);

interface Project {
  title: string;
  desc: string;
  github: string;
  tech: string[];
  images: string[];
}

export default function ProjectShowcase() {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility
  const [currentImage, setCurrentImage] = useState("");  // State for current image in popup

  const projects: Project[] = [
    {
      title: "Elexis",
      desc: "Floatable and portable Embedded System trainer kit for educational and research purposes.",
      github: "#",
      tech: ["Altium Designer", "Arduino", "Microcontroller", "Embedded System", "Python", "C"],
      images: ["/project4-1.png"]
    },
    {
      title: "LM-X2",
      desc: "Engineered a high-efficiency PCB using Altium Designer, optimizing embedded systems for next-gen robotics.",
      github: "#",
      tech: ["Altium Designer", "Arduino", "Embedded Systems","Python", "C"],
      images: ["/project1-1.jpg", "/project1-2.jpg"]
    },
    {
      title: "Aero-Kite",
      desc: "Dynamic weather/environmental data collector and analyzer for educational purposes.",
      github: "#",
      tech: ["Altium Designer", "Arduino", "MQTT", "Embedded System", "C"],
      images: ["/project3-1.jpg", "/project3-2.jpg"]
    },
    {
      title: "Phantom The AMR",
      desc: "Autonomous Mobile Robot for indoor navigation and mapping with dynamic stability control over IoT.",
      github: "#",
      tech: ["Autonomous System", "Mobile Robotics", "ROS-Noetic", "Python", "SLAM"],
      images: ["/project5-1.jpg", "/project5-2.jpg","/project5-3.jpg","/project5-4.jpg","/project5-5.jpg","/project5-6.jpg","/project5-7.jpg","/project5-8.jpg","/project5-9.jpg","/project5-10.jpg","/project5-11.jpg","/project5-12.jpg","/project5-13.jpg","/project5-14.jpg","/project5-16.jpg"]
    },
    {
      title: "STCM Mapper",
      desc: "Real-time STCM mapper decode and visualization using Python and ROS specifically for .STCM Without Rviz",
      github: "https://github.com/Dvat162518/SLAM_ROS-Noetic-_STCM_MAPPER_Software",
      tech: ["Python", "PyQt", "Matplotlib", "ROS","2D Lidar","Jetson","RViz"],
      images: ["/project2-1.png", "/project2-2.png","/project2-3.png"]
    }
  ];

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

  return (
    <section className="p-5 py-16" id="projects">
      <motion.h2
        className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Featured Projects
      </motion.h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]} // Added Autoplay to modules
        spaceBetween={30}
        slidesPerView={1}
        navigation
        autoplay={{  // Configure Autoplay
          delay: 3000,
          disableOnInteraction: true // Keep autoplay even when user interacts
        }}
        pagination={false} // Hide pagination
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        className="p-4"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative group">
                <Swiper
                  modules={[Pagination]}
                  pagination={{ clickable: true }}
                  className="h-64" // Set consistent height for images
                >
                  {project.images.map((image, idx) => (
                    <SwiperSlide key={idx} className="h-full">
                      <img
                        src={image}
                        alt={`${project.title} ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                        onClick={() => openPopup(image)} // Open popup on click
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* Overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.button
                    className="text-white flex items-center space-x-2"
                    whileHover={{ scale: 1.1 }}
                    onClick={() => openPopup(project.images[0])}
                  >
                    <CatSVG />
                    <span>View Project</span>
                  </motion.button>
                </motion.div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.desc}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-end">
                  <motion.a
                    href={project.github}
                    target="_blank" // Open link in a new tab
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Github className="w-6 h-6" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Image Popup */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={closePopup}
        >
          <div className="relative max-w-3xl mx-auto">
            <img
              src={currentImage}
              alt="Project"
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
