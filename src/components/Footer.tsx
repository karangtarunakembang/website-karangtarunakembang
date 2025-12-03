import Link from "next/link";
import { FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="pt-5 md:pt-10 pb-5 md:pb-7 bg-gray-950 text-white"
    >
      <div className="container mx-auto px-6 md:px-20">
        {/* Bagian Atas */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start text-center md:text-left space-y-6 md:space-y-0">
          {/* Kiri */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Karang Taruna Dusun Kembang
            </h2>
            <p className="mt-2 text-sm md:text-base font-semibold">
              Sekretariat Dusun Kembang, Desa Kembang Belor, Kecamatan Pacet,
              Kabupaten Mojokerto
            </p>
          </div>

          {/* Sosial Media Mobile*/}
          <div className="flex sm:hidden justify-center md:justify-end space-x-6 text-2xl md:text-3xl">
            <Link
              href="https://www.instagram.com/persatuanpemudapemudikembang?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Kartar Kembang"
              className="hover:text-blue-500 transition"
            >
              <FaInstagram />
            </Link>
            <Link
              href="#footer"
              aria-label="YouTube Kartar Kembang"
              className="hover:text-blue-500 transition"
            >
              <FaYoutube />
            </Link>
            <Link
              href="#footer"
              aria-label="Tiktok Kartar Kembang"
              className="hover:text-blue-500 transition"
            >
              <FaTiktok />
            </Link>
          </div>

          {/* Navigasi (desktop kanan / mobile tengah) */}
          <div className="grid grid-cols-2 gap-3 md:flex md:space-x-8 text-sm md:text-base font-medium justify-center md:justify-end">
            <Link href="/" className="hover:text-blue-500 transition">
              Beranda
            </Link>
            <Link
              href="/#activities"
              className="hover:text-blue-500 transition"
            >
              Program
            </Link>
            <Link href="/#about" className="hover:text-blue-500 transition">
              Tentang
            </Link>
            <Link href="/#gallery" className="hover:text-blue-500 transition">
              Galeri
            </Link>
          </div>
        </div>

        {/* Bagian Bawah */}
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

          {/* Sosial Media */}
          <div className="hidden sm:flex justify-center md:justify-end space-x-6 text-2xl md:text-3xl">
            <Link
              href="https://www.instagram.com/persatuanpemudapemudikembang?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              aria-label="Instagram Kartar Kembang"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
              <FaInstagram />
            </Link>
            <Link
              href="#"
              aria-label="YouTube Kartar Kembang"
              className="hover:text-blue-500 transition"
            >
              <FaYoutube />
            </Link>
            <Link
              href="#"
              aria-label="Tiktok Kartar Kembang"
              className="hover:text-blue-500 transition"
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
