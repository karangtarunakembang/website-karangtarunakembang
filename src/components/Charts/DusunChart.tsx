"use client";

import { motion } from "motion/react";

const dusunData = {
  kepalaDusun: { position: "Kepala Dusun", name: "Bapak Murtaji" },
  DataRt: [
    { position: "Ketua RT 1", name: "Abah Yaman" },
    { position: "Ketua RT 2", name: "Bapak Parnoto" },
  ],
  DataRtS: [
    { position: "Ketua RT 3", name: "Bapak Heri" },
    { position: "Ketua RT 4", name: "Bapak Jupri" },
  ],
};

const MemberCard = ({
  name,
  position,
}: {
  name: string;
  position?: string;
}) => (
  <div className="min-w-32 group relative flex flex-col items-center justify-center py-2 px-3 rounded-xl shadow-lg bg-gray-800 border border-gray-700 hover:scale-105 transition-all duration-300 ease-in-out">
    <h3 className="text-sm font-semibold text-gray-100">{name}</h3>
    {position && <p className="text-xs text-gray-400">{position}</p>}
  </div>
);

const fadeIn = (delay: number) => ({
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.3, delay: delay / 1000 },
});

export default function DusunChart() {
  const BASE_DELAY = 50;
  let currentDelay = BASE_DELAY;

  return (
    <section
      id="dusun"
      className="w-full text-balbg-black flex flex-col items-center "
    >
      <div className="flex flex-col items-center">
        {/* Start: 50ms */}
        <motion.div {...fadeIn(currentDelay)} className="text-black mb-2">
          Kepala Dusun
        </motion.div>
        {/* 50 + 50 = 100ms */}
        <motion.div {...fadeIn((currentDelay += 50))}>
          <MemberCard name={dusunData.kepalaDusun.name} />
        </motion.div>
        {/* 100 + 50 = 150ms */}
        <motion.div
          {...fadeIn((currentDelay += 50))}
          className="w-0.5 h-6 bg-black"
        />

        {/* Garis horizontal antara Kepala Dusun dan Ketua RT */}
        <div className="flex w-full justify-center max-w-7xl">
          {/* Horizontal line: Kiri 200ms */}
          <motion.div
            {...fadeIn((currentDelay += 50))}
            className="w-0.5 h-5 bg-black relative"
          />
          {/* Vertical line: Tengah 300ms */}
          <motion.div
            {...fadeIn((currentDelay += 100))}
            className="h-0.5 w-[180px] sm:w-[274px] md:w-[246px] lg:w-[440px] xl:w-[466px] bg-black"
          />
          {/* Horizontal line: Kanan 250ms*/}
          <motion.div
            {...fadeIn(currentDelay)}
            className="w-0.5 h-5 bg-black relative"
          />
        </div>

        {/* Ketua RT 1 & Ketua RT 2 */}
        <div className="flex justify-center items-center gap-x-[105px] sm:gap-x-[202px] md:gap-x-[172px] lg:gap-x-[366px] xl:gap-[396px]">
          {/* 350ms */}
          <motion.div
            {...fadeIn(currentDelay + 50)}
            className="text-balbg-black my-1"
          >
            Ketua RT 1
          </motion.div>
          {/* 350ms */}
          <motion.div
            {...fadeIn(currentDelay + 50)}
            className="text-balbg-black"
          >
            Ketua RT 2
          </motion.div>
        </div>

        {/* currentDelay sekarang 300ms. Tambahkan 50ms (350ms) dan 50ms per iterasi */}
        <div className="flex justify-center items-start gap-x-[54px] sm:gap-x-[150px] md:gap-x-[120px] lg:gap-x-[314px] xl:gap-[340px]">
          {dusunData.DataRt.map((member, index) => (
            <motion.div
              key={`rt-${index}`}
              className="flex flex-col items-center"
              {...fadeIn(currentDelay + 50 + index * 100)}
            >
              <MemberCard name={member.name} />
              {/* Garis vertikal 50ms setelah setiap member */}
              <motion.div
                {...fadeIn(currentDelay + 100 + index * 100)}
                className="w-0.5 h-5 md:h-6 lg:h-8 xl:h-10 bg-black"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ketua RT 3 & Ketua RT 4 */}
      {/* 550ms */}
      <div className="flex justify-center items-center gap-x-[105px] sm:gap-x-[202px] md:gap-x-[200px] lg:gap-x-[366px] xl:gap-[396px]">
        {/* 600ms */}
        <motion.div
          {...fadeIn(currentDelay + 50)}
          className="text-balbg-black my-1 xl:ml-4"
        >
          Ketua RT 3
        </motion.div>
        {/* 600ms */}
        <motion.div {...fadeIn(currentDelay + 50)} className="text-balbg-black">
          Ketua RT 4
        </motion.div>
      </div>

      {/* currentDelay sekarang 550ms. Tambahkan 50ms (600ms) dan 50ms per iterasi */}
      <div className="flex justify-center items-start gap-x-[54px] sm:gap-x-[150px] md:gap-x-[120px] lg:gap-x-[314px] xl:gap-[340px]">
        {dusunData.DataRt.map((member, index) => (
          <motion.div
            key={`rt-${index}`}
            {...fadeIn(currentDelay + 50 + index * 100)}
          >
            <MemberCard name={member.name} />
            {/* Garis vertikal di bawah masing-masing MemberCard */}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
