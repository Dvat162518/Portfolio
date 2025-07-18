import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { TypeAnimation } from 'react-type-animation';
import profile1 from '/profile1.jpg';
import LazyImage from './common/LazyImage';

interface HeaderProps {
  startAnimations?: boolean;
}

const Header = ({ startAnimations = false }: HeaderProps) => {
  const [quote, setQuote] = useState({ content: "Loading...", author: "Unknown" });
  const [showTyping, setShowTyping] = useState(false);

  // Backup quotes array - Keeping exactly the same
  const backupQuotes = [
    { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { content: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
    { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { content: "Dream big and dare to fail.", author: "Norman Vaughan" },
    { content: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
    { content: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
    { content: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { content: "If you can dream it, you can achieve it.", author: "Zig Ziglar" },
    { content: "I think, therefore I am.", author: "René Descartes" },
    { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  ];

  // Control typing animation start
  useEffect(() => {
    if (startAnimations) {
      const timer = setTimeout(() => {
        setShowTyping(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [startAnimations]);

  // Quote functionality - Exactly the same as parent
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://api.quotable.io/random");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setQuote({
          content: data.content,
          author: data.author || "Unknown",
        });
      } catch (error) {
        console.error("Failed to fetch quote:", error);

        // Use a random quote from the backupQuotes array
        const randomIndex = Math.floor(Math.random() * backupQuotes.length);
        setQuote(backupQuotes[randomIndex]);
      }
    };

    fetchQuote();
    const quoteIntervalId = setInterval(fetchQuote, 60000);
    return () => clearInterval(quoteIntervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  // Kept exactly as parent file with empty dependency array

  return (
    <motion.header
      id="home"
      className="relative flex flex-col justify-start px-4 sm:px-6 lg:px-8 pt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* Rest of the component remains the same */}
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Profile Image */}
          <motion.div
            className="w-48 h-49 lg:w-80 lg:h-80 shrink-0 mt-4 lg:mt-10"
            initial={{ opacity: 0, scale: 0.5, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <LazyImage
              src={profile1}
              alt="Profile"
              className="rounded-full shadow-xl object-cover w-full h-full"
            />
          </motion.div>

          {/* Content Section */}
          <div className="flex-1 text-center lg:text-left mt-4 lg:mt-24">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-1 min-h-[80px] lg:min-h-[96px]">
              <span className="text-blue-600 block lg:inline font-russo">Hi there, </span>
              {showTyping && (
                <TypeAnimation
                  sequence={[
                    "I'm Daniel",
                    5000,
                    "Soy Daniel",
                    5000,
                    "Je suis Daniel",
                    5000,
                    "Ich bin Daniel",
                    5000,
                    "我是丹尼尔",
                    5000,
                    "私はダニエル",
                    5000,
                    "나는 다니엘",
                    5000,
                    "Я Даниэль",
                    5000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  cursor={false}
                />
              )}
            </h1>

            <motion.div
              className="text-xl -mb-1 text-gray-700 dark:text-gray-300 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span>A passionate Engineer in</span>
              <div className="min-h-[30px]">
                {showTyping && (
                  <TypeAnimation
                    sequence={[
                      "Autonomous Systems",
                      2000,
                      "Research & Innovation",
                      2000,
                      "PCB & Embedded Systems",
                      2000,
                      "CAD & Prototyping",
                      2000,
                      "Robotics & Automation",
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    className="text-blue-600 font-bold"
                    repeat={Infinity}
                  />
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quote Section - Kept exactly the same */}
        <motion.div
          className="mt-12 lg:mt-20 p-4 rounded-lg bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg 
                     max-w-xl mx-auto lg:absolute lg:top-3/4 lg:right-8 lg:transform lg:-translate-y-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-lg italic mb-2 text-gray-800 dark:text-gray-200">"{quote.content}"</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">- {quote.author}</p>
        </motion.div>
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
    </motion.header>
  );
};

export default Header;