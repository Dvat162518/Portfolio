import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Github, Heart, MessageCircle, Reply } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Types for our comments system
interface Comment {
  id: string;
  name: string;
  text: string;
  likes: number;
  replies: Reply[];
  timestamp: Date;
}

interface Reply {
  id: string;
  name: string;
  text: string;
  likes: number;
  timestamp: Date;
}

interface Project {
  id: string;
  title: string;
  desc: string;
  github: string;
  tech: string[];
  images: string[];
  likes: number;
  comments: Comment[];
}

const CommentForm = ({ onSubmit, isReply = false }: { onSubmit: (data: { name: string; text: string }) => void; isReply?: boolean }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() && comment.trim()) {
      onSubmit({ name, text: comment });
      setName("");
      setComment("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name *"
        required
        className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={isReply ? "Write a reply *" : "Write a comment *"}
        required
        className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 min-h-[80px]"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        {isReply ? "Reply" : "Comment"}
      </button>
    </form>
  );
};

const CommentSection = ({ projectId, comments, onAddComment, onLikeComment, onAddReply }: { projectId: string; comments: Comment[]; onAddComment: (projectId: string, data: { name: string; text: string }) => void; onLikeComment: (projectId: string, commentId: string, replyId?: string) => void; onAddReply: (projectId: string, commentId: string, data: { name: string; text: string }) => void }) => {
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <CommentForm onSubmit={(data) => onAddComment(projectId, data)} />
      
      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold">{comment.name}</h4>
              <p className="text-gray-600 dark:text-gray-300">{comment.text}</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onLikeComment(projectId, comment.id)}
              className="flex items-center space-x-1 text-gray-500 hover:text-red-500"
            >
              <Heart className={`w-4 h-4 ${comment.likes > 0 ? 'text-red-500 fill-current' : ''}`} />
              <span>{comment.likes}</span>
            </motion.button>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            <button
              onClick={() => setActiveReplyId(activeReplyId === comment.id ? null : comment.id)}
              className="flex items-center space-x-1 hover:text-blue-500"
            >
              <Reply className="w-4 h-4" />
              <span>Reply</span>
            </button>
          </div>

          {activeReplyId === comment.id && (
            <CommentForm
              isReply
              onSubmit={(data) => {
                onAddReply(projectId, comment.id, data);
                setActiveReplyId(null);
              }}
            />
          )}

          {comment.replies.length > 0 && (
            <div className="ml-8 mt-4 space-y-3">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-bold">{reply.name}</h5>
                      <p className="text-gray-600 dark:text-gray-300">{reply.text}</p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onLikeComment(projectId, comment.id, reply.id)}
                      className="flex items-center space-x-1 text-gray-500 hover:text-red-500"
                    >
                      <Heart className={`w-4 h-4 ${reply.likes > 0 ? 'text-red-500 fill-current' : ''}`} />
                      <span>{reply.likes}</span>
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default function ProjectShowcase() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Elexis",
      desc: "Floatable and portable Embedded System trainer kit for educational and research purposes.",
      github: "#",
      tech: ["Altium Designer", "Arduino", "Microcontroller", "Embedded System", "Python", "C"],
      images: ["/project4-1.png"],
      likes: 0,
      comments: []
    },
    // Add your other projects here with the same structure
  ]);

  const [activeComments, setActiveComments] = useState<string | null>(null);

  const handleLike = (projectId: string) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? { ...project, likes: project.likes + 1 }
        : project
    ));
  };

  const handleAddComment = (projectId: string, { name, text }: { name: string; text: string }) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? {
            ...project,
            comments: [...project.comments, {
              id: Date.now().toString(),
              name,
              text,
              likes: 0,
              replies: [],
              timestamp: new Date()
            }]
          }
        : project
    ));
  };

  const handleLikeComment = (projectId: string, commentId: string, replyId?: string) => {
    setProjects(projects.map(project => {
      if (project.id !== projectId) return project;

      const updatedComments = project.comments.map(comment => {
        if (comment.id !== commentId) return comment;

        if (replyId) {
          const updatedReplies = comment.replies.map(reply =>
            reply.id === replyId ? { ...reply, likes: reply.likes + 1 } : reply
          );
          return { ...comment, replies: updatedReplies };
        }

        return { ...comment, likes: comment.likes + 1 };
      });

      return { ...project, comments: updatedComments };
    }));
  };

  const handleAddReply = (projectId: string, commentId: string, { name, text }: { name: string; text: string }) => {
    setProjects(projects.map(project => {
      if (project.id !== projectId) return project;

      const updatedComments = project.comments.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [...comment.replies, {
                id: Date.now().toString(),
                name,
                text,
                likes: 0,
                timestamp: new Date()
              }]
            }
          : comment
      );

      return { ...project, comments: updatedComments };
    }));
  };

  return (
    <section className="p-5 py-16" id="projects">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        autoplay={{
          delay: 8000,
          disableOnInteraction: true
        }}
        pagination={false}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        className="p-4"
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleLike(project.id)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-red-500"
                  >
                    <Heart
                      className={`w-6 h-6 ${project.likes > 0 ? 'text-red-500 fill-current' : ''}`}
                    />
                    <span>{project.likes}</span>
                  </motion.button>
                </div>

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

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setActiveComments(activeComments === project.id ? null : project.id)}
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-500"
                  >
                    <MessageCircle className="w-6 h-6" />
                    <span>Comments ({project.comments.length}) 🔻</span>
                  </button>
                  
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Github className="w-6 h-6" />
                  </motion.a>
                </div>

                <AnimatePresence>
                  {activeComments === project.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 overflow-hidden"
                    >
                      <CommentSection
                        projectId={project.id}
                        comments={project.comments}
                        onAddComment={handleAddComment}
                        onLikeComment={handleLikeComment}
                        onAddReply={handleAddReply}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}