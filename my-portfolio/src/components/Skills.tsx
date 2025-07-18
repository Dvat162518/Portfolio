import React from "react";
import { motion } from "framer-motion";
import {
  FaReact, FaNodeJs, FaPython, FaHtml5, FaCss3Alt, FaLinux,
  FaRobot
} from "react-icons/fa";
import { SiC, SiRos, SiAltiumdesigner, SiAutodesk, SiArduino, SiSiemens } from "react-icons/si";
import { FaTools, FaCode } from "react-icons/fa";
import { BrainCircuit, Atom, TerminalSquare } from "lucide-react";

interface Skill {
  name: string;
  icon: React.ReactNode;
}

interface Category {
  title: string;
  skills: Skill[];
}

const categories: Category[] = [
  {
    title: "Programming & Development",
    skills: [
      { name: "ROS", icon: <SiRos className="text-purple-500 text-3xl sm:text-4xl" /> },
      { name: "React", icon: <FaReact className="text-blue-500 text-3xl sm:text-4xl" /> },
      { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-3xl sm:text-4xl" /> },
      { name: "Python", icon: <FaPython className="text-yellow-500 text-3xl sm:text-4xl" /> },
      { name: "C", icon: <SiC className="text-gray-400 text-3xl sm:text-4xl" /> },
      { name: "HTML", icon: <FaHtml5 className="text-orange-500 text-3xl sm:text-4xl" /> },
      { name: "CSS", icon: <FaCss3Alt className="text-blue-500 text-3xl sm:text-4xl" /> },
      { name: "Linux", icon: <FaLinux className="text-blue text-3xl sm:text-4xl" /> }
    ],
  },
  {
    title: "Software & Tools",
    skills: [
      { name: "Altium Designer", icon: <SiAltiumdesigner className="text-yellow-500 text-4xl" /> },
      { name: "Fusion360", icon: <FaTools className="text-orange-500 text-4xl" /> },
      { name: "MATLAB", icon: <FaCode className="text-red-400 text-4xl" /> },
      { name: "AutoCAD", icon: <SiAutodesk className="text-red-500 text-4xl" /> },
      { name: "Ciros Studio", icon: <SiAutodesk className="text-gray-500 text-4xl" /> },
      { name: "Robo Studio", icon: <SiAutodesk className="text-blue-400 text-4xl" /> },
      { name: "Arduino IDE", icon: <SiArduino className="text-green-500 text-4xl" /> },
      { name: "PLC TIA", icon: <SiSiemens className="text-blue-400 text-4xl" /> },

    ],
  },
  {
    title: "Domains & Specializations",
    skills: [
      { name: "ROS(AMR)", icon: <SiRos className="text-yellow-400 text-4xl" /> },
      { name: "Robotics & Automation", icon: <Atom className="text-green-500 text-4xl" /> },
      { name: "PLC", icon: <SiSiemens className="text-blue-500 text-4xl" /> },
      { name: "Prototype Modeling", icon: <FaRobot className="text-gray-500 text-4xl" /> },
      { name: "Embedded Systems", icon: <BrainCircuit className="text-red-400 text-4xl" /> },
      { name: "Electrical Wiring", icon: <TerminalSquare className="text-purple-500 text-4xl" /> }
    ],
  },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-8 sm:py-12 px-4 sm:px-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">Skills & Technologies</h2>

        {/* Mobile Horizontal Scroll */}
        <div className="block sm:hidden">
          <div className="flex space-x-4 overflow-x-auto pb-6 snap-x snap-mandatory">
            {categories.map((category, idx) => (
              <div 
                key={idx} 
                className="flex-none w-[85vw] snap-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-4 text-center text-gray-900 dark:text-white">{category.title}</h3>
                <div className="grid grid-cols-3 gap-3">
                  {category.skills.map((skill, i) => (
                    <motion.div
                      key={i}
                      className="flex flex-col items-center"
                      variants={{
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 },
                        hover: { scale: 1.15, transition: { duration: 0.2 } }
                      }}
                      initial="initial"
                      whileInView="animate"
                      whileHover="hover"
                      viewport={{ once: true }}
                    >
                      {skill.icon}
                      <p className="mt-1 text-xs text-center text-gray-900 dark:text-white">{skill.name}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-6">
          {categories.map((category, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-white">{category.title}</h3>
              <div className="grid grid-cols-3 gap-4">
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    className="flex flex-col items-center"
                    variants={{
                      initial: { opacity: 0, y: 50 },
                      animate: { opacity: 1, y: 0 },
                      hover: { scale: 1.3, y: -10 }
                    }}
                    initial="initial"
                    whileInView="animate"
                    whileHover="hover"
                    viewport={{ once: true }}
                  >
                    {skill.icon}
                    <p className="mt-2 text-sm text-gray-900 dark:text-white">{skill.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;