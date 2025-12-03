import Link from "next/link";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { motion, Variants } from "motion/react";

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const ContactSection = () => {
  return (
    <motion.section
      className="w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.2 }}
    >
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-1 gap-10 md:gap-8 items-start">
          {/* LEFT - MAPS */}
          <motion.div className="order-1" variants={itemVariants}>
            <h3 className="text-lg xl:text-2xl font-bold text-gray-800 mb-4">
              Maps Location
            </h3>
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.1455749731414!2d112.55946710810753!3d-7.647705125045891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78771b2f2e94b9%3A0x6a4cfad655a981bc!2s9H25%2BWVM%2C%20Kembang%2C%20Kembangbelor%2C%20Kec.%20Pacet%2C%20Kabupaten%20Mojokerto%2C%20Jawa%20Timur%2061374!5e0!3m2!1sid!2sid!4v1761446859089!5m2!1sid!2sid"
                allowFullScreen={true}
                loading="lazy"
                aria-label="Map of Balai Dusun Kembang"
                title="Map of Balai Dusun Kembang"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[200px] md:h-[300px] border-0"
              />
            </div>
          </motion.div>

          {/* RIGHT - CONTACT INFO */}
          <motion.div className="order-2" variants={itemVariants}>
            <div className="space-y-6 text-gray-700">
              {/* Alamat */}
              <motion.div variants={itemVariants} transition={{ delay: 0.1 }}>
                <h3 className="font-bold text-gray-800 text-xl xl:text-2xl">
                  Our Location
                </h3>
                <p className="text-gray-600 leading-relaxed mt-1 ">
                  Dusun Kembang, Desa Kembang Belor, Kecamatan Pacet, Kabupaten
                  Mojokerto, Jawa Timur, 61374
                </p>

                <Link
                  href="https://maps.app.goo.gl/ikT4tfZHGXgikBT29"
                  className="relative inline-block bg-[#1581bc] text-white px-5 py-2 mt-4 rounded-full font-bold transition shadow-md hover:shadow-lg overflow-hidden group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute bg-white/20 inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

                  <span className="relative z-10">GET DIRECTIONS</span>
                </Link>
              </motion.div>

              {/* Email */}
              <motion.div
                className="flex items-center gap-3 text-[#1581bc] hover:text-[#1895d9] transition"
                variants={itemVariants}
                transition={{ delay: 0.2 }}
              >
                <MdOutlineEmail className="text-2xl shrink-0" />
                <Link
                  href="mailto:contact.karangtarunakembang@gmail.com"
                  className="text-lg font-semibold"
                >
                  contact.karangtarunakembang@gmail.com
                </Link>
              </motion.div>

              {/* Telepon */}
              <motion.div
                className="flex items-center gap-3 text-[#1581bc] hover:text-[#1895d9] transition"
                variants={itemVariants}
                transition={{ delay: 0.3 }}
              >
                <FaPhoneAlt className="text-xl shrink-0" />
                <Link href="tel:0123456789" className="text-lg font-semibold">
                  +62 812-1625-2511 (Chat Only)
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
