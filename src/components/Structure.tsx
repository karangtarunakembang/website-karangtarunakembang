// src/components/Structure.tsx
"use client";

import { useState } from "react";
import KarangTarunaChart from "./Charts/KarangTarunaChart";
import DusunChart from "./Charts/DusunChart";
import { AnimatePresence, motion } from "motion/react";

const StructurePage = () => {
  const [selected, setSelected] = useState<"karangTaruna" | "dusun">(
    "karangTaruna"
  );
  return (
    <section id="structure" className="min-h-screen text-white bg-white">
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-black mb-4 text-center"
        >
          Structure
        </motion.h1>
      </div>
      <div className="w-full flex flex-col items-center text-gray-950 min-h-screen py-10">
        <div className="flex gap-4 mb-8 ">
          <button
            onClick={() => setSelected("karangTaruna")}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 min-w-32 cursor-pointer
              ${
                selected === "karangTaruna"
                  ? "bg-[#1581bc] text-white hover:bg-[rgb(24,149,217)]"
                  : "bg-transparent border border-blue-300 text-[#1581bc] hover:bg-blue-100"
              }
              `}
          >
            Karang Taruna
          </button>
          <button
            onClick={() => setSelected("dusun")}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 min-w-32 cursor-pointer
              ${
                selected === "dusun"
                  ? "bg-[#1581bc] text-white hover:bg-[#1895d9]"
                  : "bg-transparent border border-blue-300 text-[#1581bc] hover:bg-blue-100"
              }
              `}
          >
            Dusun
          </button>
        </div>
        <AnimatePresence mode="wait">
          {selected === "karangTaruna" && (
            <motion.div
              key="karangTaruna"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <KarangTarunaChart />
            </motion.div>
          )}
          {selected === "dusun" && (
            <motion.div
              key="dusun"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <DusunChart />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default StructurePage;
