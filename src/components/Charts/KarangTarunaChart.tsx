"use client";

import { motion } from "motion/react";

const KarangTarunaData = {
  Penasehat: [
    { name: "Bapak Muhktar Effendi", position: "Kepala Desa Kembangbelor" },
    { name: "Bapak Murtaji", position: "Kepala Dusun Kembang" },
  ],
  ketua: { name: "Wawan", position: "Ketua" },
  wakilKetua: { name: "Didik", position: "Wakil Ketua" },
  sekretaris: { name: "Diana", position: "Sekretaris" },
  divisi: {
    bendahara: [{ name: "Deviana", position: "Bendahara" }, { name: "Resa" }],
    humas: [
      { name: "Yusuf", position: "Humas" },
      { name: "Alul" },
      { name: "Soleh" },
      { name: "Mol" },
    ],
    SeksiKeagamaan: [
      { name: "Saiful", position: "Seksi Keagamaan" },
      { name: "Hudi" },
      { name: "Ust. Mansur" },
    ],
    SeksiSosial: [
      { name: "Mansur", position: "Seksi Sosial" },
      { name: "Konyeng" },
      { name: "Siska" },
      { name: "Mamik" },
    ],
    SeksiKeamanan: [
      { name: "Amin", position: "Seksi Keamanan" },
      { name: "Deni" },
      { name: "Dio" },
    ],
  },
};

const MemberCard = ({
  name,
  position,
}: {
  name: string;
  position?: string;
}) => (
  <div
    className={`${
      position ? "w-44 lg:w-48 " : "min-w-28 lg:min-w-32"
    } group relative flex flex-col items-center justify-center py-2 px-3 rounded-xl shadow-lg bg-gray-800 border border-gray-700 hover:scale-105 transition-all duration-300 ease-in-out`}
  >
    <p className="text-sm font-semibold text-gray-100 text-center">{name}</p>
    {position && (
      <p className="text-xs text-gray-400 text-center">{position}</p>
    )}
  </div>
);

const fadeIn = (delay: number) => ({
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.3, delay: delay / 1000 },
});

