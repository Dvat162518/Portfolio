// src/components/AboutMe.tsx

"use client";
import React from "react";
import { motion } from "framer-motion";
import useTheme from "../hooks/useTheme";

const AboutMe: React.FC = () => {
useTheme();
return (
<motion.section
className="py-16 px-5 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
>
<div className="max-w-3xl mx-auto text-center">
<motion.h2
className="text-3xl font-bold mb-8 text-gray-800 dark:text-white"
>
About Me
</motion.h2>

<motion.p
      className="text-lg leading-relaxed text-justify"
    >
      I'm a passionate engineer who blends core engineering with software development.
      Specializing in Robotics & Automation, Embedded Systems, and Electrical Wiring, 
      I create innovative solutions through prototype modeling and AMR technologies. 
      Proficient in tools like Altium Designer, Fusion360, and programming languages such as C, Python, and React, 
      I bridge the gap between hardware and software to deliver high-performance results.
    </motion.p>
  </div>
</motion.section>
);
};

export default AboutMe;