import React from "react";

function Footer() {
  return (
    <>
      <footer className="bg-white/30 rounded-lg shadow dark:bg-gray-900 m-4 w-full mt-16">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href={"/#"}
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <span className="gilroy-bold self-center text-2xl whitespace-nowrap text-white">
                DigiVote.
              </span>
            </a>
            <ul className="flex gilroy-light flex-wrap items-center mb-6 text-sm font-medium text-white">
              <li>
                <a href={"/register"} className="hover:underline me-4 md:me-6">
                  Register
                </a>
              </li>
              <li>
                <a href={"/vote"} className="hover:underline me-4 md:me-6">
                  Vote
                </a>
              </li>
              <li>
                <a href={"/results"} className="hover:underline me-4 md:me-6">
                  Live Results
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-white sm:text-center">
            © 2024{" "}
            <a href="#" className="hover:underline">
              DigiVote™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