export default function KarangTarunaChart() {
  let currentDelay = 0;
  const STEP = 50;

  return (
    <section
      id="structure"
      className="w-full text-bbg-black flex flex-col items-center scroll-mt-20 sm:scroll-mt-2 md:scroll-mt-28 "
    >
      {/* 1. Penasehat */}
      <div className="flex flex-col items-center">
        {/* 50ms */}
        <motion.div
          {...fadeIn((currentDelay += STEP))}
          className="text-black mb-2"
        >
          Penasehat
        </motion.div>

        <div className="flex flex-col justify-center gap-3 items-center">
          {KarangTarunaData.Penasehat.map((member, index) => (
            <motion.div
              key={`acara-${index}`}
              {...fadeIn(currentDelay + index * STEP + STEP)}
            >
              <MemberCard name={member.name} position={member.position} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* LEVEL 2 (Ketua & Wakil Ketua) */}
      {/* current 150ms */}
      <div className="flex flex-col items-center justify-center">
        {/* Vertical line */}
        {/* 200ms */}
        <motion.div
          {...fadeIn((currentDelay += STEP))}
          className="w-0.5 h-6 lg:h-8 xl:h-10 bg-black"
        />
        <div className="flex w-full justify-center max-w-7xl">
          {/* Horizontal line: Kiri */}
          <motion.div
            {...fadeIn((currentDelay += STEP))}
            className="w-0.5 h-5 bg-black relative"
          />
          {/* Vertical line: Tengah 250ms */}
          <motion.div
            {...fadeIn(currentDelay)}
            className="h-0.5 w-[180px] sm:w-[274px] md:w-[246px] lg:w-[440px] xl:w-[466px] bg-black"
          />
          {/* Horizontal line: Kanan 250ms */}
          <motion.div
            {...fadeIn(currentDelay)}
            className="w-0.5 h-5 bg-black relative"
          />
        </div>

        {/* Text Ketua & Wakil Ketua 300ms*/}
        <div className="flex justify-center items-center gap-x-[115px] sm:gap-x-[216px] md:gap-x-[190px] lg:gap-x-[380px] xl:gap-[410px]">
          <motion.div
            {...fadeIn(currentDelay + STEP)}
            className="text-bbg-black my-1 sm:ml-6 md:ml-5 lg:ml-4 xl:ml-10"
          >
            Ketua
          </motion.div>
          <motion.div
            {...fadeIn(currentDelay + STEP)}
            className="text-bbg-black my-1 xl:mr-5"
          >
            Wakil Ketua
          </motion.div>
        </div>

        {/* Card Ketua & Wakil Ketua 350ms*/}
        <div className="flex justify-center items-center gap-x-[66px] sm:gap-x-[163px] md:gap-x-[132px] lg:gap-x-[314px] xl:gap-[340px]">
          {/* 350ms */}
          <motion.div
            {...fadeIn((currentDelay += STEP + STEP))}
            className="flex flex-col items-center sm:mr-0 sm:ml-4 md:mr-2"
          >
            <MemberCard name={KarangTarunaData.ketua.name} />
            {/* 400ms */}
            <motion.div
              {...fadeIn(currentDelay + STEP)}
              className="w-0.5 h-5 bg-black relative md:mr-px lg:ml-1"
            />
          </motion.div>
          <motion.div
            {...fadeIn(currentDelay)} // 350ms
            className="flex flex-col items-center sm:mr-4 md:mr-3"
          >
            <MemberCard name={KarangTarunaData.wakilKetua.name} />
            {/* 400ms */}
            <motion.div
              {...fadeIn(currentDelay + STEP)}
              className="w-0.5 h-5 bg-black relative md:mr-[5px] lg:mr-[17px] xl:mr-3"
            />
          </motion.div>
        </div>
        {/* Horizontal line 450ms*/}
        <motion.div
          {...fadeIn((currentDelay += STEP + STEP))}
          className="h-0.5 w-[180px] sm:w-[277px] md:w-[252px] md:ml-px lg:ml-0 lg:w-[441px] lg:mr-[3px] xl:mr-0 xl:w-[470px] bg-black"
        />
        {/* Vertical line 500ms*/}
        <motion.div
          {...fadeIn((currentDelay += STEP))}
          className="w-0.5 h-4 bg-black relative"
        />
      </div>

      {/* LEVEL 3 (Sekretaris & Bendahara) */}
      <div className="flex flex-col items-center justify-center">
        {/* Vertical line 550ms*/}
        <motion.div
          {...fadeIn((currentDelay += STEP))}
          className="w-0.5 h-5 md:h-6 lg:h-8 xl:h-10 bg-black"
        />
        <div className="flex w-full justify-center max-w-7xl">
          {/* Horizontal line: Kiri 600ms*/}
          <motion.div
            {...fadeIn((currentDelay += STEP))}
            className="w-0.5 h-5 bg-black relative"
          />
          {/* Vertical line: Tengah 600ms*/}
          <motion.div
            {...fadeIn(currentDelay)}
            className="h-0.5 w-[180px] sm:w-[274px] md:w-[250px] lg:w-[440px] xl:w-[466px] bg-black"
          />
          {/* Horizontal line: Kanan 600ms*/}
          <motion.div
            {...fadeIn(currentDelay)}
            className="w-0.5 h-5 bg-black relative"
          />
        </div>

        {/* Text Sekretaris & Bendahara */}
        <div className="flex justify-center items-center gap-x-[103px] sm:gap-x-48 md:gap-x-[175px] lg:gap-x-[370px] xl:gap-[395px]">
          {/* 650ms */}
          <motion.div
            {...fadeIn((currentDelay += STEP))}
            className="text-bbg-black my-1 xl:ml-4"
          >
            Sekretaris
          </motion.div>
          {/* 700ms */}
          <motion.div
            {...fadeIn((currentDelay += STEP))}
            className="text-bbg-black"
          >
            Bendahara
          </motion.div>
        </div>

        {/* Card Sekretaris & Bendahara 700*/}
        <div className="flex justify-center items-center gap-x-10 sm:gap-x-[150px] md:gap-x-[140px] md:ml-3 lg:ml-0 lg:gap-x-[312px] xl:gap-[340px] ">
          <motion.div
            {...fadeIn((currentDelay += STEP + STEP))}
            className="flex flex-col items-center mr-6 sm:mr-4 md:mr-0 mt-2"
          >
            <MemberCard name={KarangTarunaData.sekretaris.name} />
            <motion.div
              {...fadeIn(currentDelay + 100)}
              className="w-0.5 h-[66px] bg-black relative sm:ml-3 md:ml-0 lg:mr-px "
            />
          </motion.div>

          <div className="flex flex-col justify-center items-center sm:gap-x-5 md:mr-3 lg:mr-0">
            {KarangTarunaData.divisi.bendahara.map((member, index) => (
              <motion.div
                key={`dokumentasi-${index}`}
                {...fadeIn(currentDelay + STEP + index * STEP)}
                className="mt-2"
              >
                <MemberCard name={member.name} />
              </motion.div>
            ))}
            {/* Vertical line */}
            <motion.div
              {...fadeIn(currentDelay + 150)}
              className="w-0.5 h-5 bg-black relative lg:ml-px xl:ml-0"
            />
          </div>
        </div>

        {/* Horizontal line (Bawah Level 3) */}
        <motion.div
          {...fadeIn((currentDelay += STEP))}
          className="h-0.5 w-[178px] sm:-mt-0.5 md:mt-0 sm:w-[272px] sm:ml-1 md:ml-0 md:w-[254px] lg:w-[443px] lg:mr-[3px] xl:mr-0 xl:w-[470px] bg-black"
        />

        {/* Vertical line (Pusat ke Divisi) */}
        <motion.div
          {...fadeIn((currentDelay += STEP))}
          className="w-0.5 h-4 sm:h-8 xl:h-10 bg-black relative"
        />

        {/* Horizontal line (Divisi) */}
        <motion.div
          {...fadeIn((currentDelay += STEP))}
          className="h-0.5 w-[178px] sm:w-[274px] sm:ml-2 md:ml-0 md:w-[470px] lg:w-[608px] xl:w-[746px] bg-black"
        />

        {/* Vertical lines (Cabang Divisi) */}
        <div className="grid grid-cols-2 md:grid-cols-3 justify-center items-center gap-x-[174px] sm:gap-x-[270px] sm:ml-2 md:ml-0 md:gap-x-[232px] lg:gap-x-[301px] xl:gap-x-[370px]">
          <motion.div
            {...fadeIn((currentDelay += STEP))}
            className="w-0.5 h-5 bg-black relative"
          />
          <motion.div
            {...fadeIn((currentDelay += STEP))}
            className="w-0.5 h-5 bg-black relative"
          />
          <motion.div
            {...fadeIn((currentDelay += STEP))}
            className="hidden md:block w-0.5 h-5 bg-black relative"
          />
        </div>
      </div>
      {/* LEVEL 4 (Seksi Keagamaan, Seksi Sosial, Seksi Keamanan) */}
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-2 md:grid-cols-3 justify-center gap-x-[50px] sm:gap-x-[150px] sm:ml-2 md:ml-0  md:gap-x-32 lg:gap-x-[204px] xl:gap-x-[272px] my-1 text-center">
          <motion.div {...fadeIn((currentDelay += STEP))}>
            Seksi Keagamaan
          </motion.div>
          <motion.div
            {...fadeIn((currentDelay += STEP))}
            className="hidden md:block xl:mr-2"
          >
            Seksi Sosial
          </motion.div>
          <motion.div {...fadeIn((currentDelay += STEP))}>
            Seksi Keamanan
          </motion.div>
        </div>

        {/* Card Anggota */}
        <div className="grid grid-cols-2 md:grid-cols-3 justify-center gap-x-[62px] sm:gap-x-[158px] sm:ml-1 md:ml-0 md:gap-x-[120px] lg:gap-x-[170px] xl:gap-x-[245px]">
          {/* Seksi Keagamaan */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col gap-3 items-center">
              {KarangTarunaData.divisi.SeksiKeagamaan.map((member, index) => (
                <motion.div
                  key={`keagamaan-${index}`}
                  {...fadeIn(currentDelay + STEP + index * STEP)}
                >
                  <MemberCard name={member.name} />
                </motion.div>
              ))}
            </div>
            <motion.div
              {...fadeIn(currentDelay + 200)}
              className="w-0.5 h-5 md:h-[70px] bg-black lg:mr-3"
            />
          </div>

          {/* Seksi Sosial */}
          <div className="hidden md:flex flex-col items-center">
            <div className="flex flex-col gap-3 items-center">
              {KarangTarunaData.divisi.SeksiSosial.map((member, index) => (
                <motion.div
                  key={`sosial-${index}`}
                  {...fadeIn(currentDelay + STEP + index * STEP)}
                >
                  <MemberCard name={member.name} />
                </motion.div>
              ))}
            </div>
            <motion.div
              {...fadeIn(currentDelay + 250)}
              className="w-0.5 h-5 bg-black ml-3 sm:ml-0"
            />
          </div>

          {/* Seksi Keamanan */}
          <div className="flex flex-col gap-3 items-center">
            {KarangTarunaData.divisi.SeksiKeamanan.map((member, index) => (
              <motion.div
                key={`keamanan-${index}`}
                {...fadeIn(currentDelay + STEP + index * STEP)}
              >
                <MemberCard name={member.name} />
              </motion.div>
            ))}
            <motion.div
              {...fadeIn(currentDelay + 200)}
              className="w-0.5 h-5 md:h-[70px] bg-black sm:ml-2.5 -mt-3"
            />
          </div>
        </div>

        {/* Garis Horizontal */}
        <motion.div
          {...fadeIn(currentDelay + 300)}
          className="hidden md:flex h-0.5 bg-black md:w-[471px] md:ml-[5px] lg:w-[609px] lg:ml-[5px] xl:w-[759px] lg:mr-1.5"
        />
      </div>
      {/* LEVEL 5 (Humas) */}
      <div className="flex flex-col items-center">
        {/* Vertical line */}
        <motion.div
          {...fadeIn(currentDelay + STEP)}
          className="hidden md:block w-0.5 h-6 bg-black"
        />
        <motion.div
          {...fadeIn(currentDelay + 100)}
          className="hidden md:block text-lg text-bbg-black my-1"
        >
          Humas
        </motion.div>

        {/* === MOBILE VIEW (2 kolom seperti Level 4) === */}
        <div className="grid grid-cols-2 md:hidden justify-center gap-x-[94px] sm:gap-x-[198px] sm:ml-1.5 text-center my-1">
          <motion.div {...fadeIn(1100)}>Seksi Sosial</motion.div>
          <motion.div {...fadeIn(1100)}>Humas</motion.div>
        </div>

        <div className="hidden md:flex justify-center gap-3 sm:gap-x-5">
          {KarangTarunaData.divisi.humas.map((member, index) => (
            <motion.div
              key={`dokumentasi-${index}`}
              {...fadeIn(currentDelay + 150 + index * STEP)}
            >
              <MemberCard name={member.name} />
            </motion.div>
          ))}
        </div>

        {/* === MOBILE: CARD ANGGOTA (2 kolom) === */}
        <div className="grid grid-cols-2 md:hidden justify-center gap-x-[62px] sm:gap-x-[158px] sm:ml-1">
          {/* Seksi Sosial */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col gap-3 items-center">
              {KarangTarunaData.divisi.SeksiSosial.map((member, index) => (
                <motion.div
                  key={`sosial-${index}`}
                  {...fadeIn(1150 + index * STEP)}
                >
                  <MemberCard name={member.name} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bendahara */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col gap-3 items-center">
              {KarangTarunaData.divisi.humas.map((member, index) => (
                <motion.div
                  key={`bendahara-${index}`}
                  {...fadeIn(1150 + index * STEP)}
                >
                  <MemberCard name={member.name} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
