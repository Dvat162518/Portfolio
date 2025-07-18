import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);  // Ref for the form
  const [showSuccess, setShowSuccess] = useState(false); // State for success message

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) {
      console.error("Form is not yet initialized.");
      return;
    }

    const formData = new FormData(form.current);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // Validate form data
    if (!name || !email || !message) {
      alert("Please fill out all fields.");
      return;
    }

    // EmailJS configuration
    const serviceId = "service_l1tqshp"; // Your Service ID
    const templateId = "template_y7t9p27"; // Your Template ID
    const publicKey = "YpwijBMWUlLFylQeH"; // Your Public Key (API Key)

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      to_email: "danialvishwa543@gmail.com", // Your email address
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((result) => {
        console.log("Email sent successfully:", result.text);

        // Show success animation
        setShowSuccess(true);
        form.current?.reset();  // Clear the form after successful sending

        // Hide the success message after 5 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);

      }, (error) => {
        console.error("Email sending error:", error.text);
        alert("An error occurred while sending the message. Please try again later.");
      });
  };

  return (
    <section className="py-16 px-5" id="contact">
      <motion.h2
        className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Get in Touch
      </motion.h2>

      <div className="max-w-2xl mx-auto">
        <motion.form
          className="space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onSubmit={sendEmail}
          ref={form}
        >
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
              placeholder="Your name"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
              placeholder="your@email.com"
            />
          </div>

          {/* Message Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              name="message"
              className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700 min-h-[150px]"
              placeholder="Your message..."
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg flex items-center justify-center
                       hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </motion.button>
        </motion.form>

        {/* Success Animation */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg p-8 flex flex-col items-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                {/* Animated Checkmark */}
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                  className="text-green-500 w-16 h-16 mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.circle
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                    stroke="#4caf50"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.path
                    fill="none"
                    stroke="#4caf50"
                    strokeWidth="2"
                    d="M14 27l7 7 17-17"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  />
                </motion.svg>

                {/* Success Message */}
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Success!</h3>
                <p className="text-gray-700 dark:text-gray-300 text-center">
                  Your message has been sent successfully. Thank you!
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
