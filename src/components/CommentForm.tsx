"use client";

import { trpc } from "@/trpc/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuMessageCircleMore, LuSend } from "react-icons/lu";
import { motion, Variants } from "framer-motion";
import { MessageFormData } from "@/types";
import toast from "react-hot-toast";

const formVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const inputItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const CommentForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageFormData>();

  const createMessage = trpc.message.create.useMutation({
    onSuccess: () => {
      reset();
      setLoading(false);
      toast.success("Pesan berhasil terkirim!");
    },
    onError: () => {
      setLoading(false);
      toast.error("Gagal mengirim pesan. Coba lagi.");
    },
  });

  const onSubmit = (data: MessageFormData) => {
    setLoading(true);
    createMessage.mutate(data);
  };

  return (
    <motion.div
      className="bg-white p-6 md:p-8 rounded-2xl w-full border border-gray-200 shadow-xl"
      variants={formVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex items-center gap-4 mb-10 mt-1">
        <div className="p-3 rounded-2xl bg-indigo-100">
          <LuMessageCircleMore className="text-3xl md:text-4xl text-[#1581bc]" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1581bc]">
          Send Message
        </h2>
      </div>

      <motion.form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        animate="visible"
      >
        {/* Nama Lengkap */}
        <motion.label
          className="flex flex-col gap-2"
          variants={inputItemVariants}
        >
          <span className="text-gray-900 font-medium mb-1">Full Name</span>
          <input
            type="text"
            {...register("name", { required: "Full name is required" })}
            placeholder="Your Full Name"
            className="bg-gray-100 py-3 px-4 placeholder:text-gray-500 text-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-200"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </motion.label>

        {/* Email */}
        <motion.label
          className="flex flex-col gap-2"
          variants={inputItemVariants}
        >
          <span className="text-gray-900 font-medium mb-1">Your Email</span>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Your Email"
            className="bg-gray-100 py-3 px-4 placeholder:text-gray-500 text-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-200"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </motion.label>

        {/* Pesan */}
        <motion.label
          className="flex flex-col gap-2"
          variants={inputItemVariants}
        >
          <span className="text-gray-900 font-medium mb-1">Your Message</span>
          <textarea
            {...register("message", { required: "Message is required" })}
            rows={5}
            placeholder="Your Message"
            className="bg-gray-100 py-3 px-4 placeholder:text-gray-500 text-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-200"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </motion.label>

        {/* Tombol Submit */}
        <motion.button
          type="submit"
          disabled={loading}
          variants={inputItemVariants}
          transition={{ delay: 0.3 }}
          className="w-full relative h-12 bg-[#1581bc] text-white font-semibold rounded-2xl overflow-hidden group transition-all duration-250 cursor-pointer shadow-md hover:shadow-lg mt-3"
        >
          <div className="absolute bg-white/20 inset-0 translate-y-12 group-hover:translate-y-0 transition-transform duration-500" />
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Posting...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <LuSend className="text-xl" />
              <span>Post Comment</span>
            </div>
          )}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};
