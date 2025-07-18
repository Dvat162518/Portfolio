import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import profile2 from '/profile2.jpg';

export default function Profile() {
  const handleDownloadCV = () => {
    // Replace with your actual PDF URL
    const pdfUrl = "/daniel.pdf"; // Make sure this path is correct and in 'public'
    window.open(pdfUrl, '_blank');
  };

  return (
    <section className="flex flex-col items-center mt-32 text-center">
      <motion.div
        id="profile"
        className="relative cursor-pointer group"
        whileHover={{ scale: 1.05 }}
        onClick={handleDownloadCV}
      >
        <motion.img
          src={profile2}  // Referencing the imported image
          className="w-40 h-41 rounded-full shadow-lg group-hover:opacity-80 transition-opacity"
          alt="Profile Download" // ADDED ALT TEXT
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100
                   transition-opacity bg-black bg-opacity-50 rounded-full"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <FileText className="w-8 h-8 text-white" />
          <span className="text-white text-sm ml-2">Download CV</span>
        </motion.div>
      </motion.div>
      <motion.p
        className="mt-1 text-lg text-gray-700 dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        
      > Get Resume
      </motion.p>
    </section>
  );
}