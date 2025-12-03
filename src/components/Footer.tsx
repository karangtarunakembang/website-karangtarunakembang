import Link from "next/link";
import { FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const visiText = "Bertujuan untuk berkontribusi positif bagi masyarakat.";
  const misiText =
    "Meningkatkan kepedulian terhadap lingkungan sosial masyarakat.";

  return (
    <footer
      id="footer"
      className="py-12 md:py-16 bg-black text-white shadow-2xl shadow-blue-900/50"
    >
      <div className="container mx-auto px-6 md:px-20">
        {/* Bagian Atas */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start text-center md:text-left space-y-10 md:space-y-0">
          {/* Kiri: Info Utama & Visi Misi */}
          <div className="md:w-5/12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#1581bc] to-indigo-400 tracking-tight">
              Karang Taruna Dusun Kembang
            </h2>
            <div className="mt-3 text-sm md:text-base text-gray-400">
              <div className="flex items-center justify-center md:justify-start space-x-2 font-medium">
                Sekretariat Dusun Kembang, Desa Kembang Belor, Kecamatan Pacet,
                Kabupaten Mojokerto
              </div>
            </div>

            <div className="mt-6 p-4 border border-gray-700 rounded-lg shadow-lg bg-gray-900">
              <div className="text-sm md:text-base space-y-2">
                <p className="font-semibold text-[#1581bc] flex items-center">
                  Visi:
                  <span className="ml-2 font-normal text-gray-300">
                    {visiText}
                  </span>
                </p>
                <p className="font-semibold text-[#1581bc] flex items-center">
                  Misi:
                  <span className="ml-2 font-normal text-gray-300">
                    {misiText}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Tengah: Navigasi */}
          <div className="md:w-3/12">
            <h3 className="text-xl font-bold mb-4 border-b border-blue-500/50 pb-2 inline-block">
              Navigasi Cepat
            </h3>
            <div className="grid grid-cols-2 gap-3 items-center md:items-start space-y-3 text-sm md:text-base font-medium">
              <Link
                href="/"
                className="hover:text-[#1581bc] transition transform hover:translate-x-1"
              >
                Beranda
              </Link>
              <Link
                href="/#activities"
                className="hover:text-[#1581bc] transition transform hover:translate-x-1"
              >
                Program Kerja
              </Link>
              <Link
                href="/#about"
                className="hover:text-[#1581bc] transition transform hover:translate-x-1"
              >
                Tentang Kami
              </Link>
              <Link
                href="/#gallery"
                className="hover:text-[#1581bc] transition transform hover:translate-x-1"
              >
                Galeri
              </Link>
            </div>
          </div>
        </div>

        {/* Bagian Bawah */}
        <div className="my-5 md:my-10 border-t border-gray-800"></div>

        <div className="flex flex-col md:flex-row md:justify-between items-center text-center md:text-left space-y-3 md:space-y-0 mt-4">
          <p className="text-gray-400 text-sm md:text-base">
            © {new Date().getFullYear()} KKNT UNESA — dev by{" "}
            <Link
              href="https://github.com/renggars"
              className="underline text-gray-500 hover:text-blue-500 transition"
            >
              renggars
            </Link>
          </p>

          <div className="flex justify-center md:justify-start space-x-6 text-3xl md:text-4xl">
            <Link
              href="https://www.instagram.com/persatuanpemudapemudikembang?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Kartar Kembang"
              className="text-gray-400 hover:text-pink-500 transition-all duration-300 transform hover:scale-110"
            >
              <FaInstagram />
            </Link>
            <Link
              href="#"
              aria-label="YouTube Kartar Kembang"
              className="text-gray-400 hover:text-red-600 transition-all duration-300 transform hover:scale-110"
            >
              <FaYoutube />
            </Link>
            <Link
              href="#"
              aria-label="Tiktok Kartar Kembang"
              className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
            >
              <FaTiktok />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
