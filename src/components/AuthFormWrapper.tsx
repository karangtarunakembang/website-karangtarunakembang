import { ReactNode } from "react";

interface AuthFormWrapperProps {
  title: string;
  children: ReactNode;
  footerText: string;
  footerLinkHref: string;
  footerLinkText: string;
}

export default function AuthFormWrapper({
  title,
  children,
  footerText,
  footerLinkHref,
  footerLinkText,
}: AuthFormWrapperProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] w-full px-4 py-8">
      {" "}
      <div className=" p-8 rounded-lg shadow-lg w-full max-w-md ">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          {title}
        </h2>
        {children}
        <div className="mt-6 text-center text-gray-500">
          {footerText}{" "}
          <a href={footerLinkHref} className="text-blue-500 hover:underline">
            {footerLinkText}
          </a>
        </div>
      </div>
    </div>
  );
}
