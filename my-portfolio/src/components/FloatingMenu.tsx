import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface MenuItem {  // Define the type for menu items
    title: string;
    id: string;
}

const menuItems: MenuItem[] = [
  { title: "Home", id: "home" },
  { title: "About Me", id: "profile" },
  { title: "Skills", id: "skills" },
  { title: "Achievements", id: "achievements" },
  { title: "My Journey", id: "journey" },
  { title: "Featured Projects", id: "projects" },
  { title: "Get in Touch", id: "contact" }
];

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50" >
      <motion.button
        className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="text-white" /> : <Menu className="text-white" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 right-0"
          >
            {menuItems.map((item, index) => (
              <motion.button
                key={item.id}
                className="block w-40 mb-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg
                         text-left hover:bg-blue-50 dark:hover:bg-gray-700"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.id)}
              >
                {item.title}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}