import React, { useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Twitter, Github, Linkedin, Mail, Instagram } from "lucide-react";

interface SocialLink {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  label: string;
  isCopy?: boolean;
}

const socialLinks: SocialLink[] = [
  { icon: Twitter, href: "https://twitter.com/", label: "Twitter" },
  { icon: Github, href: "https://github.com/Dvat162518/", label: "Github" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/daniel-s-16aug04/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:danialvishwa543@gmail.com", label: "Email", isCopy: true },
  { icon: Instagram, href: "https://www.instagram.com/belongz_to_only_one?igsh=MThkZGU5dW42Zno1Nw%3D%3D&utm_source=qr", label: "Instagram" },
];

function Footer() {
  const [showCopyAnimation, setShowCopyAnimation] = useState(false);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
      .then(() => {
        // Show the custom copy animation
        setShowCopyAnimation(true);

        // Hide the animation after a short delay
        setTimeout(() => {
          setShowCopyAnimation(false);
        }, 2000);
      })
      .catch(err => {
        console.error("Failed to copy email: ", err);
      });
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8 relative">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-center space-x-8 mb-8">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;

            // Animation controls for looping animations
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const controls = useAnimation();

            // Start the looping animation on component mount
            // eslint-disable-next-line react-hooks/rules-of-hooks
            React.useEffect(() => {
              controls.start({
                y: [0, -5, 0], // Up and down motion
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: index * 0.2, // Stagger animations
                  ease: "easeInOut",
                },
              });
            }, [controls, index]);

            return (
              <motion.a
                key={social.label}
                href={social.isCopy ? undefined : social.href}
                onClick={(e: { preventDefault: () => void; }) => {
                  if (social.isCopy) {
                    e.preventDefault(); // Prevent navigation
                    handleCopyEmail("danialvishwa543@gmail.com"); // Copy the email
                  }
                }}
                className={`text-gray-600 dark:text-gray-300 hover:text-blue-500 
                            dark:hover:text-blue-400 transition-colors ${social.isCopy ? 'cursor-copy' : ''}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Link to ${social.label}`}
                role="button"
              >
                <motion.div animate={controls}>
                  <Icon className="w-6 h-6" />
                </motion.div>
              </motion.a>
            );
          })}
        </div>

        <motion.div
          className="text-center text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>© {new Date().getFullYear()} Daniel. All rights reserved.</p>
        </motion.div>
      </div>

      {/* Copy Animation */}
      <AnimatePresence>
        {showCopyAnimation && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-full shadow-lg flex items-center"
              initial={{ y: -50, opacity: 0 }}
              animate={{
                y: [-50, -60, -70],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 2 }}
            >
              <svg
                className="w-6 h-6 mr-2 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <motion.path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 27l7 7 17-17"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </svg>
              Email Copied!
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}

export default Footer;
