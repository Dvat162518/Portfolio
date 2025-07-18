import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setHoveredIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const events: TimelineEvent[] = [
    {
      year: "2022 Q1",
      title: "Started Journey",
      description: "Begain learning CAD and Embedded System fundamentals",
    },
    {
      year: "2022 Q2",
      title: "First Project",
      description: "Built my first PCB Prototype with CAD using Altium Designer and Fusion360",
    },
    {
      year: "2023 Q1",
      title: "Participations",
      description: "Participating in Robotics Competitions and Tech Fairs With developed Projects",
    },
    {
      year: "2023 Q2",
      title: "Started to working Industrial Projects",
      description: "Started Learn about PLC/Linux/ROS and other Industrial System ",
    },
    {
      year: "2024 Q3",
      title: "Autonomous Systems",
      description: "Worked on Autonomous Systems with ROS1 Noetic",
    },
    {
      year: "2024 Q4",
      title: "AMR Development",
      description: "Build fully working Autonomous Mobile Robots With ROS1 Noetic",
    },
    {
      year: "2025 Q1",
      title: "Lidar and Mapping",
      description: "Build Mapping decoder Specially for .STCM map to Visual Without Rviz",
    },
    {
      year: "2025 Q2",
      title: "AMR with ROS2 Humble",
      description: "Currently Building ROS2 based AMR",
    },
  ];

  const linePath = `M 0 0 V ${containerHeight}`;

  // Transform the path length according to the scroll
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Use useSpring for smoother animation of the pathLength
  const animatedPathLength = useSpring(pathLength, { stiffness: 50, damping: 20 });

  return (
    <section
      className="py-12 sm:py-16 px-4 sm:px-5"
      ref={containerRef}
      id="journey"
    >
      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-16 text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        My Journey
      </motion.h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <svg
          className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 h-full"
          width="4"
          height={containerHeight}
          viewBox={`0 0 4 ${containerHeight}`}
          style={{ overflow: "visible" }}
        >
          {/* Main Blurred Line */}
          <path
            d={linePath}
            stroke="rgba(59, 130, 246, 0.2)"
            strokeWidth="4"
            strokeLinecap="round"
            style={{
              fill: "none",
              filter: "blur(4px)",
            }}
          />

          {/* Progress Line with Blur */}
          <motion.path
            d={linePath}
            stroke="rgba(59, 130, 246, 0.8)"
            strokeWidth="4"
            strokeLinecap="round"
            style={{
              fill: "none",
              pathLength: animatedPathLength,
              filter: "blur(2px)", // Added blur to the progress line
            }}
          />
        </svg>

        {/* Timeline events */}
        <div className="ml-8 sm:ml-0">
          {events.map((event, index) => {
            // Create a ref for each card
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const cardRef = useRef<HTMLDivElement>(null);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [isActive, setIsActive] = useState(false);

            // Use motion value event to track pathLength changes
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useMotionValueEvent(animatedPathLength, "change", (latest) => {
              if (cardRef.current && containerRef.current) {
                const cardRect = cardRef.current.getBoundingClientRect();
                const containerRect = containerRef.current.getBoundingClientRect();

                // Calculate the card's position relative to the container
                const cardPosition = cardRect.top - containerRect.top;

                // Determine the current length of the progress line
                const currentLength = latest * containerHeight;

                if (currentLength >= cardPosition) {
                  setIsActive(true);
                } else {
                  setIsActive(false);
                }
              }
            });

            return (
              <motion.div
                key={index}
                ref={cardRef}
                className={`mb-12 sm:mb-16 ${
                  index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                } flex flex-col sm:flex-row items-start sm:items-center`}
                initial={{ opacity: 0, y: 30 }}
                animate={isActive ? { opacity: 1, scale: 1.05 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <div
                  className={`w-full sm:w-1/2 ${
                    index % 2 === 0 ? "sm:pr-8" : "sm:pl-8"
                  }`}
                >
                  <motion.div
                    className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-blue-500 font-bold text-lg sm:text-xl mb-2 block">
                      {event.year}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                      {event.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
