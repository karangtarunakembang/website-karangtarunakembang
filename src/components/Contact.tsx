"use client";

import ContactSection from "./ContactSection";
import { CommentForm } from "./CommentForm";
import { motion } from "framer-motion";

const Contact = () => {
  const variants = {
    title: {
      initial: { opacity: 0, y: -30 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    },
    content: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
    },
  };

  return (
    <section
      id="contact"
      className="w-full bg-white text-gray-800 min-h-screen flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-12 overflow-hidden"
    >
      {/* Title Section */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-12"
        variants={variants.title}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.5 }}
      >
        Contact Us
      </motion.h2>

      {/* Content Grid */}
      <motion.div
        className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-7xl"
        variants={variants.content}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* ContactSection (LEFT) */}
        <div className="flex justify-center">
          <ContactSection />
        </div>
        {/* CommentForm (RIGHT) */}
        <div className="flex justify-center">
          <CommentForm />
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
